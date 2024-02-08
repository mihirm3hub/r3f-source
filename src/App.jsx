
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
  // const props = useControls({
  //   temporalResolve: true,
  //   STRETCH_MISSED_RAYS: true,
  //   USE_MRT: true,
  //   USE_NORMALMAP: true,
  //   USE_ROUGHNESSMAP: true,
  //   ENABLE_JITTERING: true,
  //   ENABLE_BLUR: true,
  //   temporalResolveMix: { value: 0.9, min: 0, max: 1 },
  //   temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
  //   maxSamples: { value: 0, min: 0, max: 1 },
  //   resolutionScale: { value: 1, min: 0, max: 1 },
  //   blurMix: { value: 0.5, min: 0, max: 1 },
  //   blurKernelSize: { value: 8, min: 0, max: 8 },
  //   blurSharpness: { value: 0.5, min: 0, max: 1 },
  //   rayStep: { value: 0.3, min: 0, max: 1 },
  //   intensity: { value: 1, min: 0, max: 5 },
  //   maxRoughness: { value: 0.1, min: 0, max: 1 },
  //   jitter: { value: 0.7, min: 0, max: 5 },
  //   jitterSpread: { value: 0.45, min: 0, max: 1 },
  //   jitterRough: { value: 0.1, min: 0, max: 1 },
  //   roughnessFadeOut: { value: 1, min: 0, max: 1 },
  //   rayFadeOut: { value: 0, min: 0, max: 1 },
  //   MAX_STEPS: { value: 20, min: 0, max: 20 },
  //   NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
  //   maxDepthDifference: { value: 3, min: 0, max: 10 },
  //   maxDepth: { value: 1, min: 0, max: 1 },
  //   thickness: { value: 10, min: 0, max: 10 },
  //   ior: { value: 1.45, min: 0, max: 2 }
  // })
  

  return (<>
    {/* <button onClick={handleButtonClick}>Change Camera Position</button> */}
    <Canvas
      shadows
      camera={{
        fov: 22.895,
        near: 0.1,
        far: 1000,
        position: [31.401, 13.534, 42.827],
        rotation: [-0.32, 0.604, 0.186]

       
      }}
      // {...gestureBind()}
    >


      <EffectComposer>
        <SSAO    
        samples={11} // amount of samples per pixel (shouldn't be a multiple of the ring count)
        Falloff={1} // occlusion range falloff. min: 0, max: 1
        intensity={0.2} // how much the luminance of the scene influences the ambient occlusion
        radius={1} // occlusion sampling radius
        bias={0.001} // occlusion bias
      />

        {/* <SSR  /> */}



      </EffectComposer>
      <ContactShadows intensity={5} scale={0.} radius={0.015} position={[0, 5, 0]} />

      {/* <Effects /> */}






        <Experience />

      


    </Canvas>
  </>
  )
} 
