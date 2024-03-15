import React from "react";
import axios from "axios";
// Fonction pour récupérer le header
const getHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
        console.warn("No token found in local storage");
        return null; // Retourne null si aucun jeton n'est trouvé
    }

    const token = user.token;

    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
}

export default getHeader;
