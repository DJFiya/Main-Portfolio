import { useEffect, useRef } from 'react';

const FluidSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Fluid simulation parameters
    const particleCount = 100;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    
    // Color palette - using blues and purples for a cooler, more cohesive look
    const colors = [
      'hsla(230, 70%, 70%, 0.4)',  // Blue
      'hsla(250, 70%, 70%, 0.4)',  // Purple
      'hsla(210, 70%, 70%, 0.4)',  // Light blue
      'hsla(270, 70%, 70%, 0.4)',  // Violet
      'hsla(190, 70%, 70%, 0.4)',  // Teal
    ];
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 0.5 - 0.25,  // Slow initial velocity
        vy: Math.random() * 0.5 - 0.25,  // Slow initial velocity
        radius: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 150;
    let mouseActive = false;
    
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    });
    
    canvas.addEventListener('mouseleave', () => {
      mouseActive = false;
    });
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Apply mouse force if active
        if (mouseActive) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseRadius - distance) / mouseRadius;
            particle.vx += forceDirectionX * force * 0.5;
            particle.vy += forceDirectionY * force * 0.5;
          }
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // No friction, particles will keep moving indefinitely
        // Remove friction: do not modify particle.vx or particle.vy
        
        // Boundary conditions (bounce off the edges)
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1; // Reverse velocity when hitting left or right boundaries
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1; // Reverse velocity when hitting top or bottom boundaries
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Draw connections between nearby particles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-auto z-0"
    />
  );
};

export default FluidSimulation;