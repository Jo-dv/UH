import UserVideo from "../../pages/RoomId/UserVideo";
import personImage from "../../asset/image/person.png";

const Person = (props) => {
  if (props.publisher === null && props.subscribers === null) {
    console.log("실행됨");
    return <img src={personImage} alt="사람이 없어요." />;
  }

  return (
    <div className="grid grid-rows-2 grid-cols-4 w-full h-full">
      {props.publisher !== undefined ? (
        <div
          className="grid col-start-1 col-end-2 row-start-1 row-end-2 rounded-3xl bg-mc1 m-1"
          onClick={() => props.handleMainVideoStream(props.publisher)}
        >
          <UserVideo
            streamManager={props.publisher}
            session={props.session}
            isHost={props.isHost}
            isReady={props.isReady}
          />
        </div>
      ) : null}
    </div>
  );
};
export default Person;
