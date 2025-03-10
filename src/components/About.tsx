
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const skills = [
  { category: "Programming Languages", skills: [{ name: "C++, Python, Java, JavaScript, TypeScript, Matlab", level: 96 }] },
  { category: "Specializations", skills: [{ name: "Game Development, Machine Learning, Web Development", level: 93 }] },
  { category: "Core Strengths", skills: [{ name: "Data Structures & Algorithms, Software Architecture", level: 87 }] },
  { category: "Technologies & Frameworks", skills: [{ name: "React, Node.js, Pandas", level: 93 }] },
  { category: "Tools & Development Environments", skills: [{ name: "Visual Studio, VSCode, Git, Eclipse", level: 90 }] }
];


const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="about" ref={sectionRef} className="bg-black/40 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--secondary))_0%,transparent_70%)]"></div>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              className={cn(
                "opacity-0",
                isVisible && "animate-fade-in"
              )}
            >
              <span className="chip">About Me</span>
              <h2 className="section-title mt-4 text-gradient">Aspiring Software Engineer Intern Versatile & Results-Driven </h2>
            </div>
            
            <p 
              className={cn(
                "text-white/60 mb-6 opacity-0",
                isVisible && "animate-fade-in"
              )}
              style={{ animationDelay: "0.2s" }}
            >
              I’m a highly motivated software engineering student with hands-on experience across diverse domains, including web development, data science, game development, and AI. My projects demonstrate my ability to quickly adapt and deliver impactful solutions—whether creating interactive web apps, designing data-driven models, or building AI-powered tools. I approach each challenge with a problem-solving mindset and a focus on innovation, ensuring that my work is not only functional but also groundbreaking.            </p>
            <p 
              className={cn(
                "text-white/60 mb-6 opacity-0",
                isVisible && "animate-fade-in"
              )}
              style={{ animationDelay: "0.3s" }}
            >
              My passion for technology drives me to continuously refine my skills and stay ahead of industry trends. I thrive in collaborative environments and am eager to contribute to real-world projects where I can make an immediate impact. With a track record of success in multiple tech areas, I’m confident I can bring value to any team, tackle complex problems, and accelerate growth.
            </p>
            
            <div 
              className={cn(
                "mt-8 opacity-0",
                isVisible && "animate-fade-in"
              )}
              style={{ animationDelay: "0.4s" }}
            >
              <a href="#contact" className="btn-primary">Get in Touch</a>
            </div>
          </div>
          
          <div 
            className={cn(
              "opacity-0",
              isVisible && "animate-fade-in"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="neo-card p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6 text-white">My Skills</h3>
              <div className="space-y-6">
                {skills.map((group, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-white mb-2">{group.category}</h4>
                    {/* Show progress bar for the main category */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: isVisible ? `${group.skills.reduce((acc, skill) => acc + skill.level, 0) / group.skills.length}%` : '0%',
                          transitionDelay: `${0.2 + index * 0.1}s`
                        }}
                      ></div>
                    </div>
                    {/* List individual skills */}
                    <ul className="text-white/60">
                      {group.skills.map((skill, skillIndex) => (
                        <li key={skillIndex}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
