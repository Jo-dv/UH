import { useEffect, useState } from "react";

import Room from "./Room";
import useLobby from "../../hook/useLobby";
import useLobbyApiCall from "../../api/useLobbyApiCall";

const RoomList = ({ viewAllRooms, viewGameCategoryRooms, viewSearchRooms }) => {
  const { getRoomsList } = useLobbyApiCall();
  const { roomRefs } = useLobby();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRoomsList();
      setRooms(data);
    };
    fetchData();
  }, [getRoomsList]);

  const filteredRooms = rooms.filter((room) => {
    if (!viewAllRooms && room.play) {
      return false;
    }
    if (viewGameCategoryRooms !== "" && room.gameCategory !== viewGameCategoryRooms) {
      return false;
    }
    if (
      viewSearchRooms !== "" &&
      !room.roomName.toLowerCase().includes(viewSearchRooms.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <section className="border-7 border-modalBorder mt-4 col-start-2 col-end-7 row-start-2 row-end-13">
      <div className="flex flex-wrap overflow-y-scroll h-[72vh] mx-2">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room, i) => (
            <div className="w-1/2 stretch" ref={(el) => (roomRefs.current[i] = el)} key={i}>
              <Room
                roomTitle={room.roomName}
                gameType={room.gameCategory}
                numberOfPeople={room.count}
                totalNumberOfPeople={room.max}
                isLocked={room.roomPassword}
                isPlaying={room.play}
                sessionId={room.sessionId}
              />
            </div>
          ))
        ) : (
          <div>방 목록이 없어요.</div>
        )}
      </div>
    </section>
  );
};

export default RoomList;
