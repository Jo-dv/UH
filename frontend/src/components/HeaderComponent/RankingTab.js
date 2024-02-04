import UseIsLobbyStore from "../../store/UseIsLobbyStore";

const RankingTab = () => {
  const { setIsLobby } = UseIsLobbyStore();

  return (
    <button
      className="w-16 text-center rounded-t-lg bg-mc4 p-2"
      onClick={() => {
        setIsLobby("SelectedRanking");
      }}
    >
      랭킹
    </button>
  );
};
export default RankingTab;
