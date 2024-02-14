import UseIsMusicPlay from "../../store/UseIsMusicPlay";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import useClick from "../../hooks/useClick";
const MusicTab = () => {
  const { isPlaying, play, pause } = UseIsMusicPlay();
  const { playClick } = useClick();
  const handleToggleMusic = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };
  // console.log("음악 실행 됨", isPlaying);
  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab8 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        handleToggleMusic();
        playClick();
      }}
    >
      {isPlaying === true ? <MusicOffIcon color="disabled" /> : <MusicNoteIcon color="disabled" />}
    </button>
  );
};
export default MusicTab;
