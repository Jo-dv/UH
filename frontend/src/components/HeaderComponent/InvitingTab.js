import UseInvitingStore from "../../store/UseInvitingStore";

const InvitingTab = () => {
  const { inviting, setInviting } = UseInvitingStore();

  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-mc5 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setInviting(true);
      }}
    >
      친구 초대
    </button>
  );
};

export default InvitingTab;
