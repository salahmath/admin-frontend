import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";
const header =getHeader()

const getAllcategoryblog = async()=>{
    const response = await axios.get(`${url}blogcategory/getallcategory`)
return response.data;
}

const creecategoryblog = async(data)=>{
    const response = await axios.post(`${url}blogcategory/creecategory`,data,header)
return response.data;
}


const categoryblogService = {
    getAllcategoryblog,creecategoryblog
};
export default categoryblogService