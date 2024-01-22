import CommonModal from "./CommonModal";
import Webcam from "react-webcam";
import WebcamComponent from "./Webcam";
import React, { useState } from "react";

const MyCam = (props) => {
  
  const [audio, setAudio] = useState(true);
  const [mirrored, setMirrored] = useState(true);
 
  return(
    <div className="ml-2 mr-2 mb-2 p-2 p-2 col-start-1 col-end-3 row-start-8 row-end-12 rounded-md border">
        <p>{ props.nickname }</p>
        <div className="p-2">
          <WebcamComponent
            audio={audio}
            setAudio={setAudio}
            mirrored={mirrored}
            setMirrored={setMirrored}
            />
        </div>
        <div>
          <span onClick={()=>{setMirrored(!mirrored)}}>카메라</span> 
          <span onClick={()=>{setAudio(!audio)}}>음소거</span>
        </div>
      </div>
  )
}

export default MyCam;