/**
 * Island Component
 * Created by Ilayda Ademoglu
 * Date: 4/02/2025
 */

import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import gsap from 'gsap';

import oceanWaves from '../../src/assets/sounds/ocean_waves.mp3';
import fishTankSound from '../../src/assets/sounds/fish_tank.mp3';
import forestSound from '../../src/assets/sounds/forest.mp3';
import fireSound from '../../src/assets/sounds/fire.mp3';
import tibetianBowlSound from '../../src/assets/sounds/tibetian_bowl.mp3';
import femaleMeditationSound from '../../src/assets/sounds/female_voice.mp3';
import mermaidMeditationSound from '../../src/assets/sounds/meditation2.mp3';

import { PurpleSeashell } from './PurpleSeashell';
import CancelButton from './CloseButton';
import { handlePointerOut, handlePointerOver, useSound } from './utils/consts';
import { MeditatingFemale } from './Meditation_pose_female';
import { AnimatedFire } from './AnimatedFire';
import { FloatingShip } from './FloatingShip';
import { Jellyfish } from './Jellyfish';
import { SingingBowl } from './SingingBowl';
import { SwimmingDude } from './SwimmingDude';
import { Mermaid } from './Mermaid_wip';

const FIXED_CAMERA_POSITIONS = {
  SHELL_POSITION: new Vector3(2.24, 0.9, -1),
  FEMALE_POSITION: new Vector3(-0.18, 1.1, 1.3),
  SHARK_POSITION: new Vector3(2.2, 0.48, 0.2),
  LEAF_POSITION: new Vector3(-1.18, 2.7, 1.3),
  TIBETIAN_BOWL_POSITON: new Vector3(-1.68, 1.8, 0.4),
  FIRE_POSITION: new Vector3(0.18, 2.2, 0.2),
  MERMAID_POSITION: new Vector3(-3.58, 1.37, -3.31),
};

export function Island(props) {
  const { camera, gl } = useThree();
  const controls = gl.controls;
  const { nodes, materials } = useGLTF('./models/low_poly_island.glb');

  // Sounds
  const oceanSound = useSound(oceanWaves, true);
  const meditationSound = useSound(femaleMeditationSound, true);
  const fishTankSoundInstance = useSound(fishTankSound, true);
  const forestSoundInstance = useSound(forestSound, true);
  const fireSoundInstance = useSound(fireSound, true);
  const mermaidSoundInstance = useSound(mermaidMeditationSound, true);
  const tibetianBowlSoundInstance = useSound(tibetianBowlSound, true);

  tibetianBowlSoundInstance.audio.volume = 0.1;
  mermaidSoundInstance.audio.volume = 0.1;

  const [shellView, setShellView] = useState(false);

  const initialCamPosRef = useRef(camera.position.clone());
  const initialTargetRef = useRef(controls?.target.clone() ?? new Vector3());

  const seashellRef = useRef();
  const palm3Ref = useRef();
  const singingBowlRef = useRef();
  const meditatingFemaleRef = useRef();

  const leavesRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const randomParamsForLeaves = useRef(
    leavesRefs.map(() => ({
      phaseX: Math.random() * Math.PI * 2,
      phaseZ: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      speedX: 0.4 + Math.random() * 0.6,
      speedZ: 0.3 + Math.random() * 0.4,
      speedY: 0.5 + Math.random() * 0.6,
    }))
  );

  const sharkRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const sharkParams = useRef(
    sharkRefs.map(() => ({
      speed: 0.6 + Math.random() * 5.4,
      verticalAmp: 0.3 + Math.random() * 0.2,
      horizontalAmp: 1.5 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  const boatRef = useRef();

  // Prevent shift+drag events on all pointer events because I defined fixed positions to focus
  useEffect(() => {
    const cancelShiftPointer = (e) => {
      if (e.shiftKey) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    window.addEventListener('pointerdown', cancelShiftPointer, true);
    window.addEventListener('pointermove', cancelShiftPointer, true);
    window.addEventListener('pointerup', cancelShiftPointer, true);
    return () => {
      window.removeEventListener('pointerdown', cancelShiftPointer, true);
      window.removeEventListener('pointermove', cancelShiftPointer, true);
      window.removeEventListener('pointerup', cancelShiftPointer, true);
    };
  }, []);

  useEffect(() => {
    initialCamPosRef.current.copy(camera.position);
    if (controls) {
      initialTargetRef.current.copy(controls.target);
    }
  }, [camera, controls]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    leavesRefs.forEach((ref, i) => {
      if (ref.current) {
        const { phaseX, phaseZ, phaseY, speedX, speedZ, speedY } = randomParamsForLeaves.current[i];
        ref.current.rotation.x = Math.sin(t * speedX + phaseX) * 0.1;
        ref.current.rotation.z = Math.sin(t * speedZ + phaseZ) * 0.05;
        ref.current.position.y = Math.sin(t * speedY + phaseY) * 0.2;
      }
    });

    sharkRefs.forEach((ref, i) => {
      if (ref.current) {
        const { speed, verticalAmp, horizontalAmp, phase } = sharkParams.current[i];
        ref.current.position.y = Math.sin(t * speed + phase) * verticalAmp;
        ref.current.position.x += Math.sin(t * 0.8 + phase) * horizontalAmp * 0.01;
        ref.current.rotation.z = Math.sin(t * speed * 1.2 + phase) * 0.1;
      }
    });

    if (palm3Ref.current) {
      palm3Ref.current.rotation.z = 0.1 * Math.sin(t * 2 + 2);
    }

    if (boatRef.current) {
      boatRef.current.position.y = -4.952 + Math.sin(t) * 0.4;
      boatRef.current.rotation.z = 0.05 * Math.sin(t * 1.5);
    }
  });

  const pauseAllAudio = () => {
    if (!oceanSound.audio.paused) oceanSound.pause();
    if (!meditationSound.audio.paused) meditationSound.pause();
    if (!fishTankSoundInstance.audio.paused) fishTankSoundInstance.pause();
    if (!forestSoundInstance.audio.paused) forestSoundInstance.pause();
    if (!tibetianBowlSoundInstance.audio.paused) tibetianBowlSoundInstance.pause();
    if (!fireSoundInstance.audio.paused) fireSoundInstance.pause();
    if (!mermaidSoundInstance.audio.paused) mermaidSoundInstance.pause();
  };

  const moveCameraTo = (newPos, targetWorldRef, duration = 0.7, ease = 'none', onComplete) => {
    const targetPos = new Vector3();
    if (targetWorldRef?.current) {
      targetWorldRef.current.getWorldPosition(targetPos);
    }

    gsap.to(camera.position, {
      duration,
      ease,
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      onStart: () => {
        if (controls) controls.enabled = false;
        if (controls?.target) {
          controls.target.copy(targetPos);
          controls.update();
        }
      },
      onUpdate: () => {
        if (controls?.target) {
          controls.target.lerp(targetPos, 0.35);
          controls.update();
        }
      },
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });
  };

  const handleCancelView = () => {
    pauseAllAudio();
    gsap.to(camera.position, {
      duration: 0.7,
      x: initialCamPosRef.current.x,
      y: initialCamPosRef.current.y,
      z: initialCamPosRef.current.z,
      onStart: () => {
        if (controls) {
          controls.target.copy(initialTargetRef.current);
          controls.update();
        }
      },
      onUpdate: () => {
        if (controls) controls.update();
      },
      onComplete: () => {
        if (controls) controls.enabled = true;
        setShellView(false);
      },
    });
  };

  const handleFireClick = (e) => {
    e?.stopPropagation();
    pauseAllAudio();

    if (fireSoundInstance.audio.paused) {
      fireSoundInstance.audio.currentTime = 0;
      fireSoundInstance.play();
    }

    moveCameraTo(FIXED_CAMERA_POSITIONS.FIRE_POSITION, meditatingFemaleRef, 0.7, 'none', () =>
      setShellView(true)
    );
  };

  const handleShellClick = (e) => {
    e?.stopPropagation();
    pauseAllAudio();

    if (oceanSound.audio.paused) {
      oceanSound.audio.currentTime = 0;
      oceanSound.play();
    }

    moveCameraTo(FIXED_CAMERA_POSITIONS.SHELL_POSITION, seashellRef, 0.7, 'none', () =>
      setShellView(true)
    );
  };

  const handleMeditatingFemaleClick = (e) => {
    e?.stopPropagation();
    pauseAllAudio();

    if (meditationSound.audio.paused) {
      meditationSound.audio.currentTime = 0;
      meditationSound.play();
    }

    moveCameraTo(FIXED_CAMERA_POSITIONS.FEMALE_POSITION, meditatingFemaleRef, 0.7, 'none', () =>
      setShellView(true)
    );
  };

  const handleSharkClick = (e, sharkIndex) => {
    e?.stopPropagation();
    pauseAllAudio();

    if (fishTankSoundInstance.audio.paused) {
      fishTankSoundInstance.audio.currentTime = 0;
      fishTankSoundInstance.play();
    }

    const sharkPos = new Vector3();
    if (sharkRefs[sharkIndex].current) {
      sharkRefs[sharkIndex].current.getWorldPosition(sharkPos);
    }

    gsap.to(camera.position, {
      duration: 1.2,
      ease: 'power2.out',
      x: FIXED_CAMERA_POSITIONS.SHARK_POSITION.x,
      y: FIXED_CAMERA_POSITIONS.SHARK_POSITION.y,
      z: FIXED_CAMERA_POSITIONS.SHARK_POSITION.z,
      onStart: () => {
        if (controls) controls.enabled = false;
        if (controls?.target) {
          controls.target.copy(sharkPos);
          controls.update();
        }
      },
      onUpdate: () => {
        if (controls?.target) {
          controls.target.lerp(sharkPos, 0.35);
          controls.update();
        }
      },
      onComplete: () => {
        setShellView(true);
      },
    });
  };

  const handleMermaidClick = (e) => {
    e?.stopPropagation();
    pauseAllAudio();

    if (mermaidSoundInstance.audio.paused) {
      mermaidSoundInstance.audio.currentTime = 0;
      mermaidSoundInstance.play();
    }

    gsap.to(camera.position, {
      duration: 1.2,
      ease: 'power2.out',
      x: FIXED_CAMERA_POSITIONS.MERMAID_POSITION.x,
      y: FIXED_CAMERA_POSITIONS.MERMAID_POSITION.y,
      z: FIXED_CAMERA_POSITIONS.MERMAID_POSITION.z,
      onStart: () => {
        if (controls) controls.enabled = false;
        if (controls?.target) {
          controls.target.set(
            FIXED_CAMERA_POSITIONS.MERMAID_POSITION.x,
            FIXED_CAMERA_POSITIONS.MERMAID_POSITION.y,
            FIXED_CAMERA_POSITIONS.MERMAID_POSITION.z
          );
          controls.update();
        }
      },
      onUpdate: () => {
        if (controls?.target) {
          controls.target.lerp(FIXED_CAMERA_POSITIONS.MERMAID_POSITION, 0.35);
          controls.update();
        }
      },
      onComplete: () => {
        setShellView(true);
      },
    });
  };

  const handleLeafClick = (e, leafIndex) => {
    e?.stopPropagation();
    pauseAllAudio();

    if (forestSoundInstance.audio.paused) {
      forestSoundInstance.audio.currentTime = 0;
      forestSoundInstance.play();
    }

    const leafPos = new Vector3();
    leavesRefs[leafIndex].current?.getWorldPosition(leafPos);

    gsap.to(camera.position, {
      duration: 0.7,
      x: FIXED_CAMERA_POSITIONS.LEAF_POSITION.x,
      y: FIXED_CAMERA_POSITIONS.LEAF_POSITION.y,
      z: FIXED_CAMERA_POSITIONS.LEAF_POSITION.z,
      onStart: () => {
        if (controls) controls.enabled = false;
        if (controls?.target) {
          controls.target.copy(leafPos);
          controls.update();
        }
      },
      onUpdate: () => {
        if (controls?.target) {
          controls.target.lerp(leafPos, 0.35);
          controls.update();
        }
      },
      onComplete: () => {
        setShellView(true);
      },
    });
  };

  const handleSingingBowlClick = (e) => {
    e?.stopPropagation();
    pauseAllAudio();

    if (tibetianBowlSoundInstance.audio.paused) {
      tibetianBowlSoundInstance.audio.currentTime = 0;
      tibetianBowlSoundInstance.play();
    }

    moveCameraTo(FIXED_CAMERA_POSITIONS.TIBETIAN_BOWL_POSITON, singingBowlRef, 0.7, 'none', () =>
      setShellView(true)
    );
  };

  return (
    <>
      {shellView && <CancelButton onClick={handleCancelView} />}

      <group {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.02}>
          <group
            ref={sharkRefs[4]}
            onClick={(e) => handleSharkClick(e, 4)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            position={[71.048, -69.318, 18.152]}
            rotation={[0, 0, -0.459]}
            scale={1.854}
          >
            <mesh geometry={nodes['GY1-material'].geometry} material={materials.Lamp} />
            <mesh geometry={nodes['WE1-material_1'].geometry} material={materials.material_7} />
            <mesh geometry={nodes['BK1-material'].geometry} material={materials.material_8} />
          </group>

          <group position={[-141.082, 139.369, -11.396]} rotation={[0, 0, -2.545]} scale={0.334}>
            <mesh geometry={nodes['LP1-material'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material'].geometry} material={materials.material_13} />
          </group>
          <group position={[-31.449, 146.739, -2.504]} rotation={[0, 0, 1.808]} scale={1.854}>
            <mesh
              ref={sharkRefs[2]}
              onClick={(e) => handleSharkClick(e, 2)}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              geometry={nodes['GY1-material_1'].geometry}
              material={materials.Lamp}
            />
            <mesh geometry={nodes['WE1-material_2'].geometry} material={materials.material_7} />
            <mesh geometry={nodes['BK1-material_1'].geometry} material={materials.material_8} />
          </group>

          <group
            ref={sharkRefs[0]}
            onClick={(e) => handleSharkClick(e, 0)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            position={[76.923, 12.313, 25.642]}
            rotation={[0, 0, -0.661]}
            scale={1.838}
          >
            <mesh geometry={nodes['GY1-material_2'].geometry} material={materials.Lamp} />
            <mesh geometry={nodes['GY2-material'].geometry} material={materials.material_19} />
            <mesh geometry={nodes['GY3-material'].geometry} material={materials.material_20} />
          </group>

          <group position={[-129.607, -103.131, 11.188]} rotation={[0, 0, 1.068]} scale={0.871}>
            <mesh geometry={nodes['WE2-material'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_2'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[-133.114, -105.981, 11.188]} rotation={[0, 0, 0.087]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_1'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_3'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_1'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[-150.052, 122.26, 11.188]} rotation={[0, 0, -0.594]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_2'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_4'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_2'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[-136.415, 78.439, 11.188]} rotation={[0, 0, 0.087]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_3'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_5'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_3'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[-152.127, 99.581, -3.359]} rotation={[0, 0, -0.754]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_6'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['PK-material'].geometry} material={materials.material_17} />
            <mesh geometry={nodes['PK2-material'].geometry} material={materials.material_18} />
          </group>
          <group position={[-130.671, 90.853, -3.359]} rotation={[0, 0, -0.754]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_7'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['PK-material_1'].geometry} material={materials.material_17} />
            <mesh geometry={nodes['PK2-material_1'].geometry} material={materials.material_18} />
          </group>
          <group position={[-141.581, 124.492, -3.359]} rotation={[0, 0, -0.391]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_8'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['PK-material_2'].geometry} material={materials.material_17} />
            <mesh geometry={nodes['PK2-material_2'].geometry} material={materials.material_18} />
          </group>
          <group position={[-136.809, 121.349, -7.422]} rotation={[0, 0, -2.237]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_9'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['YW2-material'].geometry} material={materials.material_14} />
            <mesh geometry={nodes['B2-material'].geometry} material={materials.material_15} />
          </group>
          <group position={[-113.534, 100.257, -7.422]} rotation={[0, 0, -0.413]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_10'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['YW2-material_1'].geometry} material={materials.material_14} />
            <mesh geometry={nodes['B2-material_1'].geometry} material={materials.material_15} />
          </group>
          <group position={[-127.862, -95.051, -7.422]} rotation={[0, 0, -0.413]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_11'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['YW2-material_2'].geometry} material={materials.material_14} />
            <mesh geometry={nodes['B2-material_2'].geometry} material={materials.material_15} />
          </group>
          <group position={[-130.844, -88.562, -7.422]} rotation={[0, 0, 1.144]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_12'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['YW2-material_3'].geometry} material={materials.material_14} />
            <mesh geometry={nodes['B2-material_3'].geometry} material={materials.material_15} />
          </group>
          <group position={[-121.11, -86.107, -7.422]} rotation={[0, 0, -0.84]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_13'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['YW2-material_4'].geometry} material={materials.material_14} />
            <mesh geometry={nodes['B2-material_4'].geometry} material={materials.material_15} />
          </group>
          <group position={[-116.989, -98.032, -7.422]} rotation={[0, 0, -2.108]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_14'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['YW2-material_5'].geometry} material={materials.material_14} />
            <mesh geometry={nodes['B2-material_5'].geometry} material={materials.material_15} />
          </group>
          <group position={[-132.334, -97.681, -7.422]} rotation={[0, 0, 1.337]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_15'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['YW2-material_6'].geometry} material={materials.material_14} />
            <mesh geometry={nodes['B2-material_6'].geometry} material={materials.material_15} />
          </group>
          <group position={[84.606, -60.02, 5.995]} rotation={[0, 0, -0.328]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_16'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['PK-material_3'].geometry} material={materials.material_17} />
            <mesh geometry={nodes['PK2-material_3'].geometry} material={materials.material_18} />
          </group>
          <group position={[89.868, -56.95, 5.995]} rotation={[0, 0, -0.891]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_17'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['PK-material_4'].geometry} material={materials.material_17} />
            <mesh geometry={nodes['PK2-material_4'].geometry} material={materials.material_18} />
          </group>
          <group position={[86.506, -55.635, 5.995]} rotation={[0, 0, -1.231]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_18'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['PK-material_5'].geometry} material={materials.material_17} />
            <mesh geometry={nodes['PK2-material_5'].geometry} material={materials.material_18} />
          </group>
          <group position={[91.329, -59.508, 5.995]} rotation={[0, 0, -0.889]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_19'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['PK-material_6'].geometry} material={materials.material_17} />
            <mesh geometry={nodes['PK2-material_6'].geometry} material={materials.material_18} />
          </group>
          <group position={[87.968, -60.312, 5.995]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_20'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['PK-material_7'].geometry} material={materials.material_17} />
            <mesh geometry={nodes['PK2-material_7'].geometry} material={materials.material_18} />
          </group>
          <group position={[136.182, 46.31, 11]} rotation={[0, 0, -2.674]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_21'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['YW2-material_7'].geometry} material={materials.material_14} />
            <mesh geometry={nodes['B2-material_7'].geometry} material={materials.material_15} />
          </group>
          <group position={[127.01, 31.174, 11.188]} rotation={[0, 0, 0.087]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_4'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_22'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_4'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[129.409, 32.31, 11.188]} rotation={[0, 0, 0.087]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_5'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_23'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_5'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[132.313, 36.225, 11.188]} rotation={[0, 0, 0.303]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_6'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_24'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_6'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[125.242, 36.73, 11.188]} rotation={[0, 0, -0.223]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_7'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_25'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_7'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[124.105, 42.665, 11.188]} rotation={[0, 0, -0.223]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_8'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_26'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_8'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[132.313, 43.296, 11.188]} rotation={[0, 0, 0.419]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_9'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_27'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_9'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[-98.488, 112.491, -3.359]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_28'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['PK-material_8'].geometry} material={materials.material_17} />
            <mesh geometry={nodes['PK2-material_8'].geometry} material={materials.material_18} />
          </group>
          <group position={[128.904, 38.877, 11.188]} scale={0.871}>
            <mesh geometry={nodes['WE2-material_10'].geometry} material={materials.material_2} />
            <mesh geometry={nodes['BK1-material_29'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['OR1-material_10'].geometry} material={materials['Lamp.001_0']} />
          </group>
          <group position={[-127.862, -83.651, -7.422]} scale={0.871}>
            <mesh geometry={nodes['BK1-material_30'].geometry} material={materials.material_8} />
            <mesh geometry={nodes['YW2-material_8'].geometry} material={materials.material_14} />
            <mesh geometry={nodes['B2-material_8'].geometry} material={materials.material_15} />
          </group>
          <group
            ref={sharkRefs[3]}
            onClick={(e) => handleSharkClick(e, 3)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            position={[10.547, 126.386, -2.504]}
            rotation={[0, 0, 0.837]}
            scale={1.854}
          >
            <mesh geometry={nodes['GY1-material_3'].geometry} material={materials.Lamp} />
            <mesh geometry={nodes['WE1-material_5'].geometry} material={materials.material_7} />
            <mesh geometry={nodes['BK1-material_31'].geometry} material={materials.material_8} />
          </group>
          <group position={[120.211, -77.513, -1.324]} rotation={[0, 0, -1.371]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_1'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_1'].geometry} material={materials.material_13} />
          </group>
          <group position={[95.858, -72.871, 1.758]} rotation={[0, 0, 1.617]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_2'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_2'].geometry} material={materials.material_13} />
          </group>
          <group
            ref={palm3Ref}
            position={[-111.919, 129.813, -9.457]}
            rotation={[0, 0, -2.545]}
            scale={0.334}
          >
            <mesh geometry={nodes['LP1-material_3'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_3'].geometry} material={materials.material_13} />
          </group>
          <group position={[-136.54, 99.763, -5.187]} rotation={[0, 0, -2.545]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_4'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_4'].geometry} material={materials.material_13} />
          </group>

          <group position={[13.705, 53.352, 38.22]} rotation={[-0.052, 0, -0.009]} scale={0.046}>
            <mesh geometry={nodes['GN1-material'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material'].geometry} material={materials['Lamp.001']} />
          </group>
          <group
            position={[-31.062, 8.495, 41.703]}
            rotation={[0.111, -0.131, -0.806]}
            scale={0.041}
          >
            <mesh geometry={nodes['GN1-material_1'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_1'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_1'].geometry} material={materials['Lamp.001']} />
          </group>
          <group
            position={[-30.023, 22.582, 40.762]}
            rotation={[-0.131, -0.131, -2.778]}
            scale={0.081}
          >
            <mesh geometry={nodes['GN1-material_2'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_2'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_2'].geometry} material={materials['Lamp.001']} />
          </group>
          <group
            position={[-27.119, 18.211, 42.157]}
            rotation={[-0.03, -0.048, 2.18]}
            scale={0.081}
          >
            <mesh geometry={nodes['GN1-material_3'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_3'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_3'].geometry} material={materials['Lamp.001']} />
          </group>
          <group
            position={[-23.314, 23.186, 41.726]}
            rotation={[0.024, 0.038, -0.631]}
            scale={0.081}
          >
            <mesh geometry={nodes['GN1-material_4'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_4'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_4'].geometry} material={materials['Lamp.001']} />
          </group>
          <group
            position={[-29.129, 3.982, 43.144]}
            rotation={[-0.073, -0.013, 0.175]}
            scale={0.081}
          >
            <mesh geometry={nodes['GN1-material_5'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_5'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_5'].geometry} material={materials['Lamp.001']} />
          </group>
          <group
            position={[-32.009, 5.998, 42.776]}
            rotation={[0.173, 0.011, -1.752]}
            scale={0.081}
          >
            <mesh geometry={nodes['GN1-material_6'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_6'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_6'].geometry} material={materials['Lamp.001']} />
          </group>

          <group position={[-16.034, -39.732, 36.128]} rotation={[0, 0, 0.497]} scale={0.123}>
            <mesh geometry={nodes['BN-material'].geometry} material={materials.material_4} />
            <mesh geometry={nodes['G2-material_7'].geometry} material={materials.material_5} />
            <mesh geometry={nodes['YW2-material_9'].geometry} material={materials.material_14} />
          </group>
          <group position={[22.367, 46.851, 36.641]} rotation={[0, 0, -2.089]} scale={0.123}>
            <mesh geometry={nodes['BN-material_1'].geometry} material={materials.material_4} />
            <mesh geometry={nodes['G2-material_8'].geometry} material={materials.material_5} />
            <mesh geometry={nodes['YW2-material_10'].geometry} material={materials.material_14} />
          </group>
          <group position={[13.284, 47.831, 37.411]} rotation={[0, 0, -1.949]} scale={0.123}>
            <mesh geometry={nodes['BN-material_2'].geometry} material={materials.material_4} />
            <mesh geometry={nodes['G2-material_9'].geometry} material={materials.material_5} />
            <mesh geometry={nodes['YW2-material_11'].geometry} material={materials.material_14} />
          </group>
          <group position={[-28.313, 7.237, 40.723]} rotation={[0, 0, -0.541]} scale={0.123}>
            <mesh geometry={nodes['BN-material_3'].geometry} material={materials.material_4} />
            <mesh geometry={nodes['G2-material_10'].geometry} material={materials.material_5} />
            <mesh geometry={nodes['YW2-material_12'].geometry} material={materials.material_14} />
          </group>

          <group position={[-30.231, 8.044, 42.747]} scale={1.006}>
            <mesh
              ref={leavesRefs[1]}
              onClick={(e) => handleLeafClick(e, 1)}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              geometry={nodes['GN1-material_7'].geometry}
              material={materials.material_3}
            >
              <meshStandardMaterial
                color="#3a5f3a"
                emissive="#2d4a2a"
                emissiveIntensity={0.4}
                roughness={0.85}
              />
            </mesh>
            <mesh geometry={nodes['BN-material_4'].geometry} material={materials.material_4} />
          </group>

          <group
            ref={sharkRefs[1]}
            onClick={(e) => handleSharkClick(e, 1)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            position={[-118.18, -16.75, 7.735]}
            rotation={[0, 0, -2.811]}
            scale={1.854}
          >
            <mesh geometry={nodes['GY1-material_4'].geometry} material={materials.Lamp} />
            <mesh geometry={nodes['WE1-material_9'].geometry} material={materials.material_7} />
            <mesh geometry={nodes['BK1-material_32'].geometry} material={materials.material_8} />
          </group>

          <group position={[74.254, -25.142, -4.779]} rotation={[0, 0, 2.431]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_5'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_5'].geometry} material={materials.material_13} />
          </group>
          <group position={[58.796, -41.404, 1.758]} rotation={[0, 0, 3.135]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_6'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_6'].geometry} material={materials.material_13} />
          </group>
          <group position={[-91.251, 76.597, 7.465]} rotation={[0, 0, 3.135]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_7'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_7'].geometry} material={materials.material_13} />
          </group>
          <group position={[-75.793, 92.86, 0.928]} rotation={[0, 0, 2.431]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_8'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_8'].geometry} material={materials.material_13} />
          </group>
          <group position={[-115.454, 77.794, 0.928]} rotation={[0, 0, -2.545]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_9'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_9'].geometry} material={materials.material_13} />
          </group>
          <group position={[-103.792, 58.626, 7.465]} rotation={[0, 0, -1.841]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_10'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_10'].geometry} material={materials.material_13} />
          </group>
          <group position={[-123.65, -89.532, -7.891]} rotation={[0, 0, -1.841]} scale={0.322}>
            <mesh geometry={nodes['LP1-material_11'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_11'].geometry} material={materials.material_13} />
          </group>
          <group position={[-122.829, -107.225, -8.446]} rotation={[0, 0, -0.286]} scale={0.285}>
            <mesh geometry={nodes['LP1-material_12'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_12'].geometry} material={materials.material_13} />
          </group>
          <group position={[134.082, -43.386, -2.001]} rotation={[0, 0, -0.286]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_13'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_13'].geometry} material={materials.material_13} />
          </group>
          <group position={[99.425, -50.955, -0.123]} rotation={[0, 0, -0.286]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_14'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_14'].geometry} material={materials.material_13} />
          </group>
          <group position={[128.505, 6.01, 7.465]} rotation={[0, 0, -0.286]} scale={0.334}>
            <mesh geometry={nodes['LP1-material_15'].geometry} material={materials.material_12} />
            <mesh geometry={nodes['LP2-material_15'].geometry} material={materials.material_13} />
          </group>
          <group position={[24.675, 51.638, 38.075]} rotation={[-0.182, 0, 0]} scale={0.063}>
            <mesh geometry={nodes['GN1-material_8'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_7'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_7'].geometry} material={materials['Lamp.001']} />
          </group>
          <group position={[24.724, 45.592, 39.215]} rotation={[0.04, 0.046, -2.331]} scale={0.077}>
            <mesh geometry={nodes['GN1-material_9'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_8'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_8'].geometry} material={materials['Lamp.001']} />
          </group>
          <group
            position={[-17.279, -44.943, 37.616]}
            rotation={[0.313, -0.01, -2.429]}
            scale={0.065}
          >
            <mesh geometry={nodes['GN1-material_10'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_9'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_9'].geometry} material={materials['Lamp.001']} />
          </group>
          <group
            position={[-22.248, -37.371, 40.167]}
            rotation={[0.184, 0.084, -0.889]}
            scale={0.072}
          >
            <mesh geometry={nodes['GN1-material_11'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_10'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_10'].geometry} material={materials['Lamp.001']} />
          </group>
          <group
            position={[-13.048, -36.614, 38.106]}
            rotation={[-0.016, -0.016, 0.006]}
            scale={0.062}
          >
            <mesh geometry={nodes['GN1-material_12'].geometry} material={materials.material_3} />
            <mesh geometry={nodes['GN3-material_11'].geometry} material={materials.material_10} />
            <mesh geometry={nodes['GN4-material_11'].geometry} material={materials['Lamp.001']} />
          </group>

          <group ref={boatRef} position={[124.192, -61.408, -4.952]} scale={10.434}>
            <mesh geometry={nodes['BN-material_5'].geometry} material={materials.material_4} />
            <mesh geometry={nodes['BN2-material'].geometry} material={materials.material_9} />
          </group>

          <group
            ref={sharkRefs[5]}
            onClick={(e) => handleSharkClick(e, 5)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            position={[116.321, 22.931, 10.83]}
            rotation={[0, 0, -0.73]}
            scale={1.854}
          >
            <mesh geometry={nodes['GY1-material_5'].geometry} material={materials.Lamp} />
            <mesh geometry={nodes['WE1-material_10'].geometry} material={materials.material_7} />
            <mesh geometry={nodes['BK1-material_33'].geometry} material={materials.material_8} />
          </group>

          <group
            ref={sharkRefs[6]}
            onClick={(e) => handleSharkClick(e, 6)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            position={[85.822, -8.607, 10.83]}
            scale={1.854}
          >
            <mesh geometry={nodes['GY1-material_6'].geometry} material={materials.Lamp} />
            <mesh geometry={nodes['WE1-material_11'].geometry} material={materials.material_7} />
            <mesh geometry={nodes['BK1-material_34'].geometry} material={materials.material_8} />
          </group>

          <group
            position={[24.305, 47.26, 57.479]}
            rotation={[-3.006, -0.088, 0.999]}
            scale={0.824}
          >
            <mesh
              ref={leavesRefs[0]}
              onClick={(e) => handleLeafClick(e, 0)}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              geometry={nodes['GN1-material_13'].geometry}
              material={materials.material_3}
            >
              <meshStandardMaterial
                color="#3a5f3a"
                emissive="#2d4a2a"
                emissiveIntensity={0.4}
                roughness={0.85}
              />
            </mesh>
            <mesh geometry={nodes['BN-material_6'].geometry} material={materials.material_4} />
          </group>

          <group
            position={[-26.402, -44.448, 57.932]}
            rotation={[0.596, 0.362, 2.147]}
            scale={2.363}
          >
            <mesh
              ref={leavesRefs[2]}
              onClick={(e) => handleLeafClick(e, 2)}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              geometry={nodes['GN1-material_14'].geometry}
              material={materials.material_3}
            >
              <meshStandardMaterial
                color="#3a5f3a"
                emissive="#2d4a2a"
                emissiveIntensity={0.4}
                roughness={0.85}
              />
            </mesh>
            <mesh geometry={nodes['BN-material_7'].geometry} material={materials.material_4} />
            <mesh geometry={nodes['G2-material_30'].geometry} material={materials.material_5} />
          </group>

          <group
            position={[-8.061, -48.68, 57.932]}
            rotation={[-0.658, 0.208, -1.736]}
            scale={2.435}
          >
            <mesh
              ref={leavesRefs[3]}
              onClick={(e) => handleLeafClick(e, 3)}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              geometry={nodes['GN1-material_15'].geometry}
              material={materials.material_3}
            >
              <meshStandardMaterial
                color="#3a5f3a"
                emissive="#2d4a2a"
                emissiveIntensity={0.4}
                roughness={0.85}
              />
            </mesh>
            <mesh geometry={nodes['BN-material_8'].geometry} material={materials.material_4} />
            <mesh geometry={nodes['G2-material_31'].geometry} material={materials.material_5} />
          </group>

          <group position={[28.271, 7.942, -32.298]} scale={4.076}>
            <group onClick={handleMeditatingFemaleClick} ref={meditatingFemaleRef}>
              <MeditatingFemale />
            </group>
            <AnimatedFire onClick={handleFireClick} />
            <FloatingShip />
            <Jellyfish />
            <SingingBowl singingBowlRef={singingBowlRef} onClick={handleSingingBowlClick} />
            <SwimmingDude />
            <Mermaid onClick={handleMermaidClick} />
            <PurpleSeashell shellRef={seashellRef} onClick={handleShellClick} />
            <mesh geometry={nodes['BE1-material'].geometry} material={materials.material} />
            <mesh geometry={nodes['YW1-material'].geometry} material={materials.material_1} />
            <mesh geometry={nodes['WE2-material_11'].geometry} material={materials.material_2} />
          </group>

          <mesh
            geometry={nodes['G2-material'].geometry}
            material={materials.material_5}
            position={[-103.728, 74.944, 0.54]}
            rotation={[0, 0, -2.392]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['WE1-material'].geometry}
            material={materials.material_7}
            position={[-121.784, -57.552, -4.988]}
            rotation={[-2.851, -0.104, 1.512]}
            scale={[8.561, 2.134, 16.033]}
          />
          <mesh
            geometry={nodes['G2-material_1'].geometry}
            material={materials.material_5}
            position={[-120.981, 136.519, -20.979]}
            rotation={[0, 0, -2.392]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_2'].geometry}
            material={materials.material_5}
            position={[-120.981, 136.519, -20.979]}
            rotation={[0, 0, -2.392]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['WE1-material_3'].geometry}
            material={materials.material_7}
            position={[-36.903, -23.978, 48.821]}
            scale={7.007}
          />
          <mesh
            geometry={nodes['WE1-material_4'].geometry}
            material={materials.material_7}
            position={[-123.619, 111.145, 35.396]}
            scale={7.007}
          />
          <mesh
            geometry={nodes['G2-material_3'].geometry}
            material={materials.material_5}
            position={[122.668, -81.189, -8.129]}
            rotation={[0, 0, -0.615]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_4'].geometry}
            material={materials.material_5}
            position={[93.993, -68.862, -5.047]}
            rotation={[0, 0, 2.373]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_5'].geometry}
            material={materials.material_5}
            position={[-114.36, 126.125, -16.262]}
            rotation={[0, 0, -1.789]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_6'].geometry}
            material={materials.material_5}
            position={[-138.981, 96.076, -11.993]}
            rotation={[0, 0, -1.789]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['WE1-material_6'].geometry}
            material={materials.material_7}
            position={[-97.397, -72.03, -1.156]}
            scale={7.007}
          />
          <mesh
            geometry={nodes['WE1-material_7'].geometry}
            material={materials.material_7}
            position={[-97.224, -62.864, -1.918]}
            rotation={[-0.089, -0.295, -0.02]}
            scale={[8.561, 2.134, 16.033]}
          />
          <mesh
            geometry={nodes['WE1-material_8'].geometry}
            material={materials.material_7}
            position={[105.733, -62.982, -1.156]}
            scale={7.007}
          />
          <mesh
            geometry={nodes['G2-material_11'].geometry}
            material={materials.material_5}
            position={[-14.683, -41.14, 37.792]}
            rotation={[-1.755, 0.511, 0.236]}
            scale={2.363}
          />
          <mesh
            geometry={nodes['G2-material_12'].geometry}
            material={materials.material_5}
            position={[-24.645, 21.028, 41.115]}
            rotation={[1.187, 0.363, 2.499]}
            scale={2.363}
          />
          <mesh
            geometry={nodes['G2-material_13'].geometry}
            material={materials.material_5}
            position={[118.943, -30.382, -6.899]}
            rotation={[0, 0, -1.217]}
            scale={0.342}
          />
          <mesh
            geometry={nodes['G2-material_14'].geometry}
            material={materials.material_5}
            position={[115.405, -27.706, -6.899]}
            rotation={[0, 0, 0.47]}
            scale={0.342}
          />
          <mesh
            geometry={nodes['G2-material_15'].geometry}
            material={materials.material_5}
            position={[70.057, -23.748, -11.584]}
            rotation={[0, 0, -3.096]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_16'].geometry}
            material={materials.material_5}
            position={[54.694, -43.058, -5.047]}
            rotation={[0, 0, -2.392]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_17'].geometry}
            material={materials.material_5}
            position={[-95.353, 74.944, 0.66]}
            rotation={[0, 0, -2.392]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_18'].geometry}
            material={materials.material_5}
            position={[-79.99, 94.254, -5.878]}
            rotation={[0, 0, -3.096]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_19'].geometry}
            material={materials.material_5}
            position={[-135.573, -93.1, -16.947]}
            rotation={[0, 0, -0.512]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_20'].geometry}
            material={materials.material_5}
            position={[-107.298, -77.266, -11.398]}
            rotation={[0, 0, 0.47]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_21'].geometry}
            material={materials.material_5}
            position={[-117.896, 74.107, -5.878]}
            rotation={[0, 0, -1.789]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_22'].geometry}
            material={materials.material_5}
            position={[-103.266, 54.235, 0.66]}
            rotation={[0, 0, -1.085]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_23'].geometry}
            material={materials.material_5}
            position={[-123.143, -93.764, -14.45]}
            rotation={[0, 0, -1.085]}
            scale={0.401}
          />
          <mesh
            geometry={nodes['G2-material_24'].geometry}
            material={materials.material_5}
            position={[-118.589, -106.786, -14.45]}
            rotation={[0, 0, 0.47]}
            scale={0.401}
          />
          <mesh
            geometry={nodes['G2-material_25'].geometry}
            material={materials.material_5}
            position={[134.963, -48.541, -10.762]}
            rotation={[0, 0, -1.112]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_26'].geometry}
            material={materials.material_5}
            position={[103.824, -50.499, -6.928]}
            rotation={[0, 0, 0.47]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_27'].geometry}
            material={materials.material_5}
            position={[132.904, 6.466, 0.66]}
            rotation={[0, 0, 0.47]}
            scale={0.416}
          />
          <mesh
            geometry={nodes['G2-material_28'].geometry}
            material={materials.material_5}
            position={[-17.375, -25.354, 56.949]}
            rotation={[0.592, 0.37, 2.16]}
            scale={2.363}
          />
          <mesh
            geometry={nodes['G2-material_29'].geometry}
            material={materials.material_5}
            position={[-16.981, -25.953, 56.949]}
            rotation={[0.592, 0.37, 2.16]}
            scale={2.363}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload('./models/low_poly_island.glb');
