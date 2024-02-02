import { Link } from "react-router-dom";
import UseIsLobbyStore from "../../../store/UseIsLobbyStore";

const Leaving = ({ leaving, onClose }) => {
  const { setIsLobby } = UseIsLobbyStore();
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
