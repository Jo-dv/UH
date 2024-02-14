// import React from 'react';
// import background_music from '../asset/music/background_music.mp3'

// const BackgroundMusic = () => {
//   return (
//     <audio src={background_music} autoPlay loop />
//   );
// }

// export default BackgroundMusic;

import { useEffect } from "react";
import background_music from "../asset/music/background_music.mp3";
import UseIsMusicPlay from "../store/UseIsMusicPlay";

const BackgroundMusic = () => {
  const { isPlaying } = UseIsMusicPlay();

  useEffect(() => {
    const audio = new Audio(background_music);

    const playAudio = () => {
      if (isPlaying) {
        // audio.muted = false;
        audio.play();
        audio.loop = true;
      } else {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = true;
      }
    };

    // 최초 렌더링 시 playAudio 호출
    playAudio();

    // 사용자 상호 작용(예: 클릭)을 감지하여 오디오 재생 시작
    // const handleClick = () => {
    //   document.removeEventListener("click", handleClick);
    //   playAudio();
    // };

    // document.addEventListener("click", handleClick);

    return () => {
      // document.removeEventListener("click", handleClick);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  return null;
};

export default BackgroundMusic;
