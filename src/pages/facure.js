import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InvoicePage() {
  const { qrResult } = useParams(); // Obtenez le résultat du scan à partir des paramètres d'URL

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Faites une requête au backend pour récupérer les détails de la commande correspondant au résultat du scan
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${qrResult}`); // Supposons que vous avez une route API pour récupérer les détails de la commande
        if (!response.ok) {
          throw new Error("Impossible de récupérer les détails de la commande");
        }
        const orderData = await response.json();
        setOrderDetails(orderData);
      } catch (error) {
        console.error(error);
        // Gérez l'erreur de récupération des détails de la commande
      }
    };

    if (qrResult) {
      fetchOrderDetails();
    }
  }, [qrResult]);

  if (!orderDetails) {
    return <div>Chargement...</div>; // Affichez un indicateur de chargement tant que les détails de la commande sont récupérés
  }

  return (
    <div>
      <h1>Facture de la commande {orderDetails.orderNumber}</h1>
      <p>Nom du client : {orderDetails.customerName}</p>
      {/* Affichez d'autres détails de la commande ici */}
    </div>
  );
}

export default InvoicePage;
