import React, { useEffect, useState } from "react";
import Customlogin from "../componentes/Coustomlogin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { CloseCircleOutlined } from "@ant-design/icons";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Card } from "react-bootstrap"; // Importez le composant Card depuis react-bootstrap
import { object, string, number, array, date, InferType } from "yup";
import { getbrands } from "../feature/brand/brandslice";
import { useDispatch, useSelector } from "react-redux";
import { getcategories } from "../feature/category-product/categorySlice";
import "react-widgets/styles.css";
import { getcoleur } from "../feature/color/colorSlice";
import Multiselect from "react-widgets/Multiselect";
import { deleteimg, uploads } from "../feature/uploadimage/uploadslice";
import { createProduct } from "../feature/product/productSlice";
function Addproduct() {
 
  let userSchema = object({
    title: string().required("il faut ecriver votre title"),
    description: string().required("il faut ecriver votre description"),
    price: number().required("il faut ecriver votre prix"),
    category: string().required("il faut ecriver category"),
    brand: string().required("il faut ecriver votre brandx"),
    color: array().required("il faut ecriver votre color"),
    quantite: number().required("il faut ecriver votre quantite"),
    tags: string().required("il faut ecriver votre quantite"),
    images: array().required("il faut ecriver votre img"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      color: [], // Initialisez color comme un tableau vide
      quantite: "",
      tags: "",
      images: [],
    },
    
    validationSchema: userSchema,
    onSubmit: (values) => {
     dispatch(createProduct(values))
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/product-list")
      }, 3000);  
      //alert(JSON.stringify(values));
    },
  });
 
  const [images, setImages] = useState([]);
  const navigate = useNavigate()
  const brandstate = useSelector((state) => state.brand.brands);
  const categorystate = useSelector((state) => state.category.category);
  const colorstate = useSelector((state) => state.coleur.coleur);
  const uploadstate = useSelector((state) => state.upload.uploads);
  const Productstate = useSelector((state) => state.product);
  const dispatch = useDispatch();
  
  const { isSuccess, isError, isLoading ,products} = Productstate;
  
  useEffect(() => {
    if (isSuccess && products) {
      toast.success('Product ajouté');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du produit');
    }
  }, [isSuccess, isError, isLoading]);
  
  
  const img = [];
  uploadstate.forEach((i) => {
    img.push({
      url: i.url,
      public_id: i.public_id,
    });
  });
  useEffect(() => {
    dispatch(getbrands());
    dispatch(getcategories());
    dispatch(getcoleur());
  }, [dispatch]);
  useEffect(() => {
    formik.values.images = img;

  }, [img]);
  const colors = colorstate.map((color) => ({
    _id: color._id,
    color: color.name,
  }));
  
 



  const beforeUpload = (file, fileList) => {
    const maxFiles = 5; 
    if (fileList.length > maxFiles) {
      console.log("Trop de fichiers sélectionnés. Limitez-vous à", maxFiles);
      return false; 
    }

    // Dispatch votre action Redux pour gérer le téléchargement des fichiers
    dispatch(uploads(fileList));
    formik.setFieldValue("images", fileList); 
   
    return false;
};

  return (
    <div className="mb-4">
      <div>
        <h3>Ajouter un produit</h3>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <Customlogin
            type="text"
            Label="Entrer votre titre"
            name="title"
            onChange={formik.handleChange("title")}
            onblur={formik.handleBlur("title")}
            val={formik.values.title}
          />

          <div className="error1">
            {formik.touched.title && formik.errors.title}
          </div>
          <br />

          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error1">
            {formik.touched.description && formik.errors.description}
          </div>
          <br />
          <Customlogin
            type="Number"
            Label="Entrer le prix"
            name="price"
            onChange={formik.handleChange("price")}
            onblur={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error1">
            {formik.touched.price && formik.errors.price}
          </div>
          <br />
          <Customlogin
            type="Number"
            Label="Entrer le quantiter"
            name="quantite"
            onChange={formik.handleChange("quantite")}
            onblur={formik.handleBlur("quantite")}
            val={formik.values.quantite}
          />
          <div className="error1">
            {formik.touched.quantite && formik.errors.quantite }
          </div>
          <br />
          <Form.Select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            val={formik.values.brand}
            aria-label="Default select example"
          >
            <option>Choisir la marque</option>
            {brandstate.map((i, j) => {
              return (
                <option key={j} value={i.name}>
                  {i.name}
                </option>
              );
            })}
          </Form.Select>
          <div className="error1">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <br />

          <Form.Select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            val={formik.values.category}
            aria-label="Default select example"
          >
            <option>Choisir la categorie</option>
            {categorystate.map((i, j) => {
              return (
                <option key={j} value={i.name}>
                  {i.name}
                </option>
              );
            })}
          </Form.Select>
          <div className="error1">
            {formik.touched.category && formik.errors.category}
          </div>
          <br />

          
          <Form.Select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            val={formik.values.tags}
            aria-label="Default select example"
          >
            <option disabled>Choisir la tags</option>
            <option value="populair">populair</option>
            <option value="spécial">spécial</option>
            <option value="mis en avant">mis en avant</option>
            
          </Form.Select>
          <div className="error1">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <br />
          
          <br />
          
          <Multiselect
    name="color"
    onChange={(value) => formik.setFieldValue("color", value)} // Mettez à jour les couleurs sélectionnées dans formik
    dataKey="_id"
    textField="color"
    data={colors}
    value={formik.values.color} // Utilisez la valeur des couleurs sélectionnées depuis formik
/>
          <div className="error1">
            {formik.touched.color && formik.errors.color}
          </div>
          <br />

          <Upload
            beforeUpload={beforeUpload}
            listType="picture"
            multiple
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: false,
            }}
          >
            <div className="error1">
              {formik.touched.images && formik.errors.images}
            </div>
            <br />
            <div className="container">
              <div className="row">
              {uploadstate.map((item, index) => (
    <div key={item.public_id} className="col-md-4 mb-3">
        <Card>
            <Card.Img variant="top" src={item.url} />
            <CloseCircleOutlined
                className="delete-icon"
                onClick={() => dispatch(deleteimg(item.public_id))}
            />
        </Card>
        <button onClick={() => dispatch(deleteimg(item.public_id))}>
            Supprimer
        </button>
    </div>
))}
              </div>
            </div>

            <Button icon={<UploadOutlined />}>Choisir des images</Button>
          </Upload>
          <Button type="submit" variant="outline-success" className="btn1">
            Ajouter produit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
