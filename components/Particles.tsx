import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const SnowParticles = () => {
  const particlesInit = async (main: any) => {
    // Možnost inicializace kompletní knihovny
    await loadFull(main);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: { enable: true },
        particles: {
          number: { value: 500},
          size: { value: 3 },
          move: { enable: true, speed: 1 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          color: { value: "#ffffff" },
        },
        interactivity: {
          events: {
            onHover: { enable: false, mode: "repulse" },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default SnowParticles;
