import { useState, useRef, useEffect } from 'react'; // Importa hooks básicos de React para estado, referencias y efectos
import { Canvas, useFrame } from '@react-three/fiber'; // Importa componentes de Three.js para renderizado 3D en React
import * as THREE from 'three'; // Importa la librería core de Three.js para tipos y geometrías
import BackgroundScene from './BackgroundScene'; // Importa el componente de la escena de fondo animada

// Componente del Cubo de Cristal 3D interactivo
function ShowButtonCube({ onClick }: { onClick: () => void }) { // Define el componente que recibe la función para abrir el panel
  const meshRef = useRef<THREE.Mesh>(null!); // Crea una referencia para manipular el objeto 3D directamente
  const [hovered, setHovered] = useState(false); // Estado para detectar si el mouse está sobre el cubo
  const [randomColor, setRandomColor] = useState('#ffffff'); // Estado para guardar un color aleatorio al pasar el mouse

  const generateRandomColor = () => { // Función para seleccionar un color al azar de una lista
    const colors = ['#00d4ff', '#ff007a', '#00ffaa', '#ffaa00', '#aa00ff', '#ffffff']; // Array de colores vibrantes
    return colors[Math.floor(Math.random() * colors.length)]; // Retorna un color aleatorio basado en el índice
  }; // Cierre de la función de color

  useFrame((state, delta) => { // Hook que se ejecuta 60 veces por segundo para animar la escena
    if (meshRef.current) { // Verifica que la referencia del cubo exista
      meshRef.current.rotation.x += delta * 0.3; // Rota el cubo suavemente en el eje X
      meshRef.current.rotation.y += delta * 0.5; // Rota el cubo suavemente en el eje Y
      const targetScale = hovered ? 1.2 : 1.0; // Define el tamaño: más grande si hay hover, normal si no
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1); // Interpola el tamaño para una transición suave
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1; // Añade un efecto de flotación constante
    } // Cierre de la condición de referencia
  }); // Cierre del hook useFrame

  return ( // Inicio del renderizado del componente 3D
    <group> // Agrupa elementos 3D
      <mesh // El objeto 3D principal (cubo)
        ref={meshRef} // Asigna la referencia creada anteriormente
        onClick={(e) => { e.stopPropagation(); onClick(); }} // Ejecuta la función de abrir al hacer click
        onPointerOver={() => { setHovered(true); setRandomColor(generateRandomColor()); document.body.style.cursor = 'pointer'; }} // Activa hover y cambia color/cursor
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }} // Desactiva hover y restaura el cursor
      > // Cierre de etiquetas de eventos
        <boxGeometry args={[2.5, 2.5, 2.5]} /> // Define la forma de cubo con dimensiones 2.5x2.5x2.5
        <meshPhysicalMaterial // Material avanzado con efecto de cristal
          color={hovered ? randomColor : '#eeeeee'} // Color dinámico basado en el estado hover
          transmission={1} thickness={1.5} roughness={0.05} ior={1.5} // Propiedades físicas: transparencia, grosor y rugosidad
          transparent={true} opacity={0.6} // Permite ver a través del objeto
          emissive={hovered ? randomColor : '#000000'} // Luz que emite el objeto cuando hay hover
          emissiveIntensity={hovered ? 0.8 : 0} // Intensidad de la luz emitida
        /> // Cierre del material
      </mesh> // Cierre del mesh
      <pointLight position={[0, 0, 0]} intensity={hovered ? 4 : 1} color={hovered ? randomColor : '#ffffff'} /> // Luz puntual dentro del cubo para brillo extra
    </group> // Cierre del grupo
  ); // Cierre del return
} // Cierre de la función del cubo

export default function PanelWithAnimatedBackground() { // Componente principal de la aplicación
  const [showPanel, setShowPanel] = useState(true); // Estado para controlar si el CV está abierto o cerrado

  // Configura el idioma a inglés para que el navegador ofrezca traducción automática
  useEffect(() => { // Hook de efecto de montaje
    document.documentElement.lang = "en"; // Asigna el atributo lang al HTML
  }, []); // El array vacío indica que solo se ejecuta una vez

  return ( // Inicio del renderizado principal
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#00aaff' }}> // Contenedor pantalla completa con fondo azul
      
      <style> // Etiqueta para estilos CSS personalizados
        {`
        .scroll-panel::-webkit-scrollbar { width: 12px; } /* Ancho de la barra de desplazamiento */
        .scroll-panel::-webkit-scrollbar-thumb { background: #b2ccd6cc; border-radius: 8px; } /* Estilo del scroll */
        .scroll-panel::-webkit-scrollbar-track { background: #dbf4ff; border-radius: 8px; } /* Estilo del fondo del scroll */
        .scroll-panel { scrollbar-color: #b2ccd6cc #dbf4ff; scrollbar-width: thin; } /* Compatibilidad para Firefox */
        .scroll-panel a { color: #00aaff !important; text-decoration: underline; font-weight: 600; } /* Estilo global para enlaces */
        .btn-close {
            position: absolute; top: 20px; right: 20px; padding: 10px 18px;
            background: rgba(255, 255, 255, 0.25); color: #444; border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 12px; cursor: pointer; font-weight: 700; backdrop-filter: blur(10px);
            z-index: 10;
        } /* Estilo del botón de cerrar con efecto blur */
        .btn-close:hover { background: rgba(255, 255, 255, 0.5); color: #000; } /* Efecto hover del botón cerrar */
        `} // Cierre de estilos
      </style> // Cierre de etiqueta style

      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} camera={{ position: [0, 0, 10], fov: 50 }}> // Lienzo para renderizado 3D
        <ambientLight intensity={0.8} /> // Luz global suave para la escena
        <pointLight position={[10, 10, 10]} intensity={1.5} /> // Luz puntual para sombras y profundidad
        <BackgroundScene /> // Renderiza el fondo animado personalizado
        {!showPanel && <ShowButtonCube onClick={() => setShowPanel(true)} />} // Muestra el cubo interactivo solo si el panel está cerrado
      </Canvas> // Cierre del lienzo 3D

      {!showPanel && ( // Condicional para mostrar texto de ayuda si el panel está oculto
        <div style={{
            position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
            color: 'white', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            pointerEvents: 'none', textAlign: 'center', letterSpacing: '3px', fontSize: '1.2rem'
        }}>OPEN RESUME</div> // Texto flotante indicador
      )} // Cierre del condicional

      {showPanel && ( // Condicional para mostrar el panel del currículum
        <div className="scroll-panel" style={{
                position: 'absolute', top: '8vh', left: '50%', transform: 'translateX(-50%)',
                width: '680px', maxWidth: '96vw', height: '84vh',
                background: 'rgba(255,255,255,0.4)', borderRadius: '24px',
                boxShadow: '0 2px 32px rgba(0,0,0,0.18)', zIndex: 2,
                overflowY: 'auto', padding: '36px', color: '#222',
                backdropFilter: 'blur(10px)', fontFamily: 'system-ui, Arial, sans-serif'
            }}> // Estilos del panel de cristal con scroll interno
            
            <button className="btn-close" onClick={() => setShowPanel(false)}>Close ×</button> // Botón para cerrar el panel

            <h1 style={{ marginTop: 0, marginBottom: '8px', fontSize: '2rem' }}>ENRIQUE DOMÍNGUEZ</h1> // Nombre principal
            
            <p style={{ fontSize: '1.05rem', marginBottom: '6px' }}> // Sección de contacto
              <strong>Email:</strong> Enriquedominguez1375@gmail.com <br /> // Correo electrónico
              <strong>Phone:</strong> +52 248 228 4489 <br /> // Teléfono móvil
              <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/enrique-domínguez13" target="_blank" rel="noopener noreferrer">enrique-domínguez13</a> <br /> // Enlace a LinkedIn
              <strong>GitHub:</strong> <a href="https://github.com/EnriqueRocha13" target="_blank" rel="noopener noreferrer">EnriqueRocha13</a> <br /> // Enlace a GitHub
              <strong>Location:</strong> Mexico, Puebla // Ubicación geográfica
            </p> // Cierre de contacto
            <hr style={{ borderTop: '1px solid #ddd' }}/> // Línea divisoria
            
            <h2 style={{ fontSize: '1.1rem', margin: '10px 0 2px', fontWeight: 700, color: '#0077BB' }}> // Título profesional
                Fullstack Web Developer | QA Engineer (Web Development with Quality Focus)
            </h2> // Cierre de título profesional
            
            <h3 style={{ margin: '12px 0 4px', fontWeight: 600, borderBottom: '2px solid #eee' }}>Professional Profile</h3> // Encabezado de perfil
            <p>Fullstack Developer with a deep-rooted passion for technology, having <strong>learned to program independently long before starting formal academic studies</strong>. I am a self-taught enthusiast who has mastered key concepts outside of school. Focused on creating robust web applications using JavaScript, Node.js, and React. My experience in QA Testing allows me to structure high-quality code with modular architecture and efficient data flow.</p> // Descripción del perfil con la información nueva añadida
            
            <h3 style={{ marginTop: 18, marginBottom: 6, borderBottom: '2px solid #eee' }}>🛠️ Technical Skills</h3> // Encabezado de habilidades
            <ul style={{ lineHeight: 1.65, listStyleType: 'disc', paddingLeft: '20px' }}> // Lista de habilidades técnicas
              <li><strong>Programming Languages:</strong> JavaScript (Intermediate), TypeScript (Intermediate), Python (Intermediate), HTML (Advanced), CSS (Advanced), Bash (Basic)</li> // Lenguajes
              <li><strong>Frameworks & Web: </strong> React (Intermediate), Node.js (Intermediate), Flutter (Basic), Full-Stack Development, Git/GitHub, Docker (Basic)</li> // Frameworks
              <li><strong>Databases and Systems:</strong> SQL (Intermediate), Linux Operating Systems (Ubuntu, Kali, Parrot: Advanced - 10+ years), Command Line Tools (<strong>Cygwin</strong>)</li> // Sistemas (Cygwin agregado)
              <li><strong>Testing & QA:</strong> Bug Reporting (Jira: Advanced), API Testing (Postman: Intermediate), Test Case Design, Requirements Analysis, Agile Methodologies (Scrum)</li> // QA Skills
              <li><strong>Languages:</strong> English (Advanced/Fluent), Portuguese (Intermediate)</li> // Idiomas
              <li><strong>Soft Skills:</strong> Critical Thinking, Problem Solving, Technical and Multilingual Communication</li> // Habilidades blandas
            </ul> // Cierre de lista
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>💻 Web and QA Projects (Portfolio)</h3> // Encabezado de proyectos
            <ol style={{ paddingLeft: '20px' }}> // Lista ordenada de proyectos
              <li style={{ marginBottom: '14px' }}> // Proyecto 1
                <strong><a href="https://enriquerocha13.github.io/CRUD/" target="_blank">CRUD (Student Promotions System)</a></strong> // Título del proyecto
                <p style={{ margin: '4px 0' }}>Description: CRUD web system for managing student records. Allows adding, modifying, and viewing control efficiently.</p> // Descripción
                <p style={{ margin: '4px 0' }}><strong>Stack:</strong> JavaScript, HTML, CSS, GitHub Pages. | <strong>Impact:</strong> Facilitates student tracking.</p> // Tecnologías e impacto
              </li> // Cierre proyecto 1
              <li style={{ marginBottom: '14px' }}> // Proyecto 2
                <strong><a href="https://enriquerocha13.github.io/SkillVerse/" target="_blank">SkillVerse (IT Aspirants Platform)</a></strong> | <em>Hackathon Project (2024)</em> // Título y contexto
                <p style={{ margin: '4px 0' }}>Role: Front-End design and development, functional and usability testing.</p> // Rol desempeñado
                <p style={{ margin: '4px 0' }}><strong>Stack:</strong> HTML, CSS, JavaScript, Usability, Git/GitHub. | <strong>Impact:</strong> Responsive interface ready for demonstration.</p> // Tecnologías e impacto
              </li> // Cierre proyecto 2
              <li style={{ marginBottom: '14px' }}> // Proyecto 3
                <strong><a href="https://www.facebook.com/share/19xjoP8A1k/" target="_blank">E-commerce Backend (Health=Happiness();)</a></strong> | <em>Personal Sales Project</em> // Título y contexto
                <p style={{ margin: '4px 0' }}>Role: Payment gateway development, regression and smoke testing.</p> // Rol desempeñado
                <p style={{ margin: '4px 0' }}><strong>Stack: </strong> Node.js, SQL, QA, UX, Git. | <strong>Impact:</strong> Defect prevention and UX alignment.</p> // Tecnologías e impacto
              </li> // Cierre proyecto 3
            </ol> // Cierre de lista de proyectos

            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>📂 QA Documentation Portfolio</h3> // Encabezado portafolio QA
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}> // Lista de documentos
                <li><strong><a href="https://drive.google.com/drive/folders/1JLmq_g5fTqJWEihAPDWTcmsImQN1nKMQ?usp=sharing" target="_blank">QA Documentation and Evidence Folder</a></strong><br /> // Enlace a Drive
                <span style={{ fontSize: '0.95rem' }}>Collection of test cases, bug reports, and test plans generated during the quality assurance process.</span></li> // Descripción
            </ul> // Cierre de lista
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>💼 Professional Experience</h3> // Encabezado de experiencia
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}> // Lista de empleos
              <li style={{ marginBottom: '16px' }}> // Nuevo empleo: Kwork
                <strong>Freelance Web Developer & QA</strong> | Kwork (2024 - Present)<br /> // Empresa y fecha
                Working as a freelancer providing web development and quality assurance services. Developing customized technical solutions and ensuring software reliability. <br /> // Descripción
                <em><strong>Achievement:</strong> <strong>Mastered React and modern frontend technologies in record time</strong>. I also learned many advanced programming concepts outside of school to deliver high-quality freelance work.</em> // Logro destacado sobre aprendizaje récord
              </li> // Cierre empleo Kwork
              <li style={{ marginBottom: '16px' }}> // Empleo GGA
                <strong>Sales Representative</strong> | GGA, United States (February 2025 - Present)<br /> // Empresa y fecha
                Sale and consultation of health insurance. Use of CRM and adapting discourse to the client. <br /> // Descripción
                <em><strong>Achievement:</strong> Ability to modulate tone and persuasion and negotiation techniques. </em> // Logro
              </li> // Cierre empleo GGA
              <li style={{ marginBottom: '16px' }}> // Empleo Foundever
                <strong>Sales Representative</strong> | Foundever (August 2023 – November 2024)<br /> // Empresa y fecha
                Assisted clients in purchases, recommending products and managing refunds on complex platforms.<br /> // Descripción
                <em><strong>Achievement:</strong> Sales optimization through persuasion and multilingual management.</em> // Logro
              </li> // Cierre empleo Foundever
              <li style={{ marginBottom: '16px' }}> // Empleo Alorica
                <strong>Driver Support</strong> | Alorica (July 2022 – October 2023)<br /> // Empresa y fecha
                Provided support via chat to resolve issues related to driver payroll. <br /> // Descripción
                <em><strong>Achievement:</strong> I learned touch typing in two weeks to acquire this job and was awarded for my performance.</em> // Logro
              </li> // Cierre empleo Alorica
              <li style={{ marginBottom: '16px' }}> // Empleo Teleperformance
                <strong>Customer Service Representative</strong> | Teleperformance (March 2024 – Nov 2024)<br /> // Empresa y fecha
                Bilingual support in telecommunications and vehicle rental. <br /> // Descripción
                <em><strong>Achievement:</strong> Efficient problem resolution and improved client satisfaction. </em> // Logro
              </li> // Cierre empleo Teleperformance
            </ul> // Cierre de lista de experiencia
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>🎓 Education</h3> // Encabezado de educación
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}> // Lista de estudios
              <li style={{ marginBottom: '12px' }}> // Estudio 1
                <strong>Fullstack Web Developer - Beginner Outstanding</strong>, Utel University (Jan 2024 – Jun 2024)<br /> // Institución y fecha
                Web Dev Fundamentals Bootcamp. Development of landing pages and CRUD applications.<br /> // Descripción
                <em><strong>Technologies:</strong> HTML5, Responsive CSS, Git/GitHub, and DOM Management.</em> // Tecnologías
              </li> // Cierre estudio 1
              <li style={{ marginBottom: '12px' }}><strong>QA Tester Certification</strong>, Triple Ten (In Progress, Nearing Completion)</li> // Estudio 2
              <li style={{ marginBottom: '12px' }}><strong>Computer Systems Engineering</strong>, UTEL (2023 – 2026, In Progress)</li> // Estudio 3
              <li style={{ marginBottom: '12px' }}> // Estudio 4
                <strong>English Certification</strong>, ICO (2006 – 2007) <br /> // Institución y fecha
                <em><strong>Achievement:</strong> Scholarship for Excellence: First student to acquire Spanish reading skills. </em> // Logro
              </li> // Cierre estudio 4
            </ul> // Cierre de lista de educación
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>🏅 Awards & Recognition</h3> // Encabezado de premios
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}> // Lista de premios
              <li style={{ marginBottom: '8px' }}><a href="https://drive.google.com/file/d/1EVf4tfabb4HLCKoc7k_y6OxP4Qot-ust/view?usp=sharing" target="_blank">Customer Service Champion (GGA/Foundever)</a></li> // Premio 1
              <li style={{ marginBottom: '8px' }}><a href="https://www.credly.com/badges/9418fa65-4dbc-4cdf-9adc-f351a3b4bfa4" target="_blank">Full Stack Web Developer Badge (Utel)</a></li> // Premio 2
              <li style={{ marginBottom: '8px' }}><a href="https://drive.google.com/file/d/12-28umDPWfpeCUzzpuriDssPEfIIHFSW/view?usp=drivesdk" target="_blank">Outstanding Participation in Hackathon with IBM</a></li> // Premio 3
            </ul> // Cierre de lista de premios
        </div> // Cierre del panel scrollable
      )} // Cierre del condicional showPanel
    </div> // Cierre del contenedor raíz
  ); // Cierre del return principal
} // Cierre del componente PanelWithAnimatedBackground
