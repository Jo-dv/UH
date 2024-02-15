import UseLeavingStore from "../../store/UseLeavingStore";
import useClick from "../../hooks/useClick";
const LeavingTab = () => {
  const { setLeaving } = UseLeavingStore();
  const { playClick } = useClick();
  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab11 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setLeaving(true);
        playClick();
      }}
    >
      방 나가기
    </button>
  );
};
export default LeavingTab;
