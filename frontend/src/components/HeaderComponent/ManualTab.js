import UseIsLobbyStore from "../../store/UseIsLobbyStore";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import useClick from "../../hooks/useClick";
const ManualTab = () => {
  const { setIsLobby } = UseIsLobbyStore();
  const { playClick } = useClick();
  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab3 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setIsLobby("Manual");
        playClick();
      }}
    >
      <MenuBookIcon color="disabled" />
    </button>
  );
};
export default ManualTab;
