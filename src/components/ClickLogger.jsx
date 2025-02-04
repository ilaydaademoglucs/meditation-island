import { useThree } from '@react-three/fiber';
import { Raycaster, Vector2 } from 'three';
import { useEffect } from 'react';

export const ClickLogger = () => {
  const { camera, scene, gl } = useThree();

  useEffect(() => {
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const handleClick = (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const { point } = intersects[0];
        console.log('World coordinates:', {
          x: point.x.toFixed(2),
          y: point.y.toFixed(2),
          z: point.z.toFixed(2),
        });
      } else {
        const groundIntersect = raycaster.ray.intersectPlane(
          new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
        );
        if (groundIntersect) {
          console.log('Ground plane coordinates:', {
            x: groundIntersect.x.toFixed(2),
            y: groundIntersect.y.toFixed(2),
            z: groundIntersect.z.toFixed(2),
          });
        }
      }
    };

    gl.domElement.addEventListener('click', handleClick);
    return () => gl.domElement.removeEventListener('click', handleClick);
  }, [camera, scene, gl]);

  return null;
};
