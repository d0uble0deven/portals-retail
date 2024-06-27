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
        {/* <Html
                position={ [ 0, 0, 0] }
                wrapperClass="label"
                center
                distanceFactor={ 40 }
                // occlude={ [ sphere, cube ] }
                // onOcclude={(hidden) => null}
              >
                <img
  class="fit-picture"
  src="legacy.png"
  alt="Grapefruit slice atop a pile of other slices" />
                <div class="card">
                Govindji’s mission statement consists of five segments, all with equal emphasis
To provide a shopping environment that optimally enhances the experience of shopping. This is achieved through providing a high level of guest hospitality in an elegant, friendly, high-luxury setting.
Providing the highest level of product quality and also providing a full depth of product selection, surpassing all competitors.
Adhering to the highest ethical standard in conducting business.
A fixed pricing policy by providing the most competitive price upfront.
Promoting the Govindji’s name by always adhering to these values.

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
                            
              </Html> */}
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
