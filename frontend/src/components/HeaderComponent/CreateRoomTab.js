import React, { useState } from "react";
import CreateRoom from "../CreateRoomModal/index";

const CreateRoomTab = () => {
  const [createRoom, setCreateRoom] = useState(false);
  const modalOnOff = () => {
    setCreateRoom(!createRoom);
  };
  return (
    <>
      <button
        className="w-24 text-center rounded-t-lg bg-tab1 p-2 transform origin-bottom transition duration-200 hover:scale-y-125"
        onClick={() => {
          setCreateRoom(!createRoom);
        }}
      >
        방 만들기
      </button>
      {createRoom === true ? <CreateRoom modalOnOff={modalOnOff} /> : null}
    </>
  );
};

export default CreateRoomTab;
