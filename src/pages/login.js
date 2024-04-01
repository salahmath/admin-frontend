import React, { useEffect } from 'react';
import CustomLogin from '../componentes/Coustomlogin'; // Assurez-vous que le chemin d'importation est correct
import {Link, useNavigate}from"react-router-dom"
import { useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import { login } from '../feature/auth/authslice';
import { useDispatch, useSelector } from 'react-redux';
const  Login=()=>{
  const Dispatch = useDispatch();
  const navigate  = useNavigate();
  const {user , isLogin , isSuccess , isError , message}=useSelector(
    (state)=> state.auth
  )
  useEffect(()=>{
if(user!=="null" && isSuccess ){
  navigate("admin")
}else{
  navigate("")
}
  },[user,isLogin , isSuccess , isError , message,navigate])
  let userSchema = object({

    email: string().email('il faut ecriver un email validé').required("il faut ecriver votre email"),
    password: string().required("il faut ecriver votre mot de passe"),
  });
  const formik = useFormik({
   
    initialValues: { 
      
      email: '',
      password:''
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      Dispatch(login(values))
    },
  });
 
  return (
    <>
      <div className='py-5' style={{background: "#9c9a4c" , minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
       
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
          <h3 className='text-center'>se connecter</h3>
          <p className='text-center'>connecter a son compte</p>
          {message.message == "rejected" ? "you are not admin": ""}
          <form onSubmit={formik.handleSubmit}>
            <CustomLogin type="text" name='email'id="email" val={formik.values.email} Label="adresse email"  onChange={formik.handleChange('email')}/>
            <br/>
            <div className='error'>
            {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
            </div>
            <CustomLogin type="password" name='password' id="password" Label="votre mot de passe"  val={formik.values.password} onChange={formik.handleChange('password')}/>
            <br/>
            <div className='error'>
            {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}
            </div>
            <div className='mb-3 text-end'><Link   to ='/forgot-password' >
            oublier votre mot de passe?</Link>
            </div>
            <button 
             className='border-0 px-3 py-2 text-white fw-bold w-100 ' style={{background:"#494b18"}} type='submit'>
              connecter
            </button>
           
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
