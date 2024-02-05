import UseInvitingStore from "../../store/UseInvitingStore";

const InvitingTab = () => {
  const { inviting, setInviting } = UseInvitingStore();

  return (
    <button
      className="w-24 text-center rounded-t-lg bg-mc5 p-2"
      onClick={() => {
        setInviting(true);
      }}
    >
      친구 초대
    </button>
  );
};

export default InvitingTab;
