import React, { useEffect ,useState} from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteenquirys, getenquirys,  geteteenquirys,  updtenquirys } from '../feature/enquiry/enquiryslice';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { Modal } from 'antd';

import { FaRegMessage } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;



function Enquiries() {
  const [loading, setLoading] = useState(true); // Nouvel état de chargement

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquirys, setEnquiry] = useState("");
  const showModal = (e) => {
    setIsModalOpen(true);
    setEnquiry(e)
    
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    
  }
    const columns1 = [
      {
        title: 'Num',
        dataIndex: 'key',
      },
        {
          title: 'Nom',
          dataIndex: 'nom',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Mobile',
          dataIndex: 'mobile',
        },{
          title: 'Statut',
          dataIndex: 'status',
        },{
          title: 'Action',
          dataIndex: 'action',
        },
      ];
      const navigate =useNavigate()
      const data1 = [];
      const enqstate =useSelector((state)=>state.enquiry.enquiry)
      const dispatch = useDispatch();
    
      
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true); // Déclenche l'état de chargement
          await dispatch(getenquirys());
          setLoading(false); // Met à jour l'état de chargement
        };
        fetchData();
      }, [dispatch]);
        
const location = useLocation()
const idrnq = location.pathname.split("/")[3]


  
      for (let i = 0; i < enqstate.length; i++) {
   

        // Ajouter chaque élément avec l'index de la boucle comme clé
        data1.push({
            key: i + 1, // Utiliser l'index de la boucle comme clé
            nom: enqstate[i].name ,
            email: enqstate[i].email ,
            mobile: enqstate[i].mobile ,
            comment: enqstate[i].comment ,

            status: (
              <Form.Select aria-label="Default select example" value={enqstate[i].status} 
              
              onChange={(e) => {
                const selectedValue = e.target.value;
                const data = { id: enqstate[i]._id, status: selectedValue };
                selectedValue === 'status' 
  ? dispatch(geteteenquirys(data)) 
  : dispatch(updtenquirys(data))
  setTimeout(() => {
    dispatch(getenquirys(data));
  }, 300);
   
              }}>
                <option>status</option>
                <option value="en attente">en attente</option>
                <option value="voir">voir</option>
                <option value="repondre">repondre</option>
              </Form.Select>
            ),
            
            //color: productstate[i].color,
            action: (
                <>
                   
                    <Link className="ms-3 fs-5" onClick={()=>(showModal( enqstate[i]._id))}>
                        <MdDelete />
                    </Link>
                    <Link className="ms-3 fs-5" to={`/admin/enquiries/${enqstate[i]._id}`}>
                        <FaRegMessage />
                    </Link>
                </>
            )
        });
    }
    /* repondu sur message	 */
 
   const Supprimer=async(e)=>{
    await dispatch(deleteenquirys(e))
    await setIsModalOpen(false);
   setTimeout(() => {
    
    dispatch(getenquirys())
    }, 100);
   } 
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
        <h3 className="mb-4">avis récents</h3>
        
{loading ? ( // Affiche l'animation de chargement si loading est vrai
          <div className="loading-container">
            <ClipLoader color={'#123abc'} css={override} size={150} loading={loading} />
          </div>
        ) : (
          <Table
columns={columns1}
expandable={{
  expandedRowRender: (record) => (
    <p style={{ margin: 0 }}>{record.comment}</p>
  ),
  rowExpandable: (record) => record.name !== 'Not Expandable',
}}
dataSource={data1}
/>
        )}
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={()=>{Supprimer(enquirys)}} onCancel={handleCancel}>
      <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>


      </Modal>


      
    </div>
  )
}

export default Enquiries