import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";

const header = getHeader();
const getAllproduct = async()=>{
    const response = await axios.get(`${url}product/getallproduct`)
return response.data;
}
const createproduct = async(product)=>{
    const response = await axios.post(`${url}product/creeproduct`,product,header)
return response.data;
}
const getproduct = async(data)=>{
    const response = await axios.get(`${url}product/getaproduct/${data}`,header)
return response.data;
}

const updateproduct = async(data)=>{
    const response = await axios.put(`${url}product/updateaproduct/${data.id}`,{
        title:data.data.title,
        brand:data.data.brand,
        category:data.data.category,
        color:data.data.color,
        description:data.data.description,
        images:data.data.images,
        price:data.data.price,
        quantite:data.data.quantite,
        tags:data.data.tags},header)
return response.data;
}


const delproduct = async(data)=>{
    const response = await axios.delete(`${url}product/deleteaproduct/${data}`,header)
return response.data;
}

const ProductService = {
    getAllproduct,
    createproduct,
    getproduct,
    updateproduct,
    delproduct
};
export default ProductService