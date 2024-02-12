import { OrbitControls } from '@react-three/drei'
// import Sitecontext from './Sitecontext'
import { Environment } from '@react-three/drei'
//  import { Model } from './model'
import Ammenities from './Ammenities'
 import { Model } from './newmodel'
 import { Suspense, useRef, useState } from 'react'
 import { Html, useProgress, ContactShadows } from '@react-three/drei'


let isAmenties = false
 function progressChecker(num) {
  document.getElementById('loader').style.width = num + '%'  
  // if (num > 0) {
  //   document.getElementById('LoaderMain').style.display = 'block'
  //   window.instructionPgVisible = true
  // }
  if (num == 100) {
    document.getElementById('instructionMain').style.display = 'grid'
    document.getElementById('loaderInfo').innerHTML = "Your <b>Indospace Interactive Park Tour</b> is ready ! Scroll down to continue."
    document.getElementById('loader').style.removeProperty('background')
    document.getElementById('loader').style.backgroundImage='url(./images/swipeToContinue.png)'
    document.getElementById('loader').style.backgroundPosition='center'
    document.getElementById('loader').style.backgroundRepeat='no-repeat'
    document.getElementById('loader').style.backgroundSize='contain'
  }
}
function Loader() {
  const { progress } = useProgress()
  return progressChecker(progress)
}



export default function Experience()
{
  
    return <>

        
        <Environment
        files={"./lilienstein_4k.hdr"} background 
        ></Environment>  
        {/* <OrbitControls enabled={true} /> */}
        
       

      
        <ambientLight  color="#fffceb" intensity={ 0.25 }  />
        
        <Suspense fallback={<Loader />}>

           {/* <Sitecontext scale={0.0000001}  /> */}
           <Model/>
           </Suspense>
           <Ammenities/>
           
          
    </>
}