import { useProgress } from '@react-three/drei';
import { useEffect } from 'react';

export const LoadingScreen = ({ onLoaded }) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => onLoaded(), 100);
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoaded]);

  return <div className="loader" />;
};
