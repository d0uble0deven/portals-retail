import { createRoot } from 'react-dom/client'
import { useRoute, useLocation } from 'wouter'
import './styles.css'
import { Logo } from '@pmndrs/branding'
import { App } from './App'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';

/*
Model JSX auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 model.glb --transform --simplify --resolution=2048
Author: Omar Faruq Tawsif (https://sketchfab.com/omarfaruqtawsif32)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
*/

function Root() {
  // get location coordinates here
  let userLocation
  if (navigator.geolocation) {
    userLocation = navigator.geolocation.getCurrentPosition(showPosition, handleError);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Latitude:", latitude, "Longitude:", longitude);
  }
  function handleError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.error("An unknown error occurred.");
        break;
    }
  }

  // starts pendo tracking
  window.pendo.initialize({
    visitor: {
        id: "<visitor-id-goes-here>",
        email: "<email-goes-here>",
        userPermissions: "<user-permissions-goes-here>",
    },

    account: {
        id: "<account-id-goes-here>",
        accountName: "<account-name-goes-here>",
        payingStatus: "<paying-status-goes-here>",
        location: userLocation, 
        accountValue: "<account-value-goes-here>",
    }
});
console.log('pendo init')

  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  console.log("params: " , params)
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/demo" element={<App />} />
            </Routes>
        </Router>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
          pmnd.rs
          <br />
          dev collective
        </a>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>15/06/2023</div>
        <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} />
        <a style={{ position: 'absolute', top: 30, left: 30, fontSize: '13px' }} href="/demo" onClick={() => setLocation('/')}>
          {params ? '< back' : 'double click to enter portal'}
        </a>
        <a style={{ position: 'absolute', top: 30, left: 1000, fontSize: '130px', color: '#214533' }} href="#" onClick={() => setLocation('/')}>
          Govindji's
        </a>


        <a style={{ position: 'absolute', bottom: 30, left: 30, fontSize: '13px' }} href="#" onClick={() => setLocation('/item/01')}>
          {((params !== null) && (params.id === '01')) ? 
            <div class="card">
              <ul>
                <span class="cardTitle">
                Lladro Sacred Cow Figurine 
                </span>
                <li>
                LL1360 
                </li>
                <li>
                Gloss finish porcelain figurine of a cow adorned with a diadem and necklace.
                </li>
                <li>
                $285
                </li>
              </ul>
            </div>
            :
            ''
          }
          </a>

        <a style={{ position: 'absolute', bottom: 30, left: 30, fontSize: '13px' }} href="#" onClick={() => setLocation('/item/02')}>
          {((params !== null) && (params.id === '02')) ? 
            <div class="card">
              <ul>
                <span class="cardTitle">
                18K Yellow Gold Diamond Ring 
                </span>
                <li>
                DR1146 
                </li>
                <li>
                Handcrafted 18K White Gold Diamond Band
                </li>
                <li>
                Diamond Weight: 0.45ct
                </li>
                <li>
                $1,807
                </li>
              </ul>
          </div>
          :
          ''
        }
                </a>



        <a style={{ position: 'absolute', bottom: 30, left: 30, fontSize: '13px' }} href="#" onClick={() => setLocation('/item/03')}>
          {((params !== null) && (params.id === '03')) ? 
            <div class="card">
              <ul>
                <span class="cardTitle">
                18K Yellow Gold Diamond Ring 
                </span>
                <li>
                DR1146 
                </li>
                <li>
                Handcrafted 18K White Gold Diamond Band
                </li>
                <li>
                Diamond Weight: 0.45ct
                </li>
                <li>
                $1,807
                </li>
              </ul>
          </div>
            :
            ''
          }
        </a>


        <a style={{ position: 'absolute', bottom: 30, left: 30, fontSize: '13px' }} href="#" onClick={() => setLocation('/item/04')}>
          {((params !== null) && (params.id === '04')) ? 
                <div class="card">

                <ul>
                  <span class="cardTitle">
                  Tag Heuer Carrera Chronograph 
                  </span>
                  <li>
                  CBS2216.BA0041 
                  </li>
                  <li>
                  Automatic, 39 mm, Steel
                  </li>
                  <li>
                  Embrace the rebirth of a legend with the TAG Heuer Carrera Chronograph in 39mm. Paying tribute to the iconic ‘Panda' look of the sought-after Heuer 7753 SN, this distinctive watch blends classic allure with a bold glassbox design for a new era of racing and heritage enthusiasts.
                  </li>
                  <li>
                  $6,650.00
                  </li>
                </ul>

              </div>

            :
            ''
          }
        </a>




              </div>{' '}
    </>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
