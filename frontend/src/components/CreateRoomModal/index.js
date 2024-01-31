import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLobbyApiCall from "../../api/useLobbyApiCall";

const CreateRoomModal = ({ modalOnOff }) => {
  const [roomName, setRoomName] = useState(`P-${Math.floor(Math.random() * 1000)}`);
  const [roomPassword, setRoomPassword] = useState(null);
  const [roomMax, setRoomMax] = useState(4);
  const [roomGame, setRoomGame] = useState(100);
  const [lock, setLock] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { getRoomsList } = useLobbyApiCall();

  const handleChangeRoomName = useCallback((e) => {
    setRoomName(e.target.value);
  }, []);

  console.log("1111111111");
  console.log("roomPassword", roomPassword);

  const handleChangeRoomPassword = useCallback((e) => {
    setRoomPassword(e.target.value);
  }, []);

  console.log("22222222222");
  console.log("roomPassword", roomPassword);
  const handleChangeRoomMax = useCallback((e) => {
    setRoomMax(e.target.value);
  }, []);

  const handleChangeRoomGame = useCallback((e) => {
    setRoomGame(e.target.value);
  }, []);

  const navigate = useNavigate();

  const checkRoomNameExists = (name) => {
    return rooms.some((room) => room.roomName === name);
  };

  console.log("Before calling createSession, roomPassword:", roomPassword);

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkRoomNameExists(roomName)) {
      setErrorMessage("이미 사용 중인 방 제목입니다.");
      return;
    }

    // 비밀번호 입력란이 활성화되었고, 비밀번호가 입력되었을 때만 비밀번호 값을 전달합니다.
    const roomInfo = {
      roomName: roomName,
      roomMax: roomMax,
      roomGame: roomGame,
      roomPassword: lock && roomPassword ? roomPassword : null,
    };

    navigate("/room/create", { state: roomInfo });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoomsList();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        onClick={modalOnOff}
        className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center z-50"
      >
        <form
          onSubmit={submitHandler}
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
                placeholder="방 제목을 입력해주세요!"
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
                value={4}
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
                value={101}
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
          <button type="submit" className="p-2 m-1 rounded w-72 bg-formButton self-center">
            방 만들기
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRoomModal;
