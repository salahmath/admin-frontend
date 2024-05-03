import axios from "axios";
import { url } from "../../utils/url";
import getHeader from "../../utils/header";

const headerr = getHeader();
const login = async (userData) => {
  const response = await axios.post(`${url}user/loginadmin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getuser = async (data) => {
  const response = await axios.get(`${url}blogcategory/getauser/${data}`);
  return response.data;
};

const getAllorders = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) {
    throw new Error("No token found in local storage");
  }

  const token = user.token;

  const header = {
    headers: {
      Authorization: `Bearer ${token}`, // Utilisez "Bearer" pour indiquer que c'est un token d'authentification
    },
  };

  try {
    const response = await axios.get(`${url}user/getallOrder`, header);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

const getordersum = async (userData) => {
  try {
    const response = await axios.get(`${url}user/getsum`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

const getusebyid = async (id) => {
  try {
    const response = await axios.get(
      `${url}user/getorderbyuser/${id}`,
      headerr
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};
const orderDetails = async (id) => {
  try {
    const response = await axios.get(`${url}user/getmonth`, headerr);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const orderDetailsch = async (id) => {
  try {
    const response = await axios.get(`${url}user/getmonthcount`, headerr);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const GetAllorder = async (id) => {
  try {
    const response = await axios.get(`${url}user/getallorder`, headerr);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const Getorderbyuser = async (id) => {
    try {
      const response = await axios.get(`${url}user/getorderbyuser/${id}`, headerr);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const udatestatus = async (data) => {
    try {
      const response = await axios.put(`${url}user/updateorder/${data.a}`,{status:data.b}, headerr);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const bloqueruser = async (id) => {
    try {
      const response = await axios.put(`${url}user/blockuser/${id}`,"", headerr);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const debloqueruser = async (id) => {
    try {
      const response = await axios.put(`${url}user/deblockuser/${id}`,"", headerr);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const getordersnum1 = async (id) => {
    try {
      const response = await axios.get(`${url}user/getordersnum1`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  
const authservice = {
  login,
  getAllorders,
  getordersnum1,
  debloqueruser,
  getusebyid,
  getuser,
  bloqueruser,
  orderDetails,
  orderDetailsch,
  GetAllorder,
  Getorderbyuser,
  udatestatus,
  getordersum
};
export default authservice;
