import UseIsLobbyStore from "../../store/UseIsLobbyStore";

const MyPageTab = () => {
  const { setIsLobby } = UseIsLobbyStore();

  return (
    <h3 className="w-25 text-center rounded-t-lg bg-mc5 p-2" onClick={() => {
        setIsLobby("MyPage");
      }}>
      마이 페이지
    </h3>
  );
};

export default MyPageTab;