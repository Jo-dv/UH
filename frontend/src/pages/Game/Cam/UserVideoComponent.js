import React, { useEffect, useState } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";
import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const UserVideoComponent = ({
  streamManager,
  session,
  isHost,
  isReady,
  gamePlayer,
  gameCategory,
}) => {
  const [audioActive, setAudioActive] = useState(streamManager.stream.audioActive);
  const [videoActive, setVideoActive] = useState(streamManager.stream.audioActive);
  const [beforeGamePlayer, setBeforeGamePlayer] = useState(gamePlayer);
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  const socketSend = () => {
    session
      .signal({
        data: `유저 데이터 변경`, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "user-set", // The type of message (optional)
      })
      .then(() => {
        // console.log("보냄 : 마이크");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  session.on("signal:user-set", (event) => {
    setAudioActive(streamManager.stream.audioActive);
    setVideoActive(streamManager.stream.videoActive);
    // console.log("듣기", event.data);
    // console.log('폼',event.from); // Connection object of the sender
    // console.log('타입',event.type); // The type of message ("my-chat")
  });

  const muteMic = () => {
    console.log("스트림메니저", streamManager);
    console.log("스트림메니저2", gamePlayer);
    console.log("스트림메니저3", gameCategory);
    if (streamManager.constructor.name === "t") {
      streamManager.publishAudio(false);
      socketSend();
    }
  };
  const onMic = () => {
    if (gamePlayer === streamManager.stream.connection.connectionId && gameCategory === 101) {
      alert("발화자는 음소거 해제가 불가능 합니다.");
    } else if (streamManager.constructor.name === "t") {
      streamManager.publishAudio(true);
      socketSend();
    }
  };
  const muteVideo = () => {
    // console.log("스트림메니저", streamManager);
    if (gamePlayer === streamManager.stream.connection.connectionId) {
      alert("발화자는 음소거 해제가 불가능 합니다.");
    } else if (streamManager.constructor.name === "t") {
      streamManager.publishVideo(false);
      socketSend();
    }
  };
  const onVideo = () => {
    if (streamManager.constructor.name === "t") {
      streamManager.publishVideo(true);
      socketSend();
    }
  };

  useEffect(() => {
    console.log("gamePlayer", gamePlayer, "그전", beforeGamePlayer);
    if (gameCategory === 101) {
      if (gamePlayer === streamManager.stream.connection.connectionId) {
        if (streamManager.constructor.name === "t") {
          streamManager.publishAudio(false);
          streamManager.publishVideo(true);
          socketSend(); //cpu 메모리 잡아먹는 범인
        }
      } else {
        if (
          streamManager.constructor.name === "t" &&
          beforeGamePlayer === streamManager.stream.connection.connectionId
        ) {
          streamManager.publishAudio(true);
          socketSend(); //cpu 메모리 잡아먹는 범인
        }
      }
      setBeforeGamePlayer(gamePlayer);
    }
  }, [gamePlayer]);

  return (
    <div className="w-full h-full">
      {streamManager !== undefined ? (
        <div className="relative w-full h-full">
          <OpenViduVideoComponent streamManager={streamManager} />
          <div className="streamcomponentInfo">
            <p>
              {getNicknameTag()}

              {audioActive === false ? (
                <button onClick={onMic}>
                  <MicOff />
                </button>
              ) : (
                <button onClick={muteMic}>
                  <Mic />
                </button>
              )}

              {/* {videoActive === false ? (
                <button onClick={onVideo}>
                  <VideocamOffIcon />
                </button>
              ) : (
                <button onClick={muteVideo}>
                  <VideocamIcon />
                </button>
              )} */}
            </p>
            {/* <p>
              isHost : {isHost ? "true" : "false"}, isReady : {isReady ? "true" : "false"}
            </p> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
