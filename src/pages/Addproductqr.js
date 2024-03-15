import React, { useEffect, useState } from "react";
import Customlogin from "../componentes/Coustomlogin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Card } from "react-bootstrap"; // Importez le composant Card depuis react-bootstrap
import { object, string, number, array, date, InferType } from "yup";
import { creebrands, getbrands, reset } from "../feature/brand/brandslice";
import { useDispatch, useSelector } from "react-redux";
import {
  creecategories,
  getcategories,
  resetstt,
} from "../feature/category-product/categorySlice";
import "react-widgets/styles.css";
import { creatcoleur, getcoleur } from "../feature/color/colorSlice";
import Multiselect from "react-widgets/Multiselect";
import { deleteimg, uploads } from "../feature/uploadimage/uploadslice";
import {
  createProduct,
  getaProduct,
  updateaProduct,
} from "../feature/product/productSlice";
import { QrReader } from 'react-qr-reader';


function Addproductqr() {
  // Schéma de validation
  let userSchema = object({
    title: string().required("Le titre est requis"),
    price: number().required("Le prix est requis"),
    quantite: number().required("La quantité est requise"),
    brand: string().required("La marque est requise"),
    color: array().required("La couleur est requise"),
  });
  const [productDetected, setProductDetected] = useState(false);
  const categorystate = useSelector((state) => state.category.category);
  const brandstate = useSelector((state) => state.brand.brands);
  // État global du produit
  const Productstate = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading,products,ismessage } = Productstate;
  const dispatch = useDispatch();
  const colorstate = useSelector((state) => state.coleur.coleur);
  // Fonction pour gérer le résultat du scan QR
  const handleResult = (result) => {
    if (result) {
      const title = result.text.split('\n')[0];
      const price = result.text.split('\n')[1];
      const quantite = result.text.split('\n')[2];
      const brand = result.text.split('\n')[3];
      const description = result.text.split('\n')[4];
      const color = result.text.split('\n')[5];
      const imageURLs = result.text.split('\n')[7].split(',');
      const imageIDs = result.text.split('\n')[8].split(',');
      const category = result.text.split('\n')[9];
      const tags = result.text.split('\n')[10];
      
      
      formik.setValues({
        ...formik.values,
        title: title,
        price: price,
        quantite: quantite,
        brand: brand,
        color: color.split(','),
        description:description,
        images: imageURLs.map((url, index) => ({
          url: url,
          public_id: imageIDs[index] // Assurez-vous que la longueur des deux tableaux est la même
        })),
        category:category,
        tags: tags,
      });
      
      for (let i = 0; i < colorstate.length; i++) {
        if (colorstate[i].name !== color) {
          dispatch(creatcoleur(color));
        }
      }
      for (let i = 0; i < brandstate.length; i++) {
        if (brandstate[i].name !== brand) {
          dispatch(creebrands(brand));
        }
      }
      for (let i = 0; i < categorystate.length; i++) {
        if (categorystate[i].name !== category) {
          dispatch(creecategories(category));
        }
      }
    }setProductDetected(false);
  };
  // Initialisation du formulaire avec Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      quantite: "",
      brand: "",
      color: [],
      images:[],
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      alert(JSON.stringify(values));
    },
  });

  // Effet pour afficher les messages après l'envoi du formulaire
  useEffect(() => {
    if (isSuccess&& products && ismessage) {
      toast.success("Le produit a été ajouté avec succès.");
    }
    if (isError) {
      toast.error("Erreur lors de l'ajout du produit.");
    }
  }, [isSuccess, isError]);

  
  return (
    <div>
      {!productDetected ? (
      <div className="qr">
        <h3>Scanner un produit</h3>
        <QrReader
          delay={300}
          onError={(error) => console.log(error)}
          onScan={handleResult}
          onResult={handleResult}
          style={{
            width: "50px",
            height: "50px",
            position: "relative",
            margin: "auto",
          }}
        />
      </div>
    ) :<> {/* Formulaire pour ajouter un produit */}
    {setProductDetected(true)}
      <form onSubmit={formik.handleSubmit}>
        <Customlogin
          type="text"
          Label="Titre"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.title}
          error={formik.touched.title && formik.errors.title}
        />
        <Customlogin
          type="text"
          Label="Prix"
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.price}
          error={formik.touched.price && formik.errors.price}
        />
        <Customlogin
          type="text"
          Label="Quantité"
          name="quantite"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.quantite}
          error={formik.touched.quantite && formik.errors.quantite}
        />
        <Customlogin
          type="text"
          Label="Marque"
          name="brand"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.brand}
          error={formik.touched.brand && formik.errors.brand}
        />
        {/* Vous devez définir une logique pour sélectionner plusieurs couleurs */}
        <Customlogin
          type="text"
          Label="Couleur"
          name="color"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.color}
          error={formik.touched.color && formik.errors.color}
        />

<Customlogin
          type="text"
          Label="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.description}
          error={formik.touched.description && formik.errors.description}
        />
        <br/>
       < Customlogin
          type="text"
          Label="category"
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.category}
          error={formik.touched.category && formik.errors.category}
        />
        <br/>

        < Customlogin
          type="text"
          Label="tags"
          name="tags"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.tags}
          error={formik.touched.tags && formik.errors.tags}
        />
        <br/>
{formik.values.images.map((image, index) => (
  <>
  <img key={index} src={image.url} alt={`Image ${index}`} />
  <label>{image.public_id}</label>
  </>
))}
<br/>

        <Button type="submit" variant="outline-success" className="btn1">
          Ajouter un produit
        </Button>
      </form></> }
      

     
    </div>
  );
}

export default Addproductqr;
