import React, { useEffect, useState } from "react";
import { Divider, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteacouleur, getcoleur } from "../feature/color/colorSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { reset } from "../feature/brand/brandslice";
import { Card, Col, Row,Input } from "antd";

import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { MdSettingsVoice } from "react-icons/md";
import { ToastContainer } from "react-toastify";

const { Search } = Input;

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;

function Colorlist() {
  const [loading, setLoading] = useState(true); // Nouvel état de chargement

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorid, setcolorid] = useState("");
  const showModal = (e) => {
    setIsModalOpen(true);
    setcolorid(e);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns1 = [
    {
      title: "Nom",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  const dispatch = useDispatch();
  const colorstate = useSelector((state) => state.coleur.coleur);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Déclenche l'état de chargement
      await dispatch(getcoleur());
      setLoading(false); // Met à jour l'état de chargement
    };
    fetchData();
  }, [dispatch]);


  const getColorName = (hex) => {
    const convert = require("color-convert");
    const rgb = convert.hex.rgb(hex);
    const colorName = convert.rgb.keyword(rgb);
    return colorName || hex; // Si aucune correspondance trouvée, retourne le code hexadécimal
  };
let conteur = 0

  for (let i = 0; i < colorstate.length; i++) {
    // Ajouter chaque élément avec l'index de la boucle comme clé
    conteur++
    data1.push({
      key: i + 1, // Utiliser l'index de la boucle comme clé
      name: colorstate[i].name,
      color: getColorName(colorstate[i].name),
      //color: productstate[i].color,
      action: (
        <>
          <Link className="fs-5" to={`/admin/color/${colorstate[i]._id}`}>
            <CiEdit />
          </Link>
          <Link
            className="ms-3 fs-5"
            onClick={() => showModal(colorstate[i]._id)}
          >
            <MdDelete />
          </Link>
        </>
      ),
    });
  }
  const Supprimer = async (e) => {
    await dispatch(deleteacouleur(e));
    setTimeout(() => {
      dispatch(getcoleur());
      dispatch(reset());
    }, 100);
    await setIsModalOpen(false);
  };
  const [text, setText] = useState(''); // Assurez-vous que text est initialisé à une chaîne vide
  const filteredData = data1.filter(item =>
    item.color.toLowerCase().includes(text.toLowerCase())
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
        <h3 className="mb-4">liste de coleurs</h3>
        {loading ? ( // Affiche l'animation de chargement si loading est vrai
          <div className="loading-container">
            <ClipLoader
              color={"#123abc"}
              css={override}
              size={150}
              loading={loading}
            />
          </div>
        ) : (
          <>
          <Row className='rowed' gutter={16}>
            <Col span={8}>
                <Card className="crd100" title="Nombre de coleurs" bordered={false}>
                    
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
        
          <Table
            columns={columns1}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.color}</p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={filteredData}
          />
          </>
        )}
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          Supprimer(colorid);
        }}
        onCancel={handleCancel}
      >
        <p>
          Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est
          irréversible.
        </p>
      </Modal>
    </div>
  );
}

export default Colorlist;

{
  /* <Table
columns={columns1}
expandable={{
  expandedRowRender: (record) => (
    <p style={{ margin: 0 }}>{record.comment}</p>
  ),
  rowExpandable: (record) => record.name !== 'Not Expandable',
}}
dataSource={data1}
/> */
}
