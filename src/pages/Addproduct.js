import React, { useEffect, useState } from "react";
import Customlogin from "../componentes/Coustomlogin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
//import { CloseCircleOutlined } from "@ant-design/icons";
import { IoCloseCircleOutline } from "react-icons/io5";

import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Upload } from "antd";
import { Card } from "react-bootstrap"; // Importez le composant Card depuis react-bootstrap
import { object, string, number, array, date, InferType } from "yup";
import { getbrands, reset } from "../feature/brand/brandslice";
import { useDispatch, useSelector } from "react-redux";
import {
  getcategories,
  resetstt,
} from "../feature/category-product/categorySlice";
import "react-widgets/styles.css";
import { getcoleur } from "../feature/color/colorSlice";
import Multiselect from "react-widgets/Multiselect";
import { deleteimg, resetsValy, uploads } from "../feature/uploadimage/uploadslice";
import {
  createProduct,
  getaProduct,
  updateaProduct,
} from "../feature/product/productSlice";
function Addproduct() {
  const userSchema = object({
    title: string().required("Il faut écrire votre titre"),
    description: string().required("Il faut écrire votre description"),
    price: number()
      .required("Il faut écrire votre prix")
      .min(1, "Le prix doit être au moins 1"),
    category: string().required("Il faut écrire la catégorie"),
    brand: string().required("Il faut écrire votre marque"),
    color: array().required("Il faut écrire votre couleur"),
    quantite: number()
      .required("Il faut écrire votre quantité")
      .min(1, "La quantité doit être au moins 1"),
    tags: string().required("Il faut écrire vos tags"),
    solde: number(),
  });
  
  /* 
 */

  const Productstate = useSelector((state) => state.product);
  const navigate = useNavigate();
  const brandstate = useSelector((state) => state.brand.brands);
  const categorystate = useSelector((state) => state.category.category);
  const colorstate = useSelector((state) => state.coleur.coleur);
  const uploadstate = useSelector((state) => state.upload.uploads);
  const dispatch = useDispatch();
  const {
    isSuccess,
    isError,
    isLoading,
    products,
    ismessage,
    get_aProduct,
    Image,
    isupdated,
  } = Productstate;

  const location = useLocation();
  const getproductid = location.pathname.split("/")[3];
  useEffect(() => {
    if (getproductid !== undefined) {
      dispatch(getaProduct(getproductid));
      formik.values.title = get_aProduct.title;
      formik.values.description = get_aProduct.description;
      formik.values.price = get_aProduct.price;
      formik.values.category = get_aProduct.category;
      formik.values.brand = get_aProduct.brand;
      formik.values.color = get_aProduct.color;
      formik.values.quantite = get_aProduct.quantite;
      formik.values.tags = get_aProduct.tags;
      formik.values.solde = get_aProduct.solde;

    } else {
      dispatch(resetstt());
    }
  }, [getproductid]);
  const [visible , setVisible]=useState(false)
  const img = [];
  const [valeurimage, setValeurimage] = useState([]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: get_aProduct.title || "",
      description: get_aProduct.description || "",
      price: get_aProduct.price || "",
      category: get_aProduct.category || "",
      brand: get_aProduct.brand || "",
      color: get_aProduct.color || [],
      quantite: get_aProduct.quantite || "",
      tags: get_aProduct.tags || "",
      solde: get_aProduct.solde || "",
      images: [],
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      /* if (getproductid !== undefined) {
        const data = { id: getproductid, data: values };
        if (formik?.values?.color?.length === 0) {
          toast.error('Il faut choisir une couleur');
          return false;
        } else if (valeurimage?.length === 0) {
          toast.error('Désoler, ilya un erreur');
          return false;
        } else {
          dispatch(updateaProduct(data)).then(() => {
            setTimeout(() => {
              dispatch(resetstt());
              navigate("/admin/product-list");
            }, 1000);
          });
        }
      } else {
        if (formik.values.color.length === 0) {
          toast.error('Il faut choisir une couleur');
          return false;
        } else if (valeurimage.length === 0) {
          toast.error('Il faut choisir 4 images');
          return false;

        } else {
          dispatch(createProduct(values)).then(() => {
            setTimeout(() => {
              dispatch(resetstt());
              setValeurimage([])
              navigate("/admin/product-list");
            }, 1000);
          });
        }
      }
    
      formik.resetForm(); */
       alert(JSON.stringify(values));
    },
    
  });
  useEffect(() => {
    // Réinitialiser l'état des images et les valeurs de Formik lors de l'ajout d'un nouveau produit
    if (!getproductid) {
      setValeurimage([]);
      formik.resetForm();
      dispatch(resetsValy())
    }
  }, [getproductid]);
  useEffect(() => {
    if (Image?.length > 0) {
      Image?.forEach((i) => {
        img.push({
          url: i?.url,
          public_id: i?.public_id,
        });
      });
    } else {
      uploadstate?.forEach((i) => {
        img.push({
          url: i?.url,
          public_id: i?.public_id,
        });
      });
    }
    formik.setFieldValue("images", img);
    setValeurimage(img);
  }, [Image, uploadstate]);
  useEffect(() => {
    dispatch(getbrands());
    dispatch(getcategories());
    dispatch(getcoleur());
  }, [dispatch]);
  const getColorName = (hex) => {
    const convert = require("color-convert");
    const rgb = convert.hex.rgb(hex);
    const colorName = convert.rgb.keyword(rgb);
    return colorName || hex; // Si aucune correspondance trouvée, retourne le code hexadécimal
  };
  const colors = colorstate.map((color) => ({
    _id: color._id,
    color: color.name,
  }));
console.log(valeurimage);
  const beforeUpload = (file, fileList) => {
    const expectedFiles = 4; // Nombre d'images attendues
    if (fileList?.length !== expectedFiles) {
      toast.error('Veuillez choisir exactement 4 images');
      return false;
    }
    dispatch(uploads(fileList));
    formik.setFieldValue("images", fileList);
    return false;
  };
 
  useEffect(() => {
    // Update the visibility based on formik.values.tags
    setVisible(formik.values.tags === "En solde");
  }, [formik.values.tags]); 
  useEffect(() => {
    if (isSuccess && isupdated && get_aProduct) {
      toast.success("la blog a été mise à jour avec succès.");
    }
    if (isError) {
      toast.error("Erreur lors de l'ajout du produit");
    }
  }, [isSuccess, isError, isLoading, isupdated, get_aProduct]);
console.log(valeurimage);
  return (
    <div className="mb-4">
    <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
      <div>
        <h3>
          {" "}
          {getproductid !== undefined
            ? "Modifier le produit"
            : "Ajouter un produit"}
        </h3>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <Customlogin
            type="text"
            Label="Entrer le titre"
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
            placeholder="Entrer la description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error1">
            {formik.touched.description && formik.errors.description}
          </div>
          <br />
          <Customlogin
            type="Number"
            Label="Entrer le prix DT"
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
            Label="Entrer la quantiter"
            name="quantite"
            onChange={formik.handleChange("quantite")}
            onblur={formik.handleBlur("quantite")}
            val={formik.values.quantite}
          />
          <div className="error1">
            {formik.touched.quantite && formik.errors.quantite}
          </div>
          <br />
          <Form.Select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            aria-label="Default select example"
          >
            <option>Choisir la marque</option>
            {brandstate?.map((i, j) => {
              return (
                <option key={j} value={i?.name}>
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
            value={formik.values.category}
            aria-label="Default select example"
          >
            <option>Choisir la categorie</option>
            {categorystate?.map((i, j) => {
              return (
                <option key={j} value={i?.name}>
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
            value={formik.values.tags}
            aria-label="Default select example"
          >
            <option>Choisir la tags</option>
            <option value="populair">populair</option>
            <option value="spécial">spécial</option>
            <option value="En solde">En solde</option>
            <option value="mis en avant">mis en avant</option>
          </Form.Select>
          <div className="error1">
            {formik.touched.tags && formik.errors.tags}

          </div>
          <br />

          <br />
          <Form.Select
  label="Select Color"
  name="color"
  value={formik.values.color || []} // Assurez-vous que c'est un tableau
  onChange={(e) => {
    const selectedColor = colors.find(color => color._id === e.target.value);
    formik.setFieldValue("color", [{ id: e.target.value, color: selectedColor.color }]);
  }} // Modifiez la valeur pour qu'elle soit un tableau d'objets
  onBlur={() => formik.setFieldTouched("color", true)}
>
<option>Choisir un couleur</option>
  {colors.map((color) => (
    <option key={color._id} value={color._id}>
      {getColorName(color.color)}
    </option>
  ))}
</Form.Select>

          {/* <Multiselect
  name="color"
  onChange={(value) => formik.setFieldValue("color", value)}
  dataKey="_id"
  textField={(item) => getColorName(item.color)} // Utiliser la fonction getColorName pour obtenir le nom de la couleur
  data={colors}
  value={formik.values.color}
/> */}
<div className="error1">
  {formik.touched.color && formik.errors.color}
</div>


          <br />
          {visible === true ? (
        <>
          <Customlogin
            type="text"
            Label="Entrer le prix de solde"
            name="solde"
            onChange={formik.handleChange("solde")}
            onBlur={formik.handleBlur("solde")}
            val={formik.values.solde} // corrected prop name
          />
          <div className="error1">
            {formik.touched.solde && formik.errors.solde}
          </div>
          <br />
        </>
      ) : (
        ""
      )}
    

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
              {formik?.touched?.images && formik?.errors?.images}
            </div>
            <br />
            <div className="container">
              <div className="row">
                {getproductid !==undefined ? (valeurimage?.map((item, index) => (
                  <div key={item?.public_id} className="col-md-4 mb-3">
                    <Card>
                      <Card.Img variant="top" src={item?.url} />
                     {/*  <CloseCircleOutlined
                        className="delete-icon"
                        onClick={() => dispatch(deleteimg(item.public_id))}
                      /> */}
                    </Card>
                    {/* <button onClick={() => dispatch(deleteimg(item.public_id))}>
                      Supprimer
                    </button> */}
                  </div>
                ))
                ):(uploadstate?.map((item, index) => (
                  <div key={item?.public_id} className="col-md-4 mb-3">
                    <Card>
                      <Card.Img variant="top" src={item?.url} />
                      <IoCloseCircleOutline
                        className="delete-icon"
                        onClick={() => dispatch(deleteimg(item.public_id))}
                      />
                    </Card>
                    <button onClick={() => dispatch(deleteimg(item.public_id))}>
                      Supprimer
                    </button>
                  </div>
                ))
                )
                }
              </div>
            </div>

            <Button >Choisir des images</Button>
          </Upload>
          <Button type="submit" variant="outline-success" className="btn1">
            {getproductid !== undefined
              ? "Modifier le produit"
              : "Ajouter un produit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
