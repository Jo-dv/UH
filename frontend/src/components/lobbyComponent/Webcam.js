import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamComponent = (props) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    if (webcamRef.current) {
      const webcamInstance = webcamRef.current;
      webcamInstance.requestUserMedia();
      webcamInstance.video.autoplay = props.play;
    }
  }, [props.play]);

  return <Webcam ref={webcamRef} className="rounded-md" audio={props.audio} />;
};

export default WebcamComponent;
