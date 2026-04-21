import { useState, useEffect } from 'react';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteConfig } from '../lib/siteConfig';
import { isAuthenticated, logout } from '../lib/auth';

interface NavbarProps {
  config: SiteConfig;
  onEditClick: () => void;
  onLoginClick: () => void;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Navbar({ config, onEditClick, onLoginClick, isAdmin, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#beranda', label: 'Beranda' },
    { href: '#tentang', label: 'Tentang' },
    { href: '#layanan', label: 'Layanan' },
    { href: '#kontak', label: 'Kontak' },
  ];

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-3">
            {config.logo.imageUrl ? (
              <img src={config.logo.imageUrl} alt={config.logo.text} className="h-12 w-auto" />
            ) : (
              <span
                className={`text-2xl font-bold font-heading transition-colors ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {config.logo.text}
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onEditClick}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary-dark rounded-lg font-medium text-sm hover:bg-secondary-light transition-colors"
                >
                  <Settings size={16} />
                  Edit Website
                </button>
                <button
                  onClick={handleLogout}
                  className={`p-2 rounded-lg transition-colors ${
                    isScrolled ? 'hover:bg-accent text-foreground' : 'hover:bg-white/10 text-white'
                  }`}
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-muted hover:text-foreground' : 'text-white/70 hover:text-white'
                }`}
              >
                Admin
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              
              {isAdmin ? (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onEditClick();
                    }}
                    className="w-full py-2 bg-secondary text-primary-dark rounded-lg font-medium hover:bg-secondary-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings size={16} />
                    Edit Website
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-2 border border-border rounded-lg text-muted hover:text-foreground transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLoginClick();
                  }}
                  className="w-full py-2 border border-border rounded-lg text-muted hover:text-foreground transition-colors"
                >
                  Admin Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
