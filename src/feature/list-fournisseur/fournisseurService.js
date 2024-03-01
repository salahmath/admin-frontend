import axios from "axios";
import { url } from "../../utils/url";


const getAllfournisseur = async()=>{
    const response = await axios.get(`${url}fournisseur/getallfournisseur`)
return response.data;
}



const FournisseurService = {
    getAllfournisseur,
};
export default FournisseurService