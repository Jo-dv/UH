import { useState } from "react";

const RoomViewToggle = ({ onToggle }) => {
  const [allRooms, setAllRooms] = useState(true);

  const onToggleView = () => {
    const newView = !allRooms;
    setAllRooms(newView);
    onToggle(newView);
  };

  return (
    <button onClick={onToggleView} className="mr-2 p-1 border rounded-3xl bg-white">
      {allRooms === true ? "전체 보기" : "대기방만 보기"}
    </button>
  );
};

export default RoomViewToggle;
