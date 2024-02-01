import UseInvitingStore from "../../../store/UseInvitingStore";

const Inviting = ({ inviting, onClose, openLink }) => {
  const { setInviting } = UseInvitingStore();
  const invitingLink = `http://localhost:3000/room/${openLink}`;

  // 클립보드에 초대 링크 복사
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(invitingLink)
      .then(() => {
        console.log("링크가 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("클립보드에 복사하는데 실패했습니다:", err);
      });
  };

  return (
    <>
      {inviting && (
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
            <button
              onClick={() => {
                setInviting(false);
                copyToClipboard();
              }}
              className="bg-formButton py-2 px-4 m-2 rounded"
            >
              초대 링크 복사하기
            </button>
          </section>
        </div>
      )}
    </>
  );
};

export default Inviting;
