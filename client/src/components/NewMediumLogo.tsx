import React from 'react';

// Nuevo componente de logo SVG, diseñado a medida para "MEDIUM"
export const NewMediumLogo = () => (
  <svg 
    width="200" 
    height="200" 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="medium-logo-svg"
  >
    <defs>
      {/* Gradiente principal para el escudo */}
      <linearGradient id="shieldGradient" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6a5af9"/>
        <stop offset="1" stopColor="#4776e6"/>
      </linearGradient>
      {/* Gradiente para las líneas internas que fluyen */}
      <linearGradient id="flowGradient" x1="100" y1="150" x2="100" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a69ef2"/>
        <stop offset="1" stopColor="#ffffff"/>
      </linearGradient>
      {/* Filtro de Sombra y Brillo */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Contenedor del logo con filtro de brillo */}
    <g filter="url(#glow)">
      {/* Forma del Escudo "M" */}
      <path 
        className="logo-shield"
        d="M25 175V25H50L100 90L150 25H175V175H150V65L100 130L50 65V175H25Z" 
        stroke="url(#shieldGradient)" 
        strokeWidth="8" 
        strokeLinejoin="round"
      />
      {/* Líneas de Flujo Internas */}
      <path 
        className="logo-flow"
        d="M60 160C80 120, 80 100, 100 70C120 100, 120 120, 140 160" 
        stroke="url(#flowGradient)" 
        strokeWidth="5" 
        strokeLinecap="round"
      />
      {/* Núcleo Digital (Punto de Origen) */}
      <circle className="logo-core" cx="100" cy="170" r="5" fill="#a69ef2" />
    </g>
  </svg>
);
