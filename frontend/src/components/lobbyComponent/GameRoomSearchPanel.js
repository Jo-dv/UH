import { useEffect, useState } from "react";
import useLobbyApiCall from "../../api/useLobbyApiCall";

import GameScrollSelector from "./GameScrollSelector";
import RoomSearchBar from "./RoomSearchBar";
import RoomViewToggle from "./RoomViewToggle";

const GameRoomSearchPanel = ({ onToggleView, onGameCategoryView, onSearchView }) => {
  const [searchRooms, setSearchRooms] = useState([]);

  const { getSearchRooms } = useLobbyApiCall();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchRooms();
      setSearchRooms(data);
      console.log(data); // 데이터 확인
    };
    fetchData();
  }, []);

  return (
    <div className="col-start-4 col-end-13 row-start-1 row-end-2 rounded-3xl bg-tab11">
      <div className="flex flex-row">
        <RoomViewToggle onToggle={onToggleView} />
        <GameScrollSelector onGameCategory={onGameCategoryView} />
        <RoomSearchBar onSearch={onSearchView} />
      </div>
    </div>
  );
};

export default GameRoomSearchPanel;
