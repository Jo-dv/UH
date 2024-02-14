import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import useClick from "../../hooks/useClick";
const CreateRoomModal = ({ modalOnOff }) => {
  const [roomName, setRoomName] = useState(`P-${Math.floor(Math.random() * 1000)}`);
  const [roomPassword, setRoomPassword] = useState(null);
  const [roomMax, setRoomMax] = useState(4);
  const [roomGame, setRoomGame] = useState(101);
  const [lock, setLock] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [animate, setAnimate] = useState(false);
  const { getRoomsList } = useLobbyApiCall();
  const triggerAnimate = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };
  const [showPassword, setShowPassword] = useState(false);
  const { playClick } = useClick();
  const togglePassword = (e) => {
    e.preventDefault();
    setLock((lock) => !lock);
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

  const navigate = useNavigate();

  const checkRoomNameExists = (name) => {
    return rooms.some((room) => room.roomName === name);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkRoomNameExists(roomName)) {
      setErrorMessage("이미 사용 중인 방 제목입니다.");
      return;
    }

    // 비밀번호 입력란이 활성화되었고, 비밀번호가 입력되었을 때만 비밀번호 값을 전달합니다.
    const roomInfo = {
      roomName: roomName,
      roomPassword: lock && roomPassword ? roomPassword : null,
      roomGame: roomGame,
      roomMax: roomMax,
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div
          onClick={modalOnOff}
          className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center z-50"
        >
          <form
            onSubmit={submitHandler}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2"
          >
            <div className="flex flex-wrap">
              <label className="mt-3 mr-4">방제목</label>
              <div className="rounded-2xl item-center ml-3 p-2 mb-3 border flex-auto">
                <input
                  type="text"
                  placeholder="방 제목을 입력해주세요!"
                  value={roomName}
                  maxLength={9}
                  onChange={handleChangeRoomName}
                  className="ml-3"
                  required
                />
              </div>
            </div>
            {errorMessage && <div className="error-message ml-12 text-red-500">{errorMessage}</div>}
            <div className="flex flex-wrap">
              <label className="mt-3 mr-3">비밀번호</label>
              <div className="rounded-2xl w-60 p-3 mb-3 border flex-auto flex flex-wrap">
                <button onClick={togglePassword}>{lock ? <LockIcon /> : <LockOpenIcon />}</button>
                {lock && (
                  <input
                    type="text"
                    placeholder="비밀번호를 입력해주세요!"
                    value={roomPassword}
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
                    onChange={handleChangeRoomMax}
                    defaultChecked
                    className="mr-2"
                  />
                  4명
                </label>
                <label className="p-1 m-1">
                  <input
                    type="radio"
                    value={6}
                    name="num"
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
                    onChange={handleChangeRoomGame}
                    defaultChecked
                    className="mr-2"
                  />
                  고요 속의 외침
                </label>
                <label>
                  <input
                    type="radio"
                    value={102}
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
                onClick={playClick()}
              >
                방 만들기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoomModal;
