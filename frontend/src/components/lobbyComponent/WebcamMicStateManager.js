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

  return (
    <Webcam
      className="rounded-3xl animate-fade object-contain h-[172px] p-2"
      ref={webcamRef}
      audio={true}
    />
  );
};

export default WebcamComponent;
