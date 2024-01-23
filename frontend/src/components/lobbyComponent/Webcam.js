import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamComponent = (props) => {
  const webcamRef = useRef(null);

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
