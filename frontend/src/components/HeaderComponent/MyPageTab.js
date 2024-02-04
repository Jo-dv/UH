import UseIsLobbyStore from "../../store/UseIsLobbyStore";

const MyPageTab = () => {
  const { setIsLobby } = UseIsLobbyStore();

  return (
    <button
      className="w-25 text-center rounded-t-lg bg-mc5 p-2"
      onClick={() => {
        setIsLobby("MyPage");
      }}
    >
      마이 페이지
    </button>
  );
};

export default MyPageTab;
