import { useState } from "react";

const RoomViewToggle = ({ onToggle }) => {
  const [allRooms, setAllRooms] = useState(true);

  const onToggleView = () => {
    const newView = !allRooms;
    setAllRooms(newView);
    onToggle(newView);
  };

  return (
    <>
      {allRooms === true ? (
        <button
          onClick={onToggleView}
          className="bg-white hover:bg-tab9 p-1 m-2 rounded-3xl basis-1/6"
        >
          전체 보기
        </button>
      ) : (
        <button
          onClick={onToggleView}
          className="bg-tab9 hover:bg-white p-1 m-2 rounded-3xl basis-1/6"
        >
          대기방만 보기
        </button>
      )}
    </>
  );
};

export default RoomViewToggle;
