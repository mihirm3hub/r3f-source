import { OrbitControls } from '@react-three/drei'
import { Environment } from '@react-three/drei'
import Ammenities from './Ammenities'
import { Model } from './newmodel'
import { Suspense, useRef, useState } from 'react'
import { Html, useProgress, ContactShadows } from '@react-three/drei'


let isAmenties = false
function progressChecker(num) {
  document.getElementById('loader').style.width = num + '%'
  if (num == 100) {
    setTimeout(() => {
      // document.getElementById('InstructionSection').style.display = 'block'
      document.getElementById('rootUI').style.display = 'block'
      document.getElementById('loadingTxt1').style.display='none'
      document.getElementById('LoaderMainHeader').style.display='none'
      document.getElementById('instructionMain').style.display='flex'
      // document.getElementById('instructionMain').style.display = 'grid'
      
      document.getElementById('loaderInfo').innerHTML = "Your <b>IndoSpace Interactive Park Tour</b> is ready!"
      document.getElementById('loaderRoot').style.display = 'none'
      document.getElementById('swipetocon').style.display = 'none'
      document.getElementById('scrolltocon').style.display = 'block'
    }, 2000)
  }

}
function Loader() {
  const { progress } = useProgress()
  return progressChecker(progress)
}



export default function Experience() {

  return <>


    <Environment
      files={"./lilienstein_4k.hdr"} background
    ></Environment>
    <ambientLight color="#fffceb" intensity={0.25} />

    <Suspense fallback={<Loader />}>
      <Model />
      <Ammenities />

    </Suspense>


  </>
}