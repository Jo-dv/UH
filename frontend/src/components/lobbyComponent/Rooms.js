// 개별 방
const Rooms = (props) => {
  return (
    <div className="m-3 px-3 col-start-3 col-end-7 row-start-2 row-end-12 border rounded-3xl bg-white">
      <div className="flex justify-start items-center space-x-2">
        <p>{props.isLocked ? "잠금" : "안잠금"}</p>
        <h4>{props.roomTitle}</h4>
      </div>
      <p>{props.isPlaying ? "Play" : "Wait"}</p>
      <div className="flex justfy-between items-center space-x-2">
        <p>{props.gameType}</p>
        <p>
          {props.numberOfPeople}/{props.totalNumberOfPeople}
        </p>
      </div>
    </div>
  );
};

export default Rooms;
