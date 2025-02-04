import React, { useEffect, useRef } from 'react';
import { useGraph, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export function SwimmingDude(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('./models/swimming_dude.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.reset().play();
    });
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene" position={[20.002, -20.949, 10.564]}>
        <group
          name="Sketchfab_model"
          scale={0.38}
          rotation={[-Math.PI / 12, Math.PI / 2, -Math.PI / 6]}
        >
          <group name="Root">
            <group name="Empty" position={[2.002, 0.949, 12.964]} rotation={[4.122, 1, 1]} />
            <group name="CMU_compliant_skeleton">
              <primitive object={nodes.CMU_compliant_skeleton_rootJoint} />
              <group name="male_muscle_13290Mesh001" rotation={[Math.PI / 2, 0, 0]} />
              <skinnedMesh
                name="male_muscle_13290Mesh001_0"
                geometry={nodes.male_muscle_13290Mesh001_0.geometry}
                material={materials.peau}
                skeleton={nodes.male_muscle_13290Mesh001_0.skeleton}
              />
              <skinnedMesh
                name="male_muscle_13290Mesh001_1"
                geometry={nodes.male_muscle_13290Mesh001_1.geometry}
                material={materials.combinaison}
                skeleton={nodes.male_muscle_13290Mesh001_1.skeleton}
              />
              <skinnedMesh
                name="male_muscle_13290Mesh001_2"
                geometry={nodes.male_muscle_13290Mesh001_2.geometry}
                material={materials.combinaison2}
                skeleton={nodes.male_muscle_13290Mesh001_2.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/swimming_dude.glb');
