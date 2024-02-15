import UseInvitingStore from "../../../store/UseInvitingStore";
import InviteList from "../../waitingComponent/InviteList";
import useClick from "../../../hooks/useClick";

const Inviting = ({ onClose, openLink }) => {
  const { inviting, setInviting } = UseInvitingStore();
  const { playClick } = useClick();

  return (
    <>
      {inviting ? (
        <InviteList /> // inviting 상태가 true일 때 InviteList 컴포넌트 렌더링
      ) : (
        <div
          onClick={() => {
            setInviting(false); // 여기서 inviting을 false로 설정하면, 사용자가 백그라운드를 클릭할 때 초대 팝업이 닫힙니다.
            onClose && onClose(); // onClose 함수가 제공되었다면 호출
            playClick();
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border-gray-200 border shadow-lg p-10 md:p-6 mx-2"
            >
              <InviteList />
          </section>
        </div>
      )}
    </>
  );
};

export default Inviting;
