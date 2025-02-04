import React from 'react';
import { Sparkles, useGLTF } from '@react-three/drei';
import { handlePointerOut, handlePointerOver } from './utils/consts';

export function Mermaid(props) {
  const group = React.useRef();

  const { nodes, materials } = useGLTF('./models/mermaid_wip.glb');

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[-39.18, 25.2, 12]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Sparkles
        count={20}
        scale={[1.5, 1.5, 1.5]}
        position={[0.0, 1.9, 11]}
        noise={0.5}
        size={3}
        speed={1.5}
      />
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.mermaid_low_finalinitialShadingGroup}
        rotation={[-Math.PI / 36, 0, -1.8]}
        scale={0.029}
      />
    </group>
  );
}

useGLTF.preload('./models/mermaid_wip.glb');
