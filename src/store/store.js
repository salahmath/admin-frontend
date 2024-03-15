import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authslice";
import customerReducer from "../feature/customrs/customerslice";
import productReducer from "../feature/product/productSlice";
import blogReducer from "../feature/blob/blobSlice";
import brandReducer from "../feature/brand/brandslice";
import CategoryReducer from "../feature/category-product/categorySlice";
import colorReducer from "../feature/color/colorSlice";
import fournisseurReducer from "../feature/list-fournisseur/fournisseurSlice";
import blogcategoryReducer from "../feature/bloglist/bloglistslice";
import enquiryReducer from "../feature/enquiry/enquiryslice"; 
import uploadReducer from "../feature/uploadimage/uploadslice"
import couponReducer from "../feature/coupon/couponslice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    blog: blogReducer,
    brand: brandReducer,
    category: CategoryReducer,
    coleur : colorReducer,
    fournisseur : fournisseurReducer,
    category_blog : blogcategoryReducer,
    enquiry : enquiryReducer,
    upload :uploadReducer,
    coupon: couponReducer
   


  },
});
