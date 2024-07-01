import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Customlogin from "../componentes/Coustomlogin";
import { useFormik } from "formik";
import {  useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { object, string, number, array, date, InferType } from "yup";
import { creecategories, getacategories, resetstt, updatecategorie } from "../feature/category-product/categorySlice";

function Addcategory() {

  let userSchema = object({
    name: string().required("Veuillez saisir un category."),

  });
  const categorystate = useSelector((state) => state.category);
  const { isSuccess, isError, isLoading ,category , ismessage,isupdeted  , categorys} = categorystate;

const navigate = useNavigate()
const dispatch = useDispatch()
const location = useLocation()
const loca = location.pathname.split("/")[3]



  const formik = useFormik({
    initialValues: {
      name: "",
    },
    
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(loca!==undefined){
        const data = {id:loca , data:values}
        dispatch(updatecategorie(data))
      }else{
        dispatch(creecategories(values))
      }
     
      formik.resetForm();
      setTimeout(() => {
      navigate("/admin/category-list");
        
        dispatch(resetstt())
      }, 3000);   
      /* alert(JSON.stringify(values)); */
    },
  });
  useEffect(()=>{
    if(loca!==undefined){
    dispatch(getacategories(loca))
     formik.values.name = categorys;
     
     
    }else{
      dispatch(resetstt())
    }
  },[categorys])
  
  useEffect(() => {
    if (isSuccess && category && ismessage) {
      toast.success('La nouvelle category a été ajoutée avec succès.');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du category');
    }
  }, [isSuccess, isError, isLoading,ismessage ]);


  useEffect(() => {
   if (isSuccess && isupdeted && categorys) {
      toast.success('la category a été mise à jour avec succès.');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du category');
    }
  }, [isSuccess, isError, isLoading,isupdeted ]);
  
  
  return (
    <div>
      <h3 > {(loca!==undefined)?"Modifier le category":"Ajouter une categorie"} </h3>
      <br />
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
      <form onSubmit={formik.handleSubmit}>
      <Customlogin  name="name"
            onChange={formik.handleChange("name")}
            onblur={formik.handleBlur("name")}
            val={formik.values.name} type="text" Label="ajout categorie ici" />
            <div className="error1">
            {formik.touched.name && formik.errors.name}
          </div>
      <br />
      <Button type="submit" variant="outline-success" className="btn1">{(loca!==undefined)?"Modifier une category":"Ajouter une category"} </Button>
      </form>
    </div>
  );
}

export default Addcategory;
