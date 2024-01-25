import React, { useState } from "react";
import CreateRoom from "../CreateRoomModal/index";

const CreateRoomTab = () => {
  const [createRoom, setCreateRoom] = useState(false);

  return (
    <>
      <h3
        className="rounded-t-lg bg-mc1 p-2"
        onClick={() => {
          setCreateRoom(!createRoom);
        }}
      >
        방 만들기
      </h3>
      {createRoom === true ? (
        <CreateRoom createRoom={createRoom} setCreateRoom={setCreateRoom} />
      ) : null}
    </>
  );
};

export default CreateRoomTab;
