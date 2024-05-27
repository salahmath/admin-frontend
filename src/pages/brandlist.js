import React, { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deletebrands, getbrands } from '../feature/brand/brandslice';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { Card, Col, Row } from "antd";
import { MdSettingsVoice } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Input } from 'antd';
import { ToastContainer } from 'react-toastify';
const { Search } = Input;

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;

function Brandlist() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [text, setText] = useState(''); // Assurez-vous que text est initialisé à une chaîne vide

  const showModal = (id) => {
    setIsModalOpen(true);
    setDeleteId(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns1 = [
    {
      title: 'Nom',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  
  const data1 = [];
  let counter = 0;
  const brandstate = useSelector((state) => state.brand.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getbrands());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  for (let i = 0; i < (brandstate ? brandstate.length : 0); i++) {
    counter++;
    data1.push({
      key: i + 1,
      name: brandstate[i].name,
      action: (
        <>
          <Link to={`/admin/brand/${brandstate[i]._id}`} className="fs-5">
            <CiEdit />
          </Link>
          <Link className="ms-3 fs-5" onClick={() => showModal(brandstate[i]._id)}>
            <MdDelete />
          </Link>
        </>
      ),
    });
  }

  const deleteBrand = async () => {
    await dispatch(deletebrands(deleteId));
    setIsModalOpen(false);
    setLoading(true);
    setTimeout(() => {
      dispatch(getbrands());
      setLoading(false);
    }, 100);
  };

  // Fonction de filtrage des données en fonction du texte de recherche
  const filteredData = data1.filter(item =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );
// Fonction pour gérer la recherche vocale
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
    <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
      <div className="mt-4">
        <h3 className="mb-4">Liste de marques</h3>
       
  
        {loading ? (
          <div className="loading-container">
            <ClipLoader color={'#123abc'} css={override} size={150} loading={loading} />
          </div>
        ) : (
          <>
            <Row className='rowed' gutter={16}>
              <Col span={8}>
                <Card className="crd100" title="Nombre de marques" bordered={false}>
                  <div className="text1" >{counter}</div>  
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
      <Modal title="Confirmation" visible={isModalOpen} onOk={deleteBrand} onCancel={handleCancel}>
        <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
      </Modal>
    </div>
  );
}

export default Brandlist;
