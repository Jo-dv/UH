/*eslint-disable*/
import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import { useState } from "react";
import RoomList from "../../components/lobbyComponent/RoomList";
import FriendList from "../../components/lobbyComponent/FriendList";
import AccessorsList from "../../components/lobbyComponent/AccessorList";
import MyCam from "../../components/lobbyComponent/MyCam";
import Search from "../../components/lobbyComponent/Search";

const Lobby = (props) => {
  // [접속자 목록] 접속자 목록 변수
  const [accessors, setAccessors] = useState(["바가림", "황희굥", "바정인"]);

  // [검색창] 게임 선택
  const [selectedGame, setSelectedGame] = useState("");
  const handleChangeOfGame = (e) => {
    setSelectedGame(e.target.value);
  };

  // [검색창] 검색(방 제목)
  const [searchRoomTittle, setSerchRoomTittel] = useState(""); // 검색어 상태 관리
  const handleChangeOfRoomTittle = (e) => {
    setSerchRoomTittel(e.target.value);
  }; // [검색창] 사용자의 입력에 따라 검색어 상태 업데이트
  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출에 의한 페이지 새로고침 방지
    console.log(`검색어: ${searchRoomTittle}`); // 실제 검색 로직 처리
  };

  // [방목록]
  const [rooms, setRooms] = useState([
    {
      roomTitle: "방1",
      gameType: "게임1",
      numberOfPeople: 1,
      totalNumberOfPeople: 4,
      isLocked: true,
      isPlaying: false,
    },
  ]);
  // [검색창] wait와 play 입력받는 변수
  const [isSearchPlaying, setIsSearchPlaying] = useState(false); // 초기 상태는 'wait'로 설정

  // [내 상태] nickname 변수
  const nickname = "닉네임";

  // [친구 목록] 친구 목록 변수
  const [friends, setFriends] = useState([
    { name: "친구1", isOnline: true },
    { name: "친구2", isOnline: false },
  ]); // 친구

  // [친구 목록] 친구 목록을 '온라인 상태'에 따라 정렬
  const sortedFriends = friends.sort((a, b) => b.isOnline - a.isOnline);

  // [친구 목록, 접속자 목록] 2개 토글
  const [toggleFriend, setToggleFriend] = useState(true);

  return (
    <div className="bg-neutral-200 grid grid-rows-12 grid-cols-6 p-2 mx-2 mb-2 border rounded-3xl h-screen-80">
      <div className="col-start-1 col-end-2 row-start-1 row-end-2 m-2 p-2">
        <div className="flex items-center">
          <div
            className="mr-3"
            onClick={() => {
              setToggleFriend(true);
            }}
          >
            친구 목록
          </div>
          <div
            onClick={() => {
              setToggleFriend(false);
            }}
          >
            접속자 목록
          </div>
        </div>
      </div>
      {toggleFriend === true ? (
        <FriendList sortedFriends={sortedFriends} />
      ) : (
        <AccessorsList accessors={accessors} />
      )}
      <MyCam nickname={nickname} />
      <Search
        isSearchPlaying={isSearchPlaying}
        setIsSearchPlaying={setIsSearchPlaying}
        handleSubmit={handleSubmit}
        searchRoomTittle={searchRoomTittle}
        handleChangeOfRoomTittle={handleChangeOfRoomTittle}
        selectedGame={selectedGame}
      />
      <RoomList
        rooms={rooms}
        roomTitle={rooms.roomTitle}
        gameType={rooms.gameType}
        numberOfPeople={rooms.numberOfPeople}
        totalNumberOfPeople={rooms.totalNumberOfPeople}
        isLocked={rooms.isLocked}
        isPlaying={rooms.isPlaying}
      />
    </div>
  );
};

export default Lobby;
