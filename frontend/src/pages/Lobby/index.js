/*eslint-disable*/

import { useState } from "react"
import Room from "./room"
import { Link } from "react-router-dom"

const Lobby = () => {
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

  // [친구 목록] 친구 목록 변수
  const [friends, setFriends] = useState([{name: '친구1', isOnline : true}, {name: '친구2', isOnline : false}]); // 친구
  
  // [친구 목록] 친구 목록을 '온라인 상태'에 따라 정렬
  const sortedFriends = friends.sort((a, b) => b.isOnline - a.isOnline);
  
  // [접속자 목록] 접속자 목록 변수
  const [accessors, setAccessors] = useState(['바가림', '황희굥', '바정인']);
  
  // [내 상태] nickname 변수
  const nickname = '닉네임'
  
  return (
    <div>
      <nav>
        <ul className="flex flex-row items-end">
          <li>
            <Link to='/lobby'>
              <img src='img/logo.png' alt="Logo" 
              className="h-20"/>
            </Link>
          </li>
          <li className="bg-mc1 p-2">방 만들기</li>
          <li className="bg-mc2 p-2">빠른 입장</li>
          <li className="bg-mc3 p-2">친구</li>
          <li className="bg-mc3 p-2">랭킹</li>
          <li className="bg-mc3 p-2">설정</li>
          <li className="bg-mc3 p-2">피드백</li>
          <li className="bg-mc4 p-2">로그아웃</li>
        </ul>
      </nav>
      <h1>로비</h1>
      <div>
        {/* 친구 목록 */}
        <div style={{ maxHeight : '200px', overflowY : 'auto'}}>
          <h2>친구 목록</h2>
            {sortedFriends.map((friend, i)=>(
            <p i={i} style={{ color: friend.isOnline ? 'black' : 'gray' }}>
              {friend.name}
            </p>
          ))}
        </div>
        {/* 접속자 목록 */}
        <div style={{ maxHeight : '200px', overflowY : 'auto'}}>
          <h2>접속자 목록</h2>
          {accessors.map((accessor, i)=>(
            <p i={i}>
              {accessor.name}
            </p>
          ))}
        </div>
      </div>  
      {/* 내 상태 확인 */}
      <div>
        <h2>내 상태 확인</h2>
        <p>{ nickname }</p>
        <p>화면</p>
        {/*
        <p>{카메라?'커짐':'꺼짐'}</p>
        <p>{마이크?'커짐':'꺼짐'}</p>
        */}
      </div>
      {/* 검색창 입력란 */}
      <div className="display: flex align-items: right gap: 10px">
        <button>대기방 보기</button>
        <select value={selectedGame} onChange={handleChangeOfGame}>
          <option value="">게임 선택</option>
          <option value="game1">고요 속의 외침</option>
          <option value="game2">인물 맞추기</option>
        </select>
        <div>
          <form onSubmit={handleSubmit}>
              <input
                type="search"
                value={searchRoomTittle}
                onChange={handleChangeOfRoomTittle}
                placeholder="방 제목"
              />
              <button type="submit">검색</button>
          </form>
        </div>
      </div>
      {/* 방목록 */}
      <div style={{ maxHeight : '400px', overflowY : 'auto'}}>
        <Room 
          roomTitle={roomTitle} 
          gameType={gameType} 
          numberOfPeople={numberOfPeople} 
          totalNumberOfPeople={totalNumberOfPeople} 
          isLocked={isLocked} 
          isPlaying={isPlaying} 
        />
      </div>
    </div>
    )
}


export default Lobby;