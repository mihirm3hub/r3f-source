import React, { useRef, useEffect, useState } from "react";
import { useGLTF, PerspectiveCamera, useAnimations, OrbitControls, useScroll, MeshTransmissionMaterial } from "@react-three/drei";
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
let isInfo = false
let scrollValue
let cno = 1;
let url1
let url2
let url3

let isClickAdded = false

const overlaycon=document.getElementById('overlaycon')
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
const overviewBg = document.getElementById('overviewBg')

const instructionname=document.getElementById('instructionname')
const prBtn3d = document.getElementById('3dprebtn')
const nxtBtn3d = document.getElementById('3dnextbtn')
const closeBtn = document.getElementById('cbtn')
const hotspotClose = document.getElementById('hotspotClose')



//SWitchCloseButtons
const amenitymode = document.getElementById('amenitymode')
const defaultmode = document.getElementById('defaultmode')
const switchEl = document.querySelector('.toggle')

switchEl.addEventListener("change", function () {
  // console.log('change');
  // Hide both images when the checkbox state changes
  amenitymode.style.display = "none";
  defaultmode.style.display = "none";
});

switchEl.addEventListener("mouseover", function () {
  // console.log('over', amenitySwitch.checked);

  if (btn.checked) {

    // If the checkbox is checked, display amenitymode image
    amenitymode.style.display = "block";
    // defaultmode.style.display = "none";
  } else {
    // If the checkbox is not checked, display defaultmode image
    // amenitymode.style.display = "none";
    defaultmode.style.display = "block";
  }
});

// Add event listener for checkbox hover out
switchEl.addEventListener("mouseout", function () {
  // console.log('out', amenitySwitch.checked);
  // Hide both images when the mouse moves out
  amenitymode.style.display = "none";
  defaultmode.style.display = "none";
});







const popupIframe = document.getElementById("popupiframe");
let picno = 1;

// const b100 = document.getElementById('b100')
document.getElementById('views').style.display = 'none'

//  const intrusctrion=document.getElementById('instructionOverlay')
buildpre.style.display = 'none'
// prBtn.style.display = 'none'
// nxtBtn.style.display = 'none'
buildingpre1.style.display = 'none'
street.style.display = 'none'
infoCon.style.display = 'none';
viewin3dS.style.display = 'none'
overlaycon.style.display = 'none'
// overlaytitle.style.display='none'
locationpre_text.style.display = 'none'
hotspotClose.style.display = 'none'

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
  overlaycon.style.display = 'none'
  // overlaytitle.style.display='none'
  locationpre_text.style.display = 'none'
  overviewBg.style.display = 'none'

  switch (tabId) {
    case 'Overview':
      isOverview = !isOverview
      dropdownContent.style.display = 'flex'
      overviewBg.style.display = 'block'
      streetviewUI = false;
      islocation = false;
      isbuilding = false
      isHelp = false
      break;
    case 'Location':
      islocation = !islocation
      locationPre.style.display = 'block'
      locationpre_text.style.display = 'flex'
      isOverview = false
      streetviewUI = false;
      isbuilding = false
      isHelp = false
      break;
    case 'StreetView':
      streetviewUI = !streetviewUI
      street.style.display = 'flex';
      isOverview = false;
      islocation = false;
      isbuilding = false
      isHelp = false
      break;
    case 'Help':
      isHelp = !isHelp
      overlaycon.style.display = 'block'
      // overlaytitle.style.display='block'
      isOverview = false;
      islocation = false;
      isbuilding = false
      streetviewUI = false
      
      break;
    case 'Buildings':
      isbuilding = !isbuilding;
      meshname = 'B100'
      buildpre.style.display = 'flex'
      buildingpre1.style.display = 'block'
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
const hotspotclickfunc = () => {
  infoCon.style.display = 'block'
  buildpre.style.display = 'flex'
  buildingpre1.style.display = 'block'
  viewin3dS.style.display = 'block'
  prBtn.style.display = 'block'
  nxtBtn.style.display = 'block'
  removetabLinksClass()
  document.getElementById('bottombar').style.display = 'none'
  document.getElementById('Buildings').classList.add('active')
  document.getElementById('Buildings').setAttribute('src', `./images/BuildingsC.png`)

}


const removetabLinksClass = () => {
  tablinks.forEach(tab => {
    const tabId = tab.getAttribute('id')
    tab.classList.remove('active')
    tab.setAttribute('src', `./images/${tabId}.png`)
  })
}

tablinks.forEach(tab => {
  tab.addEventListener("click", () => {
    removetabLinksClass()

    const name = tab.getAttribute('id')
    // tab.setAttribute('src', `./images/${name}C.png`)
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


document.getElementById('locationbtn').addEventListener('click', (e) => {

  dropdownContent.style.display = 'flex'

  infoCon.style.display = !isInfo ? 'block' : 'none';
  hotspotClose.style.display = 'none'
  // removetabLinksClass()
  document.getElementById('Overview').setAttribute('src', `./images/OverviewC.png`)
  document.getElementById('Overview').classList.add('active')
  overviewBg.style.display = 'block'
  isInfo = !isInfo;
})


document.getElementById('viewin3d1').addEventListener('click', (e) => {
  document.getElementById('popupdarkbg').style.display = 'block',
    document.getElementById('popup').style.display = 'block',
    document.getElementById('views').src = './images/3dView02.png',
    document.getElementById('views').style.display = 'block',
    prBtn3d.style.display = 'none',
    nxtBtn3d.style.display = 'none',
    document.getElementById('popupiframe').src = url2

})

document.getElementById('viewin3d2').addEventListener('click', (e) => {
  document.getElementById('popupdarkbg').style.display = 'block',
    document.getElementById('popup').style.display = 'block',
    document.getElementById('views').src = './images/3dView01.png',
    document.getElementById('views').style.display = 'block',
    prBtn3d.style.display = 'none',
    nxtBtn3d.style.display = 'none',
    document.getElementById('popupiframe').src = url1

})
document.getElementById('viewin3d3').addEventListener('click', (e) => {
  document.getElementById('popupdarkbg').style.display = 'block',
    document.getElementById('popup').style.display = 'block',
    document.getElementById('views').src = './images/3dView03.png',
    document.getElementById('views').style.display = 'block',
    prBtn3d.style.display = 'none',
    nxtBtn3d.style.display = 'none',
    document.getElementById('popupiframe').src = url3

})


export function Model() {
  const model = useGLTF("/00_Chakan_V_Combined_For_IOS.glb")
  const { nodes, materials, animations } = useGLTF('/cameras.glb')

  const extractedCamera = useRef();
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
  const { actions } = useAnimations(animations, group)

  const scroll = useScroll();


  const perspectiveCam = useRef();
  const maincam1 = useRef()
  const [clicked, setClicked] = useState(false)
  const [ishotspotVisible, setVisibility] = useState(true)
  const toggleVisibility = () => {
    setVisibility(!ishotspotVisible);
  };

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
    document.getElementById('popupdarkbg').style.display = 'none'
    document.getElementById('views').style.display = 'none'
    document.getElementById('locationbtn').style.display = 'block'

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
  const Usageper = document.getElementById('Usageper')
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
        Farea.innerText = "3,23,520 sq ft (30,056 sq m)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = "5,382 sq ft (500 sq m)"
        totbtitle.innerText = "Clear Height"
        Tbarea.innerText = "12 meters minimum"
        usage.innerText = "Total Built-up Area"
        Usageper.innerText = " 3,28,902 sq ft (30,556 sq m)"
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
        Farea.innerText = "3,05,157 sq ft (28,350 sq m)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = " 5,382 sq ft (500 sq m)"
        totbtitle.innerText = "Clear Height"
        Tbarea.innerText = "12 meters minimum"
        usage.innerText = "Total Built-up Area"
        Usageper.innerText = "3,10,539 sq ft (28,850 sq m )"
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
        Farea.innerText = "4,07,995 sq ft (37,904 sq m)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = "5,382 sq ft (500 sq m)"
        totbtitle.innerText = "Clear Height"
        Tbarea.innerText = "12 meters minimum"
        usage.innerText = "Total Built-up Area"
        Usageper.innerText = "4,13,377 sq ft (38,404 sq m)"
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
        Farea.innerText = "2,60,982 sq ft (24,246 sq m)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = "5,382 sq ft (500 sq m)"
        totbtitle.innerText = "Clear Height"
        Tbarea.innerText = "12 meters minimum"
        usage.innerText = "Total Built-up Area"
        Usageper.innerText = "2,66,363 sq ft (24,746 sq m)"
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
        Farea.innerText = "1,41,804 sq ft (13,174 sq m)"
        mtitle.innerText = "Mezzanine Area"
        Marea.innerText = "5,382 sq ft (500 sq m)"
        totbtitle.innerText = "Clear Height"
        Tbarea.innerText = "12 meters minimum"
        usage.innerText = "Total Built-up Area"
        Usageper.innerText = "1,47,186 sq ft (13,674 sq m)"
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


    // document.getElementById('bottombar').style.display = 'none'
  }

  if (!isClickAdded) {
    isClickAdded = true
    prBtn.addEventListener("click", () => {
      cno -= 1;
      if (cno == 0) {
        cno = 5;
      }
      meshname = `B${cno}00`
      document.querySelector('.buildings').innerText = `B${cno}00`

      setCameraPosRot(meshname)

    });

    nxtBtn.addEventListener("click", () => {
      cno += 1
      console.log(cno);
      if (cno == 6) {
        cno = 1
      }
      meshname = `B${cno}00`
      document.querySelector('.buildings').innerText = `B${cno}00`

      setCameraPosRot(meshname)
    });
    closeBtn.addEventListener('click', () => {
      // document.getElementById('helpBtn').style.display = 'block'
      prBtn.style.display = 'block'
      nxtBtn.style.display = 'block'
      hotspotClose.style.display = 'none'
      closeBtn.style.display = 'none'
      infoCon.style.display = 'block'
      viewin3dS.style.display = 'block'
      buildpre.style.display = 'flex'
      document.querySelector('.buildings').style.display = 'none'
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

    })
    hotspotClose.addEventListener('click', (e) => {
      hotspotClose.style.display = 'none'
      document.querySelector('.buildings').style.display = 'none'

      document.getElementById('bottombar').style.display = 'flex'
      runOnce = false
      meshname = 'Default'
      setClicked(false)
      isClosed = true
      setVisibility(true)
      setCameraPosRot(meshname)

    })
    document.getElementById('clsB').addEventListener('click', (e) => {
      isInfo = false
      document.getElementById('bottombar').style.display = 'flex'
      tabSwitch('Close')
      infoCon.style.display = 'none'
      runOnce = false
      meshname = 'Default'
      setClicked(false)
      console.log('close click');
      isClosed = true
      setVisibility(true)
      setCameraPosRot(meshname)
      removetabLinksClass()
    })

  }




  const viewportWidth = window.innerWidth
  console.log('viewport width',viewportWidth);
  if(viewportWidth>1023){
   
    url1='https://equanimoustech.com/Sagar/indospacePC/VR1/'
    url2='https://equanimoustech.com/Sagar/indospacePC/VR2/'
    url3='https://equanimoustech.com/Sagar/indospacePC/VR3/'
    }
    else{
      url1=`https://equanimoustech.com/Sagar/IndoSpace1/VR1/`
      url2=`https://equanimoustech.com/Sagar/IndoSpace1/VR2/`
      url3=`https://equanimoustech.com/Sagar/IndoSpace1/VR3/`
    }
  function linkchnage (pco){
  if(pco==1){
    return url1
    
  }else if(pco==2){
    return url2

  }else if(pco==3){
    return url3

  }else{
    return url1
  }
}
 

  nxtBtn3d.addEventListener("click", event => {
    picno += 1;
    if (picno == 4) {
      picno = 1;
    }
    popupIframe.src = linkchnage(picno)
    // document.getElementById('StreetView').src = `./images/StreetView-0${picno}.png`
    document.getElementById('views').src = `./images/3dView0${picno}.png`
  });

  prBtn3d.addEventListener("click", event => {
    picno -= 1;
    if (picno == 0) {
      picno = 3;
    }
    popupIframe.src = linkchnage(picno)
    // document.getElementById('StreetView').src = `./images/StreetView-0${picno}.png`
    document.getElementById('views').src = `./images/3dView0${picno}.png`

  });


  document.getElementById('btn').addEventListener('click', toggleVisibility)


  document.getElementById('viewin3dS').addEventListener('click', (e) => {
    setClicked(true)
    setVisibility(false)
    console.log(meshname);
    infoCon.style.display = 'none'
    viewin3dS.style.display = 'none'
    buildpre.style.display = 'none'
    closeBtn.style.display = 'block'
    hotspotClose.style.display = 'none'
    prBtn.style.display = 'none'
    nxtBtn.style.display = 'none'

    meshname = `B${cno}00`
    document.querySelector('.buildings').style.display = 'block'
    document.querySelector('.buildings').innerText = `B${cno}00`

    document.getElementById('bottombar').style.display = 'none'

    console.log('3d click');


  })
  useGLTF.preload("/00_Chakan_V_Combined_For_IOS.glb");


  useFrame(state => {

    // console.log('RunOnce - ', runOnce, 'isClosed - ', isClosed, 'isClicked', clicked, 'isDragging', isDragging);
    if (runOnce == true && isClosed == false && clicked == false) {
      runOnce = false
      document.getElementById('overview-con').style.display = 'none'
      // document.getElementById('bottombar').style.display = 'flex'
      hotspotClose.style.display = 'none'
      // prBtn3d.style.display = 'none'
      // nxtBtn3d.style.display = 'none'
    }
    if (clicked && !runOnce) {
      actions["MainCameraAltActionClip"].timeScale = 0
      setCameraPosRot(meshname)
      state.camera.rotation.set(camRot.x, camRot.y, camRot.z)
      state.camera.position.set(camPos.x, camPos.y, camPos.z)
      state.camera.updateProjectionMatrix()
      runOnce = true
      isClosed = false
      hotspotClose.style.display = 'none'
      isDragging = false
      // prBtn.style.display = 'block'
      // nxtBtn.style.display = 'block'
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
  //     {/* b300 */}
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
            hotspotclickfunc()

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

  //     {/* B100 */}
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
            hotspotclickfunc()
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


  //     {/* B400 */}

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
            hotspotclickfunc()



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



  //     {/* B500 */}

      {ishotspotVisible && (
        <mesh

          position={[2.1, 2.5, -5.5]}
          rotation={[0, 0, 0]}
          ref={modelRef4}
          onClick={() => {
            meshname = 'B500'
            setClicked(true)
            setVisibility(true)
            setHovered3(false)
            cno = 5
            hotspotclickfunc()


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




  //     {/* B200 */}
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
            hotspotclickfunc()


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


  //     {/* 360view 1*/}

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
            document.getElementById('popupiframe').src = url1,
            // document.getElementById('dropdown-content').style.display = 'none',
            // document.getElementById('StreetView').src = './images/StreetView-01.png',
            document.getElementById('StreetView').style.display = 'block',
            document.getElementById('views').src = './images/3dView01.png',
            document.getElementById('views').style.display = 'block',
            locationbtn.style.display = 'none',
            nxtBtn.style.display = 'none',
            prBtn.style.display = 'none',
            prBtn3d.style.display = 'none',
            nxtBtn3d.style.display = 'none',
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



  //     {/* 360view 2*/}
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
            document.getElementById('popupiframe').src = url2,
            // document.getElementById('dropdown-content').style.display = 'none',
            document.getElementById('StreetView').style.display = 'block',
            // document.getElementById('StreetView').src = './images/StreetView-02.png',
            document.getElementById('views').style.display = 'block',
            document.getElementById('views').src = './images/3dView02.png',
            // helpBtn.style.display = 'none',
            locationbtn.style.display = 'none',
            nxtBtn.style.display = 'none',
            prBtn.style.display = 'none',

            prBtn3d.style.display = 'none',
            nxtBtn3d.style.display = 'none',
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





  //     {/* 360view 3*/}
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
            document.getElementById('popupiframe').src = url3,
            // document.getElementById('dropdown-content').style.display = 'none',
            document.getElementById('StreetView').style.display = 'block',
            // document.getElementById('StreetView').src = './images/StreetView-03.png',
            document.getElementById('views').style.display = 'block',
            document.getElementById('views').src = './images/3dView03.png',
            // helpBtn.style.display = 'none',
            locationbtn.style.display = 'none',
            nxtBtn.style.display = 'none',
            prBtn.style.display = 'none',

            prBtn3d.style.display = 'none',
            nxtBtn3d.style.display = 'none',
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

      <group ref={group} dispose={null}>
        <group name="Scene">
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
            name="Cam_B100"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[10.187, 5.448, 18.031]}
            rotation={[-0.353, 0.376, 0.134]}
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
            name="Cam_B300"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[-0.207, 4.597, -8.699]}
            rotation={[-2.691, 0.751, 2.823]}
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
            name="Cam_B500"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[-4.867, 5.936, 2.598]}
            rotation={[-0.508, -0.264, -0.144]}
          />
        </group>
      </group>


      <primitive object={model.scene} />




    </>

  );
}


useGLTF.preload('/cameras.glb')



// useGLTF.preload("/00_Chakan_V_Combined_For_IOS.glb");

