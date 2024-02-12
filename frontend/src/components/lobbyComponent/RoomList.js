import { useEffect, useState } from "react";

import Room from "./Room";
import useLobby from "../../hooks/useLobby";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import { useWebSocket } from "../../webSocket/UseWebSocket";
import UseRoomStore from "../../store/UseRoomStore";

const RoomList = ({ viewAllRooms, viewGameCategoryRooms, viewSearchRooms }) => {
  const { getRoomsList } = useLobbyApiCall();
  const { roomRefs } = useLobby();
  const { rooms, setRooms} = UseRoomStore();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const { refreshRequested, setRefreshRequested } = useWebSocket(); // WebSocket으로부터 새로고침 요청 상태 가져오기

  // API를 통해 방 목록 데이터를 비동기적으로 가져오기
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getRoomsList();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 방 목록 로드
  useEffect(() => {
    fetchData();
  }, []);

  // WebSocket을 통한 새로고침 요청에 대한 처리
  useEffect(() => {
    if (refreshRequested) {
      fetchData();
      setRefreshRequested(false);
    }
  }, [refreshRequested]);

  // 필터링 조건에 따른 방 목록 필터링
  const filteredRooms = rooms.filter((room) => {
    if (!viewAllRooms && room.play) {
      return false;
    }
    if (
      viewSearchRooms !== "" &&
      !room.roomName.toLowerCase().includes(viewSearchRooms.toLowerCase())
    ) {
      return false;
    }
    return viewGameCategoryRooms === "" || viewGameCategoryRooms == room.gameCategory;
  });

  return (
    <section className="col-start-4 col-end-13 row-start-2 row-end-13 m-2 overflow-y-scroll p-1">
      <div className="flex flex-wrap mr-1">
        {isLoading ? (
          <div></div>
        ) : filteredRooms.length > 0 ? (
          filteredRooms.map((room, i) => (
            <div className="" ref={(el) => (roomRefs.current[i] = el)} key={i}>
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
          <div className="flex justify-center items-center w-screen h-[480px]">
            <div className="text-3xl animate-shake animate-infinite animate-duration-[2000ms]">
              방이 없어요.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomList;
