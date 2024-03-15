import { CloseCircleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Customlogin from "../componentes/Coustomlogin";

import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { Card } from "react-bootstrap"; // Importez le composant Card depuis react-bootstrap
import { useDispatch, useSelector } from "react-redux";
import { array, object, string } from "yup";
import { reset } from "../feature/brand/brandslice";

import "react-widgets/styles.css";

import {
  creeblogs,
  exporState,
  getablogs,
  updateablogs,
} from "../feature/blob/blobSlice";
import { getcategoryblog } from "../feature/bloglist/bloglistslice";
import { deleteimg, uploads } from "../feature/uploadimage/uploadslice";

function Addblog() {
  let userSchema = object({
    title: string().required("Veuillez saisir un titre."),
    description: string().required("Veuillez saisir une description."),
    category: string().required("Veuillez sélectionner une catégorie."),
    image: array().required("Veuillez ajouter au moins une image."),    
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uploadstate = useSelector((state) => state.upload.uploads);
  const categorystate = useSelector(
    (state) => state.category_blog.category_blog
  );
  const blstate = useSelector((state) => state.blog);

  const { isSuccess, isError, isLoading,blog, ismessage, blogr, blogs, ima,crblog,upblogs ,isupdated} =
    blstate;

  const img = [];
  uploadstate.forEach((i) => {
    img.push({
      url: i.url,
      public_id: i.public_id,
    });
  });

  const location = useLocation();
  const blogid = location.pathname.split("/")[3];
  useEffect(() => {
    if (blogid !== undefined) {
      dispatch(getablogs(blogid));
      
      formik.values.image = ima;
    } else {
      dispatch(exporState());
    }
  }, [blogid]);
  //correct
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogs.title || "",
      description: blogs.description || "",

      category: blogs.category || "",

      image: [],
    },

    validationSchema: userSchema,
    onSubmit: (values) => {
      if (blogid !== undefined) {
        const data = { id: blogid, data: values };
        dispatch(updateablogs(data));
      } else {
        dispatch(creeblogs(values));
      }

      //alert(JSON.stringify(values));
      setTimeout(() => {
        formik.resetForm();
        dispatch(exporState());
      }, 3000);
       alert(JSON.stringify(values));
    },
  });
  useEffect(() => {
    if (isSuccess && ismessage && crblog) {
      toast.success("La nouvelle blog a été ajoutée avec succès.");
    } 
    if (isError) {
      toast.error("Erreur lors de l'ajout du blog");
    }
  }, [isSuccess, isError, isLoading, ismessage, blog]);



  useEffect(() => {
    if (isSuccess && isupdated && upblogs) {
      toast.success("la blog a été mise à jour avec succès.");
    }
    if (isError) {
      toast.error("Erreur lors de l'ajout du blog");
    }
  }, [isSuccess, isError, isupdated, upblogs]);

  useEffect(() => {
    dispatch(getcategoryblog());
  }, [dispatch]);
  useEffect(() => {
    formik.values.image = img;
  }, [img]);
  const beforeUpload = (file, fileList) => {
    const maxFiles = 5;
    if (fileList.length > maxFiles) {
      console.log("Trop de fichiers sélectionnés. Limitez-vous à", maxFiles);
      return false;
    }

    // Dispatch votre action Redux pour gérer le téléchargement des fichiers
    dispatch(uploads(fileList));
    formik.setFieldValue("image", fileList);

    return false;
  };

  const afterUpload =( file,fileList) => {
   

    // Dispatch votre action Redux pour gérer le téléchargement des fichiers
    dispatch(uploads(fileList));
    formik.setFieldValue("image", fileList);

    return false;
  };
  return (
    <>
      <h2 className="ajout-blog text-center mb-4  ">
      {blogid !== undefined ? "Modifier le blog" : "Ajouter un nouveau blog"}

      </h2>
      <div className="mb-4">
        <Form onSubmit={formik.handleSubmit}>
          <Button type="submit" variant="outline-success" className="btn1">
            
          {blogid !== undefined ? "Modifier la blog" : "Ajouter une nouvelle blog"}

          </Button>
          <br />
          {blogid !== undefined ? (<Upload 
          
          beforeUpload={afterUpload}
          listType="picture"
          multiple
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: false,
          }}
        >
          <div className="error1">
            {formik.touched.image && formik.errors.image}
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

          <Button icon={<UploadOutlined />}>
          {blogid !== undefined ? "Modifier le image" : "Ajouter une nouveau image"}

          </Button>
        </Upload>): (<Upload 
          
          beforeUpload={beforeUpload}
          listType="picture"
          multiple
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: false,
          }}
        >
          <div className="error1">
            {formik.touched.image && formik.errors.image}
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

          <Button icon={<UploadOutlined />}>
          {blogid !== undefined ? "Modifier le image" : "Ajouter une nouveau image"}

          </Button>
        </Upload>)}
          
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
            value={formik.values.category}
            aria-label="Default select example"
          >
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

          <br />
        </Form>
      </div>
    </>
  );
}

export default Addblog;
