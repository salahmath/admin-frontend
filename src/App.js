import React from 'react'
import Mainlyout from './componentes/mainlyout'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Resetpassword from './pages/resetpassword'
import Forgotpassword from './pages/forgotpassword'
import Dashbord from './pages/dashbord'
import Enquiries from './pages/Enquiries'
import Bloglist from './pages/bloglist'
import BlogcategoryList from './pages/blogcategorylist'
import Productlist from './pages/productlist'
import Brandlist from './pages/brandlist'
import Categorylist from './pages/categorylist'
import Colorlist from './pages/colorlist'
import Fournisseurlist from './pages/fournisseurlist'
import Addblog from './pages/addblog'
import Addblogcategory from './pages/addblogcategory'
import Addbrandcategory from './pages/brandcategory'
import Addcategory from './pages/addcategory'
import Addcolor from './pages/addcolor'
import Addproduct from './pages/Addproduct'
import Client from './pages/clients'
import Orderlist from './pages/order'
import Couponadded from './pages/addcoupon'
import Couponlist from './pages/couponlist'
import Alert from './pages/Alert'
import Views from './pages/Views'
import Prf from './pages/Profil'
import Vieworder from './pages/Vieworder'
import Addfournisseur from './pages/Addfournisseur'
import Addproductqr from './pages/Addproductqr'
import Profil from './pages/Profil'
import InvoicePage from './pages/facure'
import Enquiry from './pages/Enquiry'
import Viewenq from './pages/Viewenq'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path='/admin' element={<Mainlyout />}>
          <Route index element={<Dashbord />} /> {/* Tableau de bord */}
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='enquiries/:id' element={<Enquiries />} />
          <Route path='list-blog' element={<Bloglist/>}/>
          <Route path='blog-category-list' element={<BlogcategoryList/>}/>
          <Route path='product-list' element={<Productlist/>}/>
          <Route path='product' element={<Addproduct/>}/>
          <Route path='product/:id' element={<Addproduct/>}/>
          <Route path='brand-list' element={<Brandlist/>}/>
          <Route path='brand' element={<Addbrandcategory/>}/>
          {/* <Route path='brand/:id' element={<Alert/>}/> */}
          <Route path='brand/:id' element={<Addbrandcategory/>}/>
          <Route path='list-coupon' element={<Couponlist/>}/>
          <Route path='add-coupon' element={<Couponadded/>}/>
          <Route path='add-coupon/:id' element={<Couponadded/>}/>
          <Route path='category-list' element={<Categorylist/>}/>
          <Route path='category' element={<Addcategory/>}/>
          <Route path='category/:id' element={<Addcategory/>}/>
          <Route path='color' element={<Addcolor/>}/>
          <Route path='color/:id' element={<Addcolor/>}/>
          <Route path='color-list' element={<Colorlist/>}/>
          <Route path='list-fournisseur' element={<Fournisseurlist/>}/>
          <Route path='add-fournisseur' element={<Addfournisseur/>}/>
          <Route path='Add-blog' element={<Addblog/>}/>
          <Route path='Add-blog/:id' element={<Addblog/>}/>
          <Route path='blog-category' element={<Addblogcategory/>}/>
          <Route path='blog-category/:id' element={<Addblogcategory/>}/>
          <Route path='customers' element={<Client/>}/>
          <Route path='order' element={<Orderlist/>}/>
          <Route path='vieworder/:id/:id' element={<Vieworder/>}/>
         {/*  <Route path='profil/:id' element={<Profil/>}/> */}
          <Route path='facture' element={<InvoicePage/>}/>
          <Route path='Enquiry' element={<Enquiry/>}/>
          {/* <Route path='add-product-qr' element={<Addproductqr/>}/> */}
          <Route path='add-fournisseur/:id' element={<Addfournisseur/>}/>
          <Route path='viewenq/:id' element={<Viewenq/>}/>
          

        
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
