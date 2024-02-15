import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import OpenViduVideoComponent from "../RoomId/OvVideo";
import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import useStore from "../../store/UserAuthStore";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import KickOutModal from "../../components/Modal/waiting/KickOutModal";
import CloseIcon from "@mui/icons-material/Close";
import Crown from "../../asset/image/crown.png";

const UserVideo = ({
  streamManager,
  session,
  isHost,
  isReady,
  gamePlayer,
  deleteSubscriber,
  subscribers,
  kickOutUser,
  hostId,
  playerReady,
  connectionId,
}) => {
  const navigate = useNavigate();
  
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
    } else if (streamManager.constructor.name === "t") {
      streamManager.publishAudio(false);
      socketSend();
    }
  };
  const onMic = () => {
    if (gamePlayer === streamManager.stream.connection.connectionId) {
      alert("발화자는 음소거 해제가 불가능 합니다.");
    } else if (streamManager.constructor.name === "t") {
      streamManager.publishAudio(true);
      socketSend();
    }
  };
  const muteVideo = () => {
    if (gamePlayer === streamManager.stream.connection.connectionId) {
      alert("발화자는 음소거 해제가 불가능 합니다.");
    } else if (streamManager.constructor.name === "t") {
      streamManager.publishVideo(false);
      socketSend();
    }
  };
  const onVideo = () => {
    if (gamePlayer === streamManager.stream.connection.connectionId) {
      alert("발화자는 음소거 해제가 불가능 합니다.");
    } else if (streamManager.constructor.name === "t") {
      streamManager.publishVideo(true);
      socketSend();
    }
  };

  if (gamePlayer === streamManager.stream.connection.connectionId) {
    if (streamManager.constructor.name === "t") {
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
  // 모달 상태와 강퇴할 사용자의 ID를 관리하는 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // 강퇴 버튼 클릭 핸들러
  const handleKickOutClick = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  // 모달에서 강퇴 확인
  const handleConfirmKickOut = () => {
    kickOutUser(selectedUserId);
    setIsModalOpen(false);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      {streamManager !== undefined ? (
        <div className="">
          <div className="absolute ml-7 mt-2 flex w-52 justify-between">
            <p className="flex ml-6">
              {/* {nickname} */}
              {getNicknameTag()}
              {hostId === connectionId ? <img className="h-4 ml-1 mt-1" src={Crown}></img> : null}
              {/* {playerReady ? <div className="ml-1">ready</div> : null} */}
            </p>
            {nickname === getNicknameTag() ? (
              <>
                <div className="absolute right-0 top-20 mt-2 z-30">
                  <div>
                    {audioActive === false ? (
                      <button onClick={onMic}>
                        <MicOff />
                      </button>
                    ) : (
                      <button onClick={muteMic}>
                        <Mic />
                      </button>
                    )}
                  </div>
                  <div>
                    {videoActive === false ? (
                      <button onClick={onVideo}>
                        <VideocamOffIcon />
                      </button>
                    ) : (
                      <button onClick={muteVideo}>
                        <VideocamIcon />
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : isHost === true ? (
              <button
                // 강퇴 버튼 클릭 시 모달 창을 띄움
                onClick={() => handleKickOutClick(streamManager.stream.connection.connectionId)}
                className="bg-red-500 hover:bg-red-700 text-white p-1 rounded flex items-center justify-center w-5 h-5 z-30"
              >
                <CloseIcon fontSize="small" />
              </button>
            ) : null}
          </div>
          <div className="pt-9 relative">
            <OpenViduVideoComponent isReady={playerReady} streamManager={streamManager} />
          </div>
        </div>
      ) : null}
      <KickOutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmKickOut}
        userName={getNicknameTag()} // 강퇴할 사용자의 닉네임을 모달에 전달
      />
    </div>
  );
};

export default UserVideo;
