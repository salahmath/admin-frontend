import React ,{ useEffect ,useState} from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { delcategorie, getcategories } from '../feature/category-product/categorySlice';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button, Modal } from 'antd';
import { Card, Col, Row,Input } from "antd";
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { MdSettingsVoice } from "react-icons/md";

const { Search } = Input;

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;
function Categorylist() {
  const [loading, setLoading] = useState(true); // Nouvel état de chargement
  const [text, setText] = useState(''); // Assurez-vous que text est initialisé à une chaîne vide
  

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setcategory] = useState("");
    const showModal = (e) => {
      setIsModalOpen(true);
      setcategory(e)
      
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      
  
    };
    const columns1 = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
       
        {
          title: 'action',
          dataIndex: 'action',
        },
      ];
      const data1 = [
      ];
      let conteur = 0
      const categorystate = useSelector((state)=> state.category.category)
      const dispatch = useDispatch();

      useEffect(() => {
        const fetchData = async () => {
          setLoading(true); // Déclenche l'état de chargement
          await dispatch(getcategories());
          setLoading(false); // Met à jour l'état de chargement
        };
        fetchData();
      }, [dispatch]);
    
      for (let i = 0; i < categorystate.length; i++) {
        // Ajouter chaque élément avec l'index de la boucle comme clé
        conteur++
        data1.push({
            key: i + 1, // Utiliser l'index de la boucle comme clé
            name: categorystate[i].name,
            
            //color: productstate[i].color,
            action: (
                <>
                    <Link className="fs-5" to={`/admin/category/${categorystate[i]._id}`}>
                        <CiEdit />
                    </Link>
                    <Link className="ms-3 fs-5" onClick={()=>showModal(categorystate[i]._id)}>
                        <MdDelete />
                    </Link>
                </>
            )
        });
    }
    const Supprimer  =async(e)=>{
      await dispatch(delcategorie(e))
      
       await setIsModalOpen(false);
      setTimeout(() => {
        dispatch(getcategories());
      }, 100);
         }
         const filteredData = data1.filter(item =>
          item.name.toLowerCase().includes(text.toLowerCase())
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
         <h3 className="mb-4">liste de categories</h3>
         {loading ? ( // Affiche l'animation de chargement si loading est vrai
          <div className="loading-container">
            <ClipLoader color={'#123abc'} css={override} size={150} loading={loading} />
          </div>
        ) : (<>

<Row className='rowed' gutter={16}>
            <Col span={8}>
                <Card className="crd100" title="Nombre de categorie" bordered={false}>
                    
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
          </>)}
       </div>
       <Modal title="Basic Modal" open={isModalOpen} onOk={()=>{Supprimer(category)}} onCancel={handleCancel}>
       <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>


      </Modal>
     </div>
  )
}

export default Categorylist