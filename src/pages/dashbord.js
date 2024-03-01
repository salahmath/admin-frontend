import React from "react";
import { Divider, Table } from 'antd';
import { Column } from '@ant-design/plots';

import { GrDescend } from "react-icons/gr";
function Dashbord() {
  const columns1 = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data1 = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ];
  const data = [
    {
      type: 'Janvier',
      sales: 38,
    },
    {
      type: 'Fevrier',
      sales: 180,
    },
    {
      type: 'Mars',
      sales: 61,
    },
    {
      type: 'Avril',
      sales: 145,
    },
    {
      type: 'Mai',
      sales: 48,
    },
    {
      type: 'Juin',
      sales: 32,
    },
    {
      type: 'Juilliet',
      sales: 48,
    },
    {
      type: 'Out',
      sales: 28,
    },
    {
      type: 'Septembre',
      sales: 88,
    },
    {
      type: 'October',
      sales: 98,
    },
    {
      type: 'November',
      sales: 18,
    },
    {
      type: 'December',
      sales: 8,
    },
    
  ];
  
  const config = {
    data,
    color: ({ type }) => {
        return '#9c9a4c'; // Correction : retirez !important
    },
    xField: 'type',
    yField: 'sales',
    
    label: {
      position: 'top',
      style: {
        fill: "#ffffff",
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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className=""> total</p>
            <h4 className="mb-0">100dt</h4>
          </div>
          <div className="d-flex flex-column align-items-end ">
            <h6 className="color">
              <GrDescend />
              20%
            </h6>

            <p className="mb-0">comparer avec le mois precedent</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className=""> total</p>
            <h4 className="mb-0">100dt</h4>
          </div>
          <div className="d-flex flex-column align-items-end ">
            <h6 className="color">
              <GrDescend />
              20%
            </h6>

            <p className="mb-0">comparer avec le mois precedent</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className=""> total</p>
            <h4 className="mb-0">100dt</h4>
          </div>
          <div className="d-flex flex-column align-items-end ">
            <h6   className="color">
              <GrDescend />
              20%
            </h6>

            <p className="mb-0">comparer avec le mois precedent</p>
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
