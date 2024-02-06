/*eslint-disable*/
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SelectedRanking from "../../components/lobbyComponent/SelectedRanking";
import UserList from "../../components/lobbyComponent/UserList";
import RoomList from "../../components/lobbyComponent/RoomList";
import UserMediaProfile from "../../components/lobbyComponent/UserMediaProfile";
import GameRoomSearchPanel from "../../components/lobbyComponent/GameRoomSearchPanel";
import MyPage from "../../components/lobbyComponent/MyPage";

import useLobbyApiCall from "../../api/useLobbyApiCall";

import UseIsLobbyStore from "../../store/UseIsLobbyStore";
import useStore from "../../store/UserAuthStore";

const Lobby = () => {
  // currentComponent 설정
  const { isLobby, setIsLobby } = UseIsLobbyStore();
  const resetUser = useStore((state) => state.resetUser);

  // [userAuth] 페이지가 이동할 때 사용
  const navigate = useNavigate();

  // 로비가 새로고침 될 때마다 유저정보 체크
  const { getUserCheck } = useLobbyApiCall();

  useEffect(() => {
    // 로비로 들어올 때마다 isLobby의 값을 null로
    setIsLobby(null);
    // const fetchUserAuth = async () => {
    //   const data = await getUserCheck();
    //   console.log("유저체크 데이터:", data.type);
    //   if (data.type === undefined) {
    //     resetUser();
    //     navigate("/auth/login");
    //   }
    // };
    // fetchUserAuth();
  }, []);

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
      {isLobby === null ? (
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
      ) : isLobby === "SelectedRanking" ? (
        <SelectedRanking />
      ) : isLobby === "MyPage" ? (
        <MyPage />
      ) : null}
    </div>
  );
};

export default Lobby;
