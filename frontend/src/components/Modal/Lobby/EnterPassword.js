import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const EnterPassword = ({ showModal, isLocked, sessionId, onClose }) => {
  const navigate = useNavigate();
  const [roomPassword, setRoomPassword] = useState(null);
  console.log("비번 입력 모달 실행됨");
  const handleChangeRoomPassword = useCallback((e) => {
    setRoomPassword(e.target.value);
  }, []);
  console.log("내가 받는 비번", isLocked);
  console.log("사용자가 입력한 비번", roomPassword);
  const handleRoomClick = () => {
    if (isLocked === roomPassword) {
      navigate(`/room/${sessionId}`);
    } else {
      console.log("바보야");
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
            </div>
            <div className="m-3">
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
