import { OrbitControls } from '@react-three/drei'
import Sitecontext from './Sitecontext'
import { Environment } from '@react-three/drei'
import { Model } from './model'


export default function Experience()
{
  
    return <>

        
        {/* <Environment
        files={"./lilienstein_4k.hdr"} background 
        ></Environment>   */}
        <OrbitControls makeDefault />
        
       

        <directionalLight 
        castShadow 
        position={ [1,2,1.5] } 
        intensity={0.5}
        shadow-mapSize={[1024,1024]} 
        shadow-camera-far={50} 
        shadow-camera-left={-50} 
        shadow-camera-right={50} 
        shadow-camera-top={50}
        shadow-camera-bottom={-50} 
        shadow-normalBias={-0.0055}
        shadow-bias={-0.0030}
        shadow-radius={50}
        />
        

        {/* <ambientLight  color="#ebeeff" intensity={ 0.70 }  /> */}
        
        
           {/* <Sitecontext scale={0.0000001}  /> */}
           <Model scale={0.25}/>
          
    </>
}