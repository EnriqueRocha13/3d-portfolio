import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BackgroundScene from './BackgroundScene';

// Componente del cubo de cristal 3D que actúa como botón
function ShowButtonCube({ onClick }: { onClick: () => void }) {
  const meshRef = useRef<THREE. Mesh>(null! );
  const [hovered, setHovered] = useState(false);
  const [randomColor, setRandomColor] = useState('#ffffff');

  const generateRandomColor = () => {
    const colors = ['#00d4ff', '#ff007a', '#00ffaa', '#ffaa00', '#aa00ff', '#ffffff'];
    return colors[Math.floor(Math. random() * colors.length)];
  };

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current. rotation.y += delta * 0.5;
      
      const targetScale = hovered ? 1.2 :  1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => {
          setHovered(true);
          setRandomColor(generateRandomColor());
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshPhysicalMaterial 
          color={hovered ? randomColor : '#eeeeee'}
          transmission={1}
          thickness={1.5}
          roughness={0.05}
          ior={1.5}
          transparent={true}
          opacity={0.6}
          emissive={hovered ? randomColor : '#000000'}
          emissiveIntensity={hovered ? 0.8 : 0} 
        />
      </mesh>
      <pointLight 
        position={[0, 0, 0]} 
        intensity={hovered ? 4 : 1} 
        color={hovered ? randomColor : '#ffffff'} 
      />
    </group>
  );
}

type LanguageKey = 'es' | 'en';

const translations = {
  es: {
    btn_show: 'DESCUBRIR EXPERIENCIA',
    btn_hide: 'Cerrar ×',
    name: 'ENRIQUE DOMÍNGUEZ',
    contact_email: 'Correo: ',
    contact_phone: 'Teléfono:',
    contact_linkedin: 'LinkedIn:',
    contact_github: 'GitHub: ',
    contact_location: 'Ubicación:  México, Puebla',
    profession: 'Fullstack Web Developer | Ingeniero de QA (Desarrollo Web con Foco en Calidad)',
    section_profile: 'Perfil Profesional',
    section_skills: '🛠️ Habilidades Técnicas',
    section_qa_projects: '💻 Proyectos Web y QA (Portafolio)', 
    section_qa_documentation: '📂 Portafolio de Documentación QA',
    section_experience: '💼 Experiencia Profesional',
    section_education:  '🎓 Educación',
    section_awards: '🏅 Reconocimientos',
    profile_paragraph:  'Desarrollador Fullstack centrado en la creación de aplicaciones web robustas utilizando JavaScript, Node.js y React. Mi experiencia en QA Testing (Jira, Postman, Casos de Prueba) me permite estructurar código de alta calidad con arquitectura modular y flujo de datos eficiente.  Estoy enfocado en entregar soluciones técnicas que impacten de manera positiva tanto en la experiencia del usuario como en la estabilidad del sistema.',
    skill_languages: 'Lenguajes de Programación:', 
    skill_python: 'Python (Intermedio)',
    skill_js: 'JavaScript (Intermedio)',
    skill_ts: 'TypeScript (Intermedio)',
    skill_html: 'HTML (Avanzado)',
    skill_css: 'CSS (Avanzado)',
    skill_bash: 'Bash (Básico)',
    skill_frameworks: 'Frameworks & Web:', 
    skill_react: 'React (Intermedio)',
    skill_node: 'Node.js (Intermedio)',
    skill_flutter: 'Flutter (Básico)',
    skill_fullstack: 'Desarrollo Full-Stack (Front-End y Back-End)',
    skill_git: 'Git/GitHub (Intermedio)',
    skill_docker: 'Docker (Básico)',
    skill_databases: 'Bases de Datos y Sistemas:', 
    skill_sql: 'SQL (Intermedio)',
    skill_os: 'Sistemas Operativos:  Ubuntu Linux, Kali Linux, Parrot Linux',
    skill_linux_exp: 'Sistemas Operativos Linux (Ubuntu, Kali, Parrot:  Avanzado - 10+ años)',
    skill_cli: 'Herramientas de Línea de Comandos',
    skill_testing_qa: 'Testing & QA:', 
    skill_jira: 'Informes de Errores (Jira:  Avanzado)',
    skill_postman: 'Pruebas de API (Postman: Intermedio)',
    skill_cases: 'Diseño de Casos de Prueba',
    skill_analysis: 'Análisis de Requerimientos',
    skill_agile: 'Metodologías Ágiles (Scrum)',
    skill_languages_spoken: 'Idiomas:', 
    skill_english: 'Inglés (Avanzado/Fluido)',
    skill_portuguese: 'Portugués (Intermedio)',
    skill_soft:  'Habilidades Blandas:', 
    skill_critical: 'Pensamiento Crítico',
    skill_communication: 'Comunicación Técnica y Multilingüe',
    skill_problem_solving: 'Resolución de Problemas',
    qa_project_crud_title: 'CRUD (Sistema de Promociones de Estudiantes)',
    qa_project_crud_desc_1: 'Descripción: ',
    qa_project_crud_desc_2: 'Sistema web CRUD para la gestión de registros de estudiantes:  permite añadir, modificar y visualizar eficientemente el control de los usuarios. Cuenta con validación, ejemplos, mensajes claros y una interfaz intuitiva.',
    qa_project_crud_stack: 'Stack:  JavaScript, HTML, CSS, GitHub Pages.',
    qa_project_crud_impact: 'Impacto:  Facilita la administración y seguimiento de promociones estudiantiles.',
    qa_project_skillverse_title: 'SkillVerse (Plataforma para Aspirantes a TI)',
    qa_project_skillverse_type: 'Proyecto Hackathon (2024)',
    qa_project_skillverse_func: 'Función: Diseño y desarrollo Front-End, pruebas funcionales y de usabilidad.',
    qa_project_skillverse_impact: 'Impacto:  Interfaz funcional y responsiva lista para demostración en Hackathon.',
    qa_project_skillverse_stack: 'Stack: HTML, CSS, JavaScript, Usabilidad, Git/GitHub.',
    qa_project_ecommerce_title: 'E-commerce Backend y Pasarela de Pago (Salud=Felicidad();)',
    qa_project_ecommerce_type: 'Proyecto de Ventas Personal (En Desarrollo)',
    qa_project_ecommerce_func: 'Función: Desarrollo de pasarela de pago, pruebas de regresión y smoke testing.',
    qa_project_ecommerce_impact: 'Impacto: Prevención de fallas y alineación técnica con experiencia de usuario.',
    qa_project_ecommerce_stack:  'Stack: Node.js, SQL, QA, UX, Git.',
    qa_portfolio_link_title: 'Carpeta de Documentos y Evidencia QA',
    qa_portfolio_link_desc: 'Colección de casos de prueba, informes de errores, planes de prueba y otra documentación generada durante el proceso de aseguramiento de calidad.',
    exp_gga_title: 'Representante de Ventas',
    exp_gga_company: 'GGA, Estados Unidos',
    exp_gga_period: 'Febrero 2025 - Actualidad',
    exp_gga_desc: 'Venta y asesoría de seguros médicos.  Uso de CRM y adaptación del discurso al cliente, demostrando capacidad de adaptación y gestión de información crítica.',
    exp_gga_achievement: 'Logro: Capacidad para modular tono y técnicas de persuasión y negociación.',
    exp_foundever_title: 'Representante de Ventas',
    exp_foundever_company: 'Foundever',
    exp_foundever_period: 'Agosto 2023 – Noviembre 2024',
    exp_foundever_desc_1: 'Asistí a clientes en dos idiomas para completar compras por teléfono, recomendando productos y gestionando procesos de reembolsos y devoluciones en plataformas complejas.',
    exp_foundever_desc_2: 'Desarrollé técnicas de persuasión y empatía para solucionar problemas, buscando formas para que los clientes adquirieran más producto del que ya habían pedido.',
    exp_alorica_title: 'Soporte a Repartidores',
    exp_alorica_company: 'Alorica',
    exp_alorica_period: 'Julio 2022 – Octubre 2023',
    exp_alorica_desc_1: 'Proporcioné soporte a través de chat para resolver problemas relacionados con el pago de nómina de repartidores.',
    exp_alorica_desc_2: 'Facilitaba la comunicación entre hispanohablantes y clientes que hablaban inglés, garantizando una resolución efectiva y oportuna de sus inquietudes, orientándolos en el uso del software de la empresa.',
    exp_alorica_desc_3: 'Aprendí mecanografía en dos semanas para adquirir este trabajo y fui premiado por mi desempeño.',
    exp_teleperformance_title: 'Representante de Servicio al Cliente',
    exp_teleperformance_company: 'Teleperformance',
    exp_teleperformance_period:  'Marzo 2024 – Nov 2024',
    exp_teleperformance_desc:  'Soporte bilingüe en servicios telecomunicaciones y renta de vehículos.  Gestión de transacciones críticas, plataformas en inglés.',
    exp_teleperformance_achievement: 'Logro:  Resolución eficiente de problemas y trato calmado a clientes, mejorando la satisfacción.',
    edu_fullstack_title: 'Fullstack Web Developer - Beginner Outstanding',
    edu_fullstack_institution: 'Utel Universidad (Ene 2024 – Jun 2024)',
    edu_fullstack_desc: 'Bootcamp Web Dev Fundamentals.  Desarrollo de landing pages, catálogos y aplicaciones CRUD (SPA).',
    edu_fullstack_tech: 'Tecnologías:  HTML5, CSS Responsive, Git/GitHub, Persistencia de Datos y Gestión del DOM.',
    edu_qa_title: 'Certificación de QA Tester',
    edu_qa_institution: 'Triple Ten (En curso, Próximo a completar)',
    edu_qa_desc: 'Metodología de pruebas, casos de prueba y aseguramiento de calidad.',
    edu_systems_title: 'Ingeniería en Sistemas Computacionales',
    edu_systems_institution: 'UTEL (2023 – 2026, En curso)',
    edu_systems_desc: 'Enfoque en resolución de problemas prácticos, lógica y solución de fallas técnicas.',
    edu_english_title: 'Certificación de Inglés',
    edu_english_institution:  'ICO (2006 – 2007)',
    edu_english_desc:  'Beca por Excelencia:  Primer alumno de la generación en adquirir habilidades de lectura en Español.',
    award_champion: 'Campeón de Atención al Cliente',
    award_fullstack: 'Desarrollador Web Full Stack',
    award_hackathon:  'Participación Destacada en Hackathon Universitario con IBM',
  },
  en: {
    btn_show:  'OPEN RESUME',
    btn_hide: 'Close ×',
    name: 'ENRIQUE DOMÍNGUEZ',
    contact_email:  'Email:',
    contact_phone:  'Phone:',
    contact_linkedin:  'LinkedIn:',
    contact_github: 'GitHub:',
    contact_location: 'Location: Mexico, Puebla',
    profession: 'Fullstack Web Developer | QA Engineer (Web Development with Quality Focus)',
    section_profile: 'Professional Profile',
    section_skills:  '🛠️ Technical Skills',
    section_qa_projects: '💻 Web and QA Projects (Portfolio)',
    section_qa_documentation: '📂 QA Documentation Portfolio',
    section_experience: '💼 Professional Experience',
    section_education:  '🎓 Education',
    section_awards: '🏅 Awards & Recognition',
    profile_paragraph:  'Fullstack Developer focused on creating robust web applications using JavaScript, Node.js, and React. My experience in QA Testing (Jira, Postman, Test Cases) allows me to structure high-quality code with modular architecture and efficient data flow. I am focused on delivering technical solutions that positively impact both user experience and system stability.',
    skill_languages: 'Programming Languages:', 
    skill_python: 'Python (Intermediate)',
    skill_js: 'JavaScript (Intermediate)',
    skill_ts: 'TypeScript (Intermediate)',
    skill_html: 'HTML (Advanced)',
    skill_css: 'CSS (Advanced)',
    skill_bash: 'Bash (Basic)',
    skill_frameworks: 'Frameworks & Web:', 
    skill_react: 'React (Intermediate)',
    skill_node: 'Node.js (Intermediate)',
    skill_flutter: 'Flutter (Basic)',
    skill_fullstack: 'Full-Stack Development (Front-End and Back-End)',
    skill_git: 'Git/GitHub (Intermediate)',
    skill_docker:  'Docker (Basic)',
    skill_databases: 'Databases and Systems:', 
    skill_sql:  'SQL (Intermediate)',
    skill_os: 'Operating Systems: Ubuntu Linux, Kali Linux, Parrot Linux',
    skill_linux_exp: 'Linux Operating Systems (Ubuntu, Kali, Parrot: Advanced - 10+ years)',
    skill_cli: 'Command Line Tools',
    skill_testing_qa: 'Testing & QA:', 
    skill_jira: 'Bug Reporting (Jira: Advanced)',
    skill_postman: 'API Testing (Postman: Intermediate)',
    skill_cases: 'Test Case Design',
    skill_analysis: 'Requirements Analysis',
    skill_agile: 'Agile Methodologies (Scrum)',
    skill_languages_spoken: 'Languages:', 
    skill_english: 'English (Advanced/Fluent)',
    skill_portuguese: 'Portuguese (Intermediate)',
    skill_soft: 'Soft Skills:', 
    skill_critical: 'Critical Thinking',
    skill_communication: 'Technical and Multilingual Communication',
    skill_problem_solving: 'Problem Solving',
    qa_project_crud_title: 'CRUD (Student Promotions System)',
    qa_project_crud_desc_1: 'Description:',
    qa_project_crud_desc_2: 'CRUD web system for managing student records: allows efficient adding, modifying, and viewing of user control.  Features validation, examples, clear messages, and an intuitive interface.',
    qa_project_crud_stack: 'Stack: JavaScript, HTML, CSS, GitHub Pages.',
    qa_project_crud_impact: 'Impact: Facilitates the administration and tracking of student promotions.',
    qa_project_skillverse_title:  'SkillVerse (IT Aspirants Platform)',
    qa_project_skillverse_type: 'Hackathon Project (2024)',
    qa_project_skillverse_func: 'Role: Front-End design and development, functional and usability testing.',
    qa_project_skillverse_impact: 'Impact: Functional and responsive interface ready for Hackathon demonstration.',
    qa_project_skillverse_stack: 'Stack:  HTML, CSS, JavaScript, Usability, Git/GitHub.',
    qa_project_ecommerce_title: 'E-commerce Backend and Payment Gateway (Health=Happiness();)',
    qa_project_ecommerce_type: 'Personal Sales Project (In Development)',
    qa_project_ecommerce_func: 'Role: Payment gateway development, regression and smoke testing.',
    qa_project_ecommerce_impact: 'Impact: Defect prevention and technical alignment with user experience.',
    qa_project_ecommerce_stack: 'Stack: Node.js, SQL, QA, UX, Git.',
    qa_portfolio_link_title: 'QA Documentation and Evidence Folder',
    qa_portfolio_link_desc: 'Collection of test cases, bug reports, test plans, and other documentation generated during the quality assurance process.',
    exp_gga_title: 'Sales Representative',
    exp_gga_company: 'GGA, United States',
    exp_gga_period: 'February 2025 - Present',
    exp_gga_desc: 'Sale and consultation of health insurance.  Use of CRM and adapting discourse to the client, demonstrating adaptability and critical information management skills.',
    exp_gga_achievement: 'Achievement: Ability to modulate tone and persuasion and negotiation techniques.',
    exp_foundever_title: 'Sales Representative',
    exp_foundever_company: 'Foundever',
    exp_foundever_period: 'August 2023 – November 2024',
    exp_foundever_desc_1: 'Assisted clients in two languages to complete phone purchases, recommending products and managing refund and return processes on complex platforms.',
    exp_foundever_desc_2: 'Developed persuasion and empathy techniques to solve problems, finding ways for clients to acquire more product than they had requested.',
    exp_alorica_title: 'Driver Support',
    exp_alorica_company: 'Alorica',
    exp_alorica_period: 'July 2022 – October 2023',
    exp_alorica_desc_1: 'Provided support via chat to resolve issues related to driver payroll.',
    exp_alorica_desc_2: 'Facilitated communication between Spanish speakers and English-speaking clients, ensuring an effective and timely resolution of their concerns, guiding them in the use of company software.',
    exp_alorica_desc_3: 'I learned touch typing in two weeks to acquire this job and was awarded for my performance.',
    exp_teleperformance_title: 'Customer Service Representative',
    exp_teleperformance_company: 'Teleperformance',
    exp_teleperformance_period:  'March 2024 – Nov 2024',
    exp_teleperformance_desc:  'Bilingual support in telecommunications services and vehicle rental. Management of critical transactions, English platforms.',
    exp_teleperformance_achievement: 'Achievement:  Efficient problem resolution and calm treatment of clients, improving satisfaction.',
    edu_fullstack_title: 'Fullstack Web Developer - Beginner Outstanding',
    edu_fullstack_institution:  'Utel University (Jan 2024 – Jun 2024)',
    edu_fullstack_desc: 'Web Dev Fundamentals Bootcamp. Development of landing pages, catalogs, and CRUD applications (SPA).',
    edu_fullstack_tech:  'Technologies: HTML5, Responsive CSS, Git/GitHub, Data Persistence, and DOM Management.',
    edu_qa_title: 'QA Tester Certification',
    edu_qa_institution: 'Triple Ten (In Progress, Nearing Completion)',
    edu_qa_desc: 'Testing methodology, test cases, and quality assurance.',
    edu_systems_title:  'Computer Systems Engineering',
    edu_systems_institution: 'UTEL (2023 – 2026, In Progress)',
    edu_systems_desc: 'Focus on practical problem-solving, logic, and technical failure resolution.',
    edu_english_title: 'English Certification',
    edu_english_institution: 'ICO (2006 – 2007)',
    edu_english_desc: 'Scholarship for Excellence: First student in the generation to acquire reading skills in Spanish.',
    award_champion: 'Customer Service Champion',
    award_fullstack:  'Full Stack Web Developer',
    award_hackathon: 'Outstanding Participation in University Hackathon with IBM',
  },
};

export default function PanelWithAnimatedBackground() {
  // Detectar idioma del navegador al inicio
  const getBrowserLanguage = (): LanguageKey => {
    const browserLang = navigator.language. toLowerCase();
    return browserLang.startsWith('es') ? 'es' : 'en';
  };

  const [language, setLanguage] = useState<LanguageKey>(getBrowserLanguage());
  const [showPanel, setShowPanel] = useState(true); // Panel mostrado por defecto
  const t = translations[language];

  return (
    <div style={{ 
        position: 'relative', 
        width: '100vw', 
        height: '100vh', 
        overflow:  'hidden', 
        background: '#00aaff' 
    }}>
      
      <style>
        {`
        . scroll-panel: :-webkit-scrollbar { 
          width: 12px; 
        }
        .scroll-panel::-webkit-scrollbar-thumb { 
          background: #b2ccd6cc; 
          border-radius:  8px; 
          border: 2px solid #00aaff44;
        }
        .scroll-panel::-webkit-scrollbar-track {
          background: #dbf4ff;
          border-radius: 8px;
        }
        .scroll-panel { 
          scrollbar-color: #b2ccd6cc #dbf4ff; 
          scrollbar-width: thin; 
        }
        .scroll-panel a { 
          color: #00aaff ! important; 
          text-decoration: underline; 
        }
        .scroll-panel a:hover { 
          color: #0077bb !important; 
        }

        .btn-close {
            position: absolute; 
            top: 20px; 
            right: 20px; 
            padding: 10px 18px;
            background: rgba(255, 255, 255, 0.25); 
            color: #666; 
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 12px; 
            cursor: pointer; 
            font-weight: 700;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            z-index: 10;
        }
        .btn-close:hover { 
          background: rgba(255, 255, 255, 0.5); 
          color: #000; 
        }

        . cube-hint {
            position: absolute; 
            bottom: 12%; 
            left: 50%; 
            transform: translateX(-50%);
            color: white; 
            font-weight: 800; 
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
            pointer-events: none; 
            text-align: center; 
            letter-spacing: 3px;
            animation: pulseHint 3s infinite;
            font-size: 1.2rem;
        }
        @keyframes pulseHint { 
          0%, 100% { opacity: 0.5; } 
          50% { opacity:  1; } 
        }
        `}
      </style>

      <Canvas 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0 
        }} 
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={window.devicePixelRatio}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <BackgroundScene />
        {! showPanel && <ShowButtonCube onClick={() => setShowPanel(true)} />}
      </Canvas>

      {! showPanel && <div className="cube-hint">{t.btn_show}</div>}

      {showPanel && (
        <div
            className="scroll-panel"
            style={{
                position: 'absolute', 
                top: '8vh', 
                left: '50%', 
                transform: 'translateX(-50%)',
                width: '680px', 
                maxWidth: '96vw', 
                height: '84vh',
                background: 'rgba(255,255,255,0.37)', 
                borderRadius: '24px',
                boxShadow: '0 2px 32px rgba(0,0,0,0.18)', 
                zIndex: 2,
                overflowY: 'auto', 
                padding: '36px', 
                color: '#222',
                backdropFilter: 'blur(8px)', 
                fontFamily: 'system-ui, Arial, sans-serif'
            }}
        >
            <button className="btn-close" onClick={() => setShowPanel(false)}>
                {t.btn_hide}
            </button>

            <h1 style={{ marginTop: 0, marginBottom: '8px', fontSize: '2rem' }}>
              {t.name}
            </h1>
            
            <p style={{ fontSize: '1.05rem', marginBottom: '6px' }}>
              <strong>{t.contact_email}</strong> Enriquedominguez1375@gmail.com <br />
              <strong>{t.contact_phone}</strong> +52 248 228 4489 <br />
              <strong>{t.contact_linkedin}</strong> <a href="https://www.linkedin.com/in/enrique-domínguez13" target="_blank" rel="noopener noreferrer">enrique-domínguez13</a> <br />
              <strong>{t.contact_github}</strong> <a href="https://github.com/EnriqueRocha13" target="_blank" rel="noopener noreferrer">EnriqueRocha13</a> <br />
              <strong>{t.contact_location}</strong>
            </p>
            <hr style={{ borderTop: '1px solid #ddd' }}/>
            
            <h2 style={{ fontSize: '1.1rem', margin: '10px 0 2px', fontWeight: 700, color: '#0077BB' }}>
              {t. profession}
            </h2>
            
            <h3 style={{ margin: '8px 0 4px', fontWeight: 600, borderBottom: '2px solid #eee', paddingBottom: '2px' }}>
              {t.section_profile}
            </h3>
            <p>{t.profile_paragraph}</p>
            
            <h3 style={{ marginTop: 18, marginBottom: 6, borderBottom: '2px solid #eee', paddingBottom: '2px' }}>
              {t.section_skills}
            </h3>
            <ul style={{ lineHeight: 1.65, marginBottom: 8, listStyleType: 'disc', paddingLeft: '20px' }}>
              <li><strong>{t.skill_languages}</strong>
                <ul style={{ listStyleType: 'circle' }}>
                  <li>{t.skill_js}</li>
                  <li>{t.skill_ts}</li>
                  <li>{t.skill_python}</li>
                  <li>{t.skill_html}</li>
                  <li>{t.skill_css}</li>
                  <li>{t.skill_bash}</li>
                </ul>
              </li>
              <li><strong>{t. skill_frameworks}</strong>
                <ul style={{ listStyleType: 'circle' }}>
                  <li>{t.skill_react}</li>
                  <li>{t.skill_node}</li>
                  <li>{t.skill_fullstack}</li>
                  <li>{t.skill_git}</li>
                  <li>{t.skill_docker}</li>
                  <li>{t. skill_flutter}</li>
                </ul>
              </li>
              <li><strong>{t.skill_databases}</strong>
                <ul style={{ listStyleType: 'circle' }}>
                  <li>{t.skill_sql}</li>
                  <li>{t.skill_linux_exp}</li>
                  <li>{t.skill_os}</li>
                  <li>{t.skill_cli}</li>
                </ul>
              </li>
              <li><strong>{t. skill_testing_qa}</strong>
                <ul style={{ listStyleType: 'circle' }}>
                  <li>{t.skill_jira}</li>
                  <li>{t.skill_postman}</li>
                  <li>{t.skill_cases}</li>
                  <li>{t.skill_analysis}</li>
                  <li>{t.skill_agile}</li>
                </ul>
              </li>
              <li><strong>{t.skill_languages_spoken}</strong>
                <ul style={{ listStyleType: 'circle' }}>
                  <li>{t.skill_english}</li>
                  <li>{t.skill_portuguese}</li>
                </ul>
              </li>
              <li><strong>{t.skill_soft}</strong>
                <ul style={{ listStyleType: 'circle' }}>
                  <li>{t.skill_critical}</li>
                  <li>{t.skill_communication}</li>
                  <li>{t.skill_problem_solving}</li>
                </ul>
              </li>
            </ul>
            
            <h3 style={{ marginTop: 14, marginBottom: 4, borderBottom: '2px solid #eee', paddingBottom:  '2px' }}>
              {t.section_qa_projects}
            </h3>
            <ol style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>
                  <a href="https://enriquerocha13.github.io/CRUD/" target="_blank" rel="noopener noreferrer">
                    {t.qa_project_crud_title}
                  </a>
                </strong>
                <ul style={{ listStyleType: 'none', paddingLeft: '10px', marginTop: '4px', fontSize: '0.95rem', lineHeight: '1.4' }}>
                  <li><strong>{t.qa_project_crud_desc_1}</strong> {t.qa_project_crud_desc_2}</li>
                  <li><strong>Stack: </strong> {t.qa_project_crud_stack. split(':  ')[1]}</li>
                  <li><strong>{t.qa_project_crud_impact. split(': ')[0]}:</strong> {t.qa_project_crud_impact.split(': ')[1]}</li>
                </ul>
              </li>
              
              <li style={{ marginBottom:  '12px' }}>
                <strong>
                  <a href="https://enriquerocha13.github.io/SkillVerse/" target="_blank" rel="noopener noreferrer">
                    {t.qa_project_skillverse_title}
                  </a>
                </strong> | <em>{t.qa_project_skillverse_type}</em>
                <ul style={{ listStyleType:  'none', paddingLeft:  '10px', marginTop: '4px', fontSize: '0.95rem', lineHeight: '1.4' }}>
                  <li><strong>{t.qa_project_skillverse_func. split(': ')[0]}:</strong> {t.qa_project_skillverse_func.split(': ')[1]}</li>
                  <li><strong>{t.qa_project_skillverse_impact.split(': ')[0]}:</strong> {t. qa_project_skillverse_impact.split(': ')[1]}</li>
                  <li><strong>Stack:</strong> {t.qa_project_skillverse_stack. split(': ')[1]}</li>
                </ul>
              </li>

              <li style={{ marginBottom:  '12px' }}>
                <strong>
                  <a href="https://www.facebook.com/share/19xjoP8A1k/" target="_blank" rel="noopener noreferrer">
                    {t.qa_project_ecommerce_title}
                  </a>
                </strong> | <em>{t.qa_project_ecommerce_type}</em>
                <ul style={{ listStyleType: 'none', paddingLeft: '10px', marginTop: '4px', fontSize: '0.95rem', lineHeight: '1.4' }}>
                  <li><strong>{t.qa_project_ecommerce_func.split(': ')[0]}:</strong> {t.qa_project_ecommerce_func. split(': ')[1]}</li>
                  <li><strong>{t.qa_project_ecommerce_impact.split(': ')[0]}:</strong> {t.qa_project_ecommerce_impact.split(':  ')[1]}</li>
                  <li><strong>Stack:</strong> {t.qa_project_ecommerce_stack. split(': ')[1]}</li>
                </ul>
              </li>
            </ol>

            <h3 style={{ marginTop: 14, marginBottom:  4, borderBottom: '2px solid #eee', paddingBottom: '2px' }}>
              {t.section_qa_documentation}
            </h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>
                    <strong>
                        <a href="https://drive.google.com/drive/folders/1JLmq_g5fTqJWEihAPDWTcmsImQN1nKMQ? usp=sharing" target="_blank" rel="noopener noreferrer">
                            {t. qa_portfolio_link_title}
                        </a>
                    </strong><br />
                    <span style={{ fontSize: '0.95rem' }}>
                        {t. qa_portfolio_link_desc}
                    </span>
                </li>
            </ul>
            
            <h3 style={{ marginTop: 14, marginBottom: 4, borderBottom:  '2px solid #eee', paddingBottom: '2px' }}>
              {t.section_experience}
            </h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t.exp_gga_title}</strong> | {t.exp_gga_company} ({t.exp_gga_period})<br />
                {t.exp_gga_desc}<br />
                <em>{t.exp_gga_achievement. split(': ')[0]}:</em> {t.exp_gga_achievement.split(':  ')[1]}
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t.exp_foundever_title}</strong> | {t.exp_foundever_company} ({t.exp_foundever_period})<br />
                {t.exp_foundever_desc_1}<br />
                {t.exp_foundever_desc_2}
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t.exp_alorica_title}</strong> | {t.exp_alorica_company} ({t.exp_alorica_period})<br />
                {t.exp_alorica_desc_1}<br />
                {t.exp_alorica_desc_2}<br />
                {t.exp_alorica_desc_3}
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t.exp_teleperformance_title}</strong> | {t.exp_teleperformance_company} ({t. exp_teleperformance_period})<br />
                {t.exp_teleperformance_desc}<br />
                <em>{t.exp_teleperformance_achievement.split(':  ')[0]}:</em> {t.exp_teleperformance_achievement.split(': ')[1]}
              </li>
            </ul>
            
            <h3 style={{ marginTop:  14, marginBottom: 4, borderBottom: '2px solid #eee', paddingBottom:  '2px' }}>
              {t.section_education}
            </h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom:  '8px' }}>
                <strong>{t.edu_fullstack_title}</strong>, {t.edu_fullstack_institution}<br />
                {t.edu_fullstack_desc}<br />
                <em>{t.edu_fullstack_tech.split(': ')[0]}:</em> {t.edu_fullstack_tech.split(': ')[1]}
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t.edu_qa_title}</strong>, {t.edu_qa_institution}<br />
                {t.edu_qa_desc}
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t.edu_systems_title}</strong>, {t.edu_systems_institution}<br />
                {t.edu_systems_desc}
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t.edu_english_title}</strong>, {t.edu_english_institution} <br />
                <em>{t.edu_english_desc.split(': ')[0]}:</em> {t.edu_english_desc.split(':  ')[1]}
              </li>
            </ul>
            
            <h3 style={{ marginTop:  14, marginBottom: 4, borderBottom: '2px solid #eee', paddingBottom:  '2px' }}>
              {t.section_awards}
            </h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="https://drive.google.com/file/d/1EVf4tfabb4HLCKoc7k_y6OxP4Qot-ust/view? usp=sharing" target="_blank" rel="noopener noreferrer">
                  {t.award_champion}
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="https://www.credly.com/badges/9418fa65-4dbc-4cdf-9adc-f351a3b4bfa4" target="_blank" rel="noopener noreferrer">
                  {t.award_fullstack}
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="https://drive.google.com/file/d/12-28umDPWfpeCUzzpuriDssPEfIIHFSW/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                  {t.award_hackathon}
                </a>
              </li>
            </ul>
        </div>
      )}
    </div>
  );
}
