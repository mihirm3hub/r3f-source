import { parse } from 'gltfjsx'
import { GLTFLoader, DRACOLoader } from 'three-stdlib'


export default function Standalone() {

    let optionalconfig = ''
    const gltfLoader = new GLTFLoader()
    console.log(gltfLoader)
    const dracoloader = new DRACOLoader()
    dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    console.log(dracoloader)
    gltfLoader.setDRACOLoader(dracoloader)

    gltfLoader.load("./00_Chakan_V_Combined_For_IOS.glb", (gltf) => {
        console.log(gltf);
        const jsx = parse(gltf)
        console.log(jsx);
    })
}

