import { useFormik } from "formik";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { object, string, number } from "yup";
import { crefournisseur, exportesState, getefournisseur, updfournisseur } from "../feature/list-fournisseur/fournisseurSlice";
import Customlogin from "../componentes/Coustomlogin";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { exporState } from "../feature/blob/blobSlice";

function Addfournisseur() {
  // Define validation schema using Yup
  const userSchema = object({
    lastname: string().required("Veuillez saisir un titre."),
    Secondname: string().required("Veuillez saisir une description."),
    email: string().email("Veuillez saisir une adresse email valide.").required("Veuillez saisir une adresse email."),
    mobile: number().required("Veuillez ajouter un numéro de mobile.").test('len', 'Must be exactly 8 characters', val => val.toString().length === 8)


  
  });

  const dispatch = useDispatch();
  const fostate = useSelector((state)=>state.fournisseur)
  const { get_fournisseur , ismessage,isError ,isSuccess, isupdated} =
  fostate;
  const location = useLocation();
  const foid = location.pathname.split("/")[3];
  useEffect(()=>{
    if(foid!==undefined){
    dispatch(getefournisseur(foid))
    formik.values.lastname = get_fournisseur.lastname;
    formik.values.email = get_fournisseur.email;
    formik.values.mobile = get_fournisseur.mobile;
    formik.values.Secondname = get_fournisseur.Secondname;
    }else{
      dispatch(exportesState());
    }
      },[foid])
  // Initialize formik hook
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      email: get_fournisseur.email || "" ,
      lastname: get_fournisseur.lastname || "" ,
      Secondname: get_fournisseur.Secondname || "" ,
      mobile: get_fournisseur.mobile || "" ,
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (foid!==undefined){
        const data = {id:foid , data:values}
        dispatch(updfournisseur(data))
      }
      else{
        dispatch(crefournisseur(values));
      }
      setTimeout(() => {
      navigate("/admin/list-fournisseur");
        formik.resetForm();
        dispatch(exportesState());
      }, 3000);
      // Do any other actions upon form submission
    },
  });
 
  useEffect(() => {
    if (isSuccess && ismessage && get_fournisseur) {
      toast.success("La nouvelle fournisseur a été ajoutée avec succès.");
    } 
    if (isError) {
      toast.error("Erreur lors de l'ajout du blog");
    }
  }, [isSuccess, isError, ismessage]);



  useEffect(() => {
    if (isSuccess && isupdated && get_fournisseur) {
      toast.success("la fournisseur a été mise à jour avec succès.");
    }
    if (isError) {
      toast.error("Erreur lors de l'ajout du blog");
    }
  }, [isSuccess, isError, isupdated, get_fournisseur]);



  return (
    <>
      <h2 className="ajout-blog text-center mb-4">Ajouter un nouveau fournisseur</h2>
      <div className="mb-4">
        <Form onSubmit={formik.handleSubmit}>
          {/* Customlogin component for lastname */}
          <Customlogin
            type="text"
            Label="Entrer votre nom"
            name="lastname"
            onChange={formik.handleChange("lastname")}
            onBlur={formik.handleBlur("lastname")}
            val={formik.values.lastname}
          />
          {/* Display error message if lastname field is touched and has error */}
          {formik.touched.lastname && formik.errors.lastname && <div className="error1">{formik.errors.lastname}</div>}
          <br />
          {/* Customlogin component for Secondname */}
          <Customlogin
            type="text"
            Label="Entrer votre prenom"
            name="Secondname"
            onChange={formik.handleChange("Secondname")}
            onBlur={formik.handleBlur("Secondname")}
            val={formik.values.Secondname}
          />
          {/* Display error message if Secondname field is touched and has error */}
          {formik.touched.Secondname && formik.errors.Secondname && <div className="error1">{formik.errors.Secondname}</div>}
          <br />
          {/* Customlogin component for email */}
          <Customlogin
            type="text"
            Label="Entrer votre email"
            name="email"
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            val={formik.values.email}
          />
          {/* Display error message if email field is touched and has error */}
          {formik.touched.email && formik.errors.email && <div className="error1">{formik.errors.email}</div>}
          <br />
          {/* Customlogin component for mobile */}
          <Customlogin
            type="number"
            Label="Entrer votre mobile"
            name="mobile"
            onChange={formik.handleChange("mobile")}
            onBlur={formik.handleBlur("mobile")}
            val={formik.values.mobile}
          />
          {/* Display error message if mobile field is touched and has error */}
          {formik.touched.mobile && formik.errors.mobile && <div className="error1">{formik.errors.mobile}</div>}
          <br />
          {/* Button to submit the form */}
          <Button type="submit" variant="outline-success">Ajouter un fournisseur</Button>
        </Form>
      </div>
    </>
  );
}

export default Addfournisseur;
