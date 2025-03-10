import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Software Learning App',
    description: 'An AI tool to accelerate the comp sci learning curve by over 50% by combining strong characteristics of Duolingo, ChatGPT and Leetcode.',
    image: 'https://images.unsplash.com/photo-1677212004257-103cfa6b59d0?q=80&w=2160&auto=format&fit=crop',
    tags: ['Expo', 'React-Native', 'TypeScript', 'OpenAI API', 'Judge0 API'],
    link: 'https://github.com/ArcticCodeMonkeys/PyGuide.ai'
  },
  {
    title: 'EMG Signal Interpreter Model',
    description: 'A machine learning model with 91.56% accuracy that differentiates between different hand gestures.',
    image: 'https://images.unsplash.com/photo-1641757625075-d018760a4fb5?q=80&w=2680&auto=format&fit=crop',
    tags: ['TensorFlow', 'Python', 'Pandas', 'NumPy'],
    link: 'https://github.com/Happyseaweed/BioMechDesignTeam_EMG'
  },
  {
    title: 'Diet Map',
    description: 'Developed an app to save countless hours for our users when looking for a place to eat, filtering based on location and diet.',
    image: 'https://images.unsplash.com/photo-1584931423298-c576fda54bd2?q=80&w=2670&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'JavaScript', 'Navigator API'],
    link: 'https://github.com/PeterAlpajaro/Dietary_mAPP'
  },
  {
    title: 'AI Platformer Model',
    description: 'Features an AI Model to beat an aesthetic platformer game.',
    image: 'https://images.unsplash.com/photo-1718147549470-eaab766d2c7b?q=80&w=2564&auto=format&fit=crop',
    tags: ['C++', 'PyTorch (LibTorch)', 'SFML', 'Pixel Art'],
    link: 'https://github.com/DJFiya/Droid-Drifter'
  },
  {
    title: 'Legend of Caelum',
    description: 'A rogue like tower climbing game featuring 50+ unique sprite designs and player mechanics',
    image: 'https://images.unsplash.com/photo-1683490486445-f5d98e949beb?w=700&auto=format&fit=crop',
    tags: ['Java', 'Agile', 'Swing', 'Pixel Art'],
    link: 'https://github.com/Shivank086/RPG-ISU'
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Generate the complete array for the carousel
  const renderProjects = [...projects];

  return (
    <section id="projects" ref={sectionRef} className="bg-black/30 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--secondary))_0%,transparent_70%)]"></div>
      <div className="container-custom">
        <div 
          className={cn(
            "text-center max-w-2xl mx-auto mb-16 opacity-0",
            isVisible && "animate-fade-in"
          )}
        >
          <span className="chip">Portfolio</span>
          <h2 className="section-title mt-4 text-gradient">Featured Projects</h2>
          <p className="text-white/60">
            Here are some of my recent projects that showcase my skills and expertise in web development.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 rounded-full w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Previous project"
            disabled={isAnimating}
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 rounded-full w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Next project"
            disabled={isAnimating}
          >
            <ArrowRight size={20} className="text-white" />
          </button>
          
          {/* Project carousel */}
          <div className="overflow-hidden relative">
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="flex">
                {renderProjects.map((project, index) => (
                  <div 
                    key={`${project.title}-${index}`}
                    className="w-full flex-shrink-0 neo-card overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-70"
                      />
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold mb-3 text-white">{project.title}</h3>
                      <p className="text-white/60 mb-6 text-lg">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                          <span key={`${project.title}-${tag}`} className="text-sm px-3 py-1 bg-white/10 rounded-full text-white/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={project.link} 
                        className="inline-flex items-center text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-white/90 transition-colors"
                      >
                        View Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Project indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => {
                    setIsAnimating(false);
                  }, 500);
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-white w-8" : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to project ${index + 1}`}
                disabled={isAnimating}
              >
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;