import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";
let isOpen = false;

// const vehiclesbtnImage = document.getElementById('vehiclesbtn');
export default function Ammenities(props) {
  const modelRef1 = useRef();
  const modelRef2 = useRef();
  const modelRef3 = useRef();
  const modelRef4 = useRef();
  const modelRef5 = useRef();
  const modelRef6 = useRef();
  const modelRef7 = useRef();
  const modelRef8 = useRef();
  const modelRef9 = useRef();
  const modelRef10 = useRef();
  const modelRef11 = useRef();
  const modelRef12 = useRef();
  const modelRef13 = useRef();
  const modelRef14 = useRef();
  const modelRef15 = useRef();
  const modelRef16 = useRef();
  const modelRef17 = useRef();
  const modelRef18 = useRef();
  const modelRef19 = useRef();
  const modelRef20 = useRef();
  const modelRef21 = useRef();
  const { nodes, materials } = useGLTF("/04_Ammenities_Overlay_R1.glb");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    console.log('amneties visibility', isVisible)
    // isOpen = !isOpen;
    // isOpen = false;
  };
  // const turnOffVisibility = () => {
  //   setIsVisible(false);
  // };
  // useEffect(() => {
  //   // This effect runs after the component mounts
  //   // You can perform side effects here
  //   // In this case, we're toggling visibility when the component mounts
  //   toggleVisibility();
  //   console.log("EFFECT");
  //   // turnOffVisibility();
  // }, []);
  // const ammenities = useGLTF("./04_Ammenities_Overlay_R1.glb");
  const amenitySwitch = document.getElementById('amenitySwitch')
  amenitySwitch.addEventListener('click', toggleVisibility)
  // document.getElementById('vehiclesbtn').addEventListener('click',toggleVisibility)
  // document.getElementById('scenebtn').addEventListener('click',turnOffVisibility)
  // useFrame(state => {
  //   modelRef1?.current?.lookAt(state.camera.position)
  //   modelRef2?.current?.lookAt(state.camera.position)
  //   modelRef3?.current?.lookAt(state.camera.position)
  //   modelRef4?.current?.lookAt(state.camera.position)
  //   modelRef5?.current?.lookAt(state.camera.position)
  //   modelRef6?.current?.lookAt(state.camera.position)
  //   modelRef7?.current?.lookAt(state.camera.position)
  //   modelRef8?.current?.lookAt(state.camera.position)
  //   modelRef9?.current?.lookAt(state.camera.position)
  //   modelRef10?.current?.lookAt(state.camera.position)
  //   modelRef11?.current?.lookAt(state.camera.position)
  //   modelRef12?.current?.lookAt(state.camera.position)
  //   modelRef13?.current?.lookAt(state.camera.position)
  //   modelRef14?.current?.lookAt(state.camera.position)
  //   modelRef15?.current?.lookAt(state.camera.position)
  //   modelRef16?.current?.lookAt(state.camera.position)
  //   modelRef17?.current?.lookAt(state.camera.position)
  //   modelRef18?.current?.lookAt(state.camera.position)
  //   modelRef19?.current?.lookAt(state.camera.position)
  //   modelRef20?.current?.lookAt(state.camera.position)
  //   modelRef21?.current?.lookAt(state.camera.position)
  // })

  return <>
    <directionalLight castShadow intensity={isVisible ? 0 : 1} color={'#fffaed'} position={[3, 45, 5]} shadow-mapSize={[1024, 1024]} shadow-normalBias={-0.95} shadow-bias={-0.00050}>
      <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
    </directionalLight>


    {isVisible && 
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Truck_parking004.geometry}
        material={materials["M_Parking_INFO.001"]}
        position={[1.05, 1.285, -3.422]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_ServiceRoadLine.geometry}
        material={materials["Blue_01.001"]}
        position={[-12.378, 1.633, 13.28]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_PARKING_B500.geometry}
        material={materials["M_Parking_INFO.001"]}
        position={[1.05, 1.285, -3.422]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_PARKING_B400.geometry}
        material={materials["M_Parking_INFO.001"]}
        position={[1.05, 1.285, -1.992]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_PARKING_B300.geometry}
        material={materials["M_Parking_INFO.001"]}
        position={[-12.378, 1.611, 13.28]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_PARKING_B200.geometry}
        material={materials["M_Parking_INFO.001"]}
        position={[-12.378, 1.611, 13.28]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_PARKING_B100.geometry}
        material={materials["M_Parking_INFO.001"]}
        position={[1.05, 1.856, 11.686]}
        scale={0.051}
      />
      <group position={[-11.772, 1.142, 13.166]} scale={0.051}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh017.geometry}
          material={materials["Red_01.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh017_1.geometry}
          material={materials["Yellow_01.001"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_AMENITIES_05.geometry}
        material={materials["M_Amenities_INFO.001"]}
        position={[17.665, 1.707, 0.253]}
        rotation={[0, 0.371, 0.04]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_AMENITIES_04001.geometry}
        material={materials["M_Amenities_INFO.001"]}
        position={[0.347, 1.194, -9.196]}
        rotation={[0, 0, 0.04]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_AMENITIES_04.geometry}
        material={materials["M_Amenities_INFO.001"]}
        position={[3.697, 1.328, -9.516]}
        rotation={[0, 0, 0.04]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_AMENITIES_03.geometry}
        material={materials["M_Amenities_INFO.001"]}
        position={[-10.623, 1.714, -7.028]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_AMENITIES_02.geometry}
        material={materials["M_Amenities_INFO.001"]}
        position={[6.356, 1.856, 13.169]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_INFO_AMENITIES_01.geometry}
        material={materials["M_Amenities_INFO.001"]}
        position={[1.05, 1.856, 13.169]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Orange_Line.geometry}
        material={materials["Orange_01.001"]}
        position={[-12.378, 1.642, 13.28]}
        scale={0.051}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Car_Parking.geometry}
        material={materials["Magenta_01.001"]}
        position={[10.732, 1.648, 11.602]}
        scale={0.051}
      />
      <mesh
        ref={modelRef1}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_UtilityBlock.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[-0.959, 1.952, 13.284]}
        scale={0.051}
      />
      <mesh
        ref={modelRef2}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_TruckApron003.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[-0.052, 1.231, -3.401]}
        scale={0.051}
      />
      <mesh
        ref={modelRef3}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_TruckApron002.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[10.918, 1.956, 9.008]}
        scale={0.051}
      />
      <mesh
        ref={modelRef4}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_TruckApron001.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[-6.382, 1.956, 9.008]}
        scale={0.051}
      />
      <mesh
        ref={modelRef5}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_TruckApron.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[3.372, 1.956, 11.957]}
        scale={0.051}
      />
      <mesh
        ref={modelRef6}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_StaffBarking_2.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[-10.664, 1.996, -7.074]}
        scale={0.051}
      />
      <mesh
        ref={modelRef7}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_StaffBarking_1.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[3.315, 1.594, -9.552]}
        scale={0.051}
      />
      <mesh
        ref={modelRef8}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_StaffBarking.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[17.535, 1.956, 0.321]}
        scale={0.051}
      />
      <mesh
        ref={modelRef9}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_SewageTreatmentPlant.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[1.447, 1.34, -9.632]}
        scale={0.051}
      />
      <mesh
        ref={modelRef10}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_ServiceRoad.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[13.635, 1.718, 12.688]}
        scale={0.051}
      />
      <mesh
        ref={modelRef11}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_RoofTopSolarpanel.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[-0.396, 2.701, 7.178]}
        scale={[0.078, 0.086, 0.02]}
      />
      <mesh
        ref={modelRef12}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_RainwaterHarvestingPond.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[-10.664, 1.128, -9.436]}
        scale={0.051}
      />
      <mesh
        ref={modelRef13}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_PumpRoom.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[0.624, 1.956, 13.127]}
        scale={0.051}
      />
      <mesh
        ref={modelRef14}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_OWC.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[0.815, 1.5, -9.051]}
        scale={0.051}
      />
      <mesh
        ref={modelRef15}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_MainRoad001.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[-5.564, 1.952, -3.194]}
        scale={0.051}
      />
      <mesh
        ref={modelRef16}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_MainRoad.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[-4.817, 1.952, 12.799]}
        scale={0.051}
      />
      <mesh
        ref={modelRef17}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_GateHouse.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[9.104, 1.849, 13.575]}
        scale={0.051}
      />
      <mesh
        ref={modelRef18}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_FMO.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[4.34, 1.922, 13.148]}
        scale={0.051}
      />
      <mesh
        ref={modelRef19}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_ElectriclaSubstatin.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[6.559, 1.938, 13.148]}
        scale={0.051}
      />
      <mesh
        ref={modelRef20}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_DriversToilet.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[0.076, 1.476, -8.99]}
        scale={0.051}
      />
      <mesh
        ref={modelRef21}
        castShadow
        receiveShadow
        geometry={nodes.SM_AMNT_ANNO_15MainRoad.geometry}
        material={materials.M_AMNT_ANNO_Master}
        position={[10.098, 1.718, 4.719]}
        scale={0.051}
      />
    </group>}


  </>
}
useGLTF.preload("/04_Ammenities_Overlay_R1.glb");