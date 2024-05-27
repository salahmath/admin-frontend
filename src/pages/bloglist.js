import React, { useEffect ,useState} from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteblogs, getblogs } from '../feature/blob/blobSlice';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import { Button, Modal } from 'antd';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { Card, Col, Row,Input } from "antd";

import { MdSettingsVoice } from "react-icons/md";
import { ToastContainer } from 'react-toastify';

const { Search } = Input;


function Bloglist() {
  function RenderHTML({ htmlContent }) {
    return (
      <div
        style={{
          display: "-webkit-box",
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;
const [loading, setLoading] = useState(true); // Nouvel état de chargement
const dispatch= useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brabdid, setbrabdid] = useState("");
  const showModal = (e) => {
    setIsModalOpen(true);
    setbrabdid(e)
    
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    

  };
    const columns1 = [
        {
          title: 'Titre',
          dataIndex: 'title',
        },
        {
          title: 'Numbre de vue',
          dataIndex: 'Numbre',
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Categorie',
          dataIndex: 'category',
        },{
          title: 'Auteur',
          dataIndex: 'author',
        },{
          title: 'Action',
          dataIndex: 'action',
        },
      ];
      let conteur = 0
      const data1 = [
      ];
      const blogstate = useSelector((state)=>state?.blog?.blog)
      for (let i = 0; i < blogstate?.length; i++) {
        // Ajouter chaque élément avec l'index de la boucle comme clé
        conteur++
        data1.push({
            key: i + 1, // Utiliser l'index de la boucle comme clé
            title: blogstate[i]?.title,
            description: <RenderHTML htmlContent={blogstate[i]?.description} />,
            category: blogstate[i]?.category,
            Numbre: blogstate[i]?.numViews,
            author: blogstate[i]?.author,
            //color: blogstate[i].color,
            action: (
                <>
                    <Link className="fs-5" to={`/admin/Add-blog/${blogstate[i]?._id}`}>
                        <CiEdit />
                    </Link>
                    <Link className="ms-3 fs-5" onClick={()=>showModal(blogstate[i]?._id)}>
                        <MdDelete />
                    </Link>
                </>
            )
        });
    }

    const [text, setText] = useState(''); // Assurez-vous que text est initialisé à une chaîne vide


        useEffect(() => {
          const fetchData = async () => {
            setLoading(true); // Déclenche l'état de chargement
            await dispatch(getblogs());
            setLoading(false); // Met à jour l'état de chargement
          };
          fetchData();
        }, [dispatch]);
        
   const Supprimer  =async(e)=>{
    await dispatch(deleteblogs(e))
    
     await setIsModalOpen(false);
    setTimeout(() => {
      dispatch(getblogs());
    }, 100);
       }
       const filteredData = data1.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase())
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
         <h3 className="mb-4">liste de blogs</h3>

         {loading ? ( // Affiche l'animation de chargement si loading est vrai
          <div className="loading-container">
            <ClipLoader color={'#123abc'} css={override} size={150} loading={loading} />
          </div>
        ) : ( <>
          <Row className='rowed' gutter={16}>
          <Col span={8}>
              <Card className="crd100" title="Nombre de blogs" bordered={false}>
                  
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
       
       <Modal title="Basic Modal" open={isModalOpen} onOk={()=>{Supprimer(brabdid)}} onCancel={handleCancel}>
       <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>


      </Modal>
     </div>
  )
}

export default Bloglist