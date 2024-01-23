import Rooms from "./Rooms";

// 방목록 조회 컴포넌트
const RoomList = (props) => {
  return (
    <container>
      <Rooms
        roomTitle={props.roomTitle}
        gameType={props.gameType}
        numberOfPeople={props.numberOfPeople}
        totalNumberOfPeople={props.totalNumberOfPeople}
        isLocked={props.isLocked}
        isPlaying={props.isPlaying}
      />
    </container>
  );
};

export default RoomList;
