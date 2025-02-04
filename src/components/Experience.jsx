import React from 'react';
import { OrbitControls, Sky, Cloud } from '@react-three/drei';
import { Island } from './Island';
import { Color, TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

export const Experience = () => {
  const texture = useLoader(TextureLoader, './underwater.jpg');

  return (
    <>
      <Sky
        distance={1000000}
        sunPosition={[-100, 3, 2]}
        inclination={0.0}
        azimuth={0.15}
        turbidity={0}
        rayleigh={0.19}
        mieCoefficient={0.08}
        mieDirectionalG={0.7}
        exposure={0.6}
      />
      <Cloud position={[0, 8, -5]} opacity={0.5} speed={0.2} width={10} depth={3} segments={20} />
      <Cloud
        position={[-5, 10, -10]}
        opacity={0.6}
        speed={0.1}
        width={12}
        depth={4}
        segments={25}
      />
      <Cloud position={[5, 12, -8]} opacity={0.4} speed={0.15} width={15} depth={5} segments={30} />

      <Cloud
        position={[15, 15, -20]}
        opacity={0.3}
        speed={0.05}
        width={20}
        depth={8}
        segments={30}
      />

      <ambientLight intensity={0.15} />
      <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />

      <directionalLight
        position={[10, 8, 12]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        color="#ffd1a4"
      />

      <hemisphereLight groundColor="#1a4830" skyColor="#87CEEB" intensity={0.4} />

      <Island />
    </>
  );
};
