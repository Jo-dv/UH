import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent({ isReady, streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative">
        <video autoPlay={true} ref={videoRef} className=" rounded-3xl h-28 w-42"></video>
        {isReady ? (
          <div
            className="font-[round-extrabold] absolute text-center bottom-0 z-10 text-xl text-red-900 bg-white bg-opacity-80 rounded-b-3xl"
            style={{left: 0, right: 0 }}
          >
            READY
          </div>
        ) : null}
      </div>
    </div>
  );
}
