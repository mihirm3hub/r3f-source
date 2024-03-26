import React, { useRef, useEffect, useState } from "react";
import { useGLTF, PerspectiveCamera, useAnimations, OrbitControls, useScroll } from "@react-three/drei";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from 'three'

let meshname = 'Default'
let runOnce = false
let isDragging = false;
let isOverview = false
let streetviewUI = false;
let islocation = false;
let isbuilding = false
let isHelp = false
let startX
let startY
let camTimeScale = 0
let lastXvalue = 0
let lastYvalue = 0
let xdrag = 1000
let ydrag
let isOpen = false;
let isClosed = true
let scrollValue

const overlay = document.getElementById('overlay')
const viewin3dS = document.getElementById('viewin3dS')
const dropdownContent = document.getElementById('overview-con');
const sidebarImage = document.getElementById('sidebar');
const streetView = document.getElementById('StreetView')
const locationbtn = document.getElementById('locationbtn')
const infoCon = document.getElementById('info-Con')
const closeB = document.getElementById('closeB')
const street = document.getElementById('street')
const locationPre = document.getElementById('locationpre')
const buildingpre1 = document.getElementById('buildingpre1')
const prBtn = document.getElementById('prbtn')
const nxtBtn = document.getElementById('nxtbtn')
const buildpre = document.getElementById('buildpre')
const tablinks = document.querySelectorAll('.tablinks');

// const b100 = document.getElementById('b100')

//  const intrusctrion=document.getElementById('instructionOverlay')
buildpre.style.display = 'none'
prBtn.style.display = 'none'
nxtBtn.style.display = 'none'
buildingpre1.style.display = 'none'
street.style.display = 'none'
infoCon.style.display = 'none';
viewin3dS.style.display = 'none'
overlay.style.display = 'none'

// b100.style.display='none'
dropdownContent.style.display = 'none';
locationPre.style.display = 'none'

const tabSwitch = (tabId) => {
  dropdownContent.style.display = 'none'
  street.style.display = 'none'
  buildpre.style.display = 'none'
  buildingpre1.style.display = 'none'
  prBtn.style.display = 'none'
  nxtBtn.style.display = 'none'
  locationPre.style.display = 'none'
  viewin3dS.style.display = 'none'
  overlay.style.display = 'none'

  switch (tabId) {
    case 'Overview':
      isOverview = !isOverview
      dropdownContent.style.display = isOverview ? 'flex' : 'none';
      streetviewUI = false;
      islocation = false;
      isbuilding = false
      isHelp = false
      break;
    case 'Location':
      islocation = !islocation
      locationPre.style.display = islocation ? 'block' : 'none';
      isOverview = false
      streetviewUI = false;
      isbuilding = false
      isHelp = false
      break;
    case 'StreetView':
      streetviewUI = !streetviewUI
      street.style.display = streetviewUI ? 'flex' : 'none';
      isOverview = false;
      islocation = false;
      isbuilding = false
      isHelp = false
      break;
    case 'Help':
      isHelp = !isHelp
      overlay.style.display = isHelp ? 'block' : 'none';
      isOverview = false;
      islocation = false;
      isbuilding = false
      streetviewUI = false
      break;
    case 'Buildings':
      isbuilding = !isbuilding;
      meshname = 'B100'
      buildpre.style.display = isbuilding ? 'block' : 'none';
      buildingpre1.style.display = 'block';
      viewin3dS.style.display = 'block'
      prBtn.style.display = 'block'
      nxtBtn.style.display = 'block'

      isOverview = false;
      islocation = false;
      streetviewUI = false
      isHelp = false
      break
    default:
      isOverview = false
      streetviewUI = false;
      islocation = false;
      isbuilding = false
      isHelp = false
      break;
  }
}

const removetabLinksClass = () => {
  tablinks.forEach(tab => {
    const tabId = tab.getAttribute('id')
    tab.classList.remove('active')
    tab.classList.remove('active')
    tab.setAttribute('src', `./images/${tabId}.png`)
  })
}

tablinks.forEach(tab => {
  tab.addEventListener("click", () => {
    removetabLinksClass()

    const name = tab.getAttribute('id')
    tab.setAttribute('src', `./images/${name}C.png`)
    tab.classList.add('active')
    tabSwitch(name)
  });
});

// document.getElementById('closeB').addEventListener('click', (e) => {
//   // document.getElementById('Overview').style.display='none'
//   // street.style.display='none'
//   dropdownContent.style.display = 'none';
//   closeB.style.display='none'
//   locationPre.style.display='none'
//   buildingpre1.style.display = 'none'



//   // intrusctrion.style.display = 'none'

// })
document.getElementById('clsB').addEventListener('click', (e) => {
  isOpen = false
  document.getElementById('bottombar').style.display = 'flex'
  tabSwitch('Close')
})

document.getElementById('locationbtn').addEventListener('click', (e) => {

  dropdownContent.style.display = 'flex'

  infoCon.style.display = !isOpen ? 'block' : 'none';
  isOpen = !isOpen;
})


document.getElementById('viewin3d1').addEventListener('click', (e) => {
  document.getElementById('popupdarkbg').style.display = 'block',
    document.getElementById('popup').style.display = 'block',
    document.getElementById('popupiframe').src = 'https://equanimoustech.com/Sagar/IndoSpace1/VR1/'

})

document.getElementById('viewin3d2').addEventListener('click', (e) => {
  document.getElementById('popupdarkbg').style.display = 'block',
    document.getElementById('popup').style.display = 'block',
    document.getElementById('popupiframe').src = 'https://equanimoustech.com/Sagar/IndoSpace1/VR2/'

})
document.getElementById('viewin3d3').addEventListener('click', (e) => {
  document.getElementById('popupdarkbg').style.display = 'block',
    document.getElementById('popup').style.display = 'block',
    document.getElementById('popupiframe').src = 'https://equanimoustech.com/Sagar/IndoSpace1/VR3/'

})

export function Model(props) {
  const modelRef1 = useRef();
  const modelRef2 = useRef();
  const modelRef3 = useRef();
  const modelRef4 = useRef();
  const modelRef5 = useRef();
  const modelRef6 = useRef();
  const modelRef7 = useRef();
  const modelRef8 = useRef();
  const orbitcontrols = useRef();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/00_Chakan_V_Combined_For_IOS.glb");
  const { actions, mixer } = useAnimations(animations, group);
  const scroll = useScroll();

  const hotspottex = useLoader(TextureLoader, './images/2024.01.29_ICON_HOTSPOT_BUTT.UNZOOM-43.png');
  const hotspottexHovered = useLoader(TextureLoader, './images/B100.png');
  const hotspottexHovered1 = useLoader(TextureLoader, './images/B200.png');
  const hotspottexHovered2 = useLoader(TextureLoader, "./images/B300.png");
  const hotspottexHovered3 = useLoader(TextureLoader, "./images/B400.png");
  const hotspottexHovered4 = useLoader(TextureLoader, "./images/B500.png");
  const viewtex = useLoader(TextureLoader, "./images/360viewnew.png");
  const howeverdviewtex = useLoader(TextureLoader, "./images/360BUTTHOVER.png");

  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const [hovered5, setHovered5] = useState(false);
  const [hovered6, setHovered6] = useState(false);
  const [hovered7, setHovered7] = useState(false);
  const [hovered8, setHovered8] = useState(false);



  let cameraSpeed = 0.5
  document.getElementsByClassName('close')[0].addEventListener('click', (ev) => {
    document.getElementById('popup').style.display = 'none'
    document.getElementById('StreetView').style.display = 'none'
    document.getElementById('popupdarkbg').style.display = 'none'
    // document.getElementById('helpBtn').style.display = 'block'
    document.getElementById('locationbtn').style.display = 'block'
    streetviewUI = false
    isOpen = false
  })

  useEffect(() => void (
    actions["MainCameraAltActionClip"].play(),
    actions["MainCameraAltActionClip"].timeScale = cameraSpeed
  ))

  window.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchstart', startPhoneDrag);
  window.addEventListener('touchmove', phonedrag);
  window.addEventListener('touchend', stopDrag);
  document.addEventListener('wheel', (e) => {
    scrollValue = e.deltaY / 1024
    // console.log('scroll value',scroll);
    if (camTimeScale < 2 && camTimeScale > -2) {
      camTimeScale += scrollValue
    }
  })

  function startDrag(e) {
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true

  }

  function startPhoneDrag(e) {
    isDragging = true
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function phonedrag(e) {
    xdrag = e.touches[0].clientX - startX;
    xdrag = xdrag + lastXvalue
    ydrag = e.touches[0].clientY - startY;
    ydrag = ydrag + lastYvalue
    if (isDragging && (xdrag > 5 || xdrag < -5)) {
      camTimeScale = xdrag / 350
    } else if (isDragging && (ydrag > 5 || ydrag < -5)) {
      camTimeScale = ydrag / 500
    }
    else {
    }
    if (xdrag >= 350) {
      xdrag = 0
    }
    if (xdrag <= -350) {
      xdrag = 350
    }
    if (ydrag >= 500) {
      ydrag = 0
    }
    if (ydrag < -500) {
      ydrag = 500
    }
  }
  function drag(e) {
    xdrag = e.clientX - startX;
    xdrag = xdrag + lastXvalue
    if (isDragging) {
      camTimeScale = xdrag / 1024
    }
    else {
    }
    if (xdrag >= 1024) {
      xdrag = 0
    }
    if (xdrag < -1024) {
      xdrag = 0
    }
  }

  function stopDrag(e) {
    lastXvalue = xdrag
    isDragging = false
  }

  const btitle = document.getElementById('btitle')
  const Bname = document.getElementById('Bname')
  const ftitle = document.getElementById('ftitle')
  const Farea = document.getElementById('Farea')
  const mtitle = document.getElementById('mtitle')
  const Marea = document.getElementById('Marea')
  const totbtitle = document.getElementById('totbtitle')
  const Tbarea = document.getElementById('Tbarea')
  const usage = document.getElementById('usage')
  const UsageP = document.getElementById('Usage-P')
  let camPos = new THREE.Vector3()
  let camRot = new THREE.Vector3()
  let targetPosition = new THREE.Vector3();
  let minaAngle
  let maxaAngle
  const setCameraPosRot = (hotspotname) => {
    switch (hotspotname) {
      case 'B100':
        camPos.x = 10.187;
        camPos.y = 5.448;
        camPos.z = 18.031;
        camRot.x = -0.353;
        camRot.y = 0.376;
        camRot.z = 0.134;
        targetPosition.x = 6.877
        targetPosition.y = 2.377
        targetPosition.z = 11.081
        minaAngle = -0.785398
        maxaAngle = 1.65806
        btitle.innerText = "Building name"
        Bname.innerText = "B100"
        ftitle.innerText = "Floor Area"
        Farea.innerText = "3,23,520 sq.ft (30,056 sq.m.)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = "5,382 sq.ft (500 sq.m)"
        totbtitle.innerText = "Total Built-up Area"
        Tbarea.innerText = " 3,28,902 sq.ft (30,556 sq.m.)"
        usage.innerText = "Clear Height"
        UsageP.innerText = "12 meters minimum"
        // document.getElementById('popup-sidebar').style.display = 'block'
        document.getElementById('buildingpre1').src = './images/preB100.png'
        isOpen = true
        break;
      case 'B200':
        camPos.x = 5.421
        camPos.y = 3.904
        camPos.z = 13.476
        camRot.x = -0.449
        camRot.y = -0.966
        camRot.z = -0.377
        targetPosition.x = 11.378
        targetPosition.y = 2.371
        targetPosition.z = 10.424
        minaAngle = -1.0472
        maxaAngle = 0.523599
        btitle.innerText = "Building name"
        Bname.innerText = "B200"
        ftitle.innerText = "Floor Area"
        Farea.innerText = "3,05,157 sq.ft (28,350 sq.m.)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = " 5,382 sq.ft (500 sq.m)"
        totbtitle.innerText = "Total Built-up Area"
        Tbarea.innerText = "3,10,539 sq.ft (28,850 sq.m.)"
        usage.innerText = "Clear Height"
        UsageP.innerText = "12 meters minimum"
        // document.getElementById('popup-sidebar').style.display = 'block'
        document.getElementById('buildingpre1').src = './images/preB200.png'
        isOpen = true

        break;
      case 'B300':
        camPos.x = -0.207
        camPos.y = 4.597
        camPos.z = -8.699
        camRot.x = -2.691
        camRot.y = 0.751
        camRot.z = 2.823
        targetPosition.x = -7.007
        targetPosition.y = 2.379
        targetPosition.z = -4.546
        minaAngle = 0
        maxaAngle = 3.14159
        btitle.innerText = "Building name"
        Bname.innerText = "B300"
        ftitle.innerText = "Floor Area"
        Farea.innerText = "4,07,995 sq.ft (37,904 sq.m.)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = "5,382 sq.ft (500 sq.m)"
        totbtitle.innerText = "Total Built-up Area"
        Tbarea.innerText = "4,13,377 sq.ft (38,404 sq.m.)"
        usage.innerText = "Clear Height"
        UsageP.innerText = "12 meters minimum"
        // document.getElementById('popup-sidebar').style.display = 'block'
        document.getElementById('buildingpre1').src = './images/preB300.png'
        isOpen = true

        break;
      case 'B400':
        camPos.x = -8.113
        camPos.y = 3.994
        camPos.z = -6.434
        camRot.x = -2.771
        camRot.y = -0.715
        camRot.z = -2.892
        targetPosition.x = -3.772
        targetPosition.y = 1.814
        targetPosition.z = -1.344
        minaAngle = -0.785398
        maxaAngle = 3.14159
        btitle.innerText = "Building name"
        Bname.innerText = "B400"
        ftitle.innerText = "Floor Area"
        Farea.innerText = "2,60,982 sq.ft (24,246 sq.m.)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = "5,382 sq.ft (500 sq.m)"
        totbtitle.innerText = "Total Built-up Area"
        Tbarea.innerText = "2,66,363 sq.ft (24,746 sq.m.)"
        usage.innerText = "Clear Height"
        UsageP.innerText = "12 meters minimum"
        // document.getElementById('popup-sidebar').style.display = 'block'
        document.getElementById('buildingpre1').src = './images/preB400.png'
        isOpen = true


        break;
      case 'B500':
        camPos.x = -4.867
        camPos.y = 5.936
        camPos.z = 2.598
        camRot.x = -0.508
        camRot.y = -0.264
        camRot.z = -0.144
        targetPosition.x = -2.962
        targetPosition.y = 1.823
        targetPosition.z = -4.056
        minaAngle = -1.0472
        maxaAngle = 1.0472
        btitle.innerText = "Building name"
        Bname.innerText = "B500"
        ftitle.innerText = "Floor Area"
        Farea.innerText = "1,41,804 sq.ft (13,174 sq.m.)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = "5,382 sq.ft (500 sq.m)"
        totbtitle.innerText = "Total Built-up Area"
        Tbarea.innerText = "1,47,186 sq.ft (13,674 sq.m.)"
        usage.innerText = "Clear Height"
        UsageP.innerText = "12 meters minimum"
        // document.getElementById('popup-sidebar').style.display = 'block'
        document.getElementById('buildingpre1').src = './images/preB500.png'
        isOpen = true

        break;
      case 'Default':
        camPos.x = 31.401
        camPos.y = 13.534
        camPos.z = 42.827
        camRot.x = -0.32
        camRot.y = 0.604
        camRot.z = 0.186
        targetPosition.x = 0
        targetPosition.y = 0
        targetPosition.z = 0
        // btitle.innerHTML = "IndoSpace Industrial <br> Warehousing & Logistics Park"
        // Bname.innerText = ""
        // ftitle.innerText = "Total Land Parcel"
        // Farea.innerText = "186 Acres"
        // mtitle.innerText = "Plot 1 Land Area"
        // Marea.innerText = "62 Acres"
        // totbtitle.innerText = "Total Chargeable Area"
        // Tbarea.innerHTML = "14,35,315 sq.ft. <br> (1,33,344 sq.m.)"
        // usage.innerText = "Usage"
        // UsageP.innerText = "Industrial, Warehousing & Logistics park"
        // usage.style.display = 'block'
        // UsageP.style.display = 'block'

        break;
      default:
    }
    if (orbitcontrols.current) {
      orbitcontrols.current.target.set(targetPosition.x, targetPosition.y, targetPosition.z);
      orbitcontrols.current.maxAzimuthAngle = Math.PI / 4;

      orbitcontrols.current.minAzimuthAngle = Math.PI / 2;

      orbitcontrols.current.update();

    }


    document.getElementById('bottombar').style.display = 'none'
  }


  let cno = 1;
  const pBtn = document.querySelector('#prbtn');
  pBtn.addEventListener("click", () => {
    cno -= 1;
    if (cno == 0) {
      cno = 5;
    }
    meshname = `B${cno}00`
    setCameraPosRot(meshname)

  });

  const nBtn = document.querySelector('#nxtbtn');

  nBtn.addEventListener("click", () => {
    cno += 1
    if (cno == 6) {
      cno = 1
    }
    meshname = `B${cno}00`
    setCameraPosRot(meshname)
  });





  document.getElementById('bottombar').style.display = 'flex'

  const closeBtn = document.getElementById('cbtn')
  const preBtn = document.querySelector('.prebtn')
  const popupIframe = document.getElementById("popupiframe");
  let picno = 1;
  const nextBtn = document.querySelector('.nextbtn');
  nextBtn.addEventListener("click", event => {
    picno += 1;
    if (picno == 4) {
      picno = 1;
    }
    popupIframe.src = `https://equanimoustech.com/Sagar/IndoSpace1/VR${picno}/`
    document.getElementById('StreetView').src = `./images/StreetView-0${picno}.png`

  });

  preBtn.addEventListener("click", event => {
    picno -= 1;
    if (picno == 0) {
      picno = 3;
    }
    popupIframe.src = `https://equanimoustech.com/Sagar/IndoSpace1/VR${picno}/`
    document.getElementById('StreetView').src = `./images/StreetView-0${picno}.png`
  });

  const perspectiveCam = useRef();
  const maincam1 = useRef()
  const [clicked, setClicked] = useState(false)
  const [ishotspotVisible, setVisibility] = useState(true)
  const toggleVisibility = () => {
    setVisibility(!ishotspotVisible);
  };
  document.getElementById('amenitySwitch').addEventListener('click', toggleVisibility)


  document.getElementById('viewin3dS').addEventListener('click', (e) => {
    setClicked(true)
    setVisibility(false)
    console.log(meshname);
    infoCon.style.display = 'none'
    viewin3dS.style.display = 'none'
    buildpre.style.display = 'none'

    document.getElementById('bottombar').style.display = 'none'

    // console.log('click');


  })
  let islocation = false
  // let isHelp = false
  closeBtn.addEventListener('click', () => {
    // document.getElementById('helpBtn').style.display = 'block'
    closeBtn.style.display = 'none'
    infoCon.style.display = 'block'
    viewin3dS.style.display = 'block'
    buildpre.style.display = 'block'
    runOnce = false
    meshname = 'Default'
    setClicked(false)
    isClosed = true
    setVisibility(true)
    setCameraPosRot(meshname)
    // document.getElementById('dropdown-content').style.display = 'none'
    // document.getElementById('sidebar').src = './images/2024.01.29_SURF_PROJECT.NAME_WINDOW.CLOSED-41.png'
    // document.getElementById('bottombar').style.display = 'flex'

    // locationbtn.style.display = 'block'
    prBtn.style.display = 'block'
    nxtBtn.style.display = 'block'


  })

  // helpBtn.addEventListener('click', () => {
  //   if (!isHelp) {
  //     helpBtn.style.zIndex = '100';
  //     helpBtn.src = './images/Close.png';
  //     helpBtn.setAttribute('onmouseover', '')
  //     helpBtn.setAttribute('onmouseout', '')
  //     document.getElementById('instructionOverlay').style.display = 'flex'
  //     isHelp = true
  //   }
  //   else {
  //     isHelp = false
  //     helpBtn.style.zIndex = '100';
  //     helpBtn.src = './images/HELP_BUTT.png'
  //     helpBtn.setAttribute('onmouseover', 'this.src=`./images/HELP_BUTT_Hover.png`')
  //     helpBtn.setAttribute('onmouseout', 'this.src=`./images/HELP_BUTT.png`')
  //     document.getElementById('instructionOverlay').style.display = 'none'
  //   }
  // })

  // const locationbtn = document.getElementById('locationbtn')
  // const infoCon = document.getElementById('info-Con')
  // locationbtn.addEventListener('click', () => {
  //   if (!islocation) {
  //     infoCon.style.zIndex = '9';
  //     // locationbtn.src = './images/Close.png';
  //     // locationbtn.setAttribute('onmouseover', '')
  //     // locationbtn.setAttribute('onmouseout', '')
  //     document.getElementById('instructionOverlay').style.display = 'flex'
  //     islocation = true
  //   }
  //   else {
  //     islocation = false
  //     bottombar.style.zIndex = '3';
  //     // locationbtn.src = '/images/HELP_BUTT.png'
  //     // locationbtn.setAttribute('onmouseover', 'this.src=`./images/HELP_BUTT_Hover.png`')
  //     // locationbtn.setAttribute('onmouseout', 'this.src=`./images/HELP_BUTT.png`')
  //     document.getElementById('instructionOverlay').style.display = 'none'
  //   }
  // })

  useFrame(state => {
    // console.log('RunOnce - ', runOnce, 'isClosed - ', isClosed, 'isClicked', clicked, 'isDragging', isDragging);
    if (runOnce == true && isClosed == false && clicked == false) {
      runOnce = false
      document.getElementById('overview-con').style.display = 'none'
      document.getElementById('bottombar').style.display = 'flex'
      closeBtn.style.display = 'none'
      prBtn.style.display = 'none'
      nxtBtn.style.display = 'none'


    }
    if (clicked && !runOnce) {
      actions["MainCameraAltActionClip"].timeScale = 0
      setCameraPosRot(meshname)
      state.camera.rotation.set(camRot.x, camRot.y, camRot.z)
      state.camera.position.set(camPos.x, camPos.y, camPos.z)
      state.camera.updateProjectionMatrix()
      runOnce = true
      isClosed = false
      closeBtn.style.display = 'block'
      isDragging = false
      prBtn.style.display = 'block'
      nxtBtn.style.display = 'block'
    }

    else if (!clicked) {

      if (isDragging) {
        if (isNaN(xdrag)) {
          xdrag = 1000
          window.removeEventListener('mousedown', startDrag);
          window.removeEventListener('mousemove', drag);
          window.removeEventListener('mouseup', stopDrag);
          window.addEventListener('mousedown', startDrag);
          window.addEventListener('mousemove', drag);
          window.addEventListener('mouseup', stopDrag);
        }
        if (camTimeScale < -2 && camTimeScale >= 2) {
          camTimeScale += camTimeScale
        }
        actions["MainCameraAltActionClip"].timeScale = THREE.MathUtils.lerp(actions["MainCameraAltActionClip"].timeScale, camTimeScale, 1)

      } else {
        if (camTimeScale < 0.15) {
          camTimeScale += 0.01
        }
        else if (camTimeScale > 0.25) {
          camTimeScale -= 0.01
        }
        else if (camTimeScale < 0.25 && camTimeScale > 0.15) {
          camTimeScale = 0.2
        }
        else {
          camTimeScale = 0.2
        }

        actions["MainCameraAltActionClip"].timeScale = THREE.MathUtils.lerp(actions["MainCameraAltActionClip"].timeScale, camTimeScale, 1)

        modelRef1?.current?.lookAt(state.camera.position)
        modelRef2?.current?.lookAt(state.camera.position)
        modelRef3?.current?.lookAt(state.camera.position)
        modelRef4?.current?.lookAt(state.camera.position)
        modelRef5?.current?.lookAt(state.camera.position)
        modelRef6?.current?.lookAt(state.camera.position)
        modelRef7?.current?.lookAt(state.camera.position)
        modelRef8?.current?.lookAt(state.camera.position)
      }


    }
    else {

    }
    return null

  })

  return (
    <>
      {/* b300 */}
      {ishotspotVisible && (
        <mesh
          name="hotspotClick1"
          position={[-9.8, 2.75, 4.2]}
          rotation={[0, 0, 0]}
          ref={modelRef1}

          onClick={() => {
            meshname = 'B300'
            setClicked(true);
            setVisibility(false);
            setHovered5(false)
            cno = 3
          }}

          onPointerOver={() => setHovered5(true)}
          onPointerOut={() => setHovered5(false)}
          scale={7.5}
        >
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial
            map={hovered5 ? hotspottexHovered2 : hotspottex}
            toneMapped={false}
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* B100 */}
      {ishotspotVisible && (
        <mesh

          position={[1.2, 2.9, 8.4]}
          rotation={[0, 0, 0]}
          ref={modelRef2}
          onClick={() => {
            meshname = 'B100'
            setClicked(true)
            setVisibility(false)
            setHovered1(false)
            cno = 1
          }}
          onPointerOver={() =>
            setHovered1(true)}
          onPointerOut={() =>
            setHovered1(false)}
          scale={7.5}

        >

          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial
            map={hovered1 ? hotspottexHovered : hotspottex}
            toneMapped={false}
            transparent={true}
            side={THREE.DoubleSide}

          />

        </mesh>
      )}


      {/* B400 */}

      {ishotspotVisible && (
        <mesh
          position={[1.6, 2.3, 1.5]}
          rotation={[0, 0, 0]}
          ref={modelRef3}
          onClick={() => {
            meshname = 'B400'
            setClicked(true)
            setVisibility(false)
            setHovered4(false)
            cno = 4
          }}
          onPointerOver={() => setHovered4(true)}
          onPointerOut={() => setHovered4(false)}
          scale={7.5}
        >
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial
            map={hovered4 ? hotspottexHovered3 : hotspottex}
            toneMapped={false}
            transparent={true}
            side={THREE.DoubleSide}

          />
        </mesh>
      )}



      {/* B500 */}

      {ishotspotVisible && (
        <mesh

          position={[2.1, 2.5, -5.5]}
          rotation={[0, 0, 0]}
          ref={modelRef4}
          onClick={() => {
            meshname = 'B500'
            setClicked(true)
            setVisibility(false)
            setHovered3(false)
            cno = 5
          }}
          onPointerOver={() => setHovered3(true)}
          onPointerOut={() => setHovered3(false)}

          scale={7.5}
        >
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial
            map={hovered3 ? hotspottexHovered4 : hotspottex}

            toneMapped={false}
            transparent={true}
            side={THREE.DoubleSide}

          />
        </mesh>
      )}




      {/* B200 */}
      {ishotspotVisible && (
        <mesh

          position={[14.6, 2.8, 7]}
          rotation={[0, 0, 0]}
          ref={modelRef5}

          onClick={() => {
            meshname = 'B200'
            setClicked(true)
            setVisibility(false)
            setHovered2(false)
            cno = 2
          }}
          onPointerOver={() => setHovered2(true)}
          onPointerOut={() => setHovered2(false)}

          scale={7.5}
        >
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial
            map={hovered2 ? hotspottexHovered1 : hotspottex}

            toneMapped={false}
            transparent={true}
            side={THREE.DoubleSide}

          />
        </mesh>
      )}


      {/* 360view 1*/}

      {ishotspotVisible && (
        <mesh
          ref={modelRef6}
          position={[-4.7, 2.0, 12.5]}
          rotation={[0, 0, 0]}
          onPointerOver={() => setHovered6(true)}
          onPointerOut={() => setHovered6(false)}
          onClick={() => (
            meshname = '360View-1',
            setHovered6(false),
            document.getElementById('popupdarkbg').style.display = 'block',
            document.getElementById('popup').style.display = 'block',
            document.getElementById('popupiframe').src = 'https://equanimoustech.com/Sagar/IndoSpace1/VR1/',
            // document.getElementById('dropdown-content').style.display = 'none',
            document.getElementById('StreetView').src = './images/StreetView-01.png',
            document.getElementById('StreetView').style.display = 'block',
            locationbtn.style.display = 'none',
            prBtn.style.direction = 'none',
            nxtBtn.style.direction = 'none',
            streetviewUI = true,
            isOpen = true,
            picno = 1
          )}
          scale={7.5}
        >
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial
            map={hovered6 ? howeverdviewtex : viewtex}
            toneMapped={false}
            transparent={true}
            side={THREE.DoubleSide}

          />
        </mesh>
      )}



      {/* 360view 2*/}
      {ishotspotVisible && (
        <mesh
          ref={modelRef7}
          position={[9.1, 2.0, 12.6]}
          rotation={[0, 0, 0]}
          onPointerOver={() => setHovered7(true)}
          onPointerOut={() => setHovered7(false)}
          onClick={() => (
            meshname = '360View-2',

            setHovered7(false),
            document.getElementById('popupdarkbg').style.display = 'block',
            document.getElementById('popup').style.display = 'block',
            document.getElementById('popupiframe').src = 'https://equanimoustech.com/Sagar/IndoSpace1/VR2/',
            // document.getElementById('dropdown-content').style.display = 'none',
            document.getElementById('StreetView').style.display = 'block',
            document.getElementById('StreetView').src = './images/StreetView-02.png',
            // helpBtn.style.display = 'none',
            locationbtn.style.display = 'none',
            prBtn.style.direction = 'none',
            nxtBtn.style.direction = 'none',
            streetviewUI = true,
            isOpen = true,
            picno = 2
          )}
          scale={7.5}
        >
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial
            map={hovered7 ? howeverdviewtex : viewtex}
            toneMapped={false}
            transparent={true}
            side={THREE.DoubleSide}

          />

        </mesh>
      )}





      {/* 360view 3*/}
      {ishotspotVisible && (
        <mesh
          ref={modelRef8}
          position={[0.9, 1.9, -2]}
          rotation={[0, 0, 0]}
          onPointerOver={() => setHovered8(true)}
          onPointerOut={() => setHovered8(false)}
          onClick={() => (
            meshname = '360View-3',
            setHovered8(false),
            document.getElementById('popupdarkbg').style.display = 'block',
            document.getElementById('popup').style.display = 'block',
            document.getElementById('popupiframe').src = 'https://equanimoustech.com/Sagar/IndoSpace1/VR3/',
            // document.getElementById('dropdown-content').style.display = 'none',
            document.getElementById('StreetView').style.display = 'block',
            document.getElementById('StreetView').src = './images/StreetView-03.png',
            // helpBtn.style.display = 'none',
            locationbtn.style.display = 'none',
            prBtn.style.direction = 'none',
            nxtBtn.style.direction = 'none',
            streetviewUI = true,
            isOpen = true,
            picno = 3

          )}
          scale={7.5}
        >
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial
            map={hovered8 ? howeverdviewtex : viewtex}
            toneMapped={false}
            transparent={true}
            side={THREE.DoubleSide}

          />
        </mesh>
      )}


      <OrbitControls
        enabled={!ishotspotVisible}
        ref={orbitcontrols}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.5}
        maxDistance={7}
        minDistance={3} />

      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <mesh
            name="SM_L_Grasslawns"
            castShadow
            receiveShadow
            geometry={nodes.SM_L_Grasslawns.geometry}
            material={materials.M_Site}
            position={[-6.687, 1.657, -3.811]}
            rotation={[0, -1.571, 0]}
          />
          <mesh
            name="M_L_TempStructures"
            castShadow
            receiveShadow
            geometry={nodes.M_L_TempStructures.geometry}
            material={materials.M_L_TempStructures}
            position={[9.08, 2.036, 11.149]}
          />
          <mesh
            name="SM_L_CompoundWall"
            castShadow
            receiveShadow
            geometry={nodes.SM_L_CompoundWall.geometry}
            material={materials.M_L_Master_CompundWall}
            position={[7.292, 1.65, 14.125]}
          />
          <group name="SM_L_MainGate" position={[9.265, 1.702, 13.69]}>
            <mesh
              name="Mesh589"
              castShadow
              receiveShadow
              geometry={nodes.Mesh589.geometry}
              material={materials.M_COMPOUND_Wall}
            />
            <mesh
              name="Mesh589_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh589_1.geometry}
              material={materials.gate_texture}
            />
          </group>
          <mesh
            name="SM_L_Zebra_Crossing"
            castShadow
            receiveShadow
            geometry={nodes.SM_L_Zebra_Crossing.geometry}
            material={materials.M_Speed_Breaker}
            position={[-4.385, 1.652, 12.724]}
          />
          <mesh
            name="0_curve_001"
            castShadow
            receiveShadow
            geometry={nodes["0_curve_001"].geometry}
            material={materials.Crash_Barier_Poll}
            position={[3.607, 1.147, -1.093]}
          />
          <mesh
            name="SM_OG_ROAD012"
            castShadow
            receiveShadow
            geometry={nodes.SM_OG_ROAD012.geometry}
            material={materials.M_Kurb}
            position={[11.079, 1.66, 3.208]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <group name="SM_ROAD002" position={[-1.174, 1.402, -1.089]}>
            <mesh
              name="SM_ROAD004"
              castShadow
              receiveShadow
              geometry={nodes.SM_ROAD004.geometry}
              material={materials.Crash_Barier}
            />
            <mesh
              name="SM_ROAD004_1"
              castShadow
              receiveShadow
              geometry={nodes.SM_ROAD004_1.geometry}
              material={materials.Crash_Bareier_Wall}
            />
          </group>
          <mesh
            name="SM_ROAD050"
            castShadow
            receiveShadow
            geometry={nodes.SM_ROAD050.geometry}
            material={materials.M_Road_Line}
            position={[9.08, 1.653, 11.149]}
          />
          <mesh
            name="SM_CABIN_LP"
            castShadow
            receiveShadow
            geometry={nodes.SM_CABIN_LP.geometry}
            material={materials.M_Cabin_Master}
            position={[9.22, 1.652, 13.374]}
          />
          <mesh
            name="SM_InnerEdgeSite"
            castShadow
            receiveShadow
            geometry={nodes.SM_InnerEdgeSite.geometry}
            material={materials.M_OuterSite_01}
            position={[0.618, 1.59, -4.495]}
          />
          <group
            name="SM_Master_500"
            position={[-3.421, 1.143, -3.825]}
            rotation={[0, 1.571, 0]}
          >
            <mesh
              name="Plane529"
              castShadow
              receiveShadow
              geometry={nodes.Plane529.geometry}
              material={materials.M_Facade_Glass_Light}
            />
            <mesh
              name="Plane529_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane529_1.geometry}
              material={materials.M_Master_B500}
            />
          </group>
          <mesh
            name="SM_Master_B100009"
            castShadow
            receiveShadow
            geometry={nodes.SM_Master_B100009.geometry}
            material={materials.M_B_400}
            position={[-6.932, 2.259, 6.093]}
            rotation={[-Math.PI, -1.571, 0]}
          />
          <group
            name="SM_Master_B200"
            position={[18.045, 1.699, 12.099]}
            rotation={[Math.PI, 0, Math.PI]}
          >
            <mesh
              name="Plane007"
              castShadow
              receiveShadow
              geometry={nodes.Plane007.geometry}
              material={materials.M_Facade_Glass_Light}
            />
            <mesh
              name="Plane007_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane007_1.geometry}
              material={materials.M_Master_B200}
            />
          </group>
          <group
            name="SM_Master_B300"
            position={[-6.78, 1.703, 12.935]}
            rotation={[Math.PI, 0, Math.PI]}
          >
            <mesh
              name="Plane001"
              castShadow
              receiveShadow
              geometry={nodes.Plane001.geometry}
              material={materials.M_Master_B300}
            />
            <mesh
              name="Plane001_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane001_1.geometry}
              material={materials.M_Master_B200}
            />
            <mesh
              name="Plane001_2"
              castShadow
              receiveShadow
              geometry={nodes.Plane001_2.geometry}
              material={materials.M_Facade_Glass_Light}
            />
          </group>
          <group
            name="SM_Master_B400"
            position={[-4.072, 1.141, 3.761]}
            rotation={[0, 1.571, 0]}
          >
            <mesh
              name="Plane533"
              castShadow
              receiveShadow
              geometry={nodes.Plane533.geometry}
              material={materials.M_Facade_Glass_Light}
            />
            <mesh
              name="Plane533_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane533_1.geometry}
              material={materials.M_B_400}
            />
          </group>
          <mesh
            name="SM_OuterSite"
            castShadow
            receiveShadow
            geometry={nodes.SM_OuterSite.geometry}
            material={materials["M_OuterSite_01.001"]}
            position={[0, 1.721, 0]}
          />
          <mesh
            name="SM_Service_Building"
            castShadow
            receiveShadow
            geometry={nodes.SM_Service_Building.geometry}
            material={materials.M_Small_Building_01}
            position={[7.494, 1.66, 12.911]}
          />
          <mesh
            name="SM_L_Internal_Roads"
            castShadow
            receiveShadow
            geometry={nodes.SM_L_Internal_Roads.geometry}
            material={materials.M_Site}
            position={[2.995, 1.373, 2.767]}
            scale={0.051}
          />
          <mesh
            name="SM_L_Pond"
            castShadow
            receiveShadow
            geometry={nodes.SM_L_Pond.geometry}
            material={materials["WATER.001"]}
            position={[-10.522, 1.107, -9.482]}
          />
          <mesh
            name="North_Signage"
            castShadow
            receiveShadow
            geometry={nodes.North_Signage.geometry}
            material={nodes.North_Signage.material}
            position={[20.595, 2.055, 13.799]}
            scale={0.221}
          />
          <group
            name="SM_Service_Building002"
            position={[7.494, 1.651, 12.911]}
            scale={0.051}
          >
            <mesh
              name="Cube009"
              castShadow
              receiveShadow
              geometry={nodes.Cube009.geometry}
              material={materials["M_Service_Building.001"]}
            />
            <mesh
              name="Cube009_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube009_1.geometry}
              material={materials["M_Service_Building.002"]}
            />
          </group>
          <PerspectiveCamera
            name="MainCameraAlt"
            makeDefault={true}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[31.401, 13.534, 42.827]}
            rotation={[-0.32, 0.604, 0.186]}
          />
          <PerspectiveCamera
            name="Cam_B500"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[-4.867, 5.936, 2.598]}
            rotation={[-0.508, -0.264, -0.144]}
          />
          <PerspectiveCamera
            name="Cam_B400"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[-8.113, 3.994, -6.434]}
            rotation={[-2.771, -0.715, -2.892]}
          />
          <PerspectiveCamera
            name="Cam_B300"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[-0.207, 4.597, -8.699]}
            rotation={[-2.691, 0.751, 2.823]}
          />
          <PerspectiveCamera
            name="Cam_B200"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[5.421, 3.904, 13.476]}
            rotation={[-0.449, -0.966, -0.377]}
          />
          <PerspectiveCamera
            name="Cam_B100"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[10.187, 5.448, 18.031]}
            rotation={[-0.353, 0.376, 0.134]}
          />
          <group
            name="SM_Lamp_01001"
            position={[-12.665, 1.861, 14.177]}
            rotation={[0, -1.571, 0]}
            scale={0.051}
          >
            <mesh
              name="Cylinder002"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder002_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp043"
            position={[9.331, 1.527, 9.466]}
            rotation={[-Math.PI, Math.PI / 4, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder003"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder003.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder003_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder003_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group name="IM_Lamp044" position={[8.15, 0.979, 3.298]} scale={0.026}>
            <mesh
              name="Cylinder004"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder004.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder004_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder004_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp046"
            position={[7.519, 1.531, 11.048]}
            scale={0.026}
          >
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group name="IM_Lamp047" position={[7.523, 1.531, 8.641]} scale={0.026}>
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp048"
            position={[18.103, 1.531, 9.315]}
            scale={0.026}
          >
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp049"
            position={[18.103, 1.531, 7.048]}
            scale={0.026}
          >
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp050"
            position={[18.102, 1.531, 4.061]}
            scale={0.026}
          >
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group name="IM_Lamp051" position={[18.134, 1.532, 1.8]} scale={0.026}>
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group name="IM_Lamp052" position={[7.55, 1.533, 6.233]} scale={0.026}>
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group name="IM_Lamp053" position={[9.651, 1.54, 4.452]} scale={0.026}>
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group name="IM_Lamp054" position={[9.65, 1.54, 2.805]} scale={0.026}>
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group name="IM_Lamp055" position={[8.15, 0.979, 1.729]} scale={0.026}>
            <mesh
              name="Cylinder004"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder004.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder004_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder004_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp056"
            position={[5.582, 0.979, -7.196]}
            scale={0.026}
          >
            <mesh
              name="Cylinder007"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder007.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder007_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder007_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group name="IM_Lamp057" position={[8.185, 0.98, 0.16]} scale={0.026}>
            <mesh
              name="Cylinder004"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder004.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder004_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder004_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group name="IM_Lamp058" position={[5.582, 0.979, -4.23]} scale={0.026}>
            <mesh
              name="Cylinder007"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder007.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder007_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder007_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp059"
            position={[5.582, 0.979, -5.875]}
            scale={0.026}
          >
            <mesh
              name="Cylinder007"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder007.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder007_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder007_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp060"
            position={[-0.874, 1.016, -8.883]}
            rotation={[0, -1.571, 0]}
            scale={0.026}
          >
            <mesh
              name="Cylinder008"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder008_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp061"
            position={[5.368, 1.127, -8.883]}
            rotation={[0, -1.571, 0]}
            scale={0.026}
          >
            <mesh
              name="Cylinder008"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder008_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp062"
            position={[2.002, 1.108, -8.883]}
            rotation={[0, -1.571, 0]}
            scale={0.026}
          >
            <mesh
              name="Cylinder008"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder008_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp063"
            position={[0.529, 1.061, -8.883]}
            rotation={[0, -1.571, 0]}
            scale={0.026}
          >
            <mesh
              name="Cylinder008"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder008_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp064"
            position={[-7.397, 1.524, -5.952]}
            rotation={[0, 1.571, 0]}
            scale={0.026}
          >
            <mesh
              name="Cylinder009"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder009.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder009_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder009_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp065"
            position={[-11.776, 1.524, -5.952]}
            rotation={[0, 1.571, 0]}
            scale={0.026}
          >
            <mesh
              name="Cylinder009"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder009.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder009_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder009_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp066"
            position={[-9.614, 1.524, -5.952]}
            rotation={[0, 1.571, 0]}
            scale={0.026}
          >
            <mesh
              name="Cylinder009"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder009.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder009_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder009_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp067"
            position={[-5.274, 1.524, 10.714]}
            rotation={[-Math.PI, 0, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder010"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp068"
            position={[-3.743, 0.979, -6.98]}
            rotation={[-Math.PI, 0, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder010"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp069"
            position={[-3.743, 0.979, -5.668]}
            rotation={[-Math.PI, 0, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder010"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp070"
            position={[-3.743, 0.979, -4.329]}
            rotation={[-Math.PI, 0, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder010"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp071"
            position={[-4.196, 0.968, -1.431]}
            rotation={[-Math.PI, 0, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder010"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp072"
            position={[-4.196, 0.968, 0.973]}
            rotation={[-Math.PI, 0, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder010"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp073"
            position={[-4.196, 0.968, 3.489]}
            rotation={[-Math.PI, 0, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder010"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp074"
            position={[-5.274, 1.524, 5.793]}
            rotation={[-Math.PI, 0, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder010"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp075"
            position={[-5.274, 1.524, 8.261]}
            rotation={[-Math.PI, 0, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder010"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder010_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp076"
            position={[-7.397, 1.524, 13.034]}
            rotation={[-Math.PI, -1.571, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder011"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder011.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder011_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder011_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp077"
            position={[-10.889, 1.524, 13.034]}
            rotation={[-Math.PI, -1.571, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder011"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder011.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder011_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder011_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp078"
            position={[-9.614, 1.524, 13.034]}
            rotation={[-Math.PI, -1.571, 0]}
            scale={-0.026}
          >
            <mesh
              name="Cylinder011"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder011.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder011_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder011_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp079"
            position={[13.623, 1.553, 14.174]}
            rotation={[0, -1.571, 0]}
            scale={0.051}
          >
            <mesh
              name="Cylinder002"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder002_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp080"
            position={[3.813, 1.505, 14.177]}
            rotation={[0, -1.571, 0]}
            scale={0.051}
          >
            <mesh
              name="Cylinder002"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder002_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp081"
            position={[-1.68, 1.553, 14.177]}
            rotation={[0, -1.571, 0]}
            scale={0.051}
          >
            <mesh
              name="Cylinder002"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder002_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp082"
            position={[-7.172, 1.86, 14.177]}
            rotation={[0, -1.571, 0]}
            scale={0.051}
          >
            <mesh
              name="Cylinder002"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder002_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="SM_Lamp_01002"
            position={[-12.665, 1.861, 15.782]}
            rotation={[-Math.PI, 1.571, 0]}
            scale={-0.051}
          >
            <mesh
              name="Cylinder012"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder012_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp042"
            position={[13.623, 1.553, 15.785]}
            rotation={[-Math.PI, 1.571, 0]}
            scale={-0.051}
          >
            <mesh
              name="Cylinder012"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder012_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp045"
            position={[3.813, 1.505, 15.782]}
            rotation={[-Math.PI, 1.571, 0]}
            scale={-0.051}
          >
            <mesh
              name="Cylinder012"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder012_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp083"
            position={[-1.68, 1.553, 15.782]}
            rotation={[-Math.PI, 1.571, 0]}
            scale={-0.051}
          >
            <mesh
              name="Cylinder012"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder012_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Lamp084"
            position={[-7.172, 1.86, 15.782]}
            rotation={[-Math.PI, 1.571, 0]}
            scale={-0.051}
          >
            <mesh
              name="Cylinder012"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012.geometry}
              material={materials["lamp.002"]}
            />
            <mesh
              name="Cylinder012_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012_1.geometry}
              material={materials["light.002"]}
            />
          </group>
          <group
            name="IM_Truck010"
            position={[5.867, 0.69, 4.152]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.04, -0.046, -0.046]}
          >
            <mesh
              name="model_81002"
              castShadow
              receiveShadow
              geometry={nodes.model_81002.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81002_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81002_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group
            name="IM_Truck011"
            position={[5.867, 0.69, 5.575]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.04, -0.046, -0.046]}
          >
            <mesh
              name="model_81002"
              castShadow
              receiveShadow
              geometry={nodes.model_81002.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81002_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81002_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group
            name="IM_Truck012"
            position={[5.867, 0.69, 7.024]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.04, -0.046, -0.046]}
          >
            <mesh
              name="model_81002"
              castShadow
              receiveShadow
              geometry={nodes.model_81002.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81002_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81002_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group
            name="IM_Truck013"
            position={[5.867, 0.69, 8.666]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.04, -0.046, -0.046]}
          >
            <mesh
              name="model_81002"
              castShadow
              receiveShadow
              geometry={nodes.model_81002.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81002_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81002_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group
            name="IM_Truck026"
            position={[5.867, 0.69, 9.482]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.04, -0.046, -0.046]}
          >
            <mesh
              name="model_81002"
              castShadow
              receiveShadow
              geometry={nodes.model_81002.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81002_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81002_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck028" position={[1.378, 0.573, 0]} scale={0.051}>
            <mesh
              name="model_81003"
              castShadow
              receiveShadow
              geometry={nodes.model_81003.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81003_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81003_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81003_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81003_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck030" position={[0.792, 0.573, 0]} scale={0.051}>
            <mesh
              name="model_81003"
              castShadow
              receiveShadow
              geometry={nodes.model_81003.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81003_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81003_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81003_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81003_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck032" position={[0, 0.573, 0]} scale={0.051}>
            <mesh
              name="model_81003"
              castShadow
              receiveShadow
              geometry={nodes.model_81003.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81003_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81003_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81003_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81003_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck033" position={[1.402, 0.573, 0]} scale={0.051}>
            <mesh
              name="model_81004"
              castShadow
              receiveShadow
              geometry={nodes.model_81004.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81004_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81004_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81004_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81004_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck034" position={[0.802, 0.573, 0]} scale={0.051}>
            <mesh
              name="model_81004"
              castShadow
              receiveShadow
              geometry={nodes.model_81004.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81004_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81004_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81004_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81004_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck035" position={[0, 0.573, 0]} scale={0.051}>
            <mesh
              name="model_81004"
              castShadow
              receiveShadow
              geometry={nodes.model_81004.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81004_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81004_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81004_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81004_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group
            name="IM_Truck036"
            position={[-0.971, 0.581, -2.459]}
            scale={[0.044, 0.051, 0.051]}
          >
            <mesh
              name="model_81002"
              castShadow
              receiveShadow
              geometry={nodes.model_81002.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81002_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81002_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group
            name="IM_Truck037"
            position={[-0.971, 0.581, -1.635]}
            scale={[0.044, 0.051, 0.051]}
          >
            <mesh
              name="model_81002"
              castShadow
              receiveShadow
              geometry={nodes.model_81002.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81002_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81002_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group
            name="IM_Truck038"
            position={[-0.971, 0.581, -0.826]}
            scale={[0.044, 0.051, 0.051]}
          >
            <mesh
              name="model_81002"
              castShadow
              receiveShadow
              geometry={nodes.model_81002.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81002_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81002_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group
            name="IM_Truck039"
            position={[-0.971, 0.581, 0]}
            scale={[0.044, 0.051, 0.051]}
          >
            <mesh
              name="model_81002"
              castShadow
              receiveShadow
              geometry={nodes.model_81002.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81002_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81002_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81002_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck040" position={[0.651, 0.581, 0]} scale={0.051}>
            <mesh
              name="model_81006"
              castShadow
              receiveShadow
              geometry={nodes.model_81006.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81006_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81006_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81006_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81006_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck041" position={[-1.393, 0.581, 0]} scale={0.051}>
            <mesh
              name="model_81006"
              castShadow
              receiveShadow
              geometry={nodes.model_81006.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81006_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81006_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81006_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81006_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck042" position={[-0.583, 0.581, 0]} scale={0.051}>
            <mesh
              name="model_81006"
              castShadow
              receiveShadow
              geometry={nodes.model_81006.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81006_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81006_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81006_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81006_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck043" position={[0, 0.581, 0]} scale={0.051}>
            <mesh
              name="model_81006"
              castShadow
              receiveShadow
              geometry={nodes.model_81006.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81006_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81006_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81006_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81006_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck045" position={[-1.836, 0.581, 0]} scale={0.051}>
            <mesh
              name="model_81007"
              castShadow
              receiveShadow
              geometry={nodes.model_81007.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81007_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81007_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81007_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81007_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck046" position={[-1.232, 0.581, 0]} scale={0.051}>
            <mesh
              name="model_81007"
              castShadow
              receiveShadow
              geometry={nodes.model_81007.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81007_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81007_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81007_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81007_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck047" position={[-0.621, 0.581, 0]} scale={0.051}>
            <mesh
              name="model_81007"
              castShadow
              receiveShadow
              geometry={nodes.model_81007.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81007_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81007_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81007_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81007_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <group name="IM_Truck048" position={[0, 0.581, 0]} scale={0.051}>
            <mesh
              name="model_81007"
              castShadow
              receiveShadow
              geometry={nodes.model_81007.geometry}
              material={materials["backside.001"]}
            />
            <mesh
              name="model_81007_1"
              castShadow
              receiveShadow
              geometry={nodes.model_81007_1.geometry}
              material={materials["Body.001"]}
            />
            <mesh
              name="model_81007_2"
              castShadow
              receiveShadow
              geometry={nodes.model_81007_2.geometry}
              material={materials["Tires.001"]}
            />
          </group>
          <mesh
            name="SM_OuterSite008"
            castShadow
            receiveShadow
            geometry={nodes.SM_OuterSite008.geometry}
            material={materials["M_Road_Line.002"]}
            position={[-122.51, 2.233, 15.411]}
          />
          <mesh
            name="SM_OuterSite003"
            castShadow
            receiveShadow
            geometry={nodes.SM_OuterSite003.geometry}
            material={materials["M_Road_Line.002"]}
            position={[-122.51, 2.233, 14.482]}
          />
          <group name="Empty001" position={[0, 1.712, 0]} scale={0.051}>
            <mesh
              name="IM_Grass_Block019"
              castShadow
              receiveShadow
              geometry={nodes.IM_Grass_Block019.geometry}
              material={materials.M_Bush}
              position={[149.662, -0.655, 225.04]}
            />
            <mesh
              name="IM_Grass_Block020"
              castShadow
              receiveShadow
              geometry={nodes.IM_Grass_Block020.geometry}
              material={materials.M_Bush}
              position={[188.002, -0.652, 224.248]}
              rotation={[0, 1.571, 0]}
              scale={0.991}
            />
            <mesh
              name="IM_Grass_Block021"
              castShadow
              receiveShadow
              geometry={nodes.IM_Grass_Block021.geometry}
              material={materials.M_Bush}
              position={[146.535, -0.751, 225.096]}
            />
            <mesh
              name="IM_Grass_Block022"
              castShadow
              receiveShadow
              geometry={nodes.IM_Grass_Block022.geometry}
              material={materials.M_Bush}
              position={[177.951, 0.606, 218.586]}
              rotation={[0, 1.571, 0]}
              scale={0.546}
            />
          </group>
          <mesh
            name="Plane"
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={materials["Material.001"]}
            position={[9.079, 2.133, 13.914]}
          />
          <mesh
            name="SM_OuterSite006"
            castShadow
            receiveShadow
            geometry={nodes.SM_OuterSite006.geometry}
            material={materials.M_Truck_Parking}
            position={[0, 2.07, 15.015]}
          />
          <mesh
            name="SM_OuterSite007"
            castShadow
            receiveShadow
            geometry={nodes.SM_OuterSite007.geometry}
            material={materials.M_Truck_Parking}
            position={[0, 2.07, 14.949]}
          />
          <mesh
            name="SM_OuterSite002"
            castShadow
            receiveShadow
            geometry={nodes.SM_OuterSite002.geometry}
            material={materials.M_Truck_Parking}
            position={[0, 2.07, 15.767]}
          />
          <mesh
            name="SM_OuterSite001"
            castShadow
            receiveShadow
            geometry={nodes.SM_OuterSite001.geometry}
            material={materials.M_Truck_Parking}
            position={[0, 2.07, 14.18]}
          />
          <mesh
            name="SM_Signage_Board_SpeedLimit_04"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_SpeedLimit_04.geometry}
            material={materials.M_Signage_Board}
            position={[6.788, 1.368, -7.443]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_SpeedLimit_03"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_SpeedLimit_03.geometry}
            material={materials.M_Signage_Board}
            position={[9.66, 1.659, 6.197]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_SpeedLimit_02"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_SpeedLimit_02.geometry}
            material={materials.M_Signage_Board}
            position={[8.224, 1.659, 13.022]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Right_U-Turn_Exit_04"
            castShadow
            receiveShadow
            geometry={nodes["SM_Signage_Board_Right_U-Turn_Exit_04"].geometry}
            material={materials.M_Signage_Board}
            position={[-3.326, 1.091, -2.435]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Right_U-Turn_Exit_03"
            castShadow
            receiveShadow
            geometry={nodes["SM_Signage_Board_Right_U-Turn_Exit_03"].geometry}
            material={materials.M_Signage_Board}
            position={[10.513, 1.655, 3.494]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Right_U-Turn_Exit_02"
            castShadow
            receiveShadow
            geometry={nodes["SM_Signage_Board_Right_U-Turn_Exit_02"].geometry}
            material={materials.M_Signage_Board}
            position={[-6.04, 1.652, -4.558]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Right_U-Turn_Exit_01"
            castShadow
            receiveShadow
            geometry={nodes["SM_Signage_Board_Right_U-Turn_Exit_01"].geometry}
            material={materials.M_Signage_Board}
            position={[5.704, 1.651, 12.105]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_E1_04"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_E1_04.geometry}
            material={materials.M_Direction_Board}
            position={[-4.056, 1.652, 12.8]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_E1_03"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_E1_03.geometry}
            material={materials.M_Direction_Board}
            position={[9.66, 1.659, 2.726]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_E1_02"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_E1_02.geometry}
            material={materials.M_Direction_Board}
            position={[9.66, 1.659, 7.968]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_E1_01"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_E1_01.geometry}
            material={materials.M_Direction_Board}
            position={[7.721, 1.659, 12.798]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_10"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_10.geometry}
            material={materials.M_Signage_Board}
            position={[-3.941, 1.652, 12.091]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_09"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_09.geometry}
            material={materials.M_Signage_Board}
            position={[-4.25, 1.091, -2.007]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_08"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_08.geometry}
            material={materials.M_Signage_Board}
            position={[-2.195, 1.104, -2.951]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_07"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_07.geometry}
            material={materials.M_Signage_Board}
            position={[10.513, 1.656, 2.252]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_06"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_06.geometry}
            material={materials.M_Signage_Board}
            position={[4.134, 1.104, -2.951]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_05"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_05.geometry}
            material={materials.M_Signage_Board}
            position={[7.664, 1.091, -2.031]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_04"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_04.geometry}
            material={materials.M_Signage_Board}
            position={[10.473, 1.652, 11.309]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_03"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_03.geometry}
            material={materials.M_Signage_Board}
            position={[-6.04, 1.652, -5.111]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_02"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_02.geometry}
            material={materials.M_Signage_Board}
            position={[-6.043, 1.652, 11.687]}
            scale={0.051}
          />
          <mesh
            name="SM_Signage_Board_Car_Parking_01"
            castShadow
            receiveShadow
            geometry={nodes.SM_Signage_Board_Car_Parking_01.geometry}
            material={materials.M_Signage_Board}
            position={[6.539, 1.652, 12.105]}
            scale={0.051}
          />
          <mesh
            name="SM_Map_Board_02"
            castShadow
            receiveShadow
            geometry={nodes.SM_Map_Board_02.geometry}
            material={materials["M_Direction_Board.002"]}
            position={[-3.657, 1.095, -7.464]}
            scale={0.051}
          />
          <mesh
            name="SM_Map_Board_01"
            castShadow
            receiveShadow
            geometry={nodes.SM_Map_Board_01.geometry}
            material={materials["M_Direction_Board.002"]}
            position={[9.621, 1.659, 8.889]}
            scale={0.051}
          />
          <mesh
            name="Truck_Marking_05"
            castShadow
            receiveShadow
            geometry={nodes.Truck_Marking_05.geometry}
            material={materials["M_Truck_Parking.001"]}
            position={[2.605, 1.661, 12.723]}
            rotation={[0, 0, Math.PI]}
            scale={-0.051}
          />
          <mesh
            name="Truck_Marking_04"
            castShadow
            receiveShadow
            geometry={nodes.Truck_Marking_04.geometry}
            material={materials["M_Truck_Parking.001"]}
            position={[-6.776, 1.659, -1.829]}
            rotation={[0, -1.571, 0]}
            scale={[0.051, 0.051, 0.043]}
          />
          <mesh
            name="Truck_Marking_03"
            castShadow
            receiveShadow
            geometry={nodes.Truck_Marking_03.geometry}
            material={materials["M_Truck_Parking.001"]}
            position={[-6.776, 1.659, 8.602]}
            rotation={[Math.PI, 1.571, 0]}
            scale={[-0.051, -0.051, -0.043]}
          />
          <mesh
            name="Truck_Marking_02"
            castShadow
            receiveShadow
            geometry={nodes.Truck_Marking_02.geometry}
            material={materials["M_Truck_Parking.001"]}
            position={[2.356, 1.091, -3.038]}
            scale={0.051}
          />
          <mesh
            name="Truck_Marking_01"
            castShadow
            receiveShadow
            geometry={nodes.Truck_Marking_01.geometry}
            material={materials["M_Truck_Parking.001"]}
            position={[11.165, 1.659, 5.604]}
          />
          <group
            name="SM_Bush_02004"
            position={[9.036, 1.646, 13.235]}
            rotation={[0, -0.899, 0]}
            scale={0.051}
          >
            <mesh
              name="BezierCurve003"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003.geometry}
              material={materials["trunk-01.004"]}
            />
            <mesh
              name="BezierCurve003_1"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_1.geometry}
              material={materials["branch-1-01.004"]}
            />
            <mesh
              name="BezierCurve003_2"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_2.geometry}
              material={materials["branch-1-02.004"]}
            />
          </group>
          <group
            name="SM_Bush_02003"
            position={[47.262, 1.655, 13.273]}
            rotation={[0, -0.899, 0]}
            scale={0.051}
          >
            <mesh
              name="BezierCurve003"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003.geometry}
              material={materials["trunk-01.004"]}
            />
            <mesh
              name="BezierCurve003_1"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_1.geometry}
              material={materials["branch-1-01.004"]}
            />
            <mesh
              name="BezierCurve003_2"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_2.geometry}
              material={materials["branch-1-02.004"]}
            />
          </group>
          <group
            name="SM_Bush_02002"
            position={[9.137, 1.646, 13.229]}
            rotation={[0, -0.899, 0]}
            scale={0.051}
          >
            <mesh
              name="BezierCurve003"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003.geometry}
              material={materials["trunk-01.004"]}
            />
            <mesh
              name="BezierCurve003_1"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_1.geometry}
              material={materials["branch-1-01.004"]}
            />
            <mesh
              name="BezierCurve003_2"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_2.geometry}
              material={materials["branch-1-02.004"]}
            />
          </group>
          <group
            name="SM_Bush_02005"
            position={[9.131, 1.646, 13.322]}
            rotation={[0, -0.899, 0]}
            scale={0.051}
          >
            <mesh
              name="BezierCurve003"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003.geometry}
              material={materials["trunk-01.004"]}
            />
            <mesh
              name="BezierCurve003_1"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_1.geometry}
              material={materials["branch-1-01.004"]}
            />
            <mesh
              name="BezierCurve003_2"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_2.geometry}
              material={materials["branch-1-02.004"]}
            />
          </group>
          <group
            name="SM_Bush_02"
            position={[9.036, 1.646, 13.331]}
            rotation={[0, -0.899, 0]}
            scale={0.051}
          >
            <mesh
              name="BezierCurve003"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003.geometry}
              material={materials["trunk-01.004"]}
            />
            <mesh
              name="BezierCurve003_1"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_1.geometry}
              material={materials["branch-1-01.004"]}
            />
            <mesh
              name="BezierCurve003_2"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve003_2.geometry}
              material={materials["branch-1-02.004"]}
            />
          </group>
          <group
            name="SM_Bush_01"
            position={[8.964, 1.646, 13.735]}
            rotation={[0, 0, Math.PI]}
            scale={-0.076}
          >
            <mesh
              name="BezierCurve005"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve005.geometry}
              material={materials["trunk-01.004"]}
            />
            <mesh
              name="BezierCurve005_1"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve005_1.geometry}
              material={materials["branch-1-01.004"]}
            />
            <mesh
              name="BezierCurve005_2"
              castShadow
              receiveShadow
              geometry={nodes.BezierCurve005_2.geometry}
              material={materials["branch-1-02.004"]}
            />
          </group>
          <group name="SM_Master_B100001" position={[-5.18, 1.703, 11.305]}>
            <mesh
              name="Plane003"
              castShadow
              receiveShadow
              geometry={nodes.Plane003.geometry}
              material={materials["M_Master_B100.001"]}
            />
            <mesh
              name="Plane003_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane003_1.geometry}
              material={materials["M_Facade_Glass_Light.001"]}
            />
            <mesh
              name="Plane003_2"
              castShadow
              receiveShadow
              geometry={nodes.Plane003_2.geometry}
              material={materials["M_B_400.001"]}
            />
          </group>
          <mesh
            name="Cylinder"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials.M_Ladder}
            position={[12.1, 2.194, 12.165]}
          />
          <group
            name="IM_Car_01047"
            position={[4.944, 0.578, 4.644]}
            scale={0.051}
          >
            <mesh
              name="Mesh001"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001.geometry}
              material={materials["74body.002"]}
            />
            <mesh
              name="Mesh001_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_1.geometry}
              material={materials["74basic.002"]}
            />
            <mesh
              name="Mesh001_2"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_2.geometry}
              material={materials["74FABRIC.002"]}
            />
            <mesh
              name="Mesh001_3"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_3.geometry}
              material={materials["74REK.002"]}
            />
            <mesh
              name="Mesh001_4"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_4.geometry}
              material={materials["74tyre.002"]}
            />
            <mesh
              name="Mesh001_5"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_5.geometry}
              material={materials["74tyresf.002"]}
            />
          </group>
          <group
            name="IM_Car_01045"
            position={[-2.786, 0.577, 4.644]}
            rotation={[Math.PI, 0, 0]}
            scale={-0.051}
          >
            <mesh
              name="Mesh001"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001.geometry}
              material={materials["74body.002"]}
            />
            <mesh
              name="Mesh001_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_1.geometry}
              material={materials["74basic.002"]}
            />
            <mesh
              name="Mesh001_2"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_2.geometry}
              material={materials["74FABRIC.002"]}
            />
            <mesh
              name="Mesh001_3"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_3.geometry}
              material={materials["74REK.002"]}
            />
            <mesh
              name="Mesh001_4"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_4.geometry}
              material={materials["74tyre.002"]}
            />
            <mesh
              name="Mesh001_5"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_5.geometry}
              material={materials["74tyresf.002"]}
            />
          </group>
          <group
            name="IM_Car_01043"
            position={[-13.594, 0.573, 2.804]}
            rotation={[0, 1.571, 0]}
            scale={0.051}
          >
            <mesh
              name="Mesh001"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001.geometry}
              material={materials["74body.002"]}
            />
            <mesh
              name="Mesh001_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_1.geometry}
              material={materials["74basic.002"]}
            />
            <mesh
              name="Mesh001_2"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_2.geometry}
              material={materials["74FABRIC.002"]}
            />
            <mesh
              name="Mesh001_3"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_3.geometry}
              material={materials["74REK.002"]}
            />
            <mesh
              name="Mesh001_4"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_4.geometry}
              material={materials["74tyre.002"]}
            />
            <mesh
              name="Mesh001_5"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_5.geometry}
              material={materials["74tyresf.002"]}
            />
          </group>
          <group
            name="IM_Car_01041"
            position={[-13.477, 0.578, 4.311]}
            rotation={[Math.PI, -1.571, 0]}
            scale={-0.051}
          >
            <mesh
              name="Mesh001"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001.geometry}
              material={materials["74body.002"]}
            />
            <mesh
              name="Mesh001_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_1.geometry}
              material={materials["74basic.002"]}
            />
            <mesh
              name="Mesh001_2"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_2.geometry}
              material={materials["74FABRIC.002"]}
            />
            <mesh
              name="Mesh001_3"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_3.geometry}
              material={materials["74REK.002"]}
            />
            <mesh
              name="Mesh001_4"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_4.geometry}
              material={materials["74tyre.002"]}
            />
            <mesh
              name="Mesh001_5"
              castShadow
              receiveShadow
              geometry={nodes.Mesh001_5.geometry}
              material={materials["74tyresf.002"]}
            />
          </group>
          <group
            name="IM_Car_01039"
            position={[1.966, 0.565, 0.047]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.051}
          >
            <mesh
              name="Mesh018"
              castShadow
              receiveShadow
              geometry={nodes.Mesh018.geometry}
              material={materials["74body.002"]}
            />
            <mesh
              name="Mesh018_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh018_1.geometry}
              material={materials["74basic.002"]}
            />
            <mesh
              name="Mesh018_2"
              castShadow
              receiveShadow
              geometry={nodes.Mesh018_2.geometry}
              material={materials["74FABRIC.002"]}
            />
            <mesh
              name="Mesh018_3"
              castShadow
              receiveShadow
              geometry={nodes.Mesh018_3.geometry}
              material={materials["74REK.002"]}
            />
            <mesh
              name="Mesh018_4"
              castShadow
              receiveShadow
              geometry={nodes.Mesh018_4.geometry}
              material={materials["74tyre.002"]}
            />
            <mesh
              name="Mesh018_5"
              castShadow
              receiveShadow
              geometry={nodes.Mesh018_5.geometry}
              material={materials["74tyresf.002"]}
            />
          </group>
          <group
            name="IM_Car_01012"
            position={[-0.052, 0.578, 0.062]}
            rotation={[0, 1.571, 0]}
            scale={0.051}
          >
            <mesh
              name="Mesh011"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011.geometry}
              material={materials["74body.002"]}
            />
            <mesh
              name="Mesh011_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_1.geometry}
              material={materials["74basic.002"]}
            />
            <mesh
              name="Mesh011_2"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_2.geometry}
              material={materials["74FABRIC.002"]}
            />
            <mesh
              name="Mesh011_3"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_3.geometry}
              material={materials["74REK.002"]}
            />
            <mesh
              name="Mesh011_4"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_4.geometry}
              material={materials["74tyre.002"]}
            />
            <mesh
              name="Mesh011_5"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_5.geometry}
              material={materials["74tyresf.002"]}
            />
          </group>
          <group
            name="IM_Car_01010"
            position={[0.063, 0.581, 13.484]}
            rotation={[Math.PI, -1.571, 0]}
            scale={-0.051}
          >
            <mesh
              name="Mesh011"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011.geometry}
              material={materials["74body.002"]}
            />
            <mesh
              name="Mesh011_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_1.geometry}
              material={materials["74basic.002"]}
            />
            <mesh
              name="Mesh011_2"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_2.geometry}
              material={materials["74FABRIC.002"]}
            />
            <mesh
              name="Mesh011_3"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_3.geometry}
              material={materials["74REK.002"]}
            />
            <mesh
              name="Mesh011_4"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_4.geometry}
              material={materials["74tyre.002"]}
            />
            <mesh
              name="Mesh011_5"
              castShadow
              receiveShadow
              geometry={nodes.Mesh011_5.geometry}
              material={materials["74tyresf.002"]}
            />
          </group>
          <group
            name="IM_Car_01046"
            position={[-2.786, 0.577, 4.693]}
            rotation={[Math.PI, 0, 0]}
            scale={-0.051}
          >
            <mesh
              name="Mesh005"
              castShadow
              receiveShadow
              geometry={nodes.Mesh005.geometry}
              material={materials["73body.002"]}
            />
            <mesh
              name="Mesh005_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh005_1.geometry}
              material={materials["73basic.002"]}
            />
            <mesh
              name="Mesh005_2"
              castShadow
              receiveShadow
              geometry={nodes.Mesh005_2.geometry}
              material={materials["73fabric.002"]}
            />
            <mesh
              name="Mesh005_3"
              castShadow
              receiveShadow
              geometry={nodes.Mesh005_3.geometry}
              material={materials["73rek.002"]}
            />
            <mesh
              name="Mesh005_4"
              castShadow
              receiveShadow
              geometry={nodes.Mesh005_4.geometry}
              material={materials["73tyresf.001"]}
            />
            <mesh
              name="Mesh005_5"
              castShadow
              receiveShadow
              geometry={nodes.Mesh005_5.geometry}
              material={materials["73tyresf.002"]}
            />
            <mesh
              name="Mesh005_6"
              castShadow
              receiveShadow
              geometry={nodes.Mesh005_6.geometry}
              material={materials["73tyresf.006"]}
            />
          </group>
        </group>
      </group>
    </>

  );
}

useGLTF.preload("/00_Chakan_V_Combined_For_IOS.glb");

