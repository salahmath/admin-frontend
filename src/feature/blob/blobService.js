import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";
const header = getHeader()

const getAllblogs = async()=>{
    const response = await axios.get(`${url}blog/getallblog`)
    return response.data;
}

const creeblogs = async(data)=>{
    const response = await axios.post(`${url}blog/blogcreat`, data, header)
    return response.data;
}

const getblogs = async(data)=>{
    const response = await axios.get(`${url}blog/getblog/${data}`, header)
    return response.data;
}

const updateblogs = async(data)=>{
    const response = await axios.put(`${url}blog/updateblog/${data.id}`, {
        title: data.data.title,
        description: data.data.description,
        category: data.data.category,
        image : data.data.image
    }, header)
    console.log(url);
    return response.data;
 
}

const delblogs = async(data)=>{
    const response = await axios.delete(`${url}blog/deleteblog/${data}`, header)
    return response.data;
}

const blogService = {
    getAllblogs,
    creeblogs,
    getblogs,
    updateblogs,
    delblogs
};

export default blogService;