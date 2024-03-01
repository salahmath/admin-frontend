import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Customlogin from "../componentes/Coustomlogin";
import { useFormik } from "formik";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, array, date, InferType } from "yup";
import { creatcoleur } from "../feature/color/colorSlice";

function Addcolor() {
  
  let userSchema = object({
    name: string().required("il faut ajouter un couleur"),
   
  });
  const dispatch =useDispatch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",

    },
    
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(creatcoleur(values))
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/color-list")
      }, 3000);  
      //alert(JSON.stringify(values));
    },
  });
  const colorstate = useSelector((state) => state.coleur);

  const { isSuccess, isError, isLoading ,coleur} = colorstate;
  
  useEffect(() => {
    if (isSuccess && coleur) {
      toast.success('Product ajouté');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du produit');
    }
  }, [isSuccess, isError, isLoading]);
  
  
  return (
    <div>
      <h3 > ajouter une coleur</h3>
      <br />
      <form onSubmit={formik.handleSubmit}>
      <Customlogin type="color"   name="name"
            onChange={formik.handleChange("name")}
            onblur={formik.handleBlur("name")}
            val={formik.values.name}
          />

          <div className="error1">
            {formik.touched.name && formik.errors.name}
          </div>
          <br />
      <br />
      <Button type="submit" variant="outline-success">ajouter</Button>
      </form>
    </div>
  );
}

export default Addcolor;
