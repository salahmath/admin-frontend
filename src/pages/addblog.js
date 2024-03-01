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

import "react-widgets/styles.css";


import { deleteimg, uploads } from "../feature/uploadimage/uploadslice";
import { getcategoryblog } from "../feature/bloglist/bloglistslice";
import { creeblogs } from "../feature/blob/blobSlice";


function Addblog() {

  let userSchema = object({
    title: string().required("il faut ecriver votre title"),
    description: string().required("il faut ecriver votre description"),
    
    category: string().required("il faut ecriver category"),
    
    
    images: array().required("il faut ecriver votre img"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
     
      category: "",
    
      images: [],
    },
    
    validationSchema: userSchema,
    onSubmit: (values) => {
     dispatch(creeblogs(values))
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-blog")
      }, 3000);   
      //alert(JSON.stringify(values));
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const uploadstate = useSelector((state) => state.upload.uploads);
  const categorystate = useSelector((state) => state.category_blog.category_blog);
  const blstate = useSelector((state) => state.blog);
  
  const { isSuccess, isError, isLoading , blog} = blstate;
  
  useEffect(() => {
    if (isSuccess && blog) {
      toast.success('blog ajouté');
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
    dispatch(getcategoryblog());
   
  }, [dispatch]);
  useEffect(() => {
    formik.values.images = img;

  }, [img]);
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
    <>
      <h2 className="ajout-blog text-center mb-4  ">ajouter une blog</h2>
      <div className="mb-4">

        <Form onSubmit={formik.handleSubmit}>
        <Button type="submit" variant="outline-success" className="btn1">Ajouter</Button>
        <br/>
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
      <br></br>
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


          <Form.Select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            val={formik.values.category}
            aria-label="Default select example"
          >
            <option>Choisir la marque</option>
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
       
<br/>

        </Form>
      </div>
    </>
  );
}

export default Addblog;
