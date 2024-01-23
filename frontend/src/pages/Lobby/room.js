// 개별 방 모달
const Room = (props) => {
  return(
    <div className="w-1/3 container mx-auto px-4 border border-black-200 rounded">
      <div className="flex justify-start items-center space-x-2">
        <p>{props.isLocked? '잠금' : '안잠금'}</p>
        <h4>{props.roomTitle}</h4> 
      </div>
      <p>{props.isPlaying ? 'Play' : 'Wait'}</p>
      <div className="flex justfy-between items-center space-x-2">
        <p>{props.gameType}</p>
        <p>{props.numberOfPeople}/{props.totalNumberOfPeople}</p>
      </div>
    </div>
  )
}

export default Room;