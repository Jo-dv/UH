import WebcamComponent from "./Webcam";
import React, { useState } from "react";
import alternativeImage from "../../asset/image/alternativeImage.png";
const MyCam = (props) => {
  const [audio, setAudio] = useState(false);
  const [play, setPlay] = useState(true);

  return (
    <div className="border-7 border-modalBorder col-start-1 col-end-2 row-start-8 row-end-13 ml-2 mr-2 mb-2 p-2 rounded-md border">
      <p>{props.nickname}</p>
      <div className="p-2 flex-auto">
        {play === true ? (
          <WebcamComponent audio={audio} setAudio={setAudio} play={play} setPlay={setPlay} />
        ) : (
          <div>
            <img className="rounded-md" src={alternativeImage} alt="alternativeImage" />
          </div>
        )}
      </div>
      <div className="text-center">
        <span
          onClick={() => {
            setPlay(!play);
          }}
        >
          {play === true ? "카메라 On" : "카메라 off"}
        </span>
        <span
          className="ml-2"
          onClick={() => {
            setAudio(!audio);
          }}
        >
          {audio === true ? "마이크 On" : "마이크 off"}
        </span>
      </div>
    </div>
  );
};

export default MyCam;
