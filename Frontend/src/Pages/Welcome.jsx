import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaHeartbeat, FaPills, FaClinicMedical } from "react-icons/fa";

function MedicalIcon({ position, children }) {
  return (
    <Float rotationIntensity={1} floatIntensity={2} speed={2}>
      <Html position={position} center>
        <div className="text-white text-4xl drop-shadow-lg">{children}</div>
      </Html>
    </Float>
  );
}

function AnimatedSphere() {
  return (
    <Float floatIntensity={0.5} rotationIntensity={0.8}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#4f46e5"
          roughness={0.2}
          metalness={0.9}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 flex flex-col items-center justify-center px-6 relative overflow-hidden text-white">

      {/* 3D Canvas with animated sphere and medical icons */}
      <Canvas shadows className="w-full h-[450px] max-w-4xl mb-10">
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <AnimatedSphere />
          {/* Medical icons floating around */}
          <MedicalIcon position={[-3, 1.5, 0]}>
            <FaHeartbeat />
          </MedicalIcon>
          <MedicalIcon position={[3, 1, 2]}>
            <FaPills />
          </MedicalIcon>
          <MedicalIcon position={[-2, -1.5, -2]}>
            <FaClinicMedical />
          </MedicalIcon>
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>

      {/* Lottie animated cartoon */}
      <Player
        autoplay
        loop
        src="https://assets9.lottiefiles.com/packages/lf20_u4yrau.json"
        style={{ height: "180px", width: "180px" }}
        className="absolute top-8 right-10 hidden md:block pointer-events-none"
      />

      {/* Animated Welcome Text */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold drop-shadow-lg text-center max-w-xl"
      >
        Welcome to Your Health Predictor
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="mt-4 text-lg max-w-2xl text-center"
      >
        Personalized AI-driven health insights to help you stay ahead and live your healthiest life.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2, delay: 1 }}
        className="mt-2 italic max-w-md text-center"
      >
        "Empowering your wellness journey with technology and care."
      </motion.p>

      {/* Call to Action Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="mt-8 flex flex-col sm:flex-row gap-6 justify-center"
      >
        <button className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition flex items-center space-x-3">
          <FaClinicMedical />
          <span>Get Started</span>
        </button>
        <button className="px-8 py-3 bg-indigo-700 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-600 transition flex items-center space-x-3">
          <FaHeartbeat />
          <span>Learn More</span>
        </button>
      </motion.div>

      {/* Soft colored glowing circles in background */}
      <div className="pointer-events-none absolute top-10 left-10 bg-teal-300 rounded-full opacity-30 blur-3xl w-40 h-40"></div>
      <div className="pointer-events-none absolute bottom-20 right-20 bg-indigo-400 rounded-full opacity-20 blur-2xl w-60 h-60"></div>
    </div>
  );
}
