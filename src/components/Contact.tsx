
import { useState, useEffect, useRef, FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormState({
        name: '',
        email: '',
        message: ''
      });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-black/30 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--secondary))_0%,transparent_70%)]"></div>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              className={cn(
                "opacity-0",
                isVisible && "animate-fade-in"
              )}
            >
              <span className="chip">Contact</span>
              <h2 className="section-title mt-4 text-gradient">Get In Touch</h2>
            </div>
            
            <p 
              className={cn(
                "text-white/60 mb-6 opacity-0",
                isVisible && "animate-fade-in"
              )}
              style={{ animationDelay: "0.2s" }}
            >
              I’m currently looking for a 2025 summer internship. If you’re seeking a motivated and adaptable intern to support your team or assist with projects, I’d be happy to connect.
            </p>
            
            <div 
              className={cn(
                "space-y-4 opacity-0",
                isVisible && "animate-fade-in"
              )}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex-center mr-4">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Email</p>
                  <p className="font-medium text-white"><a href="mailto:daevikjain@gmail.com" className="hover:underline">daevikjain@gmail.com</a></p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex-center mr-4">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Location</p>
                  <p className="font-medium text-white"><a href="https://www.google.com/maps?q=University+of+Waterloo,+Ontario" className="hover:underline">
                    University of Waterloo, Ontario
                  </a></p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={cn(
              "opacity-0",
              isVisible && "animate-fade-in"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <form onSubmit={handleSubmit} className="neo-card p-8 rounded-2xl">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/80">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors text-white"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/80">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors text-white"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/80">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors resize-none text-white"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex justify-center items-center"
                  onClick={() => window.location.href = `mailto:daevikjain@gmail.com?subject=Message from ${formState.name}&body=${formState.message}`}
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : <Send className="mr-2 h-4 w-4" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
