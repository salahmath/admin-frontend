import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Customlogin from "../componentes/Coustomlogin";
import { useFormik } from "formik";
import {  useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, array, date, InferType } from "yup";
import { creatcoleur, getacoleur, updateacoleur } from "../feature/color/colorSlice";
import { resetstt } from "../feature/category-product/categorySlice";

function Addcolor() {
  
  let userSchema = object({
    name: string().required("il faut ajouter un couleur"),
   
  });
  const location = useLocation()
  const getidcolor = location.pathname.split("/")[3]
  const dispatch =useDispatch();
  const navigate = useNavigate()
  const colorstate = useSelector((state) => state.coleur);

  const { isSuccess, isError, isLoading , coleur,isupdated , ismessage ,couleurs, coleurs} = colorstate;
  
useEffect((values)=>{
  if(getidcolor!==undefined){
  dispatch(getacoleur(getidcolor))
  formik.values.name = couleurs;
  
  }else{
    dispatch(resetstt())

  }
},[couleurs])


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      
        name:coleurs || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(getidcolor!==undefined){ 
        const data={id: getidcolor , name: values }
        dispatch(updateacoleur(data))
      }else{
        dispatch(creatcoleur(values));
      
      }

        setTimeout(() => {
            formik.resetForm();
            dispatch(resetstt())

            //navigate("/admin/color-list");
        }, 3000);
    }
});


  useEffect(() => {
    if (isSuccess && coleur   && ismessage) {
      toast.success('La nouvelle coleur a été ajoutée avec succès.');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du produit');
    }
  }, [isSuccess, isError, isLoading,ismessage]);
  
  useEffect(() => {
    if (isSuccess && coleurs   && isupdated) {
      toast.success('la coleur a été mise à jour avec succès.');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du produit');
    }
  }, [isSuccess, isError, isLoading,isupdated,coleurs]);
  
  
  return (
    <div>
      <h3 > {getidcolor!==undefined ?  "Modifier la coleur" :"Ajouter un couleur" } </h3>
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
      <Button type="submit" variant="outline-success">{getidcolor!==undefined ?  "Modifier le coleur" :"Ajouter un coleur" } </Button>
      </form>
    </div>
  );
}

export default Addcolor;
