import React ,{useState}from "react";
import { Table } from 'antd';
import { Column } from '@ant-design/plots';

import { GrDescend } from "react-icons/gr";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Getmonth, Getmonth2, Getorders } from "../feature/auth/authslice";

function Dashbord() {
const [datas ,setdatas]=useState([])
  const columns1 = [
    {
      title: 'key',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'produit count',
      dataIndex: 'count',
    },
    {
      title: 'total prix',
      dataIndex: 'prixtotal',
    },
    {
      title: 'prix after descount',
      dataIndex: 'prixafterdescount',
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
  ];
  
  const config = {
    data: datas,
    color: '#DAAB3A',
    xField: 'type',
    yField: 'sales',
    label: {
        position: 'top',
        style: {
          fill:"#DAAB3A",
            opacity: 0.6,
        },
    },
    xAxis: {
        label: {
            autoHide: true,
            autoRotate: false,
        },
    },
    meta: {
        type: {
            alias: 'Month',
        },
        sales: {
            alias: 'Incomes',
        },
    },
};

const dispatch = useDispatch()
useEffect(()=>{
dispatch(Getmonth())
dispatch(Getmonth2())
dispatch(Getorders())

},[dispatch])
const dashstate = useSelector((state) => state?.auth?.Getmonthdetail);
const dashstate2 = useSelector((state) => state?.auth?.Getyears);
const order = useSelector((state) => state?.auth?.Getorders);
const data1 = [];
  for (let i = 0; i < order?.length; i++) {
    const orderItem = order[i]; // Obtenir l'élément de commande à l'index i
    
    data1.push({
      key:i+1,
        name: orderItem?.user.lastname,
        mobile: orderItem?.user.mobile,
        count: orderItem?.orderItems.length,
        prixtotal: orderItem?.totalPrice,
        prixafterdescount: orderItem?.totalPriceAfterdiscount,
        status: orderItem?.orderStatus
    });
}
useEffect(() => {
  let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let data2 = [];

  for (let i = 0; i < dashstate?.length; i++) {
    data2.push({
      type: monthNames[dashstate[i]?._id?.month],
      sales: dashstate[i]?.count
    });
  }

  setdatas(data2)



// Utilisez une boucle for pour parcourir order

}, [dashstate]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-3">
        
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className=""> total</p>
            <h4 className="mb-0">{dashstate2 && dashstate2[0]?.amount}DT</h4>
          </div>
          <div className="d-flex flex-column align-items-end ">
           
            <p className="mb-0">Montant total vendu</p>

          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className=""> total</p>
            <h4 className="mb-0">{dashstate2  && dashstate2[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end ">
          Total des orders
          </div>
        </div>
        
      </div>
      <div className="mt-4">
        <h3 className="mb-4"> statistique</h3>
        <Column {...config} />
        
      </div>
      <div className="mt-4">
        <h3 className="mb-4">commande récente</h3>
      <Table columns={columns1} dataSource={data1} size="middle" />
      </div>
   
    
    </>
  );
}

export default Dashbord
