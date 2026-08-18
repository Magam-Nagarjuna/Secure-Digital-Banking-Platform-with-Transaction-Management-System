import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../DisplayView.css';


const BackButton = ({ onClick, label = 'Return Back' }) => {
    const navigate = useNavigate();
    const handleBack = onClick || (() => navigate(-1));

    return (

        <button
            type="button"
            className="back-btn"
            onClick={handleBack}
        >

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {label}

        </button>

    );

};

export default BackButton;
