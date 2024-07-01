import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { object, string } from 'yup';
import CustomLogin from '../componentes/Coustomlogin'; // Assurez-vous que le chemin d'importation est correct
import { login } from '../feature/auth/authslice';
const  Login=()=>{
  const Dispatch = useDispatch();
  const navigate  = useNavigate();
  const {user , isLogin , isSuccess , isError , message}=useSelector(
    (state)=> state.auth
  )
  useEffect(()=>{
if(user!=="null" && isSuccess ){
  setTimeout(() => {
  navigate("admin")
  }, 1000);
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
      <div className='py-5' style={{background: "#9c9a4c" , minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
       
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
          <h3 className='text-center'>se connecter</h3>
          <p className='text-center'>connecter a son compte</p>
         
          <form onSubmit={formik.handleSubmit}>
            <CustomLogin type="text" name='email'id="email" val={formik.values.email} Label="Adresse email"  onChange={formik.handleChange('email')}/>
            <br/>
            <div className='error'>
            {formik.touched.email && formik.errors.email }
            </div>
            <CustomLogin type="password" name='password' id="password" Label="votre mot de passe"  val={formik.values.password} onChange={formik.handleChange('password')}/>
            <br/>
            <div className='error'>
            {formik.touched.password && formik.errors.password }
            </div>
           
            <button 
             className='border-0 px-3 py-2 text-white fw-bold w-100 ' style={{background:"#494b18"}} type='submit'>
              Connecter
            </button>
           
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
