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



const CategoryService = {
    getAllcategory,ajoutcategory
};
export default CategoryService