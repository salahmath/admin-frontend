


import React, { useEffect, useState } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import custermerService from '../feature/customrs/customerservice';
import { getUsers } from '../feature/customrs/customerslice';
const columns1 = [
  {
    title: 'key ',
    dataIndex: 'key',
  },
    {
      title: 'nom et prenom' ,
      dataIndex: 'lastname',
      defaultSortOrder:"descend",
      sorter:(a,b) =>a.lastname.length - b.lastname.length,
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'mobile',
      dataIndex: 'mobile',
    },
    
  ];

  
function Client() {
      
        const dispatch = useDispatch();
        useEffect(()=>{
          dispatch(getUsers())
          
        },[])
        
        const customerState = useSelector((state) => state.customer.customers);
        
        const data1 = customerState
          .filter(customer => customer.role !== "admin")
          .map((customer, index) => ({
            key: index + 1,
            lastname: `${customer.lastname} ${customer.Secondname}`,
            email: customer.email,
            mobile: customer.mobile,
          }));
        
       
  return (
    <div>
    <div className="mt-4">
         <h3 className="mb-4">liste de clients</h3>
       <Table columns={columns1} dataSource={data1} size="middle" />
       </div>
 
     </div>
  )
}

export default Client