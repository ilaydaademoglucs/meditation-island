import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function AnimatedFire(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF('./models/animated_fire.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Animation && actions.Animation.play();
  }, [actions]);

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

  return (
    <group ref={group} {...props} dispose={null} position={[-6.18, -3.2, 16.3]}>
      <group
        name="Sketchfab_Scene"
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <group name="Sketchfab_model" rotation={[-Math.PI / -20, 0, 1]} scale={0.042}>
          <group name="Animated_firefbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Ashes" rotation={[-Math.PI / 2, 0, 0]}>
                  <group name="Object_5" position={[0, -2.044, 0]}>
                    <mesh
                      name="Ashes_Ashes_0"
                      geometry={nodes.Ashes_Ashes_0.geometry}
                      material={materials.Ashes}
                    />
                  </group>
                  <group name="Log_Grate">
                    <group name="Logs">
                      <group name="Feu01" position={[0, 0, 10]}>
                        <mesh
                          name="Feu01_Animation_0"
                          geometry={nodes.Feu01_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu02" position={[0, 0, 10]} scale={0.01}>
                        <mesh
                          name="Feu02_Animation_0"
                          geometry={nodes.Feu02_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu03" position={[0, 0, 10]} scale={0.01}>
                        <mesh
                          name="Feu03_Animation_0"
                          geometry={nodes.Feu03_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu04" position={[0, 0, 10]}>
                        <mesh
                          name="Feu04_Animation_0"
                          geometry={nodes.Feu04_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu05" position={[0, 0, 10]} scale={0.01}>
                        <mesh
                          name="Feu05_Animation_0"
                          geometry={nodes.Feu05_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu06" position={[0, 0, 10]} scale={0.01}>
                        <mesh
                          name="Feu06_Animation_0"
                          geometry={nodes.Feu06_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu07" position={[0, 0, 10]} scale={0.01}>
                        <mesh
                          name="Feu07_Animation_0"
                          geometry={nodes.Feu07_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu08" position={[0, 0, 10]} scale={0.01}>
                        <mesh
                          name="Feu08_Animation_0"
                          geometry={nodes.Feu08_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu09" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_28" position={[0, 0, -10]}>
                          <mesh
                            name="Feu09_Animation_0"
                            geometry={nodes.Feu09_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu10" position={[0, 0, 10]} scale={0.01}>
                        <mesh
                          name="Feu10_Animation_0"
                          geometry={nodes.Feu10_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu11" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_33" position={[0, 0, -10]}>
                          <mesh
                            name="Feu11_Animation_0"
                            geometry={nodes.Feu11_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu12" position={[0, 0, 10]} scale={0.01}>
                        <mesh
                          name="Feu12_Animation_0"
                          geometry={nodes.Feu12_Animation_0.geometry}
                          material={materials.Animation}
                        />
                      </group>
                      <group name="Feu13" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_38" position={[0, 0, -10]}>
                          <mesh
                            name="Feu13_Animation_0"
                            geometry={nodes.Feu13_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu14" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_41" position={[0, 0, -10]}>
                          <mesh
                            name="Feu14_Animation_0"
                            geometry={nodes.Feu14_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu15" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_44" position={[0, 0, -10]}>
                          <mesh
                            name="Feu15_Animation_0"
                            geometry={nodes.Feu15_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu16" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_47" position={[0, 0, -10]}>
                          <mesh
                            name="Feu16_Animation_0"
                            geometry={nodes.Feu16_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu17" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_50" position={[0, 0, -10]}>
                          <mesh
                            name="Feu17_Animation_0"
                            geometry={nodes.Feu17_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu18" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_53" position={[0, 0, -10]}>
                          <mesh
                            name="Feu18_Animation_0"
                            geometry={nodes.Feu18_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu19" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_56" position={[0, 0, -10]}>
                          <mesh
                            name="Feu19_Animation_0"
                            geometry={nodes.Feu19_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu20" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_59" position={[0, 0, -10]}>
                          <mesh
                            name="Feu20_Animation_0"
                            geometry={nodes.Feu20_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu21" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_62" position={[0, 0, -10]}>
                          <mesh
                            name="Feu21_Animation_0"
                            geometry={nodes.Feu21_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu22" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_65" position={[0, 0, -10]}>
                          <mesh
                            name="Feu22_Animation_0"
                            geometry={nodes.Feu22_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu23" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_68" position={[0, 0, -10]}>
                          <mesh
                            name="Feu23_Animation_0"
                            geometry={nodes.Feu23_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu24" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_71" position={[0, 0, -10]}>
                          <mesh
                            name="Feu24_Animation_0"
                            geometry={nodes.Feu24_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu25" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_74" position={[0, 0, -10]}>
                          <mesh
                            name="Feu25_Animation_0"
                            geometry={nodes.Feu25_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu26" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_77" position={[0, 0, -10]}>
                          <mesh
                            name="Feu26_Animation_0"
                            geometry={nodes.Feu26_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu27" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_80" position={[0, 0, -10]}>
                          <mesh
                            name="Feu27_Animation_0"
                            geometry={nodes.Feu27_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu28" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_83" position={[0, 0, -10]}>
                          <mesh
                            name="Feu28_Animation_0"
                            geometry={nodes.Feu28_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu29" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_86" position={[0, 0, -10]}>
                          <mesh
                            name="Feu29_Animation_0"
                            geometry={nodes.Feu29_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu30" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_89" position={[0, 0, -10]}>
                          <mesh
                            name="Feu30_Animation_0"
                            geometry={nodes.Feu30_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu31" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_92" position={[0, 0, -10]}>
                          <mesh
                            name="Feu31_Animation_0"
                            geometry={nodes.Feu31_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu32" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_95" position={[0, 0, -10]}>
                          <mesh
                            name="Feu32_Animation_0"
                            geometry={nodes.Feu32_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu33" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_98" position={[0, 0, -10]}>
                          <mesh
                            name="Feu33_Animation_0"
                            geometry={nodes.Feu33_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu34" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_101" position={[0, 0, -10]}>
                          <mesh
                            name="Feu34_Animation_0"
                            geometry={nodes.Feu34_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu35" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_104" position={[0, 0, -10]}>
                          <mesh
                            name="Feu35_Animation_0"
                            geometry={nodes.Feu35_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu36" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_107" position={[0, 0, -10]}>
                          <mesh
                            name="Feu36_Animation_0"
                            geometry={nodes.Feu36_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu37" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_110" position={[0, 0, -10]}>
                          <mesh
                            name="Feu37_Animation_0"
                            geometry={nodes.Feu37_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu38" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_113" position={[0, 0, -10]}>
                          <mesh
                            name="Feu38_Animation_0"
                            geometry={nodes.Feu38_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu39" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_116" position={[0, 0, -10]}>
                          <mesh
                            name="Feu39_Animation_0"
                            geometry={nodes.Feu39_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu40" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_119" position={[0, 0, -10]}>
                          <mesh
                            name="Feu40_Animation_0"
                            geometry={nodes.Feu40_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu41" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_122" position={[0, 0, -10]}>
                          <mesh
                            name="Feu41_Animation_0"
                            geometry={nodes.Feu41_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu42" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_125" position={[0, 0, -10]}>
                          <mesh
                            name="Feu42_Animation_0"
                            geometry={nodes.Feu42_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu43" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_128" position={[0, 0, -10]}>
                          <mesh
                            name="Feu43_Animation_0"
                            geometry={nodes.Feu43_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu44" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_131" position={[0, 0, -10]}>
                          <mesh
                            name="Feu44_Animation_0"
                            geometry={nodes.Feu44_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu45" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_134" position={[0, 0, -10]}>
                          <mesh
                            name="Feu45_Animation_0"
                            geometry={nodes.Feu45_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu46" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_137" position={[0, 0, -10]}>
                          <mesh
                            name="Feu46_Animation_0"
                            geometry={nodes.Feu46_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu47" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_140" position={[0, 0, -10]}>
                          <mesh
                            name="Feu47_Animation_0"
                            geometry={nodes.Feu47_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu48" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_143" position={[0, 0, -10]}>
                          <mesh
                            name="Feu48_Animation_0"
                            geometry={nodes.Feu48_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu49" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_146" position={[0, 0, -10]}>
                          <mesh
                            name="Feu49_Animation_0"
                            geometry={nodes.Feu49_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu50" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_149" position={[0, 0, -10]}>
                          <mesh
                            name="Feu50_Animation_0"
                            geometry={nodes.Feu50_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu51" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_152" position={[0, 0, -10]}>
                          <mesh
                            name="Feu51_Animation_0"
                            geometry={nodes.Feu51_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu52" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_155" position={[0, 0, -10]}>
                          <mesh
                            name="Feu52_Animation_0"
                            geometry={nodes.Feu52_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu53" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_158" position={[0, 0, -10]}>
                          <mesh
                            name="Feu53_Animation_0"
                            geometry={nodes.Feu53_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu54" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_161" position={[0, 0, -10]}>
                          <mesh
                            name="Feu54_Animation_0"
                            geometry={nodes.Feu54_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu55" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_164" position={[0, 0, -10]}>
                          <mesh
                            name="Feu55_Animation_0"
                            geometry={nodes.Feu55_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu56" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_167" position={[0, 0, -10]}>
                          <mesh
                            name="Feu56_Animation_0"
                            geometry={nodes.Feu56_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu57" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_170" position={[0, 0, -10]}>
                          <mesh
                            name="Feu57_Animation_0"
                            geometry={nodes.Feu57_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu58" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_173" position={[0, 0, -10]}>
                          <mesh
                            name="Feu58_Animation_0"
                            geometry={nodes.Feu58_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu59" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_176" position={[0, 0, -10]}>
                          <mesh
                            name="Feu59_Animation_0"
                            geometry={nodes.Feu59_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu60" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_179" position={[0, 0, -10]}>
                          <mesh
                            name="Feu60_Animation_0"
                            geometry={nodes.Feu60_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu61" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_182" position={[0, 0, -10]}>
                          <mesh
                            name="Feu61_Animation_0"
                            geometry={nodes.Feu61_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu62" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_185" position={[0, 0, -10]}>
                          <mesh
                            name="Feu62_Animation_0"
                            geometry={nodes.Feu62_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu63" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_188" position={[0, 0, -10]}>
                          <mesh
                            name="Feu63_Animation_0"
                            geometry={nodes.Feu63_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <group name="Feu64" position={[0, 0, 10]} scale={0.01}>
                        <group name="Object_191" position={[0, 0, -10]}>
                          <mesh
                            name="Feu64_Animation_0"
                            geometry={nodes.Feu64_Animation_0.geometry}
                            material={materials.Animation}
                          />
                        </group>
                      </group>
                      <mesh
                        name="Logs_Logs_0"
                        geometry={nodes.Logs_Logs_0.geometry}
                        material={materials.Logs}
                      />
                    </group>
                    <mesh
                      name="Log_Grate_Log_grate_0"
                      geometry={nodes.Log_Grate_Log_grate_0.geometry}
                      material={materials.Log_grate}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/animated_fire.glb');
