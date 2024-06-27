// src/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {isMobile} from 'react-device-detect';
// import {BrowserView, MobileView} from 'react-device-detect';


const LandingPage = () => {
    
    const navigate = useNavigate();

    const handleEnterClick = () => {
        navigate('/demo');
    };

    // renderContent = () => {
        if (isMobile) {
          return (
            <>
                <h1 className="mobile-message-title">Mobile Experience Coming Soon</h1>
                <p className="mobile-message-message">Please view on your fullscreen desktop for an optimal experience.</p>
            </>
          )
        }
        return (
            <>
                <div className="landing-container" onClick={handleEnterClick}>
                    <h1 className="enter-title">Welcome to the Govindji's VIP Experience</h1>
                        <button className="enter-button" onClick={handleEnterClick}>
                            Enter
                        </button>
                </div>
            </>
        )
    //   }

    // return (
    //     <>

        
    //         <MobileView className="mobile-message-container">
    //             <h1 className="mobile-message-title">Mobile Experience Coming Soon</h1>
    //             <p className="mobile-message-message">Please view on your fullscreen desktop for an optimal experience.</p>
    //         </MobileView>

    //         <BrowserView>
    //             <div className="landing-container" onClick={handleEnterClick}>
    //                 <h1 className="enter-title">Welcome to the Govindji's VIP Experience</h1>
    //                     <button className="enter-button" onClick={handleEnterClick}>
    //                         Enter
    //                     </button>
    //             </div>
    //         </BrowserView>
    //     </>
    // );
};

export default LandingPage;
