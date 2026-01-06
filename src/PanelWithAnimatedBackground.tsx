import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BackgroundScene from './BackgroundScene';

// 3D Glass Cube Component
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
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); setRandomColor(generateRandomColor()); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[2. 5, 2.5, 2.5]} />
        <meshPhysicalMaterial 
          color={hovered ? randomColor : '#eeeeee'}
          transmission={1} thickness={1.5} roughness={0.05} ior={1.5}
          transparent={true} opacity={0.6}
          emissive={hovered ? randomColor : '#000000'}
          emissiveIntensity={hovered ? 0.8 : 0} 
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={hovered ? 4 : 1} color={hovered ? randomColor : '#ffffff'} />
    </group>
  );
}

export default function PanelWithAnimatedBackground() {
  const [showPanel, setShowPanel] = useState(true);

  // Set language to English for browser translation detection
  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#00aaff' }}>
      
      <style>
        {`
        . scroll-panel: :-webkit-scrollbar { width: 12px; }
        .scroll-panel::-webkit-scrollbar-thumb { background: #b2ccd6cc; border-radius: 8px; }
        .scroll-panel::-webkit-scrollbar-track { background: #dbf4ff; border-radius: 8px; }
        .scroll-panel { scrollbar-color: #b2ccd6cc #dbf4ff; scrollbar-width: thin; }
        .scroll-panel a { color: #00aaff ! important; text-decoration: underline; font-weight: 600; }
        .btn-close {
            position: absolute; top: 20px; right: 20px; padding: 10px 18px;
            background: rgba(255, 255, 255, 0.25); color: #444; border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 12px; cursor: pointer; font-weight: 700; backdrop-filter: blur(10px);
            z-index: 10;
        }
        .btn-close:hover { background: rgba(255, 255, 255, 0.5); color: #000; }
        `}
      </style>

      <Canvas style={{ position: 'absolute', top: 0, left:  0, width: '100%', height: '100%', zIndex: 0 }} camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <BackgroundScene />
        {! showPanel && <ShowButtonCube onClick={() => setShowPanel(true)} />}
      </Canvas>

      {! showPanel && (
        <div style={{
            position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
            color: 'white', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            pointerEvents: 'none', textAlign: 'center', letterSpacing: '3px', fontSize: '1.2rem'
        }}>OPEN RESUME</div>
      )}

      {showPanel && (
        <div className="scroll-panel" style={{
                position: 'absolute', top:  '8vh', left: '50%', transform: 'translateX(-50%)',
                width: '680px', maxWidth: '96vw', height: '84vh',
                background: 'rgba(255,255,255,0.4)', borderRadius: '24px',
                boxShadow: '0 2px 32px rgba(0,0,0,0.18)', zIndex: 2,
                overflowY: 'auto', padding: '36px', color: '#222',
                backdropFilter: 'blur(10px)', fontFamily: 'system-ui, Arial, sans-serif'
            }}>
            
            <button className="btn-close" onClick={() => setShowPanel(false)}>Close ×</button>

            <h1 style={{ marginTop: 0, marginBottom: '8px', fontSize: '2rem' }}>ENRIQUE DOMÍNGUEZ</h1>
            
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
            
            <h3 style={{ margin: '12px 0 4px', fontWeight: 600, borderBottom: '2px solid #eee' }}>Professional Profile</h3>
            <p>Fullstack Developer focused on creating robust web applications using JavaScript, Node.js, and React. My experience in QA Testing (Jira, Postman, Test Cases) allows me to structure high-quality code with modular architecture and efficient data flow. I am focused on delivering technical solutions that positively impact both user experience and system stability.</p>
            
            <h3 style={{ marginTop: 18, marginBottom: 6, borderBottom: '2px solid #eee' }}>🛠️ Technical Skills</h3>
            <ul style={{ lineHeight: 1.65, listStyleType: 'disc', paddingLeft: '20px' }}>
              <li><strong>Programming Languages:</strong> JavaScript (Intermediate), TypeScript (Intermediate), Python (Intermediate), HTML (Advanced), CSS (Advanced), Bash (Basic)</li>
              <li><strong>Frameworks & Web: </strong> React (Intermediate), Node.js (Intermediate), Flutter (Basic), Full-Stack Development (Front-End and Back-End), Git/GitHub (Intermediate), Docker (Basic)</li>
              <li><strong>Databases and Systems:</strong> SQL (Intermediate), Linux Operating Systems (Ubuntu, Kali, Parrot:  Advanced - 10+ years), Command Line Tools</li>
              <li><strong>Testing & QA:</strong> Bug Reporting (Jira:  Advanced), API Testing (Postman:  Intermediate), Test Case Design, Requirements Analysis, Agile Methodologies (Scrum)</li>
              <li><strong>Languages:</strong> English (Advanced/Fluent), Portuguese (Intermediate)</li>
              <li><strong>Soft Skills:</strong> Critical Thinking, Problem Solving, Technical and Multilingual Communication</li>
            </ul>
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>💻 Web and QA Projects (Portfolio)</h3>
            <ol style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '14px' }}>
                <strong><a href="https://enriquerocha13.github.io/CRUD/" target="_blank">CRUD (Student Promotions System)</a></strong>
                <p style={{ margin: '4px 0' }}>Description:  CRUD web system for managing student records:  allows efficient adding, modifying, and viewing of user control.  Features validation, examples, and an intuitive interface. </p>
                <p style={{ margin: '4px 0' }}><strong>Stack:</strong> JavaScript, HTML, CSS, GitHub Pages.  | <strong>Impact:</strong> Facilitates student tracking. </p>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong><a href="https://enriquerocha13.github.io/SkillVerse/" target="_blank">SkillVerse (IT Aspirants Platform)</a></strong> | <em>Hackathon Project (2024)</em>
                <p style={{ margin: '4px 0' }}>Role: Front-End design and development, functional and usability testing. </p>
                <p style={{ margin: '4px 0' }}><strong>Stack:</strong> HTML, CSS, JavaScript, Usability, Git/GitHub. | <strong>Impact:</strong> Responsive interface ready for demonstration.</p>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <strong><a href="https://www.facebook.com/share/19xjoP8A1k/" target="_blank">E-commerce Backend (Health=Happiness();)</a></strong> | <em>Personal Sales Project</em>
                <p style={{ margin: '4px 0' }}>Role: Payment gateway development, regression and smoke testing.</p>
                <p style={{ margin: '4px 0' }}><strong>Stack: </strong> Node.js, SQL, QA, UX, Git.  | <strong>Impact:</strong> Defect prevention and UX alignment.</p>
              </li>
            </ol>

            <h3 style={{ marginTop: 18, marginBottom:  4, borderBottom: '2px solid #eee' }}>📂 QA Documentation Portfolio</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li><strong><a href="https://drive.google.com/drive/folders/1JLmq_g5fTqJWEihAPDWTcmsImQN1nKMQ? usp=sharing" target="_blank">QA Documentation and Evidence Folder</a></strong><br />
                <span style={{ fontSize: '0.95rem' }}>Collection of test cases, bug reports, test plans, and other documentation generated during the quality assurance process.</span></li>
            </ul>
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom:  '2px solid #eee' }}>💼 Professional Experience</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '16px' }}>
                <strong>Sales Representative</strong> | GGA, United States (February 2025 - Present)<br />
                Sale and consultation of health insurance.  Use of CRM and adapting discourse to the client, demonstrating adaptability and critical information management skills. <br />
                <em><strong>Achievement:</strong> Ability to modulate tone and persuasion and negotiation techniques. </em>
              </li>
              <li style={{ marginBottom:  '16px' }}>
                <strong>Sales Representative</strong> | Foundever (August 2023 – November 2024)<br />
                Assisted clients in two languages to complete phone purchases, recommending products and managing refund and return processes on complex platforms.<br />
                Developed persuasion and empathy techniques to solve problems, finding ways for clients to acquire more product than they had requested. <br />
                <em><strong>Achievement:</strong> Sales optimization through persuasion and multilingual management.</em>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong>Driver Support</strong> | Alorica (July 2022 – October 2023)<br />
                Provided support via chat to resolve issues related to driver payroll.  Facilitated communication between Spanish speakers and English-speaking clients, ensuring effective and timely resolution. <br />
                <em><strong>Achievement:</strong> I learned touch typing in two weeks to acquire this job and was awarded for my performance.</em>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong>Customer Service Representative</strong> | Teleperformance (March 2024 – Nov 2024)<br />
                Bilingual support in telecommunications services and vehicle rental. Management of critical transactions on English platforms. <br />
                <em><strong>Achievement:</strong> Efficient problem resolution and calm treatment of clients, improving satisfaction. </em>
              </li>
            </ul>
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>🎓 Education</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Fullstack Web Developer - Beginner Outstanding</strong>, Utel University (Jan 2024 – Jun 2024)<br />
                Web Dev Fundamentals Bootcamp.  Development of landing pages, catalogs, and CRUD applications (SPA).<br />
                <em><strong>Technologies:</strong> HTML5, Responsive CSS, Git/GitHub, Data Persistence, and DOM Management.</em>
              </li>
              <li style={{ marginBottom: '12px' }}><strong>QA Tester Certification</strong>, Triple Ten (In Progress, Nearing Completion)<br />Testing methodology, test cases, and quality assurance. </li>
              <li style={{ marginBottom: '12px' }}><strong>Computer Systems Engineering</strong>, UTEL (2023 – 2026, In Progress)<br />Focus on practical problem-solving, logic, and technical failure resolution.</li>
              <li style={{ marginBottom: '12px' }}>
                <strong>English Certification</strong>, ICO (2006 – 2007) <br />
                <em><strong>Achievement:</strong> Scholarship for Excellence:  First student in the generation to acquire reading skills in Spanish. </em>
              </li>
            </ul>
            
            <h3 style={{ marginTop: 18, marginBottom: 4, borderBottom: '2px solid #eee' }}>🏅 Awards & Recognition</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><a href="https://drive.google.com/file/d/1EVf4tfabb4HLCKoc7k_y6OxP4Qot-ust/view? usp=sharing" target="_blank">Customer Service Champion (GGA/Foundever)</a></li>
              <li style={{ marginBottom: '8px' }}><a href="https://www.credly.com/badges/9418fa65-4dbc-4cdf-9adc-f351a3b4bfa4" target="_blank">Full Stack Web Developer Badge (Utel)</a></li>
              <li style={{ marginBottom: '8px' }}><a href="https://drive.google.com/file/d/12-28umDPWfpeCUzzpuriDssPEfIIHFSW/view?usp=drivesdk" target="_blank">Outstanding Participation in University Hackathon with IBM</a></li>
            </ul>
        </div>
      )}
    </div>
  );
}
