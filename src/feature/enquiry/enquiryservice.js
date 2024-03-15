import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";

const header = getHeader()
const getAllenquirys = async()=>{
    const response = await axios.get(`${url}eqr/getallenq`)
return response.data;
}


const delenquirys = async(data)=>{
    const response = await axios.delete(`${url}eqr/deleteenq/${data}`,header)
return response.data;
}


const getenquirys = async(data)=>{
    const response = await axios.get(`${url}eqr/getenq/${data}`,header)
return response.data;
}

const updenquirys = async(data)=>{
    const response = await axios.put(`${url}eqr/updateenq/${data.id}`,{status : data.status},header)
return response.data;
}

const enquiryservice = {
    getAllenquirys,delenquirys,getenquirys,updenquirys
};
export default enquiryservice