import React, { useEffect, useMemo, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export function Jellyfish(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('./models/crystal_jellyfish_leptomedusae.glb');

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && names.length > 0) {
      actions[names[0]].reset().play();
    }
  }, [actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene" scale={0.7}>
        <group
          name="Sketchfab_model"
          position={[5.18, -35.2, 16.5]}
          rotation={[-Math.PI / 2, 0.962, 0]}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 2, 2]}>
              <group name="Crystal-jelly_arm_78">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials['Crystal-jelly_tentacle']}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials['Crystal-jelly_bell1']}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials['Crystal-jelly_bell2']}
                    skeleton={nodes.Object_9.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/crystal_jellyfish_leptomedusae.glb');
