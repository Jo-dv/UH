import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamComponent = ({ play, audio }) => {
  // useRef()에 null을 쓰는 이유 :  명시적으로 쓰기 위해서 씀.
  const webcamRef = useRef(null);

  useEffect(() => {
    if (webcamRef.current) {
      const { video } = webcamRef.current;
      video.autoplay = play;
    }
  }, [play]);

  return <Webcam className="rounded-3xl mb-1 animate-fade" ref={webcamRef} audio={audio} />;
};

export default WebcamComponent;
