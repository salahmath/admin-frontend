import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";

const header = getHeader();
const uploadimg = async(data)=>{
    const response = await axios.put(`${url}product/upload`,data,header)
return response.data;
}

const deleteimg = async(id)=>{
    const response = await axios.delete(`${url}product/deleteimg/${id}`,header)
return response.data;
}

const uploasService = {
    uploadimg,
    deleteimg
};
export default uploasService