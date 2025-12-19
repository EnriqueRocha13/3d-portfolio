import * as THREE from 'three';
import { useRef, useMemo, useEffect, useCallback, useState } from 'react'; // Importamos useState, useMemo
import { useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

// ---------------------------------------------------------------------
// 🎨 FUNCIÓN DE UTILIDAD PARA COLOR ALEATORIO Y COLOR BASE FIJO
// ---------------------------------------------------------------------

/**
 * Define el color base de los cubos cuando el ratón no está sobre ellos.
 * Usaremos un gris claro.
 */
const COLOR_GRIS_BASE = 0xaaaaaa; // Gris claro estático

/**
 * Genera un valor hexadecimal (base 16) de 24 bits (0xRRGGBB) para un color.
 * Este color se usará ÚNICAMENTE durante la interacción (hover).
 * @returns {number} Un número que representa un color RGB aleatorio.
 */
function getRandomHexColor(): number {
    // Genera un número entero aleatorio entre 0 y 0xFFFFFF (16777215)
    return Math.floor(Math.random() * 0xFFFFFF);
}

// ---------------------------------------------------------------------
// 🖼️ COMPONENTE RotatingCube (MODIFICADO)
// ---------------------------------------------------------------------

function RotatingCube({ position, uniqueKey }: { position: [number, number, number]; uniqueKey: number }) {
    // Referencia al objeto THREE.Mesh
    const meshRef = useRef<THREE.Mesh>(null!);
    
    // Estado para controlar el color actual del cubo. Se inicializa con el GRIS BASE.
    const [color, setColor] = useState(COLOR_GRIS_BASE); 
    
    // Define el tamaño del cubo
    const cubeSize = 1;
    
    // Hook que se ejecuta en cada frame para animar la rotación
    useFrame((_state, delta) => {
        // Verificamos si la referencia está disponible
        if (meshRef.current) {
            // Incrementa la rotación en el eje X
            meshRef.current.rotation.x += delta * 0.5;
            // Incrementa la rotación en el eje Y
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    // Función que se dispara cuando el ratón ENTRA en la geometría 3D
    const handlePointerOver = useCallback(() => {
        // Genera un color totalmente nuevo y aleatorio para la interacción
        const newInteractiveColor = getRandomHexColor();
        // Cambia el estado del color al nuevo color aleatorio
        setColor(newInteractiveColor); 
    }, []); // Ya no necesitamos 'uniqueKey' en las dependencias

    // Función que se dispara cuando el ratón SALE de la geometría 3D
    const handlePointerOut = useCallback(() => {
        // Restaura el estado del color al GRIS BASE
        setColor(COLOR_GRIS_BASE); 
    }, []);

    return (
        // Agrupación principal del cubo con su posición y key única
        <group 
            position={position} 
            key={uniqueKey}
            // Listener para cuando el puntero entra (cambia a color aleatorio)
            onPointerOver={handlePointerOver} 
            // Listener para cuando el puntero sale (restaura color GRIS BASE)
            onPointerOut={handlePointerOut} 
        >
            {/* El elemento mesh que representa la geometría */}
            <mesh ref={meshRef}>
                {/* Geometría de caja con dimensiones [1, 1, 1] */}
                <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
                {/* Material físico con efectos de vidrio/refracción */}
                <meshPhysicalMaterial
                    // Usa el color del estado (gris base o color aleatorio)
                    color={color} 
                    transparent={true} // Habilita la transparencia
                    opacity={0.28} // Nivel de transparencia
                    transmission={1.0} // Permite que la luz pase a través (efecto vidrio)
                    roughness={0.07} // Define la rugosidad de la superficie
                    metalness={0} // No metálico
                    ior={1.4} // Índice de refracción
                    thickness={1.1} // Grosor simulado para la refracción
                />
            </mesh>
        </group>
    );
}

// ---------------------------------------------------------------------
// 🖼️ COMPONENTE PRINCIPAL BackgroundScene (COMPLETO)
// ---------------------------------------------------------------------

// Componente principal de la escena de fondo
export default function BackgroundScene() {
    // Extrae objetos y métodos de la librería @react-three/fiber
    const { gl, viewport, camera } = useThree();

    // Efecto que se ejecuta una vez para establecer el color de fondo de la escena
    useEffect(() => {
        gl.setClearColor('#e0f4fc'); // Establece un color de fondo azul claro
    }, [gl]);

    // Referencias para el control de arrastre del mouse (se mantienen igual)
    const isDragging = useRef(false); // Bandera para saber si el ratón está presionado
    const lastY = useRef(0); // Última posición 'Y' conocida del puntero
    const cameraY = useRef(0); // Posición 'Y' objetivo de la cámara
    const cameraSmoothing = 0.02; // Velocidad de arrastre, factor de sensibilidad

    // Callback memoizado para el evento 'pointerdown' (ratón/táctil presionado)
    const onPointerDown = useCallback((event: PointerEvent) => {
        isDragging.current = true; // Empieza el arrastre
        lastY.current = event.clientY; // Guarda la posición inicial
    }, []);

    // Callback memoizado para el evento 'pointerup' (ratón/táctil liberado)
    const onPointerUp = useCallback(() => {
        isDragging.current = false; // Detiene el arrastre
    }, []);

    // Callback memoizado para el evento 'pointermove' (ratón/táctil moviéndose)
    const onPointerMove = useCallback((event: PointerEvent) => {
        // Solo ejecuta si estamos arrastrando
        if (isDragging.current) {
            // Calcula el desplazamiento vertical (delta Y)
            const dy = event.clientY - lastY.current; 
            // Acumula el cambio a la posición objetivo de la cámara, aplicando suavizado
            cameraY.current += dy * cameraSmoothing; 
            // Actualiza la última posición conocida
            lastY.current = event.clientY; 
        }
    }, [cameraSmoothing]); 

    // Efecto para adjuntar y limpiar los event listeners del DOM
    useEffect(() => {
        const el = gl.domElement; // El elemento canvas de Three.js
        // Adjunta el evento de presionar al canvas
        el.addEventListener('pointerdown', onPointerDown); 
        // Adjunta el evento de soltar al objeto window (para capturar si se suelta fuera del canvas)
        window.addEventListener('pointerup', onPointerUp); 
        // Adjunta el evento de mover al objeto window
        window.addEventListener('pointermove', onPointerMove); 
        
        // Función de limpieza: se ejecuta al desmontar el componente
        return () => {
            el.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [gl, onPointerDown, onPointerUp, onPointerMove]); // Dependencias del efecto

    // Hook que se ejecuta en cada frame para actualizar la cámara (la animación real)
    useFrame(() => {
        // Mueve la cámara suavemente hacia la posición objetivo (cameraY.current)
        // Esto crea un efecto de inercia o "smoothness"
        camera.position.y += (cameraY.current - camera.position.y) * 0.1; 
    });

    // Configuración de dimensiones de los cubos (se mantienen igual)
    const cubeSize = 1; // Tamaño de cada cubo
    const spacing = 0.8; // Espacio entre cubos
    const totalCubeSize = cubeSize + spacing; // Dimensión total de la celda de la grilla
    const depth = -3; // Profundidad (eje Z) donde se dibujan los cubos

    // Memo que calcula la grilla base de cubos (solo calcula índices)
    const cubeGrid = useMemo(() => {
        const visibleWorldWidth = viewport.width; // Ancho visible de la escena
        const visibleWorldHeight = viewport.height; // Alto visible de la escena

        // Calculamos el número de cubos necesarios para cubrir la vista más un margen
        const numberOfCubesX = Math.ceil(visibleWorldWidth / totalCubeSize) + 4;
        const numberOfCubesY = Math.ceil(visibleWorldHeight / totalCubeSize) + 6;

        const cubesArray = []; // Array para almacenar los índices
        let keyCounter = 0; // Contador para la key única

        // Generamos los índices de la grilla (ix, iy)
        for (let ix = 0; ix < numberOfCubesX; ix++) {
            for (let iy = 0; iy < numberOfCubesY; iy++) {
                // Filtro para crear un patrón de tablero de ajedrez (solo cubos en posiciones pares)
                if ((ix + iy) % 2 === 0) { 
                    // Almacena el índice X, el índice Y y una key única
                    cubesArray.push([ix, iy, keyCounter++]); 
                }
            }
        }
        // Devuelve el array de índices y las dimensiones de la grilla
        return { cubesArray, numberOfCubesX, numberOfCubesY }; 
    }, [viewport.width, viewport.height, totalCubeSize]); // Dependencias: ancho/alto de la vista y tamaño de la celda

    // Memo que mapea la grilla base a componentes RotatingCube con posiciones alineadas
    const cubes = useMemo(() => {
        const { cubesArray, numberOfCubesX, numberOfCubesY } = cubeGrid; // Extrae los datos de la grilla
        
        // 1. Calcular el punto inicial de la grilla (offset estático para centrado)
        // Coordenada X del primer cubo (centrado en el eje horizontal)
        const startX_centered = -(numberOfCubesX * totalCubeSize) / 2 + totalCubeSize / 2; 
        // Coordenada Y del primer cubo (centrado en el eje vertical)
        const startY_centered = -(numberOfCubesY * totalCubeSize) / 2 + totalCubeSize / 2; 
        
        // 2. Calcular el punto de reinicio (wrapping offset)
        // Mantiene el patrón fijo respecto a la cámara creando el efecto de "bucle infinito"
        const wrapX = (camera.position.x % totalCubeSize) - totalCubeSize; 
        const wrapY = (camera.position.y % totalCubeSize) - totalCubeSize;

        // Mapea cada índice [ix, iy, k] a un componente RotatingCube
        return cubesArray.map(([ix, iy, k]) => {
            
            // La posición final X es la suma del inicio, el índice de grilla y el offset de wrap
            const finalX = startX_centered + (ix * totalCubeSize) + wrapX; 
            // La posición final Y es la suma del inicio, el índice de grilla y el offset de wrap
            const finalY = startY_centered + (iy * totalCubeSize) + wrapY; 

            return (
                <RotatingCube
                    key={k} // Key de React
                    uniqueKey={k} // Key pasada como prop
                    position={[finalX, finalY, depth]} // Posición final del cubo en el espacio 3D
                />
            );
        });
        // Dependencias: Datos de la grilla, dimensiones, profundidad y posición de la cámara
    }, [cubeGrid, totalCubeSize, depth, viewport, camera.position.x, camera.position.y]);

    // Retorna el JSX de toda la escena
    return (
        <>
            {/* Luz ambiental que ilumina uniformemente la escena */}
            <ambientLight intensity={0.98} /> 
            {/* Luz direccional que simula un sol desde una posición específica */}
            <directionalLight position={[3, 8, 5]} intensity={1.0} /> 
            {/* Entorno de Drei para simular reflejos y luz (preset="sunset") */}
            <Environment preset="sunset" background={false} /> 
            {/* Renderiza el array de cubos generados */}
            {cubes} 
        </>
    );
}
