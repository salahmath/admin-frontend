import React, { useEffect,useState } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getblogs } from '../feature/blob/blobSlice';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import { getordrs } from '../feature/auth/authslice';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { Card, Col, Row,Input } from "antd";
import QRCode from 'react-qr-code'; // Importez la bibliothèque pour générer les codes QR

import { MdSettingsVoice } from "react-icons/md";

const { Search } = Input;

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;


function Orderlist() {
  const [text, setText] = useState(''); // Assurez-vous que text est initialisé à une chaîne vide

  const [loading, setLoading] = useState(true); // Nouvel état de chargement
    const columns1 = [
        
        {
          title: 'key',
          dataIndex: 'key',
        },{
          title: 'name',
          dataIndex: 'name',
        },
        {
          title: 'product',
          dataIndex: 'product',
        },{
          title: 'prix',
          dataIndex: 'prix',
        },{
          title: 'date',
          dataIndex: 'date',
        },,{
          title: 'action',
          dataIndex: 'action',
        },{
          title: 'QR Code', // Renommez la colonne pour inclure les codes QR
          dataIndex: 'qr',
          render: (text, record) => ( // Utilisez une fonction de rendu personnalisée pour afficher les codes QR
            <QRCode value={record.qrValue}  size={64} />
          ),
        },
      ];
const dispatch = useDispatch()
let conteur = 0
      const data1 = [
      ];
      const orderstate = useSelector((state) => state.auth.order);

      const generateQRValue = (order) => {
       const produc = order.products.map((item) => { return item.product.title});
       console.log(produc);
        const values = [
          { label: 'nom de client', value: order.orderby.lastname + " "+order.orderby.lastname},
          { label: 'email de client', value: order.orderby.email },
          { label: 'mobile de client', value: order.orderby.mobile },
          { label: 'produits', value: produc.join("||")  },

          { label: 'Price', value: order.paimentIntent.amount},
          { label: 'Quantity', value: order.createdAt},
        ];
        
        // Convertir le tableau d'objets en une chaîne de caractères
        const qrString = values.map(item => `${item.label}: ${item.value}`).join('\n');
      
        return qrString;
      };
      
for (let i = 0; i < orderstate.length; i++) {
    const dateStrFromAPI = orderstate[i].createdAt; // Suppose orderstate[i].createdAt is "2024-02-28T18:16:51.006Z"
    const dateObject = new Date(dateStrFromAPI);

    const formattedDate = `${dateObject.getFullYear()}-${padNumber(dateObject.getMonth() + 1)}-${padNumber(dateObject.getDate())} à ${padNumber(dateObject.getHours())}:${padNumber(dateObject.getMinutes())}:${padNumber(dateObject.getSeconds())}`;

  

    function padNumber(number) {
        return number.toString().padStart(2, '0');
    }
    conteur++

    data1.push({
        key: i + 1, // Utiliser l'index de la boucle comme clé
        name: orderstate[i].orderby.lastname,
        product: <Link to={`/admin/vieworder/${orderstate[i].orderby._id}`}> les commande</Link>, /* orderstate[i].products.map((item) => item.product).join(", "), // Joining product titles with comma */
        prix: orderstate[i].paimentIntent.amount,
        date: formattedDate, // Utiliser la date formatée
      qrValue: generateQRValue(orderstate[i]), // Utilisez une valeur unique (ID) comme valeur du code QR

        action: (
            <>
                <Link className="fs-5" to="/">
                    <CiEdit />
                </Link>
                <Link className="ms-3 fs-5" to="/">
                    <MdDelete />
                </Link>
            </>
        )
    });
}

      
       

        useEffect(() => {
          const fetchData = async () => {
            setLoading(true); // Déclenche l'état de chargement
            await dispatch(getordrs());
            setLoading(false); // Met à jour l'état de chargement
          };
          fetchData();
        }, [dispatch]);
      
        const filteredData = data1.filter(item =>
          item.name.toLowerCase().includes(text.toLowerCase()) || 
          item.date.toLowerCase().includes(text.toLowerCase())
        );
        
        const handleVoiceSearch = () => {
          const recognition = new window.webkitSpeechRecognition(); // Créez une instance de la reconnaissance vocale
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setText(transcript); // Mettez à jour le texte de recherche avec le texte transcrit
            console.log("Texte transcrit:", transcript); // Afficher le texte transcrit dans la console
          };
          recognition.start(); // Commencez à écouter pour la saisie vocale
        };
  return (
    <div>
    <div className="mt-4">
         <h3 className="mb-4">liste de blog</h3>
         {loading ? ( // Affiche l'animation de chargement si loading est vrai
          <div className="loading-container">
            <ClipLoader color={'#123abc'} css={override} size={150} loading={loading} />
          </div>
        ) : (
          <>
            <Row className='rowed' gutter={16}>
            <Col span={8}>
                <Card className="crd100" title="Nombre de commande" bordered={false}>
                    
                    <div className="text1" >{conteur}</div>  
                </Card>
            </Col>
            
        </Row>
        <br/><Search
          placeholder="Recherche par nom"
          enterButton="Search"
          size="large"
          value={text} // Utiliser la valeur de l'état text comme valeur du champ de recherche
          onChange={(e) => setText(e.target.value)} // Mettre à jour l'état text lorsque le champ de recherche est modifié
          suffix={<MdSettingsVoice onClick={handleVoiceSearch} />} // Appel à la fonction handleVoiceSearch lors du clic sur l'icône de recherche vocale
        /><br/>
        
            <Table columns={columns1} dataSource={filteredData} size="middle" />
          </>
        )}
       </div>
 
     </div>
  )
}

export default Orderlist