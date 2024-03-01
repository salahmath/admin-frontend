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



const ProductService = {
    getAllproduct,
    createproduct
};
export default ProductService