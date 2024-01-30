import { useEffect, useState } from "react";

import Room from "./Room";
import useLobby from "../../hooks/useLobby";
import useLobbyApiCall from "../../api/useLobbyApiCall";

const RoomList = ({ viewAllRooms, viewGameCategoryRooms, viewSearchRooms }) => {
  const { getRoomsList } = useLobbyApiCall();
  const { roomRefs } = useLobby();
  const [rooms, setRooms] = useState([]);
  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState(true);

  // api data 비동기로 받아오기
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 데이터 로딩 시작
      try {
        const data = await getRoomsList();
        setRooms(data);
        console.log(1111111111111, data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // 데이터 로딩 완료
      }
    };
    fetchData();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    if (!viewAllRooms && room.play) {
      return false;
    }
    if (viewGameCategoryRooms === "" && room.gameCategory !== viewGameCategoryRooms) {
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
        {isLoading ? (
          <div>로딩중</div>
        ) : filteredRooms.length > 0 ? (
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
          <div className="flex flex-auto">방이 없어요.</div>
        )}
      </div>
    </section>
  );
};

export default RoomList;
