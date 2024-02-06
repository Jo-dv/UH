import { useEffect, useState } from "react";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import { useNavigate } from "react-router-dom";
import FastNoEnter from "../Modal/Lobby/FastNoEnter";

const FastTrackTab = () => {
  const { getRoomsList } = useLobbyApiCall();
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showNoEnter, setShowNoEnter] = useState(false);
  useEffect(() => {
    getRoomsList()
      .then((res) => setRooms(res))
      .catch((err) => setError("방 목록을 불러오는 데 실패했습니다."));
  }, []);

  const handleFastTrack = () => {
    const filteredRooms = rooms.filter((room) => !room.play && room.max > room.count);

    if (filteredRooms.length > 0) {
      const randomRoom = filteredRooms[Math.floor(Math.random() * filteredRooms.length)];
      navigate(`/room/${randomRoom.sessionId}`);
    } else {
      setShowNoEnter(true);
    }
  };

  return (
    <>
      <h3 className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab2 transform origin-bottom transition duration-200 hover:scale-y-125">
        <button onClick={handleFastTrack}>빠른 입장</button>
      </h3>
      {showNoEnter && (
        <FastNoEnter onClose={() => setShowNoEnter(false)} showNoEnter={showNoEnter} />
      )}
    </>
  );
};

export default FastTrackTab;
