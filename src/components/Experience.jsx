import { OrbitControls } from '@react-three/drei'
import Sitecontext from './Sitecontext'
import { Environment } from '@react-three/drei'
import { Model } from './model'


export default function Experience()
{
  
    return <>

        
        <Environment
        files={"./lilienstein_4k.hdr"} background 
        ></Environment>  
        <OrbitControls makeDefault />
        
       
{/* 
        <directionalLight 
        castShadow 
        color={'#FF0000'}
        position={ [3,15,-1] }
        intensity={0.5}
        shadow-mapSize={[512,512]} 
        shadow-camera-far={100} 
        shadow-camera-left={-20} 
        shadow-camera-right={20} 
        shadow-camera-top={20}
        shadow-camera-bottom={-20} 
        shadow-normalBias={-0.65}
        shadow-bias={-0.00050}
       /> */}
        <directionalLight castShadow color={'#FFF3EF'} position={[5, 45, 5]} shadow-mapSize={[1024, 1024]}  shadow-normalBias={-0.65} shadow-bias={-0.00050}>
   <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
 </directionalLight>

        {/* <ambientLight  color="#ebeeff" intensity={ 0.70 }  /> */}
        
        
           {/* <Sitecontext scale={0.0000001}  /> */}
           <Model/>
          
    </>
}