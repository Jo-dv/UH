import Rooms from "./Rooms";

// 방목록 조회 컴포넌트
const RoomList = (props) => {
  if (!props.rooms) {
    <>
      <div>방이 없어요....ㅠㅠ</div>
    </>;
  }

  return (
    <div className="border-7 border-modalBorder col-start-2 col-end-7 row-start-2 row-end-13">
      <div className="flex flex-wrap mx-2">
        {props.rooms.map((room, i) => (
          <Rooms
            key={i}
            roomTitle={room.roomTitle}
            gameType={room.gameType}
            numberOfPeople={room.numberOfPeople}
            totalNumberOfPeople={room.totalNumberOfPeople}
            isLocked={room.isLocked}
            isPlaying={room.isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomList;
