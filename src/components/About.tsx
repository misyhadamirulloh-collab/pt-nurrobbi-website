import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SiteConfig } from '../lib/siteConfig';

interface AboutProps {
  config: SiteConfig;
}

export default function About({ config }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const hasBackgroundImage = config.backgrounds.aboutSection && config.backgrounds.aboutSection.length > 0;

  return (
    <section 
      id="tentang" 
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
            style={{ backgroundImage: `url(${config.backgrounds.aboutSection})` }}
          />
          <div className="absolute inset-0 bg-white/90" />
        </>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={config.about.image}
                alt="Tentang PT. Nurrobbi"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-secondary rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-primary mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {config.about.title}
            </h2>
            <div className="space-y-4 text-muted leading-relaxed mb-10">
              {config.about.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {config.about.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 bg-white rounded-xl shadow-md"
                >
                  <div className="text-3xl font-bold text-secondary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
