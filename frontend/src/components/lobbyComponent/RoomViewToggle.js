import { useState } from "react";
import useClick from "../../hooks/useClick";

const RoomViewToggle = ({ onToggle }) => {
  const [allRooms, setAllRooms] = useState(true);
  const { playClick } = useClick();

  const onToggleView = () => {
    const newView = !allRooms;
    setAllRooms(newView);
    onToggle(newView);
  };

  return (
    <>
      {allRooms === true ? (
        <button
          onClick={() => {
            onToggleView();
            playClick();
          }}
          className="bg-white hover:bg-tab9 p-1 m-2 rounded-3xl basis-1/6"
        >
          대기방만 보기
        </button>
      ) : (
        <button
          onClick={() => {
            onToggleView();
            playClick();
          }}
          className="bg-tab9 hover:bg-white p-1 m-2 rounded-3xl basis-1/6"
        >
          전체 보기
        </button>
      )}
    </>
  );
};

export default RoomViewToggle;
