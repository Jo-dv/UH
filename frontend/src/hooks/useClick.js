// import useSound from "use-sound";
// import clickSound from "../asset/music/ClickSound.mp3";
// import UseClickSound from "../store/UseClickSound";

// const useClick = () => {
//   const { isSoundPlaying, playSound, stopSound } = UseClickSound();

//   const handleClick = () => {
//     if (isSoundPlaying) {
//       stopSound();
//     } else {
//       playSound();
//     }
//   };

//   return <button onClick={handleClick}>{isSoundPlaying ? "Stop Sound" : "Play Sound"}</button>;
// };

// export default useClick;

//   useEffect(() => {
//     const audio = new Audio(background_music);

//     const playAudio = () => {
//       if (isPlaying) {
//         // audio.muted = false;
//         audio.play();
//         audio.loop = true;
//       } else {
//         audio.pause();
//         audio.currentTime = 0;
//         audio.muted = true;
//       }
//     };
