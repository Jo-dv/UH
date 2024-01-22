import Rooms from "./Rooms";

// 방목록 조회 컴포넌트
const RoomList = (props) => {
  return(
    <div className="col-start-3 col-end-9 row-start-2 row-end-12 rounded-md border">
      <Rooms
        roomTitle={props.roomTitle} 
        gameType={props.gameType} 
        numberOfPeople={props.numberOfPeople} 
        totalNumberOfPeople={props.totalNumberOfPeople} 
        isLocked={props.isLocked} 
        isPlaying={props.isPlaying}
      />
    </div>
  )
}

export default RoomList;