import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";

const headerr =getHeader()
const login = async(userData)=>{
    const response = await axios.post(`${url}user/loginadmin`,userData)
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))
    }return response.data;
}



const getuser = async(data)=>{
    const response = await axios.get(`${url}blogcategory/getauser/${data}`)
return response.data;
}

const getAllorders = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
        throw new Error("No token found in local storage");
    }

    const token = user.token;

    const header = {
        headers: {
            'Authorization': `Bearer ${token}` // Utilisez "Bearer" pour indiquer que c'est un token d'authentification
        }
    };

    try {
        const response = await axios.get(`${url}user/getallOrder`, header);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        throw error;
    }
}

const getorder = async(userData)=>{
    try{
    const response = await axios.get(`${url}user/getauser/${userData}`)
    return response.data;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        throw error;
}}

const getusebyid = async(id)=>{
    try{
    const response = await axios.get(`${url}user/getorderbyuser/${id}`,headerr)
    return response.data;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        throw error;
}}


const authservice = {
    login,getAllorders,getusebyid,getuser
};
export default authservice