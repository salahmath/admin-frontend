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

const getacoleur = async(data)=>{
    const response = await axios.get(`${url}color/getcolor/${data}`,header)
return response.data;
}



const deletecoleur = async(data)=>{
    const response = await axios.delete(`${url}color/deletecolor/${data}`,header)
return response.data;
}


const updatecoleur = async(data)=>{
    const response = await axios.put(`${url}color/updatecolor/${data.id}`,{name : data.name.name},header)
return response.data;
}


const coleurService = {
    getAllcoleur,creecoleur,getacoleur,updatecoleur,deletecoleur
};
export default coleurService