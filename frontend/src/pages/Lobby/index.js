/*eslint-disable*/
import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import { useState } from "react"
import RoomList from "../../components/lobbyComponent/RoomList"
import FriendList from "../../components/lobbyComponent/FriendList";
import AccessorsList from "../../components/lobbyComponent/AccessorList";
import MyCam from "../../components/lobbyComponent/MyCam";
import Search from "../../components/lobbyComponent/Search";
import Rooms from "../../components/lobbyComponent/Rooms";

const Lobby = () => {
  // [접속자 목록] 접속자 목록 변수
  const [accessors, setAccessors] = useState(['바가림', '황희굥', '바정인']);

  // [검색창] 게임 선택
  const [selectedGame, setSelectedGame] = useState('');
  const handleChangeOfGame = (e) => {
    setSelectedGame(e.target.value);
  };

  // [검색창] 검색(방 제목) 
  const [searchRoomTittle, setSerchRoomTittel] = useState(''); // 검색어 상태 관리
  const handleChangeOfRoomTittle = (e) => {
    setSerchRoomTittel(e.target.value);

  } // [검색창] 사용자의 입력에 따라 검색어 상태 업데이트
  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출에 의한 페이지 새로고침 방지
    console.log(`검색어: ${searchRoomTittle}`); // 실제 검색 로직 처리
  };

  // [방목록] 방 제목 입력받는 변수
  const [roomTitle, setRoomTitle] = useState('수비니가 최고야');

  // [방목록] 게임 종류 입력받는 변수
  const [gameType, setGameType] = useState('고요 속의 외침');

  // [방목록] 인원수 입력받는 변수
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  // [방목록] 총인원수 입력받는 변수
  const [totalNumberOfPeople, setTotalNumberOfPeople] = useState(0);

  // [방목록] lock과 unlock 입력받는 변수
  const [isLocked, setIsLocked] = useState(false);
  
  // [검색창][방목록] wait와 play 입력받는 변수
  const [isPlaying, setIsPlaying] = useState(false); // 초기 상태는 'wait'로 설정

  // [내 상태] nickname 변수
  const nickname = '닉네임'
  
  // [친구 목록] 친구 목록 변수
  const [friends, setFriends] = useState([{name: '친구1', isOnline : true}, {name: '친구2', isOnline : false}]); // 친구

  // [친구 목록] 친구 목록을 '온라인 상태'에 따라 정렬
  const sortedFriends = friends.sort((a, b) => b.isOnline - a.isOnline);

  return (
    <div className="ml-2 mr-2 mb-2 p-2 grid grid-cols-8 grid-rows-11  gap-2 rounded-md bg-formBG">
      <FriendList sortedFriends={sortedFriends}/>
      {/* <AccessorsList accessors={accessors}/> */}
      <MyCam 
        nickname={nickname}/>
      <Search 
        isPlaying={isPlaying} 
        handleSubmit={handleSubmit} 
        searchRoomTittle={searchRoomTittle} 
        handleChangeOfRoomTittle={handleChangeOfRoomTittle} 
        selectedGame={selectedGame}/>
      <RoomList 
        roomTitle={roomTitle} 
        gameType={gameType} 
        numberOfPeople={numberOfPeople} 
        totalNumberOfPeople={totalNumberOfPeople} 
        isLocked={isLocked} 
        isPlaying={isPlaying} /> 
    </div>
    )
}


export default Lobby;