import { useEffect, useRef } from "react";

export const ThreeDBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      color: string;
    }> = [];

    const colors = [
      "rgba(34, 211, 238, 0.3)", // cyan
      "rgba(168, 85, 247, 0.3)", // purple
      "rgba(59, 130, 246, 0.3)", // blue
      "rgba(16, 185, 129, 0.3)", // green
    ];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;
    let angle = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      angle += 0.002;

      particles.forEach((particle) => {
        // 3D rotation
        const x = particle.x + Math.cos(angle) * 50;
        const y = particle.y + Math.sin(angle) * 50;
        
        // Perspective
        const scale = 1 + particle.z / 1000;
        const size = particle.size * scale;

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Connect nearby particles
        particles.forEach((other) => {
          const dx = x - (other.x + Math.cos(angle) * 50);
          const dy = y - (other.y + Math.sin(angle) * 50);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(
              other.x + Math.cos(angle) * 50,
              other.y + Math.sin(angle) * 50
            );
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Update Z for 3D effect
        particle.z -= particle.speed;
        if (particle.z < 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};




