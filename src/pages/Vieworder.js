import { css } from '@emotion/react';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { Getaorder, Udateorder } from '../feature/auth/authslice';

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;

function Vieworder() {
  const [loading, setLoading] = useState(true);
  const [data1, setData1] = useState([]);
  const [status, setstatus] = useState([])
    const columns1 = [
    {
      title: 'key',
      dataIndex: 'key',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'product',
      dataIndex: 'product',
    },
    {
      title: 'prix',
      dataIndex: 'prix',
    },
    {
      title: 'date',
      dataIndex: 'date',
    },
    {
      title: 'action',
      dataIndex: 'action',
    },
  ];
  const dispatch = useDispatch();
  const location = useLocation();
  const getid = location.pathname.split("/")[3];

  const orderstate = useSelector((state) => state?.auth?.Getaorder);
  const Udateorders =(a,b)=>{
    
       dispatch(Udateorder({a,b})); 
    
  }
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(Getaorder(getid));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, getid]);

  useEffect(() => {
    if (orderstate) {
      const dateStrFromAPI = orderstate?.createdAt;
      const dateObject = new Date(dateStrFromAPI);
      const formattedDate = `${dateObject.getFullYear()}-${padNumber(dateObject.getMonth() + 1)}-${padNumber(dateObject.getDate())} à ${padNumber(dateObject.getHours())}:${padNumber(dateObject.getMinutes())}:${padNumber(dateObject.getSeconds())}`;

      setData1([
        {
          name: orderstate?.user?.lastname,
          prix: orderstate?.totalPriceAfterdiscount,
          date: formattedDate,
          product: orderstate?.orderItems?.map(i => i?.product?.title).join(', '),
action: (
            
            <>
        <select
  className="form-select form-control"
  aria-label="Default select example"
  onChange={(e) => Udateorders(orderstate?._id,e.target.value)}
>
  <option value="En attente">En attente</option>
  <option value="En cours de traitement">En cours de traitement</option>
  <option value="Terminé">Terminé</option>
  <option value="Annulé">Annulé</option>
</select>


       
           </>
          )
        }
      ]);
    }
  }, [orderstate]);

  function padNumber(number) {
    return number.toString().padStart(2, '0');
  }


  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">liste de blog</h3>
        {loading ? (
          <div className="loading-container">
            <ClipLoader color={'#123abc'} css={override} size={150} loading={loading} />
          </div>
        ) : (
          <Table columns={columns1} dataSource={data1} size="middle" />
        )}
      </div>
    </div>
  );
}

export default Vieworder;
