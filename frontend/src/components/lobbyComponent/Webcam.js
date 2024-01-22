import React, { useState } from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => {

  return(
    <Webcam 
      className="rounded-md"
      mirrored = {true}
      audio = {true}
    />
  )}

const stopStreamedVideo = (videoElem) => {
  const stream = videoElem.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });

  videoElem.srcObject = null;
}

export default WebcamComponent;