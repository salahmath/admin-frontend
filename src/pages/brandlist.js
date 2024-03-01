import React, { useEffect } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getbrands } from '../feature/brand/brandslice';
import Link from 'antd/es/typography/Link';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function Brandlist() {
    const columns1 = [
        {
          title: 'Name',
          dataIndex: 'name',
        }, {
          title: 'Action',
          dataIndex: 'action',
        },
       
      ];
      const data1 = [];
      const brandstate = useSelector((state)=> state.brand.brands)
      const dispatch = useDispatch();
    
      useEffect(() => {
          dispatch(getbrands());
      }, [dispatch]);
      for (let i = 0; i < brandstate.length; i++) {
        // Ajouter chaque élément avec l'index de la boucle comme clé
        data1.push({
            key: i + 1, // Utiliser l'index de la boucle comme clé
            name: brandstate[i].name,
            
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
         <h3 className="mb-4">liste de marque</h3>
       <Table columns={columns1} dataSource={data1} size="middle" />
       </div>
 
     </div>
  )
}

export default Brandlist