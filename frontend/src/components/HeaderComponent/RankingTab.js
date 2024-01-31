import UseIsLobbyStore from "../../store/UseIsLobbyStore";

const RankingTab = () => {
  const { setIsLobby } = UseIsLobbyStore();

  return (
    <h3
      className="w-16 text-center rounded-t-lg bg-mc4 p-2"
      onClick={() => {
        setIsLobby(false);
      }}
    >
      랭킹
    </h3>
  );
};
export default RankingTab;
