import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EditPanel from './components/EditPanel';
import LoginModal from './components/LoginModal';
import { SiteConfig, getSiteConfig, defaultConfig } from './lib/siteConfig';
import { isAuthenticated } from './lib/auth';

function App() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedConfig = getSiteConfig();
    setConfig(savedConfig);
    setIsAdmin(isAuthenticated());
  }, []);

  // Apply custom colors as CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-primary-light', config.colors.primaryLight);
    root.style.setProperty('--color-primary-dark', config.colors.primaryDark);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-secondary-light', config.colors.secondaryLight);
  }, [config.colors]);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleEditClick = () => {
    if (isAdmin) {
      setIsEditPanelOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar 
        config={config} 
        onEditClick={handleEditClick}
        onLoginClick={() => setIsLoginModalOpen(true)}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <Hero config={config} />
      <About config={config} />
      <Services config={config} />
      <Contact config={config} />
      <Footer config={config} />
      
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {/* Edit Panel - Only accessible when logged in as admin */}
      {isAdmin && (
        <EditPanel
          isOpen={isEditPanelOpen}
          onClose={() => setIsEditPanelOpen(false)}
          config={config}
          setConfig={setConfig}
        />
      )}
    </div>
  );
}

export default App;
