import React from 'react';

// Componente del Logo SVG reutilizable
export const MediumLogo = () => (
  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sharedLogoGradient" x1="0" y1="20" x2="120" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4776e6"/>
        <stop offset="1" stopColor="#8b4dff"/>
      </linearGradient>
    </defs>
    <path d="M14.24 31.92V8.95999H20.4L27.92 23.36L35.44 8.95999H41.6V31.92H37.2V15.28L30.56 28.4H25.28L18.64 15.28V31.92H14.24Z" fill="url(#sharedLogoGradient)"/>
    <path d="M54.44 32.8C49.4 32.8 45.4 28.96 45.4 23.96C45.4 18.96 49.4 15.12 54.44 15.12C59.48 15.12 63.48 18.96 63.48 23.96C63.48 28.96 59.48 32.8 54.44 32.8ZM54.44 29.92C57.72 29.92 60.12 27.28 60.12 23.96C60.12 20.64 57.72 18 54.44 18C51.16 18 48.76 20.64 48.76 23.96C48.76 27.28 51.16 29.92 54.44 29.92Z" fill="url(#sharedLogoGradient)"/>
    <path d="M79.8973 15.12H84.6973V21.12L90.2173 15.12H95.8973L90.0573 21.64L96.3773 32.8H90.6173L86.4973 25.4L84.6973 27.4V32.8H79.8973V15.12Z" fill="url(#sharedLogoGradient)"/>
  </svg>
);