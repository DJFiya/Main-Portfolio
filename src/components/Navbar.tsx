import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 sm:px-8 md:px-16 lg:px-24',
        scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#hero" 
          className="text-lg font-display font-semibold tracking-tight text-white"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
        >
          <span className="text-gradient">Daevik Jain's Portfolio.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['about', 'projects'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn-primary text-sm py-2"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-md z-40 pt-20 px-6 transition-transform duration-300 ease-in-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col space-y-6">
          {['about', 'projects'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-lg font-medium text-white/70 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn-primary text-center"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
