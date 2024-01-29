import { useNavigate } from "react-router-dom";

// 개별 방
const Room = (props) => {
  const navigate = useNavigate();

  return (
    <div className="px-2">
      {props.isPlaying === false ? (
        <div
          onClick={() => navigate(`/room/${props.sessionId}`)}
          className="h-full m-4 p-4 border rounded-3xl bg-formButton"
        >
          <div className="flex justify-start items-center space-x-2">
            <p>{props.isLocked === null ? "안잠금" : "잠금"}</p>
            <h4>{props.roomTitle}</h4>
          </div>
          <p>Wait</p>
          <div className="">
            <p>{props.gameType === 100 ? "고요 속의 외침" : "인물 맞추기"}</p>
            <p>
              {props.numberOfPeople}/{props.totalNumberOfPeople}
            </p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => navigate(`/room/${props.sessionId}`)}
          className="m-4 px-4 border rounded-3xl bg-white"
        >
          <div className="flex justify-start items-center space-x-2">
            <p>{props.isLocked === null ? "안잠금" : "잠금"}</p>
            <h4>{props.roomTitle}</h4>
          </div>
          <p>Play</p>
          <div className="">
            <p>{props.gameType === 100 ? "고요 속의 외침" : "인물 맞추기"}</p>
            <p>
              {props.numberOfPeople}/{props.totalNumberOfPeople}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
