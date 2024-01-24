// 개별 방
const Rooms = (props) => {
  return (
    <div className="w-1/2 px-2">
      <div className="m-4 px-4 border rounded-3xl bg-white">
        <div className="flex justify-start items-center space-x-2">
          <p>{props.isLocked ? "잠금" : "안잠금"}</p>
          <h4>{props.roomTitle}</h4>
        </div>
        <p>{props.isPlaying ? "Play" : "Wait"}</p>
        <div className="">
          <p>{props.gameType}</p>
          <p>
            {props.numberOfPeople}/{props.totalNumberOfPeople}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
