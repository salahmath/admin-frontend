import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function Customlogin(props) {
  const { type, Label, id, className , name , val, onChange, onBlur } = props;

  return (
    <div className='mt-3'>
    <FloatingLabel label={Label}  className={className} >
    <Form.Control type={type} placeholder={Label} value={val} id={id} name={name}  onChange={onChange} onBlur={onBlur}  />
    </FloatingLabel>
    </div>
  );
}

export default Customlogin;