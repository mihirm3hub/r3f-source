
import ReactDOM from 'react-dom/client'
import * as React from 'react'
import { Canvas, extend, useThree } from '@react-three/fiber'
import Experience from './components/Experience'
import { Html, useProgress, ContactShadows } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import { SSAO, EffectComposer, SSR } from '@react-three/postprocessing'
import { EffectPass } from 'postprocessing'
import { SSGIEffect, VelocityDepthNormalPass, TRAAEffect } from "realism-effects"
import { useGesture } from 'react-use-gesture';
import { useControls } from 'leva'






function Effects() {
  const [velocityDepthNormalPass, setVelocityDepthNormalPass] = React.useState(
    null
  )
  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera)
  const options = {
    distance: 7.070000000000011,
    thickness: 2.92999999999997,
    denoiseIterations: 1,
    denoiseKernel: 3,
    denoiseDiffuse: 25,
    denoiseSpecular: 25.54,
    depthPhi: 9.939965517347105e-16,
    normalPhi: 26.087,
    roughnessPhi: 18.47799999999998,
    specularPhi: 3.799999999999999,
    envBlur: 0.21,
    importanceSampling: true,
    steps: 20,
    refineSteps: 4,
    resolutionScale: 1,
    missedRays: false,
    radius:9,
    phi:0.337,
    lumaPhi:20.65199999999997,

  }
  
  extend({
    VelocityDepthNormalPass,
    SSGIPass: class extends EffectPass {
      constructor(scene, camera, velocityDepthNormalPass) {
        super(camera, new SSGIEffect(scene, camera, velocityDepthNormalPass))
      }
    },
    TRAAPass: class extends EffectPass {
      constructor(scene, camera, velocityDepthNormalPass) {
        super(camera, new TRAAEffect(scene, camera, velocityDepthNormalPass))
      }
    }
  })

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <velocityDepthNormalPass
        ref={setVelocityDepthNormalPass}
        args={[scene, camera]}
      />
      {velocityDepthNormalPass && (
        <>
          <sSGIPass args={[scene, camera, velocityDepthNormalPass,options]} />
          <tRAAPass args={[scene, camera, velocityDepthNormalPass]} />
        </>
      )}
    
    </EffectComposer>
  )
}


export default function App() {

  return (<>
    <Canvas
      shadows
     
    >


      <EffectComposer>
        <SSAO    
        samples={11} 
        Falloff={1} 
        intensity={0.2} 
        radius={1} 
        bias={0.001} 
      />




      </EffectComposer>
      <ContactShadows intensity={5} scale={0.} radius={0.015} position={[0, 5, 0]} />







        <Experience />

      


    </Canvas>
  </>
  )
} 
