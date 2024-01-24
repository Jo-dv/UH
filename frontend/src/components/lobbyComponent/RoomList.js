import Rooms from "./Rooms";

// 방목록 조회 컴포넌트
const RoomList = (props) => {
  return (
    <div className="border-7 border-modalBorder col-start-2 col-end-7 row-start-2 row-end-13">
      <div className="flex flex-wrap -mx-2">
        <Rooms
          roomTitle={props.roomTitle}
          gameType={props.gameType}
          numberOfPeople={props.numberOfPeople}
          totalNumberOfPeople={props.totalNumberOfPeople}
          isLocked={props.isLocked}
          isPlaying={props.isPlaying}
        />
      </div>
    </div>
  );
};

export default RoomList;
