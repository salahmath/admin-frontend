import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";

const header =getHeader()
const getAllcoleur = async()=>{
    const response = await axios.get(`${url}color/getallcolor`)
return response.data;
}
const creecoleur = async(data)=>{
    const response = await axios.post(`${url}color/creecolor`,data,header)
return response.data;
}



const coleurService = {
    getAllcoleur,creecoleur
};
export default coleurService