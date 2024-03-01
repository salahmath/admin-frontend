import React, { useEffect } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getenquirys } from '../feature/enquiry/enquiryslice';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Link from 'antd/es/typography/Link';
import { FaRegMessage } from "react-icons/fa6";
function Enquiries() {
    const columns1 = [
      {
        title: 'key',
        dataIndex: 'key',
      },
        {
          title: 'nom',
          dataIndex: 'nom',
        },
        {
          title: 'email',
          dataIndex: 'email',
        },
        {
          title: 'mobile',
          dataIndex: 'mobile',
        },{
          title: 'status',
          dataIndex: 'status',
        },{
          title: 'action',
          dataIndex: 'action',
        },
      ];
      const data1 = [];
      const enqstate =useSelector((state)=>state.enquiry.enquiry)
      const dispatch = useDispatch();
      useEffect(()=>{
dispatch(getenquirys())
      },[dispatch])
      for (let i = 0; i < enqstate.length; i++) {
        // Ajouter chaque élément avec l'index de la boucle comme clé
        data1.push({
            key: i + 1, // Utiliser l'index de la boucle comme clé
            nom: enqstate[i].name ,
            email: enqstate[i].email ,
            mobile: enqstate[i].mobile ,
            status: (
              <>
             <Form.Select aria-label="Default select example">
            <option value="">status</option>
          </Form.Select> 
              
              </>
            ) ,
            
            //color: productstate[i].color,
            action: (
                <>
                   
                    <Link className="ms-3 fs-5" to="/">
                        <MdDelete />
                    </Link>
                    <Link className="ms-3 fs-5" to="/">
                        <FaRegMessage />
                    </Link>
                </>
            )
        });
    }
  return (
    <div>
   <div className="mt-4">
        <h3 className="mb-4">avis récents</h3>
      <Table columns={columns1} dataSource={data1} size="middle" />
      </div>

    </div>
  )
}

export default Enquiries