import { Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CancelButton = ({ onClick }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <Html fullscreen prepend>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        style={{
          position: 'fixed',
          top: '60%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          padding: '8px 16px',
          fontSize: '36px',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          outline: 'none',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={() => gsap.to(buttonRef.current, { scale: 1.1, duration: 0.2 })}
        onMouseLeave={() => gsap.to(buttonRef.current, { scale: 1, duration: 0.2 })}
      >
        Go back
      </button>
    </Html>
  );
};

export default CancelButton;
