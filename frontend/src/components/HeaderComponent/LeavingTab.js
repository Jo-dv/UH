import UseLeavingStore from "../../store/UseLeavingStore";

const LeavingTab = () => {
  const { setLeaving } = UseLeavingStore();

  return (
    <button
      className="w-24 text-center rounded-t-lg bg-mc7 p-2"
      onClick={() => {
        setLeaving(true);
      }}
    >
      방 나가기
    </button>
  );
};
export default LeavingTab;
