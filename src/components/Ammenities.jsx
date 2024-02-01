import { useGLTF } from "@react-three/drei";


export default function Ammenities()
{

    const ammenities = useGLTF("./04_Ammenities_Overlay.glb");

    return <>
        
        <primitive  object={ammenities.scene} />

    </>
}