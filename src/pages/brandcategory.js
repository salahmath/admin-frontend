import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Customlogin from "../componentes/Coustomlogin";
import { useFormik } from "formik";
import { object, string, number, array, date, InferType } from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { creebrands } from "../feature/brand/brandslice";
import { useNavigate } from "react-router-dom";

function Addbrandcategory() {
  
let userSchema = object({
  name: string().required("il faut ecriver votre title"),
  
});

const brstate = useSelector((state)=>state.brand)
const dispatch = useDispatch();
const navigate = useNavigate()

const formik = useFormik({
  initialValues: {
    name: "",

  },

  validationSchema: userSchema,
  onSubmit: (values) => {
    dispatch(creebrands(values))
    formik.resetForm();
    setTimeout(() => {
      navigate("/admin/brand-list")
    }, 3000);   
   // alert(JSON.stringify(values));
  },
});
const { isSuccess, isError, isLoading , brands} = brstate;
useEffect(() => {
  if (isSuccess && brands) {
    toast.success('marque ajouté');
  }
  if (isError) {
    toast.error('Erreur lors de l\'ajout du marque');
  }

}, [isSuccess, isError, isLoading ]);


  return (
    <div>
      <h3 > ajouter une marque</h3>
      <br />
      <form onSubmit={formik.handleSubmit}>
      <Customlogin type="text" Label="ajout marque ici"  onChange={formik.handleChange("name")}
            onblur={formik.handleBlur("name")}
            val={formik.values.name}/>
      <br />
      <div className="error1">
            {formik.touched.name && formik.errors.name}
          </div>
      <Button type="submit" variant="outline-success">ajouter categorie</Button>
      </form>
    </div>
  );
}

export default Addbrandcategory;
