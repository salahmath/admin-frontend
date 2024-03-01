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
          <Route path='list-blog' element={<Bloglist/>}/>
          <Route path='blog-category-list' element={<BlogcategoryList/>}/>
          <Route path='product-list' element={<Productlist/>}/>
          <Route path='product' element={<Addproduct/>}/>
          <Route path='brand-list' element={<Brandlist/>}/>
          <Route path='brand' element={<Addbrandcategory/>}/>
          <Route path='category-list' element={<Categorylist/>}/>
          <Route path='category' element={<Addcategory/>}/>
          <Route path='color' element={<Addcolor/>}/>
          <Route path='color-list' element={<Colorlist/>}/>
          <Route path='list-fournisseur' element={<Fournisseurlist/>}/>
          <Route path='Add-blog' element={<Addblog/>}/>
          <Route path='blog-category' element={<Addblogcategory/>}/>
          <Route path='customers' element={<Client/>}/>
          <Route path='order' element={<Orderlist/>}/>

        
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
