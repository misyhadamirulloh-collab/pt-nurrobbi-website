import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';
import { SiteConfig } from '../lib/siteConfig';

interface ContactProps {
  config: SiteConfig;
}

export default function Contact({ config }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      label: 'Alamat',
      value: config.contact.address,
    },
    {
      icon: <Phone size={24} />,
      label: 'Telepon',
      value: config.contact.phone,
    },
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: config.contact.email,
    },
  ];

  const hasBackgroundImage = config.contact.backgroundImage && config.contact.backgroundImage.length > 0;

  return (
    <section 
      id="kontak" 
      className="py-24 relative"
      style={{
        backgroundColor: hasBackgroundImage ? 'transparent' : 'var(--color-accent)',
      }}
    >
      {/* Background Image */}
      {hasBackgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${config.contact.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-white/90" />
        </>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {config.contact.title}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {config.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-primary rounded-2xl p-8 text-white h-full">
              <h3
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Informasi Kontak
              </h3>

              <div className="space-y-6 mb-10">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-white/70 mb-1">{info.label}</div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${config.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition-colors"
              >
                <MessageCircle size={24} />
                Chat via WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                      placeholder="email@contoh.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                      placeholder="+62 xxx xxxx xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Pesan
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tuliskan pesan Anda..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all ${
                    submitted
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-white hover:bg-primary-light'
                  }`}
                >
                  {submitted ? (
                    'Pesan Terkirim!'
                  ) : (
                    <>
                      <Send size={20} />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
