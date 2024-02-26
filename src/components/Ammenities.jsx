import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";
let isOpen = false;

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
  const { nodes, materials } = useGLTF("/04_Ammenities_Overlay.glb");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    
  };
  const amenitySwitch = document.getElementById('amenitySwitch')
  amenitySwitch.addEventListener('click', toggleVisibility)
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
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_ServiceRoadLine.geometry}
       material={materials["Blue_01.001"]}
       position={[-12.378, 1.633, 13.28]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_PARKING_B500.geometry}
       material={materials["M_Parking_INFO.001"]}
       position={[1.05, 1.285, -3.422]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_PARKING_B400.geometry}
       material={materials["M_Parking_INFO.001"]}
       position={[1.05, 1.285, -1.992]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_PARKING_B300.geometry}
       material={materials["M_Parking_INFO.001"]}
       position={[-12.378, 1.611, 13.28]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_PARKING_B200.geometry}
       material={materials["M_Parking_INFO.001"]}
       position={[-12.378, 1.611, 13.28]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_PARKING_B100.geometry}
       material={materials["M_Parking_INFO.001"]}
       position={[1.05, 1.856, 11.686]}
     />
     <group position={[-11.772, 1.142, 13.166]}>
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
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_AMENITIES_04001.geometry}
       material={materials["M_Amenities_INFO.001"]}
       position={[0.347, 1.194, -9.196]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_AMENITIES_04.geometry}
       material={materials["M_Amenities_INFO.001"]}
       position={[3.697, 1.328, -9.516]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_AMENITIES_03.geometry}
       material={materials["M_Amenities_INFO.001"]}
       position={[-10.623, 1.714, -7.028]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_AMENITIES_02.geometry}
       material={materials["M_Amenities_INFO.001"]}
       position={[6.356, 1.856, 13.169]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_INFO_AMENITIES_01.geometry}
       material={materials["M_Amenities_INFO.001"]}
       position={[1.05, 1.856, 13.169]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.Orange_Line.geometry}
       material={materials["Orange_01.001"]}
       position={[-12.378, 1.642, 13.28]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.Car_Parking.geometry}
       material={materials["Magenta_01.001"]}
       position={[10.732, 1.648, 11.602]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_UtilityBlock.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-0.959, 1.952, 13.284]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_TruckApron003.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-0.052, 1.231, -3.401]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_TruckApron002.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[10.918, 1.956, 9.008]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_TruckApron001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-6.382, 1.956, 9.008]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_TruckApron.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[3.372, 1.956, 11.957]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_StaffBarking_2.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-10.664, 1.996, -7.074]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_StaffBarking_1.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[3.315, 1.594, -9.552]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_StaffBarking.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[17.535, 1.956, 0.321]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_SewageTreatmentPlant.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[1.447, 1.34, -9.632]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_ServiceRoad.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[13.635, 1.718, 12.688]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_RoofTopSolarpanel.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-0.396, 2.701, 7.178]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_RainwaterHarvestingPond.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-10.664, 1.128, -9.436]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_PumpRoom.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[0.624, 1.956, 13.127]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_OWC.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[0.815, 1.5, -9.051]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_MainRoad001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-5.564, 1.952, -3.194]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_MainRoad.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-4.817, 1.952, 12.799]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_GateHouse.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[9.104, 1.849, 13.575]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_FMO.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[4.34, 1.922, 13.148]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_ElectriclaSubstatin.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[6.559, 1.938, 13.148]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_DriversToilet.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[0.076, 1.476, -8.99]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_15MainRoad.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[10.098, 1.718, 4.719]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_UtilityBlock001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-0.959, 1.952, 13.209]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_PumpRoom001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[0.624, 1.956, 13.052]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_FMO001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[4.34, 1.922, 13.073]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_ElectriclaSubstatin001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[6.559, 1.938, 13.073]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_GateHouse001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[9.104, 1.849, 13.5]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_ServiceRoad001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[13.635, 1.718, 12.613]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_MainRoad002.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-4.817, 1.952, 12.724]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_TruckApron004.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-0.052, 1.231, -3.476]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_TruckApron005.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[10.918, 1.956, 8.933]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_TruckApron006.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-6.382, 1.956, 8.933]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_TruckApron007.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[3.372, 1.956, 11.882]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_StaffBarking_2001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-10.664, 1.996, -7.149]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_StaffBarking_1001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[3.315, 1.594, -9.627]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_StaffBarking001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[17.535, 1.956, 0.246]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_SewageTreatmentPlant001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[1.447, 1.34, -9.707]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_RoofTopSolarpanel001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-0.396, 2.701, 7.103]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_RainwaterHarvestingPond001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-10.452, 1.128, -9.511]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_OWC001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[0.815, 1.5, -9.126]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_MainRoad003.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[-5.564, 1.952, -3.269]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_DriversToilet001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[0.076, 1.476, -9.065]}
     />
     <mesh
       castShadow
       receiveShadow
       geometry={nodes.SM_AMNT_ANNO_15MainRoad001.geometry}
       material={materials.M_AMNT_ANNO_Master}
       position={[10.098, 1.718, 4.644]}
     />
   </group>
    }


  </>
}
useGLTF.preload("/04_Ammenities_Overlay.glb");