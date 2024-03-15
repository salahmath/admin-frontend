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

const getagoryblog = async(data)=>{
    const response = await axios.get(`${url}blogcategory/getcategory/${data}`,header)
return response.data;
}
const updateategoryblog = async(data)=>{
    const response = await axios.put(`${url}blogcategory/updatecategory/${data.id}`,{name : data.data.name},header)
return response.data;
}
const deletegoryblog = async(data)=>{
    const response = await axios.delete(`${url}blogcategory/deletecategory/${data}`,header)
return response.data;
}


const categoryblogService = {
    getAllcategoryblog,creecategoryblog,updateategoryblog,deletegoryblog,getagoryblog
};
export default categoryblogService