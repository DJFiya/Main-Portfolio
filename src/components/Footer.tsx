
import { cn } from '@/lib/utils';
import { Github, Linkedin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 sm:px-8 md:px-16 lg:px-24 bg-background/60 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#hero" className="text-xl font-display font-semibold text-white">
              <span className="text-gradient">Daevik Jain's portfolio.</span>
            </a>
            <p className="text-sm text-white/60 mt-2">
              Crafting digital experiences with passion.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {[
              { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com/DJFiya' },
              { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/daevik-jain/' },
              { name: 'Phone', icon: <Phone className="w-5 h-5" />, url: 'tel:+1234567890' },
              { name: 'Mail', icon: <Mail className="w-5 h-5" />, url: 'mailto:daevikjain@gmail.com' },
            ].map(social => (
              <a
                key={social.name}
                href={social.url}
                className="w-10 h-10 rounded-full glass-dark flex-center transition-transform hover:scale-110"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">
            © {currentYear} Daevik Jain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
