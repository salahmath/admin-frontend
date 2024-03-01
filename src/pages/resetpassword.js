import React from 'react';
import CustomLogin from '../componentes/Coustomlogin';
function Resetpassword() {
  return (
      <>

      <div className='py-5' style={{background: "#9c9a4c" , minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
       
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
          <h3 className='text-center'>oublier mot de passe</h3>
          <p className='text-center'>vous avez oublier votre mot de passe?</p>
          <form>
            <CustomLogin type="password" Label="nouveau mot de passer" id="pass" />
            <br/>
             <CustomLogin type="password" Label="confirmer votre mot de passe" id="confirmpass" />
           <br/>
            <button className='border-0 px-3 py-2 text-white fw-bold w-100' style={{background:"#494b18"}}>
              reinstaller
            </button>
          </form>
        </div>
      </div>
    </>
  )
}


export default Resetpassword