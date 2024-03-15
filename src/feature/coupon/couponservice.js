import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";
const header = getHeader();


const getAllcoupons = async()=>{
    const response = await axios.get(`${url}coupon/getallcoupon`,header)
return response.data;
}


const creecoupon = async(data)=>{
    const response = await axios.post(`${url}coupon/ajoutcoupon`,data,header)
return response.data;
}


const getcoupon = async(data)=>{
    const response = await axios.get(`${url}coupon/getcoupon/${data}`,header)
return response.data;
}

const delcoupon = async(data)=>{
    const response = await axios.delete(`${url}coupon/delcoupon/${data}`,header)
return response.data;
}

const updatecoupon = async(data)=>{
    const response = await axios.put(`${url}coupon/updatecoupon/${data.id}`,{name : data.data.name , expiry:data.data.expiry,discount:data.data.discount},header)
return response.data;
}


const couponService = {
    getAllcoupons,creecoupon,getcoupon,updatecoupon,delcoupon
};
export default couponService