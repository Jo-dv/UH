import React, { useState } from "react";
import CreateRoom from "../CreateRoomModal/index";

const CreateRoomTab = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <h3
        className="bg-mc1 p-2"
        onClick={() => {
          setModal(!modal);
        }}
      >
        방 만들기
      </h3>
      {modal && <CreateRoom />}
    </>
  );
};

export default CreateRoomTab;
