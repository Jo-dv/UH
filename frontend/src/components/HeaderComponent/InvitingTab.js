import UseInvitingStore from "../../store/UseInvitingStore";

const InvitingTab = () => {
  const { inviting, setInviting } = UseInvitingStore();
  console.log("친구 탭은 작동함", inviting);
  return (
    <h3
      className="w-24 text-center rounded-t-lg bg-mc5 p-2"
      onClick={() => {
        setInviting(true);
      }}
    >
      친구 초대
    </h3>
  );
};

export default InvitingTab;
