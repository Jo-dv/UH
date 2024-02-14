import React, { useState } from "react";
import useStore from "../../store/UserAuthStore";

import WebcamComponent from "./WebcamMicStateManager";
import alternativeImage from "../../asset/image/character.jpg";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import useClick from "../../hooks/useClick";
const UserMediaProfile = () => {
  // 오디오 상태 조절
  const [audio, setAudio] = useState(true);
  // 캠 상태 조절
  const [play, setPlay] = useState(true);
  // 닉네임 가져오기
  const nickname = useStore((state) => state.user.userNickname);
  const { playClick } = useClick();
  return (
    <div className="col-start-1 col-end-4 row-start-8 row-end-13 m-2 p-2 rounded-2xl bg-tab11">
      <div className="">
        <div className="flex flex-wrap justify-center items-center bg-tab9 rounded-3xl">
          {/* 닉네임 명시 */}
          <div className="ml-5 mr-1 mt-2 text-l flex flex-wrap">{nickname}</div>
          {/* webcam 상태 조절 */}
          <div className="text-xl animate-jump">
            <button
              onClick={() => {
                setPlay(!play);
                playClick();
              }}
              className="bg-tab9 hover:bg-tab12 pr-3 pl-3 rounded-3xl"
            >
              {play === true ? <VideocamIcon /> : <VideocamOffIcon />}
            </button>
          </div>
        </div>
        {/* webcam 상태 명시 */}
        <div className="flex justify-center items-center h-[172px] rounded-3xl">
          {play === true ? (
            <WebcamComponent audio={audio} setAudio={setAudio} play={play} setPlay={setPlay} />
          ) : (
            <img
              className="rounded-3xl animate-fade object-contain h-[172px] m-2 p-2"
              src={alternativeImage}
              alt="alternativeImage"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMediaProfile;

// 수정하고 싶은 사항
// 이미지에서 캠으로 렌더링 될시, 글자가 이동함.
