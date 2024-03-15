import { MdDelete } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Modal, Button } from 'antd';
import { getUsers, delUsers } from '../feature/customrs/customerslice';
import { Link } from "react-router-dom";
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { Card, Col, Row,Input } from "antd";
import { FaRegEye } from "react-icons/fa";

import { MdSettingsVoice } from "react-icons/md";
import { ImEyeBlocked } from "react-icons/im";

const { Search } = Input;

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;

const columns1 = [
  {
    title: 'key',
    dataIndex: 'key',
  },
  {
    title: 'nom et prenom',
    dataIndex: 'lastname',
    defaultSortOrder: "descend",
    sorter: (a, b) => a.lastname.length - b.lastname.length,
  },
  {
    title: 'email',
    dataIndex: 'email',
  },
  {
    title: 'mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'action',
    dataIndex: 'action',
  },

];

function Client() {
  const dispatch = useDispatch()
  const [text, setText] = useState(''); // Assurez-vous que text est initialisé à une chaîne vide

  const [loading, setLoading] = useState(true); // Nouvel état de chargement

let conteur = 0

  useEffect(() => {

    
    const fetchData = async () => {
      setLoading(true); // Déclenche l'état de chargement
      await dispatch(getUsers());
      setLoading(false); // Met à jour l'état de chargement
    };
    fetchData();
  }, [dispatch]);
  const customerState = useSelector((state) => state.customer.customers);
  const data1 = []
  
  for (let i = 0; i < customerState.length; i++) {
    // Ajouter chaque élément avec l'index de la boucle comme clé
    conteur++
    data1.push({
        key: i + 1, // Utiliser l'index de la boucle comme clé
        lastname: customerState[i].lastname + " "+ customerState[i].Secondname,
        email: customerState[i].email,
        mobile: customerState[i].mobile,
        qr:[] , 
        //color: productstate[i].color,
        action: (
            <>
                <Link className="ms-3 fs-5" onClick={()=>(showModal( customerState[i]._id))}>
                    <MdDelete />
                </Link>
                <Link className="ms-3 fs-5" onClick={()=>(showModal( customerState[i]._id))}>
                    <FaRegEye />
                </Link>
                <Link className="ms-3 fs-5" onClick={()=>(showModal( customerState[i]._id))}>
                    <ImEyeBlocked />
                </Link>
            </>
        )
    });
}
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [client, setClient] = useState("");
  const showModal = (id) => {
    setIsModalOpen(true);
    setClient(id);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    Supprimer(client);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Supprimer = async (id) => {
    await dispatch(delUsers(id));
    await setTimeout(() => {
      setIsModalOpen(false);
      dispatch(getUsers());
    }, 100);
  }
  const filteredData = data1.filter(item =>
    item.lastname.toLowerCase().includes(text.toLowerCase()) ||
    item.mobile.toLowerCase().includes(text.toLowerCase())
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
        <h3 className="mb-4">liste de clients</h3>
         
        {loading ? ( // Affiche l'animation de chargement si loading est vrai
          <div className="loading-container">
            <ClipLoader color={'#123abc'} css={override} size={150} loading={loading} />
          </div>
        ) : (
          <>
          <Row className='rowed' gutter={16}>
          <Col span={8}>
              <Card className="crd100" title="Nombre de client" bordered={false}>
                  
                  <div className="text1" >{conteur}</div>  
              </Card>
          </Col>
          
      </Row>
      <br/>
      <Search
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
      <Modal title="Supprimer le client" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>

      </Modal>
    </div>
  )
}

export default Client;
