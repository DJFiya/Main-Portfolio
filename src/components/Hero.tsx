
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ExternalLink } from 'lucide-react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col justify-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(var(--secondary))_0%,transparent_50%)]"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <div 
            className={cn(
              "opacity-0",
              loaded && "animate-fade-in"
            )}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="chip">Full-Stack Developer</span>
          </div>
          
          <h1 
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight opacity-0",
              loaded && "animate-fade-in"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            Where Software<br />
            Meets Human <br /><span className="relative text-gradient">
            Needs  
              <span className="absolute bottom-2 left-0 w-full h-[0.2em] bg-white/10 rounded-full"></span>
            </span>
          </h1>
          
          <p 
            className={cn(
              "mt-6 text-lg max-w-xl text-white/60 opacity-0",
              loaded && "animate-fade-in"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            Crafting innovative, user-driven experiences with a blend of creative design and cutting-edge technology.
          </p>
          
          <div 
            className={cn(
              "mt-8 flex flex-wrap gap-4 opacity-0",
              loaded && "animate-fade-in"
            )}
            style={{ animationDelay: "0.7s" }}
          >
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <button 
          className={cn(
            "animate-float opacity-0",
            loaded && "animate-fade-in"
          )}
          style={{ animationDelay: "1s" }}
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <ArrowDown className="w-6 h-6 text-white/80" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
