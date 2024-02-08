import React, { useState } from "react";
import OpenViduVideoComponent from "../RoomId/OvVideo";
import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import useStore from "../../store/UserAuthStore";

const UserVideo = ({
  streamManager,
  session,
  isHost,
  isReady,
  gamePlayer,
  deleteSubscriber,
  subscribers,
  kickOutUser,
}) => {
  const [audioActive, setAudioActive] = useState(streamManager.stream.audioActive);
  const [videoActive, setVideoActive] = useState(streamManager.stream.audioActive);
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };
  const nickname = useStore((state) => state.user.userNickname);
  const socketSend = () => {
    session
      .signal({
        data: `유저 데이터 변경`, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "user-set", // The type of message (optional)
      })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };
  session.on("signal:user-set", (event) => {
    setAudioActive(streamManager.stream.audioActive);
    setVideoActive(streamManager.stream.videoActive);
  });

  const muteMic = () => {
    if (gamePlayer === streamManager.stream.connection.connectionId) {
      alert("발화자는 음소거 해제가 불가능 합니다.");
    } else if (streamManager.constructor.name === "Publisher") {
      streamManager.publishAudio(false);
      socketSend();
    }
  };
  const onMic = () => {
    if (gamePlayer === streamManager.stream.connection.connectionId) {
      alert("발화자는 음소거 해제가 불가능 합니다.");
    } else if (streamManager.constructor.name === "Publisher") {
      streamManager.publishAudio(true);
      socketSend();
    }
  };
  const muteVideo = () => {
    if (gamePlayer === streamManager.stream.connection.connectionId) {
      alert("발화자는 음소거 해제가 불가능 합니다.");
    } else if (streamManager.constructor.name === "Publisher") {
      streamManager.publishVideo(false);
      socketSend();
    }
  };
  const onVideo = () => {
    if (gamePlayer === streamManager.stream.connection.connectionId) {
      alert("발화자는 음소거 해제가 불가능 합니다.");
    } else if (streamManager.constructor.name === "Publisher") {
      streamManager.publishVideo(true);
      socketSend();
    }
  };

  if (gamePlayer === streamManager.stream.connection.connectionId) {
    if (streamManager.constructor.name === "Publisher") {
      streamManager.publishAudio(false);
      streamManager.publishVideo(true);
      socketSend();
    }
  }
  // console.log("그만하고 싶어", subscribers[0].stream.connection.connectionId);

  // const handleButtonClick = (event) => {
  //   // 선택한 버튼의 data-connectionId 값을 가져옵니다.
  //   const selectedConnectionId = event.target.getAttribute("data-connectionId");

  //   // selectedConnectionId를 활용하여 kickOutUser 함수를 호출하거나 다른 작업을 수행합니다.
  //   if (selectedConnectionId) {
  //     kickOutUser(selectedConnectionId);
  //   }
  // };

  // console.log("ㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅ", session);
  return (
    <div className="">
      {streamManager !== undefined ? (
        <div className="">
          <div className="absolute ml-7 mt-2">
            <p>
              {/* {nickname} */}
              {getNicknameTag()}
              {nickname === getNicknameTag() ? (
                <>
                  {/* {audioActive === false ? (
                    <button onClick={onMic}>
                      <MicOff />
                    </button>
                  ) : (
                    <button onClick={muteMic}>
                      <Mic />
                    </button>
                  )}

                  {videoActive === false ? (
                    <button onClick={onVideo}>
                      <VideocamOffIcon />
                    </button>
                  ) : (
                    <button onClick={muteVideo}>
                      <VideocamIcon />
                    </button>
                  )} */}
                </>
              ) : isHost === true ? (
                <button
                  onClick={() => {
                    kickOutUser(streamManager.stream.connection.connectionId);
                  }}
                >
                  X
                </button>
              ) : null}
            </p>
          </div>
          <div className="pt-9">
            <OpenViduVideoComponent streamManager={streamManager} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideo;
