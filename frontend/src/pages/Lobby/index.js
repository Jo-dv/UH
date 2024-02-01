/*eslint-disable*/
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SelectedRanking from "../../components/lobbyComponent/SelectedRanking";
import UserList from "../../components/lobbyComponent/UserList";
import RoomList from "../../components/lobbyComponent/RoomList";
import UserMediaProfile from "../../components/lobbyComponent/UserMediaProfile";
import GameRoomSearchPanel from "../../components/lobbyComponent/GameRoomSearchPanel";

import useLobbyApiCall from "../../api/useLobbyApiCall";

import UseIsLobbyStore from "../../store/UseIsLobbyStore";

const Lobby = () => {
  // [ranking component] 실행
  const { isLobby } = UseIsLobbyStore();

  // [userAuth] 페이지가 이동할 때 사용
  const navigate = useNavigate();

  // 로비가 새로고침 될 때마다 유저정보 체크
  const { getUserCheck } = useLobbyApiCall();

  useEffect(() => {
    const fetchUserAuth = async () => {
      const data = await getUserCheck();
      if (data === 0) {
        navigate("/auth/login");
      }
    };
    fetchUserAuth();
  }, [navigate]);

  // [RoomList] 전체방, 대기방만 보기
  const [viewAllRooms, setViewAllRooms] = useState(true);

  // [GameRoomSearchPanel] 전체방, 대기방만 보기
  const handleToggleView = (viewAll) => {
    setViewAllRooms(viewAll);
  };

  // [RoomList] 게임별 방 보기
  const [viewGameCategoryRooms, setViewGameCategoryRooms] = useState("");

  // [GameRoomSearchPanel] 게임별 방 보기
  const handleGameCategoryView = (viewAll) => {
    setViewGameCategoryRooms(viewAll);
  };

  // [RoomList] 검색별 방 보기
  const [viewSearchRooms, setViewSearchRooms] = useState("");

  // [GameRoomSearchPanel] 검색별 방 보기
  const handleSearchView = (viewAll) => {
    setViewSearchRooms(viewAll);
  };

  return (
    <div className="bg-neutral-200 grid grid-rows-12 grid-cols-6 p-2 mx-2 mb-2 border rounded-3xl h-screen-80">
      <UserList />
      <UserMediaProfile />
      {isLobby === true ? (
        <>
          <GameRoomSearchPanel
            onToggleView={handleToggleView}
            onGameCategoryView={handleGameCategoryView}
            onSearchView={handleSearchView}
          />
          <RoomList
            viewAllRooms={viewAllRooms}
            viewGameCategoryRooms={viewGameCategoryRooms}
            viewSearchRooms={viewSearchRooms}
          />
        </>
      ) : (
        <SelectedRanking />
      )}
    </div>
  );
};

export default Lobby;
