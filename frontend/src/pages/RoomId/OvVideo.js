import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div className="flex justify-center items-center h-full">
      <video autoPlay={true} ref={videoRef} className="rounded-3xl h-28 w-56" />
    </div>
  );
}
