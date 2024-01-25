import { useGLTF , useAnimations,PerspectiveCamera} from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import * as THREE from 'three'

import { TextureLoader } from "three";
import { ref } from "valtio";

export default function Sitecontext() {
  const group = useRef()
  const sitecontextRef = useRef()
  let img1 = './images/hotspot.png'
  let img2 = './images/B100.png'; // Change this to the path of your other texture
  let img3 = './images/B200.png'
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  const hotspottex = useLoader(TextureLoader, img1);
  const hotspottexHovered = useLoader(TextureLoader, img2);
  const hotspottexHovered1 = useLoader(TextureLoader, img3);

  const viewtex = useLoader(TextureLoader, './images/360view.png');
  const siteContext = useGLTF("./00_Chakan_V_Combined_With_Camera.glb");
  // const {nodes, materials , animations} = useGLTF("./00_Chakan_V_Combined_With_Camera.glb");
  
   const {actions} = useAnimations(siteContext.animations,group)
  console.log(actions["MainCameraAltAction"])
   useEffect(() => void (actions["MainCameraAltAction"].play()), [])
 

 
 
  
  //  const [clicked, setClicked] = useState(false)
  // const vec = new THREE.Vector3()
  // useEffect(() => void (actions["MainCameraAltAction"].play().paused = false), [])

  

   

  useFrame((state, delta) => {
    
    actions["MainCameraAltAction"].time = THREE.MathUtils.lerp(actions["MainCameraAltAction"].time, actions["MainCameraAltAction"].getClip().duration * delta, 0.05)
  //   const et = state.clock.elapsedTime


  //   // Continuous rotation animation
    // sitecontextRef.current.rotation.x += 0.0001 * delta; // Adjust the rotation speed as needed

    // const radius = 20;
    // const angle = state.clock.elapsedTime * 0.1; // Adjust the speed of rotation

    // const x = Math.sin(angle) * radius;
    // const z = Math.cos(angle) * radius;

    // state.camera.position.set(x, 15, z);
    // state.camera.lookAt(sitecontextRef.current.position);
    // state.camera.updateProjectionMatrix();

    // // Camera animation
    // state.camera.lookAt(sitecontextRef.current.position);
    // state.camera.position.lerp(new THREE.Vector3(31.401, 13.534, 42.827), 0.2);
    // state.camera.updateProjectionMatrix();

    //  // Camera animation
    //  state.camera.lookAt(sitecontextRef.current.position);
    //  state.camera.position.lerp(new THREE.Vector3(-9.624, 3.417, -4.656), 0.2);
    //  state.camera.updateProjectionMatrix();

     
    //  // Camera animation
    //  state.camera.lookAt(sitecontextRef.current.position);
    //  state.camera.position.lerp(new THREE.Vector3(-2.254, 4.107, -10.756), 0.2);
    //  state.camera.updateProjectionMatrix();

    //  // Camera animation
    //  state.camera.lookAt(sitecontextRef.current.position);
    //  state.camera.position.lerp(new THREE.Vector3(6.601, 3.308, 15.383), 0.2);
    //  state.camera.updateProjectionMatrix();

    //  // Camera animation
    //  state.camera.lookAt(sitecontextRef.current.position);
    //  state.camera.position.lerp(new THREE.Vector3(12.437, 4.9, 16.587), 0.2);
    //  state.camera.updateProjectionMatrix();



     
  });

  // useFrame((state, delta) => {
  //   // Continuous rotation animation
  //   sitecontextRef.current.rotation.y += 0.005 * delta; // Adjust the rotation speed as needed

  //   // Camera animation when not clicked
  //   state.camera.lookAt(sitecontextRef.current.position);
  //   state.camera.position.lerp(new THREE.Vector3(-15, 15,15), 0.2);
  //   state.camera.updateProjectionMatrix();
  // });

  // useFrame(state => {
  //   if (clicked) {
  //     state.camera.lookAt(sitecontextRef.current.position)
  //     state.camera.position.lerp(vec.set(-15, 10, 10), .2)
  //     state.camera.updateProjectionMatrix()
      
  //   }
  //   return null
  // })
  // // useFrame(state => {
  // //   if (!clicked) {
  // //     state.camera.lookAt(sitecontextRef.current.position)
  // //     state.camera.position.lerp(vec.set(-15, 25, 25), .2)
  // //     state.camera.updateProjectionMatrix()
  // //   }
  // //   return null
  // // })


  return <>

    <mesh

      position={[-2.5, 3, 10]}
      rotation={[-0.698132, 0, 0]}
      ref={sitecontextRef}
      
      onPointerOver={() => setHovered2(true)} 
      onPointerOut={() => setHovered2(false)} 
      scale={10}
    >
      <circleGeometry args={[0.07, 32]} />
      <meshBasicMaterial
        map={hovered2 ? hotspottexHovered1 : hotspottex} 
        toneMapped={false}
        transparent={true}
      />
    </mesh>

      <mesh

        position={[-8.2, 3, 8]}
        rotation={[-0.698132, 0, 0]}
        ref={sitecontextRef}

        onPointerOver={() => setHovered1(true)} 
        onPointerOut={() => setHovered1(false)} 
        scale={10}
        >
        <circleGeometry args={[0.07, 32]} />
        <meshBasicMaterial
          map={hovered1 ? hotspottexHovered : hotspottex} 
          toneMapped={false}
          transparent={true}
        />
  </mesh>
    
    <mesh

      position={[-6.9, 3,13]}
      rotation={[-0.698132, 0, 0]}
      onClick={() => (
        console.log('Clicked 360 view'),
        document.getElementById('popupdarkbg').style.display = 'block',
        document.getElementById('popup').style.display = 'block',
        document.getElementById('popupiframe').src = 'https://equanimoustech.com/Indospace/VR1/'
      )}
      scale={10}
    >
      <circleGeometry args={[0.07, 32]} />
      <meshBasicMaterial
         map={viewtex}
        //  toneMapped={false}
          transparent={true}
      />
    </mesh>
   {/* <group ref={group} dispose={null}>  */}
   <group name="Camera" position={[-1.78, 2.04, 23.58]} rotation={[1.62, 0.01, 0.11]}>
   <PerspectiveCamera makeDefault far={100} near={0.1} fov={28} rotation={[-Math.PI /2,0,0]}>
    </PerspectiveCamera>
    </group>

    {/* </group> */}

    <primitive castShadow object={siteContext.scene} />
    
  </>



}

// useGLTF.preload("./00_Chakan_V_Combined_With_Camera.glb")