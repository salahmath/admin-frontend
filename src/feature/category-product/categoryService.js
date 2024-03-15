import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";
const header = getHeader();

const getAllcategory = async()=>{
    const response = await axios.get(`${url}category/getallcategory`)
return response.data;
}

const ajoutcategory = async(data)=>{
    const response = await axios.post(`${url}category/creecategory`,data,header)
return response.data;
}


const getacategory = async(data)=>{
    const response = await axios.get(`${url}category/getcategory/${data}`,header)
return response.data;
}

const updatecategory = async(id)=>{
    const response = await axios.put(`${url}category/updatecategory/${id.id}`,{name : id.data.name},header)
return response.data;
}

const deleteacategory = async(data)=>{
    const response = await axios.delete(`${url}category/deletecategory/${data}`,header)
return response.data;
}
            
const CategoryService = {
    getAllcategory,ajoutcategory,getacategory,updatecategory,deleteacategory
};
export default CategoryService