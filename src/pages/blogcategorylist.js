import React, { useEffect,useState } from 'react'
import { Divider, Table } from 'antd';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deltegoryblog, getcategoryblog } from '../feature/bloglist/bloglistslice';
import { exporState } from '../feature/blob/blobSlice';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { Card, Col, Row } from "antd";

import { Button, Modal } from 'antd';
import { ToastContainer } from 'react-toastify';
const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;

function BlogcategoryList() {
  const [loading, setLoading] = useState(true); // Nouvel état de chargement
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cat, setcat] = useState("");
  const showModal = (e) => {
    setIsModalOpen(true);
    setcat(e)
    
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    

  };
  const Supprimer =async(e)=>{
    await dispatch(deltegoryblog(e))
    setTimeout(() => {
     dispatch(getcategoryblog())
      dispatch(exporState())
    }, 100);
    await setIsModalOpen(false);


    }
    const columns1 = [
        {
          title: 'nom',
          dataIndex: 'nom',
        }, {
          title: 'action',
          dataIndex: 'action',
        },
      
      ];
      const data1 = [
      ];
      const categoryblogstate = useSelector((state)=>state.category_blog.category_blog)
      
      const dispatch = useDispatch();
     let conteur = 0
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true); // Déclenche l'état de chargement
          await dispatch(getcategoryblog());
          setLoading(false); // Met à jour l'état de chargement
        };
        fetchData();
      }, [dispatch]);
      for (let i = 0; i < categoryblogstate.length; i++) {
        // Ajouter chaque élément avec l'index de la boucle comme clé
        conteur++
        data1.push({
            key: i + 1, // Utiliser l'index de la boucle comme clé
            nom: categoryblogstate[i].name ,
            
            //color: productstate[i].color,
            action: (
                <>
                    <Link className="fs-5" to={`/admin/blog-category/${categoryblogstate[i]._id}`}>
                        <CiEdit />
                    </Link>
                    <Link className="ms-3 fs-5" onClick={()=>showModal(categoryblogstate[i]._id)} >
                        <MdDelete />
                    </Link>
                </>
            )
        });
    }
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
         <h3 className="mb-4">liste de categories</h3>
         {loading ? ( // Affiche l'animation de chargement si loading est vrai
          <div className="loading-container">
            <ClipLoader color={'#123abc'} css={override} size={150} loading={loading} />
          </div>
        ) : (
          <>
          <Row className='rowed' gutter={16}>
          <Col span={8}>
              <Card className="crd100" title="Nombre de categories" bordered={false}>
                  
                  <div className="text1" >{conteur}</div>  
              </Card>
          </Col>
          
      </Row>
      <br/>
          <Table columns={columns1} dataSource={data1} size="middle" />
        </>
        )}
       </div>
       <Modal title="Basic Modal" open={isModalOpen} onOk={()=>{Supprimer(cat)}} onCancel={handleCancel}>
       <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>


      </Modal>
     </div>
  )
}

export default BlogcategoryList