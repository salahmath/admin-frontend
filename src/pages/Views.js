import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { geteteenquirys } from '../feature/enquiry/enquiryslice';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles.css'; // Fichier CSS pour les styles personnalisés
import { Form, Button } from 'react-bootstrap';
import { Table } from 'antd';
import { ToastContainer } from 'react-toastify';

function Views() {
  const location = useLocation();
  const getidenq = location.pathname.split("/")[3];
  const enqstate = useSelector((state) => state.enquiry);
  const { get_a_enquiry } = enqstate;
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    },
  ];
  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
    },
    {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    },
  ];
  useEffect(() => {
    dispatch(geteteenquirys(getidenq));
  }, [dispatch, getidenq]);

  return (
    <div className="container mt-5">
    <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
      <div className="card">
        <div className="card-header bg-primary text-white">
          Détails de l'enquête
        </div>
        <div className="card-body custom-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email" className="custom-label">Email :</label>
                <div className="custom-value"></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="mobile" className="custom-label">Mobile :</label>
                <div className="custom-value">{get_a_enquiry.mobile}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nom" className="custom-label">Nom :</label>
                <div className="custom-value">{get_a_enquiry.name}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="status" className="custom-label">Statut du client :</label>
                <div className="custom-value">{get_a_enquiry.status}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="commentaire" className="custom-label">Commentaire :</label>
                <div className="custom-value">{get_a_enquiry.comment}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
  <h2>Formulaire de contact</h2>
  <Form>
    <Form.Group>
      <Form.Label>Nom</Form.Label>
      <Form.Control type="text" name="name" value={`name : ${get_a_enquiry.name}`}  />
    </Form.Group>
    <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" name="email" value={`email : ${get_a_enquiry.email}`} />
    </Form.Group>
    <Form.Group>
      <Form.Label>Message</Form.Label>
      <Form.Control as="textarea" name="message" value={`message : ${get_a_enquiry.message}`} />
    </Form.Group>
    <Button variant="primary" type="submit">Envoyer</Button>
  </Form>
</div>
<div>
  <h2>Formulaire de contact</h2>
  <Form>
    <Form.Group>
      <Form.Label>Nom :</Form.Label>
      <Form.Control type="text" name="name" value={get_a_enquiry.name}  />
    </Form.Group>
    <Form.Group>
      <Form.Label>Email :</Form.Label>
      <Form.Control type="email" name="email" value={get_a_enquiry.email} />
    </Form.Group>
    <Form.Group>
      <Form.Label>Message :</Form.Label>
      <Form.Control as="textarea" name="message" value={get_a_enquiry.message} />
    </Form.Group>
    <Button variant="primary" type="submit">Envoyer</Button>
  </Form>
</div>



    </div>
  );
}

export default Views;
