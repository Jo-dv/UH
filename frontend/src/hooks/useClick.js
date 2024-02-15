import useSound from "use-sound";
import clickSound from "../asset/music/ClickSound.mp3";

const useClick = () => {
  const [playClick] = useSound(clickSound);

  return { playClick };
};

export default useClick;
