import React from 'react';
import background_music from '../asset/music/background_music.mp3'

const BackgroundMusic = () => {
  return (
    <audio src={background_music} autoPlay loop />
  );
}

export default BackgroundMusic;
