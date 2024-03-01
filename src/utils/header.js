import React from "react";
import axios from "axios";
// Fonction pour récupérer le header
const getHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
        throw new Error("No token found in local storage");
    }

    const token = user.token;

    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
}
export default getHeader;