import React ,{ useEffect } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getcategories } from '../feature/category-product/categorySlice';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Link from 'antd/es/typography/Link';
function Categorylist() {
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
      const categorystate = useSelector((state)=> state.category.category)
      const dispatch = useDispatch();
    
      useEffect(() => {
          dispatch(getcategories());
      }, [dispatch]);
      for (let i = 0; i < categorystate.length; i++) {
        // Ajouter chaque élément avec l'index de la boucle comme clé
        data1.push({
            key: i + 1, // Utiliser l'index de la boucle comme clé
            name: categorystate[i].name,
            
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
         <h3 className="mb-4">liste de categories</h3>
       <Table columns={columns1} dataSource={data1} size="middle" />
       </div>
 
     </div>
  )
}

export default Categorylist