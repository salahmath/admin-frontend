import React, { useEffect } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getfournisseur } from '../feature/list-fournisseur/fournisseurSlice';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Link from 'antd/es/typography/Link';
function Fournisseurlist() {
    const columns1 = [
      {
        title: 'key',
        dataIndex: 'key',
      },
        {
          title: 'nom et pronom',
          dataIndex: 'nom',
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
      const data1 = [];
      const foustate = useSelector((state)=>state.fournisseur.fournisseur)
      console.log(foustate);
      const dispatch = useDispatch();
      useEffect(()=>{
dispatch(getfournisseur())
      },[dispatch])
      for (let i = 0; i < foustate.length; i++) {
        // Ajouter chaque élément avec l'index de la boucle comme clé
        data1.push({
            key: i + 1, // Utiliser l'index de la boucle comme clé
            nom: foustate[i].lastname + " "+foustate[i].Secondname,
            email: foustate[i].email,
            mobile: foustate[i].mobile,
            
            //color: productstate[i].color,
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
  return (
    <div>
    <div className="mt-4">
         <h3 className="mb-4">liste de fournisseurs</h3>
       <Table columns={columns1} dataSource={data1} size="middle" />
       </div>
 
     </div>
  )
}

export default Fournisseurlist