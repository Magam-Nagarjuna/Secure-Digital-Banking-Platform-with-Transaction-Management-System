import React from 'react';
import '../../DisplayView.css';

/**
 * Centered popup modal — replacement for window.alert().
 *
 * Usage:
 *   const [modal, setModal] = useState({ open:false, title:'', message:'', type:'info' });
 *   setModal({ open:true, title:'Notice', message:'Customer Already Existed.......', type:'info' });
 *   <Modal
 *      open={modal.open}
 *      title={modal.title}
 *      message={modal.message}
 *      type={modal.type}
 *      onClose={() => setModal({ ...modal, open:false })}
 *   />
 */
const Modal = ({ open, title, message, type = 'info', onClose }) => {

    if (!open) return null;

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal-box"
                onClick={(e) => e.stopPropagation()}
            >

                <div className={`modal-icon ${type === 'error' ? 'modal-icon-error' : 'modal-icon-info'}`}>
                    {type === 'error' ? '⚠️' : 'ℹ️'}
                </div>

                {
                    title &&
                    <h3 className="modal-title">
                        {title}
                    </h3>
                }

                <p className="modal-message">
                    {message}
                </p>

                <div className="modal-actions">

                    <button
                        type="button"
                        className="fin-btn modal-ok-btn"
                        onClick={onClose}
                    >
                        OK
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Modal;
