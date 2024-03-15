import React, { useEffect,useState } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getblogs } from '../feature/blob/blobSlice';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { Link, useLocation } from "react-router-dom";
import { getordrs, getuserid } from '../feature/auth/authslice';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';


const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;


function Vieworder() {
  const [loading, setLoading] = useState(true); // Nouvel état de chargement
    const columns1 = [
        
        {
          title: 'key',
          dataIndex: 'key',
        },{
          title: 'name',
          dataIndex: 'name',
        },
        {
          title: 'product',
          dataIndex: 'product',
        },{
          title: 'prix',
          dataIndex: 'prix',
        },{
          title: 'date',
          dataIndex: 'date',
        },,{
          title: 'action',
          dataIndex: 'action',
        },
      ];
const dispatch = useDispatch()
const location = useLocation()
const getid = location.pathname.split("/")[3]

      const data1 = [
      ];
      const orderstate = useSelector((state) => state.auth.userbyid);
      console.log(orderstate);
/* for (let i = 0; i < orderstate.length; i++) {
    const dateStrFromAPI = orderstate[i].createdAt; // Suppose orderstate[i].createdAt is "2024-02-28T18:16:51.006Z"
    const dateObject = new Date(dateStrFromAPI);

    const formattedDate = `${dateObject.getFullYear()}-${padNumber(dateObject.getMonth() + 1)}-${padNumber(dateObject.getDate())} à ${padNumber(dateObject.getHours())}:${padNumber(dateObject.getMinutes())}:${padNumber(dateObject.getSeconds())}`;

  

    function padNumber(number) {
        return number.toString().padStart(2, '0');
    }

    data1.push({
        key: i + 1, // Utiliser l'index de la boucle comme clé
        name: orderstate[i].orderby.lastname,
        product: <Link to={`/admin/order/${orderstate[i].orderby._id}`}> les utilisateur commande</Link>, /* orderstate[i].products.map((item) => item.product).join(", "), // Joining product titles with comma */
      /*   prix: orderstate[i].paimentIntent.amount,
        date: formattedDate, // Utiliser la date formatée
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
 */ 
      
       

        useEffect(() => {
          const fetchData = async () => {
            setLoading(true); // Déclenche l'état de chargement
            await dispatch(getuserid(getid));
            setLoading(false); // Met à jour l'état de chargement
          };
          fetchData();
        }, [dispatch]);
      

  return (
    <div>
    <div className="mt-4">
         <h3 className="mb-4">liste de blog</h3>
         {loading ? ( // Affiche l'animation de chargement si loading est vrai
          <div className="loading-container">
            <ClipLoader color={'#123abc'} css={override} size={150} loading={loading} />
          </div>
        ) : (
          <Table columns={columns1} dataSource={data1} size="middle" />
        )}
       </div>
 
     </div>
  )
}

export default Vieworder