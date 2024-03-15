import axios from "axios";
import { url } from "../../utils/url";


const getAllusers = async()=>{
    const response = await axios.get(`${url}user/getalluser`)
return response.data;
}

const delusers = async(data)=>{
    const response = await axios.delete(`${url}user/deleteauser/${data}`)
return response.data;
}



const custermerService = {
    getAllusers,delusers
};
export default custermerService