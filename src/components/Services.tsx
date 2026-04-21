import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Cpu, TrendingUp, ArrowRight } from 'lucide-react';
import { SiteConfig } from '../lib/siteConfig';

interface ServicesProps {
  config: SiteConfig;
}

const iconMap: Record<string, React.ReactNode> = {
  briefcase: <Briefcase size={32} />,
  cpu: <Cpu size={32} />,
  'trending-up': <TrendingUp size={32} />,
};

export default function Services({ config }: ServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const hasBackgroundImage = config.backgrounds.servicesSection && config.backgrounds.servicesSection.length > 0;

  return (
    <section 
      id="layanan" 
      className="py-24 relative"
      style={{
        backgroundColor: hasBackgroundImage ? 'transparent' : '#ffffff',
      }}
    >
      {/* Background Image */}
      {hasBackgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${config.backgrounds.servicesSection})` }}
          />
          <div className="absolute inset-0 bg-white/95" />
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
            {config.services.title}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {config.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  {iconMap[service.icon] || <Briefcase size={32} />}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold text-primary mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {service.title}
                </h3>
                <p className="text-muted mb-4 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#kontak"
                  className="inline-flex items-center gap-2 text-secondary font-medium hover:gap-3 transition-all"
                >
                  Selengkapnya <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
