import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";
const header = getHeader()

const getAllfournisseur = async()=>{
    const response = await axios.get(`${url}fournisseur/getallfournisseur`)
return response.data;
}

const createfournisseur = async(data)=>{
    const response = await axios.post(`${url}fournisseur/addfournisseur`,data,header)
return response.data;
}

const getafournisseur = async(id)=>{
    const response = await axios.get(`${url}fournisseur/getfournisseur/${id}`,header)
return response.data;
}

const delfournisseur = async(id)=>{
    const response = await axios.delete(`${url}fournisseur/deletefournisseur/${id}`,header)
return response.data;
}
const upfournisseur = async(data)=>{
    const response = await axios.put(`${url}fournisseur/updatefournisseur/${data.id}`,{lastname:data.data.lastname,
        email:data.data.email,
        mobile:data.data.mobile,
        Secondname:data.data.Secondname},header)

return response.data;
}

const FournisseurService = {
    getAllfournisseur,createfournisseur,getafournisseur,upfournisseur,delfournisseur
};
export default FournisseurService