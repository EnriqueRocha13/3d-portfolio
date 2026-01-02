import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BackgroundScene from './BackgroundScene';

// Componente del Cubo 3D Interactivo: Actúa como el disparador visual del portafolio
function ShowButtonCube({ onClick }: { onClick: () => void }) {
  // useRef accede directamente al objeto en la memoria de Three.js sin causar re-renders de React
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Estados para manejar la interactividad (hover) y la estética dinámica
  const [hovered, setHovered] = useState(false);
  const [randomColor, setRandomColor] = useState('#ffffff');

  // Lógica para generar colores aleatorios; demuestra manejo de estados dinámicos
  const generateRandomColor = () => {
    const colors = ['#00d4ff', '#ff007a', '#00ffaa', '#ffaa00', '#aa00ff', '#ffffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // useFrame ejecuta lógica a 60fps; ideal para animaciones fluidas basadas en el tiempo (delta)
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotación constante en dos ejes para dar sensación de profundidad
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
      
      // Interpolación lineal (lerp) para una transición de escala suave al hacer hover
      const targetScale = hovered ? 1.2 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Movimiento flotante senoidal basado en el tiempo transcurrido del reloj interno
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        // e.stopPropagation evita que el click atraviese el objeto hacia otros elementos de la escena
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        // Handlers de puntero para actualizar estado visual y cambiar el cursor del sistema
        onPointerOver={() => { setHovered(true); setRandomColor(generateRandomColor()); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        {/* meshPhysicalMaterial: Uso avanzado de PBR (Physically Based Rendering) para efectos de cristal */}
        <meshPhysicalMaterial 
          color={hovered ? randomColor : '#eeeeee'}
          transmission={1} // Propiedad de cristal para dejar pasar la luz
          thickness={1.5}  // Grosor del cristal para refracción
          roughness={0.05} // Superficie pulida
          ior={1.5}        // Índice de refracción real del vidrio
          transparent={true} 
          opacity={0.6}
          emissive={hovered ? randomColor : '#000000'} // Efecto de brillo tipo "neon"
          emissiveIntensity={hovered ? 0.8 : 0} 
        />
      </mesh>
      {/* Luz puntual dinámica que emana del centro del cubo al interactuar */}
      <pointLight position={[0, 0, 0]} intensity={hovered ? 4 : 1} color={hovered ? randomColor : '#ffffff'} />
    </group>
  );
}

export default function PanelWithAnimatedBackground() {
  const [showPanel, setShowPanel] = useState(true);

  // Optimización SEO/Accesibilidad: Asegura que el idioma del DOM sea correcto para lectores de pantalla
  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#00aaff' }}>
      
      {/* Estilos CSS inyectados para personalización avanzada de scrollbars y efectos Blur (Glassmorphism) */}
      <style>
        {`
        .scroll-panel::-webkit-scrollbar { width: 12px; }
        .scroll-panel::-webkit-scrollbar-thumb { background: #b2ccd6cc; border-radius: 8px; }
        .scroll-panel::-webkit-scrollbar-track { background: #dbf4ff; border-radius: 8px; }
        .scroll-panel { scrollbar-color: #b2ccd6cc #dbf4ff; scrollbar-width: thin; }
        .scroll-panel a { color: #00aaff !important; text-decoration: underline; font-weight: 600; }
        .btn-close {
            position: absolute; top: 20px; right: 20px; padding: 10px 18px;
            background: rgba(255, 255, 255, 0.25); color: #444; border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 12px; cursor: pointer; font-weight: 700; backdrop-filter: blur(10px);
            z-index: 10;
        }
        .btn-close:hover { background: rgba(255, 255, 255, 0.5); color: #000; }
        `}
      </style>

      {/* El Canvas de R3F actúa como la capa base de renderizado 3D */}
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        {/* Escena de fondo modularizada para mejorar la mantenibilidad del código */}
        <BackgroundScene />
        {/* Renderizado condicional: El cubo solo aparece cuando el panel está cerrado */}
        {!showPanel && <ShowButtonCube onClick={() => setShowPanel(true)} />}
      </Canvas>

      {/* UI Overlay: Texto flotante con tipografía optimizada para legibilidad sobre 3D */}
      {!showPanel && (
        <div style={{
            position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
            color: 'white', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            pointerEvents: 'none', textAlign: 'center', letterSpacing: '3px', fontSize: '1.2rem'
        }}>OPEN RESUME</div>
      )}

      {/* Panel de Información: Implementación de Glassmorphism con backdrop-filter */}
      {showPanel && (
        <div className="scroll-panel" style={{
                position: 'absolute', top: '8vh', left: '50%', transform: 'translateX(-50%)',
                width: '680px', maxWidth: '96vw', height: '84vh',
                background: 'rgba(255,255,255,0.4)', borderRadius: '24px',
                boxShadow: '0 2px 32px rgba(0,0,0,0.18)', zIndex: 2,
                overflowY: 'auto', padding: '36px', color: '#222',
                backdropFilter: 'blur(10px)', fontFamily: 'system-ui, Arial, sans-serif'
            }}>
            
            <button className="btn-close" onClick={() => setShowPanel(false)}>Close ×</button>

            <h1 style={{ marginTop: 0, marginBottom: '8px', fontSize: '2rem' }}>ENRIQUE DOMÍNGUEZ</h1>
            {/* El resto del contenido sigue una estructura semántica de HTML para mejorar el SEO y accesibilidad */}
            ...
        </div>
      )}
    </div>
  );
}
