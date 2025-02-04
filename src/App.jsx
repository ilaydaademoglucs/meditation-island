import { Canvas } from '@react-three/fiber';
import './App.css';
import { Experience } from './components/Experience';
import { CustomMovement } from './components/CustomMovement';
import { ACESFilmicToneMapping, sRGBEncoding } from 'three';
import { ClickLogger } from './components/ClickLogger';
import { Suspense, useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onLoaded={() => setLoaded(true)} />}
      <Canvas
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputEncoding: sRGBEncoding,
        }}
        camera={{
          fov: 64,
          position: [1.9, 1.5, 2.3],
        }}
      >
        <Suspense fallback={null}>{loaded && <Experience />}</Suspense>
        <CustomMovement />
        {/* for development , then remove it */}
        <ClickLogger />
      </Canvas>
    </>
  );
}

export default App;
