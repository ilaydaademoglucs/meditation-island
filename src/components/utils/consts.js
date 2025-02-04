import { useState } from 'react';
import { Vector3 } from 'three';

export function useSound(url, loop = false) {
  const [audio] = useState(() => {
    const sound = new Audio(url);
    sound.loop = loop;
    return sound;
  });

  const play = () => audio.play();
  const pause = () => audio.pause();

  return { play, pause, audio };
}

export const FIXED_CAMERA_POSITIONS = {
  SHELL_POSITION: new Vector3(2.24, 0.9, -1),
  FEMALE_POSITION: new Vector3(-0.18, 1.1, 1.3),
  SHARK_POSITION: new Vector3(2.2, 0.48, 0.2),
  LEAF_POSITION: new Vector3(-1.18, 2.7, 1.3),
  TIBETIAN_BOWL_POSITON: new Vector3(-1.68, 1.8, 0.4),
  FIRE_POSITION: new Vector3(0.18, 2.2, 0.2),
  MERMAID_POSITION: new Vector3(-3.58, 1.37, -3.31),
};

export const handlePointerOver = () => {
  document.body.style.cursor = 'pointer';
};
export const handlePointerOut = () => {
  document.body.style.cursor = 'auto';
};
