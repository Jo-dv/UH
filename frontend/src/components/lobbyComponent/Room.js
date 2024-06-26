import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EnterPassword from "../Modal/Lobby/EnterPassword";
import NoEnter from "../Modal/Lobby/NoEnter";
import IsPlaying from "../Modal/Lobby/IsPlaying";
import { useWebSocket } from "../../webSocket/UseWebSocket.js";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";

// 개별 방 컴포넌트
const Room = (props) => {
  const { send } = useWebSocket();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // 게임 실행중이라서 못들어감
  const [isPlaying, setIsPlaying] = useState(false);
  // 인원수 맥스여서 못들어감
  const [showNoEnter, setShowNoEnter] = useState(false);
  const [roomPassword, setRoomPassword] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const [isHover, setIsHover] = useState(true);

  useEffect(() => {
    const showModalState = localStorage.getItem("showModal");
    if (showModalState === "true") {
      setShowModal(true);
    }
  }, []);

  // 모달 상태를 로컬 스토리지에 저장하는 함수
  useEffect(() => {
    localStorage.setItem("showModal", showModal.toString());
  }, [showModal]);

  // 인원 가득 찼을 때, 모달 상태를 로컬 스토리지에서 불러오는 함수
  useEffect(() => {
    const showNoEnterState = localStorage.getItem("showNoEnter");
    if (showNoEnterState === "true") {
      setShowNoEnter(true);
    }
  }, []);

  // 모달 상태를 로컬 스토리지에 저장하는 함수
  useEffect(() => {
    localStorage.setItem("showNoEnter", showNoEnter.toString());
  }, [showNoEnter]);

  // 플레이 중일 때, 모달 상태를 로컬 스토리지에서 불러오는 함수
  useEffect(() => {
    const isPlayingState = localStorage.getItem("isPlaying");
    if (isPlayingState === "true") {
      setIsPlaying(true);
    }
  }, []);

  // 모달 상태를 로컬 스토리지에 저장하는 함수
  useEffect(() => {
    localStorage.setItem("isPlaying", isPlaying.toString());
  }, [isPlaying]);

  useEffect(() => {
    setIsHover(props.numberOfPeople !== props.totalNumberOfPeople);
  }, [props.numberOfPeople, props.totalNumberOfPeople]);

  const handleRoomMax = () => {
    if (props.numberOfPeople === props.totalNumberOfPeople) {
      setIsHover(false);
      setShowNoEnter(true);
    } else {
      setShowNoEnter(false);
      if (props.isLocked) {
        setShowModal(true); // 잠금 방 클릭 시 모달 표시
      } else {
        navigate(`/room/${props.sessionId}`); // 잠금되지 않은 방 클릭 시 이동
      }
    }
  };

  const handleClick = () => {
    send({ type: "refresh" });
    if (props.isPlaying === true) {
      setIsPlaying(true);
    } else {
      handleRoomMax();
      setIsClicked(true);
    }
  };

  return (
    <div className="px-2">
      {props.isPlaying === false ? (
        <div
          onClick={handleClick}
          className={`${
            isHover ? "hover:bg-tab4" : null
          } cursor-pointer h-[137px] w-[430px] mr-1 ml-1 mt-3 mb-3 p-3 border rounded-3xl bg-tab10 relative`}
        >
          <div className="flex flex-wrap justify-start items-center space-x-1 mb-7 mt-1">
            <p className="ml-3">{props.isLocked === null ? <LockOpenIcon /> : <LockIcon />}</p>
            <p className="font-[round-bold] text-3xl">{props.roomTitle}</p>
            <div className="absolute flex flex-wrap space-x-2 right-7">
              <p className="pl-40">
                <PersonIcon />
              </p>
              <p className="text-xl">
                {props.numberOfPeople}/{props.totalNumberOfPeople}
              </p>
            </div>
            <div className="flex flex-wrap ">
              <p className="text-xl mt-2 ml-4 absolute left-3 bottom-4">
                {props.gameType === 101 ? "고요 속의 외침" : "인물 맞추기"}
              </p>
              <p className="font-[round-bold] text-3xl absolute right-7 bottom-4">Wait</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="cursor-pointer h-[137px] w-[430px] mr-1 ml-1 mt-3 mb-3 p-3 border rounded-3xl bg-tab2 relative"
        >
          <div className="flex flex-wrap justify-start items-center space-x-1 mb-7 mt-1">
            <p className="ml-3">{props.isLocked === null ? <LockOpenIcon /> : <LockIcon />}</p>
            <p className="font-[round-bold] text-3xl">{props.roomTitle}</p>
            <div className="absolute flex flex-wrap space-x-2 right-7">
              <p className="pl-40">
                <PersonIcon />
              </p>
              <p className="text-xl">
                {props.numberOfPeople}/{props.totalNumberOfPeople}
              </p>
            </div>
            <div className="flex flex-wrap">
              <p className="text-xl mt-2 ml-4 absolute left-3 bottom-4">
                {props.gameType === 101 ? "고요 속의 외침" : "인물 맞추기"}
              </p>
              <p className="font-[round-bold] text-3xl absolute right-7 bottom-4">Play</p>
            </div>
          </div>
        </div>
      )}
      {isPlaying && <IsPlaying onClose={() => setIsPlaying(false)} isPlaying={isPlaying} />}
      {showNoEnter && <NoEnter onClose={() => setShowNoEnter(false)} showNoEnter={showNoEnter} />}
      {showModal && (
        <EnterPassword
          isLocked={props.isLocked}
          sessionId={props.sessionId}
          onClose={() => setShowModal(false)}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default Room;
