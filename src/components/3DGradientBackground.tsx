import { motion } from "framer-motion";

export const ThreeDGradientBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Animated 3D gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
        style={{
          background: "linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #3b82f6 100%)",
          left: "-400px",
          top: "-400px",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #22d3ee 100%)",
          right: "-300px",
          bottom: "-300px",
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-15"
        style={{
          background: "linear-gradient(135deg, #a855f7 0%, #10b981 50%, #22d3ee 100%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* 3D Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: "perspective(1000px) rotateX(60deg) translateZ(0)",
        }}
      />
    </div>
  );
};




