import { Link } from "react-router-dom";
import UseIsLobbyStore from "../../../store/UseIsLobbyStore";
import { useWebSocket } from "../../../webSocket/UseWebSocket";
import UseLeavingStore from "../../../store/UseLeavingStore";

const Leaving = ({ leaving, onClose, leaveSession }) => {
  const { setIsLobby } = UseIsLobbyStore();
  const { setLeaving } = UseLeavingStore();
  const { send } = useWebSocket();
  return (
    <>
      {leaving && (
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
            <p className="text-xl text-center p-4">진짜 나갈꺼얌?</p>
            <div>
              <button onClick={onClose} className="bg-cancelButton py-2 px-4 m-2 rounded">
                취소
              </button>
              <Link to="/lobby">
                <button
                  onClick={() => {
                    setIsLobby(null);
                    leaveSession();
                    send({ type: "refresh" });
                    setLeaving(false);
                  }}
                  className="bg-formButton py-2 px-4 m-2 rounded"
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
