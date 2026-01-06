import { useState, useRef, useEffect } from 'react'; // Importa hooks de React
import { Canvas, useFrame } from '@react-three/fiber'; // Importa herramientas 3D
import * as THREE from 'three'; // Importa núcleo de Three.js
import BackgroundScene from './BackgroundScene'; // Importa el fondo animado

// Componente del Cubo de Cristal 3D
function ShowButtonCube({ onClick }: { onClick: () => void }) { // Componente para el botón de apertura
  const meshRef = useRef<THREE.Mesh>(null!); // Referencia al objeto 3D
  const [hovered, setHovered] = useState(false); // Estado para detectar el mouse encima
  const [randomColor, setRandomColor] = useState('#ffffff'); // Estado para el color dinámico

  const generateRandomColor = () => { // Función para colores aleatorios
    const colors = ['#00d4ff', '#ff007a', '#00ffaa', '#ffaa00', '#aa00ff', '#ffffff']; // Lista de colores
    return colors[Math.floor(Math.random() * colors.length)]; // Retorna uno al azar
  };

  useFrame((state, delta) => { // Bucle de animación
    if (meshRef.current) { // Si el cubo existe
      meshRef.current.rotation.x += delta * 0.3; // Rota en X
      meshRef.current.rotation.y += delta * 0.5; // Rota en Y
      const targetScale = hovered ? 1.2 : 1.0; // Escala si hay hover
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1); // Suaviza el cambio de tamaño
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1; // Flotación
    }
  });

  return (
    <group> {/* Grupo contenedor 3D */}
      <mesh
        ref={meshRef} // Asigna referencia
        onClick={(e) => { e.stopPropagation(); onClick(); }} // Al hacer clic abre el panel
        onPointerOver={() => { setHovered(true); setRandomColor(generateRandomColor()); document.body.style.cursor = 'pointer'; }} // Efectos al entrar
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }} // Efectos al salir
      >
        <boxGeometry args={[2.5, 2.5, 2.5]} /> {/* Geometría del cubo */}
        <meshPhysicalMaterial 
          color={hovered ? randomColor : '#eeeeee'} // Color dinámico
          transmission={1} thickness={1.5} roughness={0.05} ior={1.5} // Propiedades de cristal
          transparent={true} opacity={0.6} // Transparencia
          emissive={hovered ? randomColor : '#000000'} // Brillo
          emissiveIntensity={hovered ? 0.8 : 0} // Intensidad del brillo
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={hovered ? 4 : 1} color={hovered ? randomColor : '#ffffff'} /> {/* Luz interna */}
    </group>
  );
}

export default function PanelWithAnimatedBackground() {
  const [showPanel, setShowPanel] = useState(true); // Estado de visibilidad del panel

  useEffect(() => { // Al montar el componente
    document.documentElement.lang = "en"; // Define idioma para el navegador
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#00aaff' }}>
      
      <style>
        {`
        .scroll-panel::-webkit-scrollbar { width: 12px; } /* Estilo barra scroll */
        .scroll-panel::-webkit-scrollbar-thumb { background: #b2ccd6cc; border-radius: 8px; } /* Color scroll */
        .scroll-panel::-webkit-scrollbar-track { background: #dbf4ff; border-radius: 8px; } /* Fondo scroll */
        .scroll-panel { scrollbar-color: #b2ccd6cc #dbf4ff; scrollbar-width: thin; } /* Scroll para Firefox */
        .scroll-panel a { color: #00aaff !important; text-decoration: underline; font-weight: 600; } /* Enlaces */
        .btn-close {
            position: absolute; top: 20px; right: 20px; padding: 10px 18px;
            background: rgba(255, 255, 255, 0.25); color: #444; border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 12px; cursor: pointer; font-weight: 700; backdrop-filter: blur(10px);
            z-index: 10;
        } /* Botón cerrar */
        .btn-close:hover { background: rgba(255, 255, 255, 0.5); color: #000; } /* Hover botón cerrar */
        `}
      </style>

      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.8} /> {/* Luz ambiental */}
        <pointLight position={[10, 10, 10]} intensity={1.5} /> {/* Luz de escena */}
        <BackgroundScene /> {/* Escena de fondo */}
        {!showPanel && <ShowButtonCube onClick={() => setShowPanel(true)} />} {/* Muestra cubo si panel está cerrado */}
      </Canvas>

      {!showPanel && (
        <div style={{
            position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
            color: 'white', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            pointerEvents: 'none', textAlign: 'center', letterSpacing: '3px', fontSize: '1.2rem'
        }}>OPEN RESUME</div> /* Texto guía */
      )}

      {showPanel && (
        <div className="scroll-panel" style={{
                position: 'absolute', top: '8vh', left: '50%', transform: 'translateX(-50%)',
                width: '680px', maxWidth: '96vw', height: '84vh',
                background: 'rgba(255,255,255,0.4)', borderRadius: '24px',
                boxShadow: '0 2px 32px rgba(0,0,0,0.18)', zIndex: 2,
                overflowY: 'auto', padding: '36px', color: '#222',
                backdropFilter: 'blur(10px)', fontFamily: 'system-ui, Arial, sans-serif'
            }}>
            
            <button className="btn-close" onClick={() => setShowPanel(false)}>Close ×</button> {/* Botón cerrar panel */}

            <h1 style={{ marginTop: 0, marginBottom: '8px', fontSize: '2rem' }}>ENRIQUE DOMÍNGUEZ</h1> {/* Nombre */}
            
            <p style={{ fontSize: '1.05rem', marginBottom: '6px' }}>
              <strong>Email:</strong> Enriquedominguez1375@gmail.com <br />
              <strong>Phone:</strong> +52 248 228 4489 <br />
              <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/enrique-domínguez13" target="_blank" rel="noopener noreferrer">enrique-domínguez13</a> <br />
              <strong>GitHub:</strong> <a href="https://github.com/EnriqueRocha13" target="_blank" rel="noopener noreferrer">EnriqueRocha13</a> <br />
              <strong>Location:</strong> Mexico, Puebla
            </p>
            <hr style={{ borderTop: '1px solid #ddd' }}/>
            
            <h2 style={{ fontSize: '1.1rem', margin: '10px 0 2px', fontWeight: 700, color: '#0077BB' }}>
                Fullstack Web Developer | QA Engineer (Web Development with Quality Focus)
            </h2>
            
            <h3 style={{ margin: '12px 0 4px', fontWeight: 600, borderBottom: '2px solid #eee' }}>Professional Profile</h3> {/* Perfil profesional */}
            <p>Fullstack Developer with a deep-rooted passion for technology, having <strong>learned to program independently long before starting formal academic studies</strong>. I am focused on delivering high-quality solutions, applying advanced concepts learned outside the classroom. Experienced in creating robust web applications with JavaScript, Node.js, and React, with a strong focus on QA Testing to ensure system stability and modular architecture.</p>
            
            <h3 style={{ marginTop: 18, marginBottom: 6, borderBottom: '2px solid #eee' }}>🛠️ Technical Skills</h3> {/* Habilidades técnicas */}
            <ul style={{ lineHeight: 1.65, listStyleType: 'disc', paddingLeft: '20px' }}>
              <li><strong>Programming Languages:</strong> JavaScript (Intermediate), TypeScript (Intermediate), Python (Intermediate), HTML (Advanced), CSS (Advanced), Bash (Basic)</li>
              <li><strong>Frameworks & Web: </strong> React (Intermediate), Node.js (Intermediate), Flutter (Basic), Full-Stack Development, Git/GitHub, Docker (Basic)</li>
              <li><strong>Databases and Systems:</strong> SQL (Intermediate), Linux Operating Systems (Advanced - 10+ years), Command Line Tools (<strong>Cygwin</strong>)</li> {/* Agregado Cygwin */}
              <li><strong>Testing & QA:</strong> Bug Reporting (Jira: Advanced), API Testing (Postman), Test Case Design, Requirements Analysis, Agile (Scrum)</li>
              <li><strong>Languages:</strong> English (Advanced/Fluent), Portuguese (Intermediate)</li>
              <li><strong>Soft Skills:</strong> Critical Thinking, Problem Solving, Technical Communication</li>
            </ul>
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>💻 Web and QA Projects (Portfolio)</h3> {/* Proyectos */}
            <ol style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '14px' }}>
                <strong><a href="https://enriquerocha13.github.io/CRUD/" target="_blank">CRUD (Student Promotions System)</a></strong>
                <p style={{ margin: '4px 0' }}>Description: CRUD web system for managing student records with validation and an intuitive interface.</p>
                <p style={{ margin: '4px 0' }}><strong>Stack:</strong> JavaScript, HTML, CSS, GitHub Pages.</p>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong><a href="https://enriquerocha13.github.io/SkillVerse/" target="_blank">SkillVerse (IT Aspirants Platform)</a></strong>
                <p style={{ margin: '4px 0' }}>Role: Front-End design and development, functional and usability testing.</p>
                <p style={{ margin: '4px 0' }}><strong>Stack:</strong> HTML, CSS, JavaScript, Git/GitHub.</p>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong><a href="https://www.facebook.com/share/19xjoP8A1k/" target="_blank">E-commerce Backend (Health=Happiness();)</a></strong>
                <p style={{ margin: '4px 0' }}>Role: Payment gateway development, regression and smoke testing.</p>
                <p style={{ margin: '4px 0' }}><strong>Stack: </strong> Node.js, SQL, QA, UX, Git.</p>
              </li>
            </ol>

            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>💼 Professional Experience</h3> {/* Experiencia profesional */}
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '16px' }}> {/* Nueva entrada de Kwork */}
                <strong>Freelance Web Developer & QA</strong> | Kwork (2024 - Present)<br />
                Development of custom web solutions and quality assurance testing for diverse international clients.<br />
                <em><strong>Achievement:</strong> <strong>Mastered React and modern frontend workflows in record time</strong>. I successfully implemented complex functionalities by applying advanced techniques learned independently outside of school.</em>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong>Sales Representative</strong> | GGA, United States (February 2025 - Present)<br />
                Sale and consultation of health insurance. Use of CRM and adapting discourse to the client.<br />
                <em><strong>Achievement:</strong> Ability to modulate tone and persuasion and negotiation techniques. </em>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong>Sales Representative</strong> | Foundever (August 2023 – November 2024)<br />
                Assisted clients in purchases and managing refund and return processes on complex platforms.<br />
                <em><strong>Achievement:</strong> Sales optimization through persuasion and multilingual management.</em>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong>Driver Support</strong> | Alorica (July 2022 – October 2023)<br />
                Provided support via chat to resolve issues related to driver payroll. <br />
                <em><strong>Achievement:</strong> I learned touch typing in two weeks to acquire this job and was awarded for my performance.</em>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong>Customer Service Representative</strong> | Teleperformance (March 2024 – Nov 2024)<br />
                Bilingual support in telecommunications services and vehicle rental.<br />
                <em><strong>Achievement:</strong> Efficient problem resolution and improved client satisfaction. </em>
              </li>
            </ul>
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>🎓 Education</h3> {/* Educación */}
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Fullstack Web Developer</strong>, Utel University (Jan 2024 – Jun 2024)<br />
                Web Dev Fundamentals Bootcamp. Development of landing pages and CRUD applications.<br />
                <em><strong>Technologies:</strong> HTML5, Responsive CSS, Git/GitHub, and DOM Management.</em>
              </li>
              <li style={{ marginBottom: '12px' }}><strong>QA Tester Certification</strong>, Triple Ten (In Progress)</li>
              <li style={{ marginBottom: '12px' }}><strong>Computer Systems Engineering</strong>, UTEL (2023 – 2026, In Progress)</li>
              <li style={{ marginBottom: '12px' }}>
                <strong>English Certification</strong>, ICO (2006 – 2007) <br />
                <em><strong>Achievement:</strong> Scholarship for Excellence.</em>
              </li>
            </ul>
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>🏅 Awards & Recognition</h3> {/* Premios */}
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><a href="https://drive.google.com/file/d/1EVf4tfabb4HLCKoc7k_y6OxP4Qot-ust/view?usp=sharing" target="_blank">Customer Service Champion (GGA/Foundever)</a></li>
              <li style={{ marginBottom: '8px' }}><a href="https://www.credly.com/badges/9418fa65-4dbc-4cdf-9adc-f351a3b4bfa4" target="_blank">Full Stack Web Developer Badge (Utel)</a></li>
              <li style={{ marginBottom: '8px' }}><a href="https://drive.google.com/file/d/12-28umDPWfpeCUzzpuriDssPEfIIHFSW/view?usp=drivesdk" target="_blank">Outstanding Participation in Hackathon with IBM</a></li>
            </ul>
        </div>
      )}
    </div>
  );
}
