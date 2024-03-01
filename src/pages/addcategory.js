import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Customlogin from "../componentes/Coustomlogin";
import { useFormik } from "formik";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, array, date, InferType } from "yup";
import { creecategories } from "../feature/category-product/categorySlice";

function Addcategory() {
  let userSchema = object({
    name: string().required("il faut ecriver votre title"),

  });
  const categorystate = useSelector((state) => state.category);
const navigate = useNavigate()
const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    
    validationSchema: userSchema,
    onSubmit: (values) => {
     dispatch(creecategories(values))
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/category-list")
      }, 3000);   
      /* alert(JSON.stringify(values)); */
    },
  });
  
  const { isSuccess, isError, isLoading ,category} = categorystate;
  
  useEffect(() => {
    if (isSuccess && category) {
      toast.success('category ajouté');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du category');
    }
  }, [isSuccess, isError, isLoading]);
  
  
  return (
    <div>
      <h3 > ajouter une categorie</h3>
      <br />
      <form onSubmit={formik.handleSubmit}>
      <Customlogin  name="name"
            onChange={formik.handleChange("name")}
            onblur={formik.handleBlur("name")}
            val={formik.values.name} type="text" Label="ajout categorie ici" />
            <div className="error1">
            {formik.touched.name && formik.errors.name}
          </div>
      <br />
      <Button type="submit" variant="outline-success" className="btn1">ajouter</Button>
      </form>
    </div>
  );
}

export default Addcategory;
