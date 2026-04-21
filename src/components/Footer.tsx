import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { SiteConfig } from '../lib/siteConfig';

interface FooterProps {
  config: SiteConfig;
}

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook size={20} />,
  instagram: <Instagram size={20} />,
  linkedin: <Linkedin size={20} />,
};

export default function Footer({ config }: FooterProps) {
  const hasBackgroundImage = config.footer.backgroundImage && config.footer.backgroundImage.length > 0;

  return (
    <footer className="relative text-white">
      {/* Background */}
      {hasBackgroundImage ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${config.footer.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-primary-dark/90" />
        </>
      ) : (
        <div className="absolute inset-0 bg-primary-dark" />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {config.logo.text}
            </span>
            <p className="text-white/70 mt-2 text-sm">
              Membangun masa depan bersama dengan integritas dan profesionalisme.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-8">
            <a href="#beranda" className="text-white/70 hover:text-white transition-colors">
              Beranda
            </a>
            <a href="#tentang" className="text-white/70 hover:text-white transition-colors">
              Tentang
            </a>
            <a href="#layanan" className="text-white/70 hover:text-white transition-colors">
              Layanan
            </a>
            <a href="#kontak" className="text-white/70 hover:text-white transition-colors">
              Kontak
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-end gap-4">
            {config.footer.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-lg hover:bg-secondary hover:text-primary-dark transition-all"
              >
                {socialIcons[link.platform] || <Facebook size={20} />}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
          {config.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
