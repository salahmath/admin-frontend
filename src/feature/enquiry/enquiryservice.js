import axios from "axios";
import { url } from "../../utils/url";


const getAllenquirys = async()=>{
    const response = await axios.get(`${url}eqr/getallenq`)
return response.data;
}



const enquiryservice = {
    getAllenquirys,
};
export default enquiryservice