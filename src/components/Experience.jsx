import { OrbitControls } from '@react-three/drei'
// import Sitecontext from './Sitecontext'
import { Environment } from '@react-three/drei'
//  import { Model } from './model'
import Ammenities from './Ammenities'
 import { Model } from './newmodel'


export default function Experience()
{
  
    return <>

        
        <Environment
        files={"./lilienstein_4k.hdr"} background 
        ></Environment>  
        {/* <OrbitControls enabled={true} /> */}
        
       

        <directionalLight castShadow color={'#fffaed'} position={[3, 45, 5]} shadow-mapSize={[1024, 1024]}  shadow-normalBias={-0.95} shadow-bias={-0.00050}>
   <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
 </directionalLight>

        <ambientLight  color="#fffceb" intensity={ 0.25 }  />
        
        
           {/* <Sitecontext scale={0.0000001}  /> */}
           <Model/>
           {/* <Ammenities/> */}
           
          
    </>
}