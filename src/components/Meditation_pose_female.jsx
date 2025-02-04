import React from 'react';
import { useGLTF } from '@react-three/drei';
import { handlePointerOut, handlePointerOver } from './utils/consts';

export function MeditatingFemale(props) {
  const { nodes, materials } = useGLTF('./models/meditation_pose_female.glb');

  return (
    <group {...props} dispose={null}>
      <group scale={0.047} position={[-9, -13, 16]}>
        <group
          rotation={[Math.PI / 2, 0.4, 0]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <mesh geometry={nodes.Body_Eyelashes_0.geometry} material={materials.Eyelashes} />
          <mesh geometry={nodes.Body_Fingernails_0.geometry} material={materials.Fingernails} />
          <mesh geometry={nodes.Body_Toenails_0.geometry} material={materials.Toenails} />
          <mesh geometry={nodes.Body_Torso_0.geometry} material={materials.Torso} />
          <mesh geometry={nodes.Body_Cornea_0.geometry} material={materials.Cornea} />
          <mesh geometry={nodes.Body_Pupils_0.geometry} material={materials.Pupils} />
          <mesh geometry={nodes.Body_Face_0.geometry} material={materials.Face} />
          <mesh geometry={nodes.Body_Lips_0.geometry} material={materials.Lips} />
          <mesh geometry={nodes.Body_Teeth_0.geometry} material={materials.Teeth} />
          <mesh geometry={nodes.Body_Sclera_0.geometry} material={materials.Sclera} />
          <mesh geometry={nodes.Body_Ears_0.geometry} material={materials.Ears} />
          <mesh geometry={nodes.Body_Irises_0.geometry} material={materials.Irises} />
          <mesh geometry={nodes.Body_Legs_0.geometry} material={materials.Legs} />
          <mesh geometry={nodes.Body_EyeSocket_0.geometry} material={materials.EyeSocket} />
          <mesh geometry={nodes.Body_EyeMoisture_0.geometry} material={materials.EyeMoisture} />
          <mesh geometry={nodes.Body_Mouth_0.geometry} material={materials.Mouth} />
          <mesh geometry={nodes.Body_Arms_0.geometry} material={materials.Arms} />
          <mesh
            geometry={nodes.Shorts_ShortsElastic_0.geometry}
            material={materials.ShortsElastic}
          />
          <mesh geometry={nodes.Shorts_MainShorts_0.geometry} material={materials.MainShorts} />
          <mesh
            geometry={nodes.SportsBra_MainSportsBra_0.geometry}
            material={materials.MainSportsBra}
          />
          <mesh
            geometry={nodes.SportsBra_ElasticBand_0.geometry}
            material={materials.ElasticBand}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/meditation_pose_female.glb');
