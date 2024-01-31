import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useLobbyApiCall from "../../../api/useLobbyApiCall";

const EnterPassword = ({ showModal, isLocked, sessionId, onClose }) => {
  const navigate = useNavigate();
  const { postCheckPassword } = useLobbyApiCall();
  const [roomPassword, setRoomPassword] = useState(null);
  console.log("비번 입력 모달 실행됨");
  const handleChangeRoomPassword = useCallback((e) => {
    setRoomPassword(e.target.value);
  }, []);
  const [again, setAgain] = useState(false);

  const handleRoomClick = async () => {
    try {
      const checkPassword = await postCheckPassword(sessionId, roomPassword);
      if (checkPassword) {
        navigate(`/room/${sessionId}`);
      } else {
        setAgain(true);
        console.log("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("서버에 요청하는 동안 오류가 발생했습니다.", error);
    }
  };

  return (
    <>
      {showModal && (
        <div
          onClick={onClose}
          className="w-screen h-screen absolute inset-0
flex justify-center items-center"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="bg-formBG min-w-80 min-h-40 rounded-2xl border-2 border-modalBorder
  flex flex-col justify-center items-center"
          >
            <p className="text-xl text-center p-4">비밀번호를 입력</p>
            <div>
              <input
                type="text"
                placeholder="비밀번호를 입력해주세요!"
                value={roomPassword}
                onChange={handleChangeRoomPassword}
                maxLength={15}
                className="rounded-3xl text-center p-2"
              />
              {again && (
                <p
                  className="text-red-500 m-2 p-2 text-center
              "
                >
                  비밀번호가 틀렸습니다.
                </p>
              )}
            </div>
            <div>
              <button onClick={onClose} className="bg-cancelButton py-2 px-4 m-2 rounded">
                취소
              </button>
              <button onClick={handleRoomClick} className="bg-formButton py-2 px-4 m-2 rounded">
                확인
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default EnterPassword;
