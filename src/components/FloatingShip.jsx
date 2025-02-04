import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function FloatingShip(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('./models/floating_steam_ship.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.reset().play();
    });
  }, [actions]);

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = 25.2 + Math.sin(state.clock.getElapsedTime() * 0.5) * 1;
      group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} position={[-6.18, 25.2, 12]}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 1, 3, 3]}>
          <group
            name="8ba9f8b032b14aaca99ca472f781f795fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.006}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="��res"
                  position={[0, 688.302, -362.004]}
                  rotation={[Math.PI / 6, 0, 0]}
                  scale={100}
                >
                  <group name="gear" position={[0, -3.244, -9.343]}>
                    <mesh
                      name="gear__Complete_material_0"
                      geometry={nodes.gear__Complete_material_0.geometry}
                      material={materials.Complete_material}
                    />
                  </group>
                </group>
                <group name="ship_body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <mesh
                    name="ship_body__Complete_material_0"
                    geometry={nodes.ship_body__Complete_material_0.geometry}
                    material={materials.Complete_material}
                  />
                </group>
                {/* Other groups for the ship components go here... */}
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/floating_steam_ship.glb');
