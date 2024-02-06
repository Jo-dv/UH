import React, { useState } from "react";
import useStore from "../../store/UserAuthStore";

import WebcamComponent from "./WebcamMicStateManager";
import alternativeImage from "../../asset/image/alternativeImage.png";

const UserMediaProfile = () => {
  // 오디오 상태 조절
  const [audio, setAudio] = useState(true);
  // 캠 상태 조절
  const [play, setPlay] = useState(true);
  // 닉네임 가져오기
  const nickname = useStore((state) => state.user.userNickname);

  return (
    <div className="col-start-1 col-end-4 row-start-8 row-end-13 m-2 p-2 rounded-3xl border border-7 border-modalBorder ">
      <div className="m-2">
        {/* 닉네임 명시 */}
        <div className="ml-1 mr-1 mb-1">{nickname}</div>

        {/* webcam 상태 명시 */}
        {play === true ? (
          <WebcamComponent audio={audio} setAudio={setAudio} play={play} setPlay={setPlay} />
        ) : (
          <img
            className="rounded-3xl h-[135px] w-[300px] mb-1 animate-fade"
            src={alternativeImage}
            alt="alternativeImage"
          />
        )}

        {/* webcam 상태 조절 */}
        <span
          className="m-2"
          onClick={() => {
            setPlay(!play);
          }}
        >
          {play === true ? "카메라 On" : "카메라 off"}
        </span>
        {/* <span
          onClick={() => {
            setAudio(!audio);
          }}
        >
          {audio === true ? "마이크 On" : "마이크 off"}
        </span> */}
      </div>
    </div>
  );
};

export default UserMediaProfile;

// 수정하고 싶은 사항
// 이미지에서 캠으로 렌더링 될시, 글자가 이동함.
