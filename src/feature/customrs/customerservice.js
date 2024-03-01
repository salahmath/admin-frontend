import axios from "axios";
import { url } from "../../utils/url";


const getAllusers = async()=>{
    const response = await axios.get(`${url}user/getalluser`)
return response.data;
}



const custermerService = {
    getAllusers,
};
export default custermerService