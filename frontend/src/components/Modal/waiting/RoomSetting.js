import { useCallback, useState, useEffect } from "react";
import useLobbyApiCall from "../../../api/useLobbyApiCall";
import useWaitingRoomApiCall from "../../../api/useWaitingRoomApiCall";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useWebSocket } from "../../../webSocket/UseWebSocket";

const RoomSetting = ({ onClose, roomSetting, roomInfo, connectionId, isHost }) => {
  const { putRoomsList } = useWaitingRoomApiCall();
  // 원래 방 정보 받기
  // console.log(roomInfo);
  const originalRoomInfo = roomInfo;
  // console.log("받은 방정보", originalRoomInfo);
  const { send } = useWebSocket();
  // 원래 방 정보 모달에 기입
  const [roomName, setRoomName] = useState(originalRoomInfo?.roomData?.roomName || "");
  const [roomPassword, setRoomPassword] = useState(
    originalRoomInfo?.roomData?.roomPassword || null
  );
  const [roomMax, setRoomMax] = useState(originalRoomInfo?.roomData?.max || "");
  const [roomGame, setRoomGame] = useState(originalRoomInfo?.roomData?.gameCategory || "");

  console.log("받은 방정보", roomName, roomPassword, roomMax, roomGame);
  // console.log(originalRoomInfo);
  // 비밀 번호 활성화 변수
  const [lock, setLock] = useState(false);
  const togglePassword = (e) => {
    e.preventDefault();
    setLock((lock) => !lock);
  };
  const [errorMessage, setErrorMessage] = useState("");
  // 방 제목 중복 검사
  const { getRoomsList } = useLobbyApiCall();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adjusting, setAdjusting] = useState(false);
  const handleChangeRoomName = useCallback((e) => {
    setRoomName(e.target.value);
  }, []);

  const handleChangeRoomPassword = useCallback((e) => {
    setRoomPassword(e.target.value);
  }, []);

  const handleChangeRoomMax = useCallback((e) => {
    setRoomMax(Number(e.target.value));
  }, []);

  const handleChangeRoomGame = useCallback((e) => {
    setRoomGame(Number(e.target.value));
  }, []);

  useEffect(() => {
    if (roomInfo.roomStatus.hostId != connectionId) {
      alert("방장만 가능합니다.");
    } else {
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
    }
  }, []);

  const checkRoomNameExists = (name) => {
    const isNameExists = rooms.some((room) => room.roomName === name);
    // console.log("중복 검사 결과:", isNameExists); // 중복 검사 결과 확인
    return isNameExists;
  };

  // console.log("제출한 방 정보", roomName, roomPassword, roomMax, roomGame);
  // 방 정보 바꾸는 Handler
  const handleUpdateRoom = (e) => {
    e.preventDefault();
    if (roomName !== originalRoomInfo.roomData.roomName) {
      if (checkRoomNameExists(roomName)) {
        setErrorMessage("이미 사용 중인 방 제목입니다.");
        return;
      }
    }
    // 비밀번호 입력란이 활성화되었고, 비밀번호가 입력되었을 때만 비밀번호 값을 전달합니다.
    const roomInfo = {
      sessionId: originalRoomInfo.roomData.sessionId,
      roomName: roomName,
      roomPassword: lock && roomPassword ? roomPassword : null,
      gameCategory: roomGame,
      max: roomMax,
    };
    putRoomsList(roomInfo)
      .then((roomInfo) => {
        // 성공적으로 업데이트된 경우 처리
        send({ type: "refresh" });
        // console.log("방 설정 업데이트 성공:", roomInfo);
      })
      .catch((error) => {
        // 오류 처리
        console.error("방 설정 업데이트 실패:", error);
        if (error.response) {
          console.error("서버 응답 데이터:", error.response.data);
        }
      });
  };

  return (
    <>
      {roomSetting && isHost && (
        <div
          onClick={onClose}
          className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center z-50"
        >
          <form
            onSubmit={handleUpdateRoom}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2"
          >
            <div className="flex flex-wrap">
              <label className="mt-3 mr-4">방제목</label>
              <div className="rounded-2xl item-center ml-3 p-2 mb-3 border flex-auto">
                <input
                  type="text"
                  // placeholder={originalRoomInfo.roomData.roomName}
                  value={roomName}
                  maxLength={12}
                  onChange={handleChangeRoomName}
                  className="ml-3"
                  required
                />
              </div>
            </div>
            {errorMessage && <div className="error-message ml-12 text-red-500">{errorMessage}</div>}
            <div className="flex flex-wrap">
              <label className="mt-3 mr-3">비밀번호</label>
              <div className="rounded-2xl w-60 p-3 mb-3 border flex-auto flex flex-warp">
                <button onClick={togglePassword}>{lock ? <LockIcon /> : <LockOpenIcon />}</button>
                {lock && (
                  <input
                    type="text"
                    placeholder="비밀번호를 입력해주세요!"
                    // value={roomPassword}
                    checked={roomPassword}
                    onChange={handleChangeRoomPassword}
                    maxLength={15}
                    className="text-center"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-wrap">
              <label className="mt-5 mr-7">인원수</label>
              <div className="rounded-2xl p-2 mb-3 border flex-auto flex justify-center">
                <label className="p-1 m-1">
                  <input
                    type="radio"
                    value={4}
                    name="num"
                    checked={roomMax === 4}
                    onChange={handleChangeRoomMax}
                    className="mr-2"
                  />
                  4명
                </label>
                <label className="p-1 m-1">
                  <input
                    type="radio"
                    value={6}
                    name="num"
                    checked={roomMax === 6}
                    onChange={handleChangeRoomMax}
                    className="mr-2"
                  />
                  6명
                </label>
                <label className="p-1 m-1">
                  <input
                    type="radio"
                    value={8}
                    name="num"
                    checked={roomMax === 8}
                    onChange={handleChangeRoomMax}
                    className="mr-2"
                  />
                  8명
                </label>
              </div>
            </div>
            <div className="flex flex-wrap">
              <label className="mt-7 mr-3">게임 선택</label>
              <div className="rounded-2xl p-4 mb-3 border flex flex-col flex-auto justify-center">
                <label>
                  <input
                    type="radio"
                    value={101}
                    name="game"
                    checked={roomGame === 101}
                    onChange={handleChangeRoomGame}
                    className="mr-2"
                  />
                  고요 속의 외침
                </label>
                <label>
                  <input
                    type="radio"
                    value={102}
                    checked={roomGame === 102}
                    name="game"
                    onChange={handleChangeRoomGame}
                    className="mr-2"
                  />
                  인물 맞추기
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-tab10 hover:bg-[#95c75a] py-2 px-4 mt-2 rounded-xl"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateRoom(e);
                  onClose();
                }}
                disabled={isLoading}
              >
                방 설정 바꾸기
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RoomSetting;
