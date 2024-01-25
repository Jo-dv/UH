import { Link } from "react-router-dom";
import CreateRoomModal from "../../components/CreateRoomModal";
import { useState } from "react";

const RoomNavbar = () => {
  const [modalState, setModalState] = useState(false);
  const modalOnOff = () => {
    setModalState(!modalState);
  };
  return (
    <nav>
      <ul className="flex flex-row items-end">
        <li className="bg-mc1 p-2" onClick={modalOnOff}>
          방 설정
          {modalState ? <CreateRoomModal /> : null}
        </li>
        <li className="bg-mc2 p-2">친구 초대</li>
        <li className="bg-mc3 p-2">설정</li>
        <li className="bg-mc4 p-2">
          <Link to="/lobby">방나가기</Link>
        </li>
      </ul>
    </nav>
  );
};

export default RoomNavbar;
