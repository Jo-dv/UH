import UserVideoComponent from "../../pages/RoomId/UserVideoComponent";

const Person4 = (props) => {
  return (
    <div className="gird grid-rows-2 grid-cols-3">
      {props.publisher !== undefined ? (
        <div
          // className="bg-green-500 aspect-[4/3] p-1 overflow-hidden"
          onClick={() => props.handleMainVideoStream(props.publisher)}
        >
          {/* <UserVideoComponent
            streamManager={props.publisher}
            session={props.session}
            isHost={props.isHost}
            isReady={props.isReady}
          /> */}
        </div>
      ) : null}
      {/* 나말고 */}
      {props.subscribers.map((sub, i) => (
        <div
          key={sub.id}
          // className="bg-green-500 h-full aspect-[4/3] p-1 overflow-hidden"
          onClick={() => props.handleMainVideoStream(sub)}
        >
          <span>{sub.id}</span>
          <UserVideoComponent
            streamManager={sub}
            session={props.session}
            isHost={props.isHost}
            isReady={props.isReady}
          />
        </div>
      ))}{" "}
    </div>
  );
};
export default Person4;
