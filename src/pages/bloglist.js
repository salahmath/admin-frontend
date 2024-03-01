import React, { useEffect } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getblogs } from '../feature/blob/blobSlice';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";

function Bloglist() {
    const columns1 = [
        {
          title: 'title',
          dataIndex: 'title',
        },
        {
          title: 'description',
          dataIndex: 'description',
        },
        {
          title: 'categorie',
          dataIndex: 'category',
        },{
          title: 'auteur',
          dataIndex: 'author',
        },{
          title: 'action',
          dataIndex: 'action',
        },
      ];
      const data1 = [
      ];
      const blogstate = useSelector((state)=>state.blog.blog)
      for (let i = 0; i < blogstate.length; i++) {
        // Ajouter chaque élément avec l'index de la boucle comme clé
        data1.push({
            key: i + 1, // Utiliser l'index de la boucle comme clé
            title: blogstate[i].title,
            description: blogstate[i].description,
            category: blogstate[i].category,
            author: blogstate[i].author,
            //color: blogstate[i].color,
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
      
        const dispatch = useDispatch();
        useEffect(() => {
          dispatch(getblogs());
        }, []);
  return (
    <div>
    <div className="mt-4">
         <h3 className="mb-4">liste de blog</h3>
       <Table columns={columns1} dataSource={data1} size="middle" />
       </div>
 
     </div>
  )
}

export default Bloglist