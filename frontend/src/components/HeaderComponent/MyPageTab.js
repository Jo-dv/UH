import UseIsLobbyStore from "../../store/UseIsLobbyStore";

const MyPageTab = () => {
  const { setIsLobby } = UseIsLobbyStore();

  return (
    <h3 className="w-25 text-center rounded-t-lg bg-tab4 p-2 transform origin-bottom transition duration-200 hover:scale-y-125" onClick={() => {
        setIsLobby("MyPage");
      }}>
      마이 페이지
    </h3>
  );
};

export default MyPageTab;