import React, { useState } from "react";
import OpenViduVideoComponent from "../Room/OvVideo";
import "./UserVideo.css";
import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";

const UserVideoComponent = ({ streamManager, session, isHost, isReady }) => {
  const [audioActive, setAudioActive] = useState(streamManager.stream.audioActive);
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
    // console.log("듣기", event.data);
    // console.log('폼',event.from); // Connection object of the sender
    // console.log('타입',event.type); // The type of message ("my-chat")
  });

  const muteMic = () => {
    console.log("스트림메니저", streamManager);
    // console.log("스2", streamManager.stream.audioActive);
    if (streamManager.constructor.name === "Publisher") {
      streamManager.publishAudio(false);
      socketSend();
    }
  };
  const onMic = () => {
    if (streamManager.constructor.name === "Publisher") {
      streamManager.publishAudio(true);
      socketSend();
    }
  };
  return (
    <div className="">
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          <div className="absolute">
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
