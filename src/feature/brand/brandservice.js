import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";
const header = getHeader();


const getAllbrands = async()=>{
    const response = await axios.get(`${url}brand/getallbrand`)
return response.data;
}


const creebrands = async(data)=>{
    const response = await axios.post(`${url}brand/creebrand`,data,header)
return response.data;
}

const getAbrand = async(id)=>{
    const response = await axios.get(`${url}brand/getbrand/${id}`)
return response.data;
}
const updatebrand = async(data)=>{
    const response = await axios.put(`${url}brand/updatebrand/${data.id}`,{
        name:data.databrand.name
    },header)
return response.data;
}
const deletebrand = async(id)=>{
    const response = await axios.delete(`${url}brand/deletebrand/${id}`,header)
return response.data;
}


const brandService = {
    getAllbrands,creebrands,getAbrand,updatebrand,deletebrand
};
export default brandService