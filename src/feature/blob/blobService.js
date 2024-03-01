import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";
const header = getHeader()

const getAllblogs = async()=>{
    const response = await axios.get(`${url}blog/getallblog`)
return response.data;
}

const creeblogs = async(data)=>{
    const response = await axios.post(`${url}blog/blogcreat`,data,header)
return response.data;
}

const blogService = {
    getAllblogs,creeblogs
};
export default blogService