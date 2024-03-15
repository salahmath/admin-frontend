import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Customlogin from "../componentes/Coustomlogin";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getabrand, reset, creebrands, updatebrand } from "../feature/brand/brandslice"; 
import { useLocation, useNavigate } from "react-router-dom";

function Addbrandcategory() {

  const brstate = useSelector((state) => state.brand);
  const { isSuccess, isError,  ismessage,isupdate, brands, brandName ,updatebrands } = brstate;

  const location = useLocation();
  const getbrandid = location.pathname.split("/")[3];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSchema = object({
name: string().required("Veuillez saisir un titre."),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      if (getbrandid !== undefined) {
        const data = { id: getbrandid, databrand: values };
        dispatch(updatebrand(data))
          .then(() => {
            formik.resetForm();
            dispatch(reset());
          })
          .catch((error) => {
            console.error("Erreur lors de la mise à jour de la marque :", error);
            // Gérer l'erreur
          });
      } else {
        dispatch(creebrands(values))
          .then(() => {
            formik.resetForm();
            dispatch(reset());
          })
          .catch((error) => {
            console.error("Erreur lors de la création de la marque :", error);
            // Gérer l'erreur
          });
      }
    },
  });
  

  useEffect(() => {
    if (getbrandid !== undefined) {
      dispatch(getabrand(getbrandid));
    } else {
      dispatch(reset());
    }
  }, [getbrandid]);
  
  useEffect(() => {
    if (brandName) {
      formik.setValues({ ...formik.values, name: brandName });
    }
  }, [brandName]);
  

  useEffect(() => {
    if (isSuccess && updatebrands&& isupdate) {
      toast.success('la marque a été mise à jour avec succès.');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout de la marque');
    }
  }, [isSuccess, isError,updatebrands,isupdate]);

  useEffect(() => {
    if (isSuccess && ismessage && brands) {
      toast.success('La nouvelle marque a été ajoutée avec succès.');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout de la marque');
    }
  }, [isSuccess, isError, ismessage,brands]);


  return (
    <div>
      <div>
      {getbrandid !== undefined ? "Modifier la marque" : "Ajouter une nouvelle marque"}
        <br />
        <form onSubmit={formik.handleSubmit}>
          <Customlogin
            type="text"
            Label= {"Ajouter la marque ici :"}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <br />
          <div className="error1">
            {formik.touched.name && formik.errors.name}
          </div>
          <Button type="submit" variant="outline-success">
          {getbrandid !== undefined ? "Modifier la marque" : "Ajouter une nouvelle marque"}

          </Button>
        </form>
      </div>
     
    </div>
  );
}

export default Addbrandcategory;
