import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Customlogin from "../componentes/Coustomlogin";
import { useFormik } from "formik";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, array, date, InferType } from "yup";
import { creatcoleur } from "../feature/color/colorSlice";
import { creecategoryblog } from "../feature/bloglist/bloglistslice";

function Addblogcategory() {
    
  let userSchema = object({
    name: string().required("il faut ajouter un category"),
   
  });
  const dispatch =useDispatch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",

    },
    
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(creecategoryblog(values))
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/blog-category-list")
      }, 3000);   
      /* alert(JSON.stringify(values)); */
    },
  });
  const blogstate = useSelector((state) => state.category_blog);

  const { isSuccess, isError, isLoading ,category_blog} = blogstate;
  
  useEffect(() => {
    if (isSuccess && category_blog) {
      toast.success('Product ajouté');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du produit');
    }
  }, [isSuccess, isError, isLoading]);
  
  return (
    <div>
      <h3 > ajouter une categorie de blog</h3>
      <br />
      <form onSubmit={formik.handleSubmit}>
      <Customlogin type="text" Label="ajout categorie ici" name="name"
            onChange={formik.handleChange("name")}
            onblur={formik.handleBlur("name")}
            val={formik.values.name} />
            <div className="error1">
            {formik.touched.name && formik.errors.name}
          </div>
      <br />
      <Button type="submit" variant="outline-success">ajouter categorie</Button>
      </form>
    </div>
  );
}

export default Addblogcategory;
