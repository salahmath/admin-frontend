import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Customlogin from "../componentes/Coustomlogin";
import { useFormik } from "formik";
import {  useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, array, date, InferType } from "yup";
import { creatcoleur } from "../feature/color/colorSlice";
import { creecategoryblog, exportState, getacategoryblog, updatecategoryblog } from "../feature/bloglist/bloglistslice";
import { updateablogs } from "../feature/blob/blobSlice";

function Addblogcategory() {
    
  let userSchema = object({
    name: string().required("Veuillez saisir une categorie."),
   
  });
  const dispatch =useDispatch();
  const navigate = useNavigate()
const location = useLocation()
const catid = location.pathname.split("/")[3]
const blogstate = useSelector((state) => state.category_blog);

  const { isSuccess, isError,ismessage, isLoading,isupdated ,category ,categoryl} = blogstate;

  const formik = useFormik({
    initialValues: {
      name: "",

    },
    
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(catid!==undefined){
        const data={id :catid , data:values}
      dispatch(updatecategoryblog(data))
      
      }else{ 
        dispatch(creecategoryblog(values))

      }
      formik.resetForm();
      setTimeout(() => {
       dispatch(exportState())
      }, 3000);   
      /* alert(JSON.stringify(values)); */
    },
  });

  useEffect(()=>{
    if(catid!==undefined){
          dispatch(getacategoryblog(catid)).then((response) => {
            const { name } = response.payload;
            formik.setValues({name});
            
          });
    }else{
      dispatch(exportState())
    }
   },[catid])

   useEffect(() => {
    if (category && isSuccess && ismessage) {
      toast.success('La nouvelle categorie a été ajoutée avec succès.');
      
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du produit');
    }
}, [isSuccess, isError, category,ismessage]);
useEffect(() => {
  if ( isSuccess && isupdated && categoryl) {
    toast.success('la categorie a été mise à jour avec succès.');
    
  }
  if (isError) {
    toast.error('Erreur lors de l\'ajout du produit');
  }
}, [isSuccess, isError, category,categoryl,isupdated]);

  
  return (
    <div>
      <h3 >{catid!==undefined ?"Modifier la categorie":"Ajouter une categorie"} une categorie de blog</h3>
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
      <Button type="submit" variant="outline-success">{catid!==undefined ?"Modifier la categorie":"Ajouter une categorie"}  categorie</Button>
      </form>
    </div>
  );
}

export default Addblogcategory;
