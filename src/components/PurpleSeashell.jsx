import React, { useRef } from 'react';
import { Sparkles, SpotLight, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { handlePointerOut, handlePointerOver } from './utils/consts';

export function PurpleSeashell(props) {
  const { nodes, materials, scene } = useGLTF('./models/purple_seashell.glb');
  const shellRef = useRef();

  useFrame(({ clock }) => {
    if (shellRef.current) {
      shellRef.current.position.y = 2 + Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <>
      <group
        {...props}
        dispose={null}
        scale={0.2}
        position={[8, 5, 15]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <pointLight position={[9, 10, 10]} intensity={2} distance={1} decay={2} color="#9370DB" />
        <Sparkles
          count={20}
          scale={[1.5, 1.5, 1.5]}
          position={[10, 10.5, 10]}
          noise={0.5}
          size={3}
          speed={1.5}
        />
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              ref={shellRef}
              geometry={nodes.Purple_Scallop_Material003_0.geometry}
              material={materials['Material.003']}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
              onClick={props.onClick}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload('./models/purple_seashell.glb');
