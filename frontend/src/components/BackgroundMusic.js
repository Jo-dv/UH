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
  const audio = new Audio(background_music);


  const playAudio = () => {
    if (isPlaying) {
      audio.play().catch(error => {
        console.log(error)
        if (!/^\/room(\/.*)?$/.test(window.location.pathname)) {
          setTimeout(() => {
            playAudio();
          }, 1000);
        }
      });
      audio.loop = true;
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };
  useEffect(() => {
    playAudio();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  return null;
};

export default BackgroundMusic;
