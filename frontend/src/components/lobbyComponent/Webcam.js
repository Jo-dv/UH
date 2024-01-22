import React, { useState } from "react";
import Webcam from "react-webcam";

const WebcamComponent = (props) => {

  return(
    <Webcam 
      className="rounded-md"
      audio = {props.audio}
      mirrored = {props.mirrored}
      // setAudio = {setAudio}
      // setMirrored = {setMirrored}
    />
  )}

export default WebcamComponent;