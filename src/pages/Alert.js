import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';

function Alert() {
  const [showModal, setShowModal] = useState(true); // Initialisé à true pour montrer la modal

  const navigate = useNavigate()
  const closeModal = () => {
    setShowModal(false);
    navigate("/admin")
  };
  
  const navigateToList = () => {
   navigate("/admin")
  };

  return (
    <div>
      {showModal && (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={navigateToList}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alert;
