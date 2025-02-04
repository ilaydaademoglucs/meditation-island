import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { handlePointerOut, handlePointerOver } from './utils/consts';

export function SingingBowl(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF('./models/singing_nepali_bowl.glb');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && names.length > 0) {
      actions[names[0]].reset().play();
    }
  }, [actions, names]);

  return (
    <group ref={group} {...props} dispose={null} scale={0.0277} position={[-9.699, -4, 18.8]}>
      <group
        name="Sketchfab_Scene"
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <group name="Sketchfab_model">
          <group name="0108a177e33345ff9fd75ab62f64209efbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Circle"
                  position={[-2.199, 0, 0]}
                  rotation={[-Math.PI / 2, 0, -2.385]}
                  scale={55.777}
                >
                  <group
                    name="LP001"
                    position={[1.005, -0.004, 0.018]}
                    rotation={[Math.PI / 2, 0, 0.176]}
                    scale={0.594}
                  >
                    <mesh
                      name="LP001_defaultMat_0"
                      geometry={nodes.LP001_defaultMat_0.geometry}
                      material={materials.defaultMat}
                    />
                  </group>
                </group>
                <group
                  name="Light"
                  position={[407.625, 590.386, -100.545]}
                  rotation={[1.89, 0.881, -2.045]}
                  scale={100}
                >
                  <group name="Object_5" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_6" />
                  </group>
                </group>
                <group
                  name="Camera"
                  position={[735.889, 495.831, 692.579]}
                  rotation={[Math.PI, 0.756, 2.68]}
                  scale={100}
                >
                  <group name="Object_8" />
                </group>
                <group name="LP" scale={100}>
                  <mesh
                    name="LP_Default_OBJ_0"
                    geometry={nodes.LP_Default_OBJ_0.geometry}
                    material={materials.Default_OBJ}
                  />
                </group>
                <group
                  name="Plane"
                  position={[0, -26.714, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={338.715}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/singing_nepali_bowl.glb');
