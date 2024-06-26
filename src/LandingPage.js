// src/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    
    const navigate = useNavigate();

    const handleEnterClick = () => {
        navigate('/demo');
    };

    return (
        <div className="landing-container" onClick={handleEnterClick}>
            <h1 className="enter-title">Welcome to the Govindji's VIP Experience</h1>
                <button className="enter-button" onClick={handleEnterClick}>
                    Enter
                </button>
        </div>
    );
};

export default LandingPage;
