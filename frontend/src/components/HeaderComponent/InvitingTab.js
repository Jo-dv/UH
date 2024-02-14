import UseInvitingStore from "../../store/UseInvitingStore";
import useClick from "../../hooks/useClick";
const InvitingTab = () => {
  const { inviting, setInviting } = UseInvitingStore();
  const { playClick } = useClick();
  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab3 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setInviting(true);
        playClick();
      }}
    >
      친구 초대
    </button>
  );
};

export default InvitingTab;
