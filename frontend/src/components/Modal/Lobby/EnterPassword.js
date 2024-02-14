import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLobbyApiCall from "../../../api/useLobbyApiCall";
import useClick from "../../../hooks/useClick";
const EnterPassword = ({ showModal, isLocked, sessionId, onClose }) => {
  const navigate = useNavigate();
  const { postCheckPassword } = useLobbyApiCall();
  const [roomPassword, setRoomPassword] = useState(null);
  const handleChangeRoomPassword = useCallback((e) => {
    setRoomPassword(e.target.value);
  }, []);
  const [again, setAgain] = useState(false);
  const { playClick } = useClick();
  useEffect(() => {
    console.log("Effect:", again);
  }, [again]);

  const handleRoomClick = async () => {
    try {
      const checkPassword = await postCheckPassword(sessionId, roomPassword);
      console.log("checkPassword", checkPassword);
      if (checkPassword) {
        navigate(`/room/${sessionId}`);
      } else {
        setAgain(true);
        console.log("3333333333", again);
        console.log("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("서버에 요청하는 동안 오류가 발생했습니다.", error);
      setAgain(true);
    }
  };
  console.log("2222222222222222222", again);
  return (
    <>
      {showModal && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2"
          >
            <p className="flex justify-center items-center text-lg font-medium text-gray-900 mb-4">
              비밀번호 입력
            </p>
            <div>
              <input
                type="text"
                placeholder="비밀번호를 입력해주세요!"
                value={roomPassword}
                onChange={handleChangeRoomPassword}
                maxLength={15}
                className="rounded-3xl text-center p-2 mb-3 border"
              />
              {again && (
                <p
                  className="text-red-500 mb-1 p-2 text-center
              "
                >
                  비밀번호가 틀렸습니다.
                </p>
              )}
            </div>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => {
                  onClose();
                  playClick();
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-xl"
              >
                취소
              </button>
              <button
                onClick={() => {
                  handleRoomClick();
                  onClose();
                  playClick();
                }}
                className="bg-tab10 hover:bg-[#95c75a] py-2 px-4 rounded-xl"
              >
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
