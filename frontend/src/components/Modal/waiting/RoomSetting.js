import { useCallback, useState, useEffect } from "react";
import useLobbyApiCall from "../../../api/useLobbyApiCall";
import useWaitingRoomApiCall from "../../../api/useWaitingRoomApiCall";

const RoomSetting = ({ onClose, roomSetting, roomInfo }) => {
  const { putRoomsList } = useWaitingRoomApiCall();
  // 원래 방 정보 받기
  const originalRoomInfo = roomInfo.roomData;
  console.log("받은 방정보", originalRoomInfo);
  // 원래 방 정보 모달에 기입
  const [roomName, setRoomName] = useState(originalRoomInfo.roomName);
  const [roomPassword, setRoomPassword] = useState(roomInfo.roomPassword);
  const [roomMax, setRoomMax] = useState(roomInfo.Max);
  const [roomGame, setRoomGame] = useState(roomInfo.gameCategory);

  console.log("받은 방정보", roomName, roomPassword, roomMax, roomGame);

  // 비밀 번호 활성화 변수
  const [lock, setLock] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // 방 제목 중복 검사
  const { getRoomsList } = useLobbyApiCall();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getRoomsList();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const checkRoomNameExists = (name) => {
    if (name === originalRoomInfo.roomName) {
      return false;
    } else {
      const isNameExists = rooms.some((room) => room.roomName === name);
      console.log("중복 검사 결과:", isNameExists); // 중복 검사 결과 확인
      return isNameExists;
    }
  };

  const handleChangeRoomName = useCallback((e) => {
    setRoomName(e.target.value);
  }, []);

  const handleChangeRoomPassword = useCallback((e) => {
    setRoomPassword(e.target.value);
  }, []);

  const handleChangeRoomMax = useCallback((e) => {
    setRoomMax(e.target.value);
  }, []);

  const handleChangeRoomGame = useCallback((e) => {
    setRoomGame(e.target.value);
  }, []);

  console.log("제출한 방 정보", roomName, roomPassword, roomMax, roomGame);
  // 방 정보 바꾸는 Handler
  const handleUpdateRoom = (e) => {
    e.preventDefault();

    console.log("방 이름 중복 검사 시작"); // 로그 추가
    if (checkRoomNameExists(roomName)) {
      setErrorMessage("이미 사용 중인 방 제목입니다.");
      return;
    }
    // 비밀번호 입력란이 활성화되었고, 비밀번호가 입력되었을 때만 비밀번호 값을 전달합니다.
    const roomInfo = {
      sessionId: originalRoomInfo.sessionId,
      roomName: roomName,
      roomPassword: lock && roomPassword ? roomPassword : null,
      roomGame: roomGame,
      roomMax: roomMax,
    };

    putRoomsList(roomInfo)
      .then((data) => {
        // 성공적으로 업데이트된 경우 처리
        console.log("방 설정 업데이트 성공:", data);
      })
      .catch((error) => {
        // 오류 처리
        console.error("방 설정 업데이트 실패:", error);
      });

    console.log("바뀔 방 정보", roomName, roomPassword, roomMax, roomGame);
    console.log("roomInfo", roomInfo);
  };

  return (
    <>
      {roomSetting && (
        <div
          onClick={onClose}
          className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center z-50"
        >
          <form
            onSubmit={handleUpdateRoom}
            onClick={(e) => e.stopPropagation()}
            className=" rounded-2xl border-2 border-modalBorder 
          justify-center  p-2 flex flex-col bg-formBG"
          >
            <div
              className="m-1 px-2 
          border rounded-3xl bg-white"
            >
              <label>
                방제목:
                <input
                  type="text"
                  placeholder={originalRoomInfo.roomName}
                  value={roomName}
                  maxLength={12}
                  onChange={handleChangeRoomName}
                  required
                />
              </label>
            </div>
            {errorMessage && <div className="error-message ml-12 text-red-500">{errorMessage}</div>}
            <div
              className="m-1 px-2 
          border rounded-3xl bg-white"
            >
              <label className="mr-2">비밀번호:</label>
              <input
                type="checkbox"
                onClick={() => {
                  setLock(!lock);
                }}
              />
              {lock && (
                <input
                  type="text"
                  placeholder="비밀번호를 입력해주세요!"
                  value={roomPassword}
                  onChange={handleChangeRoomPassword}
                  maxLength={15}
                />
              )}
            </div>
            <div
              className="m-1 px-2 
          border rounded-3xl bg-white"
            >
              참가인원:
              <label className="p-1 m-1">
                4명
                <input
                  type="radio"
                  value={roomMax}
                  name="num"
                  onChange={handleChangeRoomMax}
                  defaultChecked
                />
              </label>
              <label className="p-1 m-1">
                6명
                <input type="radio" value={6} name="num" onChange={handleChangeRoomMax} />
              </label>
              <label className="p-1 m-1">
                8명
                <input type="radio" value={8} name="num" onChange={handleChangeRoomMax} />
              </label>
            </div>
            <div
              className="m-1 px-2 
          border rounded-3xl bg-white flex flex-col"
            >
              <p>게임선택:</p>
              <label>
                <input
                  type="radio"
                  value={roomGame}
                  name="game"
                  onChange={handleChangeRoomGame}
                  defaultChecked
                />
                고요 속의 외침
              </label>
              <label>
                <input type="radio" value={102} name="game" onChange={handleChangeRoomGame} />
                인물 맞추기
              </label>
            </div>
            <button
              type="submit"
              className="p-2 m-1 rounded w-72 bg-formButton self-center"
              onClick={onClose}
              disabled={isLoading}
            >
              방 설정 바꾸기
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RoomSetting;
