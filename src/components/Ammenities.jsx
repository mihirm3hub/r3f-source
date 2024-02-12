import { useGLTF } from "@react-three/drei";
import React, { useRef, useEffect, useState } from "react";
let isOpen = false;

// const vehiclesbtnImage = document.getElementById('vehiclesbtn');
export default function Ammenities() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    console.log('amneties visibility', isVisible)
    setIsVisible(!isVisible);
    // isOpen = !isOpen;
    // isOpen = false;
  };
  const turnOffVisibility = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    // This effect runs after the component mounts
    // You can perform side effects here
    // In this case, we're toggling visibility when the component mounts
    toggleVisibility();
    turnOffVisibility();
  }, []);
  const ammenities = useGLTF("./04_Ammenities_Overlay_R1.glb");
  const amenitySwitch = document.getElementById('amenitySwitch')
  amenitySwitch.addEventListener('click', toggleVisibility)
  // document.getElementById('vehiclesbtn').addEventListener('click',toggleVisibility)
  // document.getElementById('scenebtn').addEventListener('click',turnOffVisibility)
  return <>
    <directionalLight castShadow intensity={isVisible ? 0 : 1} color={'#fffaed'} position={[3, 45, 5]} shadow-mapSize={[1024, 1024]} shadow-normalBias={-0.95} shadow-bias={-0.00050}>
      <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
    </directionalLight>


    {isVisible && <primitive object={ammenities.scene} />}

  </>
}