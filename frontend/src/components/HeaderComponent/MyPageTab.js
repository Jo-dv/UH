import UseIsLobbyStore from "../../store/UseIsLobbyStore";

const MyPageTab = () => {
  const { setIsLobby } = UseIsLobbyStore();

  return (
    <button
      className="w-25 text-center rounded-t-lg bg-tab10 p-2 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setIsLobby("MyPage");
      }}
    >
      마이 페이지
    </button>
  );
};

export default MyPageTab;
