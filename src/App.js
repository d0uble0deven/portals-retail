import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text, Preload, Html } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import { suspend } from 'suspend-react'

extend(geometry)
const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

export const App = () => (
  <>

    <Canvas camera={{ fov: 75, position: [0, 0, 20] }} eventSource={document.getElementById('root')} eventPrefix="client">
        <color attach="background" args={['#f0f0f0']} />

        <Frame id="01" name={`cow`} author="Lladro" bg="#e4cdac" position={[-1.15, 2, 0]} rotation={[0, 0.5, 0]}>
                  <GltfPortal scale={2} position={[0, -2.7, -10]}/>

          {/* <pointLight position={[0, 0, 5]} intensity={1} color="#fff" />
          <Gltf src="cow/COW.gltf" scale={8} position={[0, -10.7, -20]} />
          <pointLight position={[0, 0, -5]} intensity={1} color="#fff" /> */}

          {/* <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} /> */}
        </Frame>

        {/* <Portal>
          <Frame id="modelMap." name={`pick\nles`} author="Omar Faruq Tawsif" bg="#e4cdac" position={[-1.15, 2, 0]} rotation={[0, 0.5, 0]}>
            <Gltf>

            </Gltf>
          </Frame>
        </Portal> */}

      <Frame id="02" name="ring" author="Exquisite Radiance" position={[0, 2, 0]} bg="#e4cdac">
        {/* <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} /> */}
        <pointLight position={[2, 2, -6]} intensity={15} color="#fff" /> 
        <Gltf src="ring2/ring.gltf" scale={8} position={[0, 0, -5]} />
        <pointLight position={[-2, -2, -6]} intensity={15} color="#fff" />
      </Frame>

      <Frame id="03" name="ring 2" author="Anonymous" bg="#d1d1ca" position={[1.15, 2, 0]} rotation={[0, -0.5, 0]}>
        {/* <pointLight position={[0, 10, -5]} intensity={1} color="#fff" /> */}
        {/* <Gltf src="black_watch.glb" scale={2} position={[0, 0, -15]} /> */}
        <Gltf src="Engagement_9mm.glb" scale={0.15} position={[0, -2, 0]} />
        {/* <Gltf src="cybertruck/cybertruck.glb" scale={2} position={[0, 0, -15]} /> */}
        {/* <GltfPortal scale={0.15} position={[0,0,0]}/> */}
      </Frame>





      <Frame id="04" name={`watch`} author="Tag Heuer" bg="#e4cdac" position={[-1.15, 0, 0]} rotation={[0, 0.5, 0]}>
        {/* <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} /> */}
        {/* <ambientLight /> */}
        <pointLight position={[0, 5, -10]} intensity={3} color="#fff" />
        <Gltf src="WatchUpdate/WATCH fin.gltf" scale={8} position={[0, -5, -10]} />
        {/* <Gltf src="Watch/WATCH 2.gltf" scale={8} position={[0, -10.7, -20]} /> */}
        <pointLight position={[0, -7, 10]} intensity={3} color="#fff" />
        {/* <directionalLight
          position={[0, 0, 0]}
          castShadow
          intensity={Math.PI * 2}
        /> */}
      </Frame>
      <Frame id="05" name="tea" author="Omar Faruq Tawsif">
        <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
      </Frame>
      <Frame id="06" name="still" author="Omar Faruq Tawsif" bg="#d1d1ca" position={[1.15, 0, 0]} rotation={[0, -0.5, 0]}>
        <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} />
      </Frame>



      <Frame id="07" name={`pick\nles`} author="Omar Faruq Tawsif" bg="#e4cdac" position={[-1.15, -2, 0]} rotation={[0, 0.5, 0]}>
      <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} />
    </Frame>
    <Frame id="08" name="tea" author="Omar Faruq Tawsif" position={[0, -2, 0]}>
      <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
    </Frame>
    <Frame id="09" name="still" author="Omar Faruq Tawsif" bg="#d1d1ca" position={[1.15, -2, 0]} rotation={[0, -0.5, 0]}>
      <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} />
    </Frame>


      {/* <Frame id="08" name="diner" author="Waffle House" position={[-1.15, -2, 0]} rotation={[0, 0.5, 0]}>
        <Gltf src="Diner.glb" scale={0.25} position={[20, -2, 0]} />
        <pointLight position={[0, 10, -5]} intensity={1} color="#fff" />
      </Frame> */}
      {/* <Frame id="09" name="cyber" author="Elon Musk" bg="#d1d1ca" position={[1.15, -2, 0]} rotation={[0, -0.5, 0]}>
        <Gltf src="cybertruck/cybertruck_wrap.gltf" scale={1} position={[-3, -2, -5]} />
        <pointLight position={[0, 10, -5]} intensity={1} color="#fff" />
      </Frame> */}

      <Rig />
      <Preload all />
    </Canvas>

  </>
)

function GltfPortal({scale, position}){
  const currentUrl = window.location.href;


  return (
  <>
      <pointLight position={[0, 1, -19]} intensity={1} color="#fff" />
      <Gltf src="cow/COW.gltf" scale={scale} position={position} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#fff" />
      {/* <Gltf src="Engagement_9mm.glb" scale={scale} position={position} /> */}

      {/* use if param in url address to hide show details */}
  {/* {
    currentUrl[currentUrl.length-1] === '1' ? 
      (
        <Html
          position={ [ 10, -2, -1 ] }
          wrapperClass="label"
          center
          distanceFactor={ 70 }
          // occlude={ [ sphere, cube ] }
          // onOcclude={(hidden) => null}
        >
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
                      
        </Html>
      )
      : 
        null
  }

  {
    currentUrl[currentUrl.length-1] === '2' ? 
      (
                <Html
                position={ [ 10, -5, -1 ] }
                wrapperClass="label"
                center
                distanceFactor={ 40 }
                // occlude={ [ sphere, cube ] }
                // onOcclude={(hidden) => null}
              >
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
                            
              </Html>
      )
      : 
        null
  }
  {
    currentUrl[currentUrl.length-1] === '3' ? 
      (
                <Html
                position={ [ 10, -5, -1 ] }
                wrapperClass="label"
                center
                distanceFactor={ 40 }
                // occlude={ [ sphere, cube ] }
                // onOcclude={(hidden) => null}
              >
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
                            
              </Html>
      )
      : 
        null
  }
  {
    currentUrl[currentUrl.length-1] === '4' ? 
      (
                <Html
                position={ [ 10, -5, -1 ] }
                wrapperClass="label"
                center
                distanceFactor={ 40 }
                // occlude={ [ sphere, cube ] }
                // onOcclude={(hidden) => null}
              >
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
                            
              </Html>
      )
      : 
        null
  } */}

  
  



  {
    parseInt(currentUrl[currentUrl.length-1]) ? 
      (
        <Html
          position={ [ -1, -1, 1 ] }
          wrapperClass="label"
          center="false"
          distanceFactor={ 12 }
          // occlude={ [ sphere, cube ] }
          // onOcclude={(hidden) => null}
        >


                      
            {/* The current URL is: {currentUrl} */}
        </Html>
      )
      : 
        null
  }


    {/* <Text
    font="./bangers-v20-latin-regular.woff"
    fontSize={ 1 }
    color="salmon"
    position-y={ 2 }
    maxWidth={ 2 }
>
    I LOVE R3F
</Text> */}

    {/* <Float>
    <Text
        font="./bangers-v20-latin-regular.woff"
        fontSize={ 1 }
        color="salmon"
        position-y={ 2 }
        maxWidth={ 2 }
        textAlign="center"
    >
        I LOVE R3F
    </Text>
</Float> */}

{/* 
{
    currentUrl[currentUrl.length-1] === '9' ? 
      (
        <Html
          position={ [ 1, -0.5, -1 ] }
          wrapperClass="label"
          center
          distanceFactor={ 8 }
          // occlude={ [ sphere, cube ] }
          // onOcclude={(hidden) => null}
        >

          <p style={{color: "#204030"}}>

            Stainless Steel Body, 
            Fully electric, dual motor engine

            $102,600 =&gt; $98,807

          </p>
                      
        </Html>
      )
      : 
        null
  }
  {
    currentUrl[currentUrl.length-1] === '8' ? 
      (
        <Html
          position={ [ 2, -2.5, -2 ] }
          wrapperClass="label"
          center
          distanceFactor={ 15 }
          // occlude={ [ sphere, cube ] }
          // onOcclude={(hidden) => null}
        >

          <ul style={{color: "cornflowerblue"}}>

            <li>
              HAPPY HOUR MON-THURS 5-6PM · FRI-SUN 4-5PM
              **consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness
              *we are a gluten-free kitchen
              ***food allergy notice: please be advised that food prepared here may contain these ingredients: milk, eggs, soybean, peanuts, tree nuts
            </li>

          </ul>
                      
        </Html>
      )
      : 
        null
  }
  {
    currentUrl[currentUrl.length-1] === '8' ? 
      (
        <Html
          position={ [ 0, -0.5, 0 ] }
          wrapperClass="label"
          center
          distanceFactor={ 15 }
          // occlude={ [ sphere, cube ] }
          // onOcclude={(hidden) => null}
        >

          <ul style={{color: "magenta"}}>

            <li>
              COMIDAS
              <ul>
              GUACAMOLE 9
              serrano, onion, herbs, olive oil, lime
              </ul>
              <ul>
              TACOS DE PESCADO 9
              morita blackened, chipotle aioli,
              pickled cabbage, sesame
              </ul>
              <ul>
              TACOS DE PUERCO 9
              carnitas, salsa verde, cilantro, onion
              </ul>
              <ul>
              TAMAL 9
              acorn squash masa,
              seared calabacita, cilantro salad
              </ul>
            </li>

          </ul>
                      
        </Html>
      )
      : 
        null
  }
  {
    currentUrl[currentUrl.length-1] === '8' ? 
      (
        <Html
          position={ [ 2, 2.5, 2 ] }
          wrapperClass="label"
          center
          distanceFactor={ 15 }
          // occlude={ [ sphere, cube ] }
          // onOcclude={(hidden) => null}
        >

          <ul style={{color: "#FEBE10"}}>

            <li>
              BEBIDAS
              <ul>
              MARGARITA DE LA CASA 10
              lunazul blanco, lime, agave
              </ul>
              <ul>
              MEZCAL PALOMA 10
              rosaluna, grapefruit, lime, lady bird grapefruit
              </ul>
            </li>

          </ul>
                      
        </Html>
      )
      : 
        null
  } */}

</>
  )


}

function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }) {
  const portal = useRef()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))
  return (
    <group {...props}>
      <Text font={suspend(medium).default} fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
        {name}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
        /{id}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
        {author}
      </Text>
      <mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
  const { controls, scene } = useThree()
  const [, params] = useRoute('/item/:id')
  useEffect(() => {
    const active = scene.getObjectByName(params?.id)
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25))
      active.parent.localToWorld(focus.set(0, 0, -2))
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })
  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}
