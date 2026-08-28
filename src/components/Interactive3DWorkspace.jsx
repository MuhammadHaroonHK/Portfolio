import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import CodeTerminal from "./CodeTerminal";

function Laptop() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.1, 2.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Keyboard Surface Accent */}
      <mesh position={[0, 0.06, 0.2]}>
        <boxGeometry args={[2.8, 0.02, 1.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      {/* Laptop Screen Lid */}
      <group position={[0, 0.05, -1.05]} rotation={[-0.25, 0, 0]}>
        {/* Screen Frame/Backing */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[3.2, 2.1, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Display Glass / Screen Panel (Emissive dark background so it is visible) */}
        <mesh position={[0, 1.1, 0.041]}>
          <planeGeometry args={[3.0, 1.9]} />
          <meshBasicMaterial color="#020617" />
        </mesh>

        {/* Embedded Terminal Screen */}
        <Html
          transform
          wrapperClass="laptop-screen"
          distanceFactor={1.15}
          position={[0, 1.1, 0.045]}
          rotation={[0, 0, 0]}
          zIndexRange={[100, 0]}
        >
          <CodeTerminal />
        </Html>
      </group>

      {/* Screen Glow Effect onto Keyboard */}
      <pointLight position={[0, 0.8, -0.3]} intensity={2} color="#10b981" distance={2.5} />
    </group>
  );
}

export default function Interactive3DWorkspace() {
  return (
    <Canvas camera={{ position: [0, 1, 4.5], fov: 45 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
        <Laptop />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}