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


const brandService = {
    getAllbrands,creebrands
};
export default brandService