import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamComponent = (props) => {
  const webcamRef = useRef(null);
  console.log(webcamRef.current.webcamInstance.video.autoplay);
  useEffect(() => {
    if (webcamRef.current) {
      const webcamInstance = webcamRef.current;
      webcamInstance.requestUserMedia();
      webcamInstance.video.autoplay = false;
    }
  }, []);

  return (
    <Webcam ref={webcamRef} className="rounded-md" audio={props.audio} mirrored={props.mirrored} />
  );
};

export default WebcamComponent;
