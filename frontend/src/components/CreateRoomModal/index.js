import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomModal = ({ modalOnOff }) => {
  const [roomName, setRoomName] = useState(`X-${Math.floor(Math.random() * 1000)}`);
  const [roomPassword, setRoomPassword] = useState(null);
  const [roomMax, setRoomMax] = useState(4);
  const [roomGame, setRoomGame] = useState(100);

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
  const submitHandler = (e) => {
    //1. 페이지 리로드 방지
    e.preventDefault();
    // joinSession();
    navigate("/room/create", {
      state: {
        roomName: roomName,
        roomPassword: roomPassword,
        roomMax: roomMax,
        roomGame: roomGame,
      },
    });
  };

  return (
    <>
      <div
        onClick={modalOnOff}
        className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center"
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
                onChange={handleChangeRoomName}
                required
              />
            </label>
          </div>
          <div
            className="m-1 px-2 
          border rounded-3xl bg-white"
          >
            <label>
              비밀번호:
              <input
                type="text"
                placeholder="비밀번호를 입력해주세요!"
                value={roomPassword}
                onChange={handleChangeRoomPassword}
              />
            </label>
            {/* {lock && <input type="text" placeholder="비밀번호를 입력해주세요!" />} */}
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
                value={100}
                name="game"
                onChange={handleChangeRoomGame}
                defaultChecked
              />
              고요 속의 외침
            </label>
            <label>
              <input type="radio" value={200} name="game" onChange={handleChangeRoomGame} />
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
