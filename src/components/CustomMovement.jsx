import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

export function CustomMovement() {
  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false,
  });
  const moveSpeed = 5; 

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (
        key === 'w' ||
        key === 'a' ||
        key === 's' ||
        key === 'd' ||
        key === 'arrowup' ||
        key === 'arrowdown' ||
        key === 'arrowleft' ||
        key === 'arrowright'
      ) {
        keys.current[key] = true;
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (
        key === 'w' ||
        key === 'a' ||
        key === 's' ||
        key === 'd' ||
        key === 'arrowup' ||
        key === 'arrowdown' ||
        key === 'arrowleft' ||
        key === 'arrowright'
      ) {
        keys.current[key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const { camera, gl } = useThree();

  const isDragging = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseDown = (e) => {
      isDragging.current = true;
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - lastMousePosition.current.x;
      const deltaY = e.clientY - lastMousePosition.current.y;
      lastMousePosition.current = { x: e.clientX, y: e.clientY };

      camera.rotation.y -= deltaX * 0.005;
      camera.rotation.x -= deltaY * 0.005;

      camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
    };
  }, [camera, gl.domElement]);

  useFrame((_, delta) => {
    const speed = moveSpeed * delta;

    const forward = new Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new Vector3();
    right.crossVectors(forward, camera.up).normalize();

    if (keys.current.w || keys.current.arrowup) {
      camera.position.addScaledVector(forward, speed);
    }
    if (keys.current.s || keys.current.arrowdown) {
      camera.position.addScaledVector(forward, -speed);
    }
    if (keys.current.a || keys.current.arrowleft) {
      camera.position.addScaledVector(right, -speed);
    }
    if (keys.current.d || keys.current.arrowright) {
      camera.position.addScaledVector(right, speed);
    }
  });

  return null;
}
