import { Link } from "react-router-dom";
import UseIsLobbyStore from "../../../store/UseIsLobbyStore";
import { useWebSocket } from "../../../webSocket/UseWebSocket";
import UseLeavingStore from "../../../store/UseLeavingStore";
import useClick from "../../../hooks/useClick";
const Leaving = ({ leaving, onClose, leaveSession, exitRoom }) => {
  const { setIsLobby } = UseIsLobbyStore();
  const { setLeaving } = UseLeavingStore();
  const { send } = useWebSocket();
  const closeModal = () => {
    setLeaving(false);
    onClose();
  };
  const { playClick } = useClick();
  return (
    <>
      {leaving && (
        <div
          onClick={() => {
            closeModal();
            playClick();
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2"
          >
            <p className="text-lg font-medium text-gray-900 flex justify-center items-center mb-4">
              진짜 나갈꺼얌?
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => {
                  closeModal();
                  playClick();
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-xl"
              >
                취소
              </button>
              <Link to="/lobby">
                <button
                  onClick={() => {
                    setIsLobby(null);
                    setLeaving(false);
                    playClick();
                  }}
                  className="bg-tab10 hover:bg-[#95c75a] py-2 px-4 rounded-xl"
                >
                  방 나가기
                </button>
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Leaving;
