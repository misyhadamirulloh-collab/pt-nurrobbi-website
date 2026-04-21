export interface SiteConfig {
  logo: {
    text: string;
    imageUrl?: string;
  };
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    description: string;
    image: string;
    stats: Array<{ number: string; label: string }>;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
      image: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    backgroundImage: string;
  };
  footer: {
    copyright: string;
    socialLinks: Array<{ platform: string; url: string }>;
    backgroundImage: string;
  };
  backgrounds: {
    aboutSection: string;
    servicesSection: string;
  };
}

export const defaultConfig: SiteConfig = {
  logo: {
    text: "PT. Nurrobbi",
    imageUrl: ""
  },
  colors: {
    primary: "#1e3a5f",
    primaryLight: "#2d5a8a",
    primaryDark: "#0f2440",
    secondary: "#c9a961",
    secondaryLight: "#ddc78a"
  },
  hero: {
    title: "Membangun Masa Depan Bersama",
    subtitle: "PT. Nurrobbi adalah perusahaan terpercaya yang berkomitmen memberikan solusi terbaik untuk kebutuhan bisnis Anda dengan integritas dan profesionalisme.",
    ctaText: "Hubungi Kami",
    backgroundImage: "/images/hero-bg.jpg"
  },
  about: {
    title: "Tentang Kami",
    description: "PT. Nurrobbi didirikan dengan visi untuk menjadi mitra bisnis terpercaya yang memberikan solusi inovatif dan berkualitas tinggi. Dengan pengalaman bertahun-tahun dan tim profesional yang berdedikasi, kami berkomitmen untuk membantu klien mencapai tujuan bisnis mereka.\n\nKami percaya bahwa kesuksesan dibangun melalui kerja sama yang kuat, integritas, dan komitmen terhadap keunggulan. Setiap proyek yang kami tangani dikerjakan dengan standar tertinggi untuk memastikan kepuasan klien.",
    image: "/images/about.jpg",
    stats: [
      { number: "10+", label: "Tahun Pengalaman" },
      { number: "500+", label: "Klien Puas" },
      { number: "1000+", label: "Proyek Selesai" },
      { number: "50+", label: "Tim Profesional" }
    ]
  },
  services: {
    title: "Layanan Kami",
    subtitle: "Kami menyediakan berbagai layanan profesional untuk memenuhi kebutuhan bisnis Anda",
    items: [
      {
        title: "Konsultasi Bisnis",
        description: "Layanan konsultasi profesional untuk membantu mengembangkan strategi bisnis yang efektif dan berkelanjutan.",
        icon: "briefcase",
        image: "/images/service-1.jpg"
      },
      {
        title: "Solusi Teknologi",
        description: "Implementasi teknologi terkini untuk meningkatkan efisiensi dan produktivitas operasional bisnis Anda.",
        icon: "cpu",
        image: "/images/service-2.jpg"
      },
      {
        title: "Pengembangan Bisnis",
        description: "Strategi pengembangan bisnis yang komprehensif untuk membantu perusahaan Anda tumbuh dan berkembang.",
        icon: "trending-up",
        image: "/images/service-3.jpg"
      }
    ]
  },
  contact: {
    title: "Hubungi Kami",
    subtitle: "Kami siap membantu Anda. Jangan ragu untuk menghubungi kami.",
    address: "Jl. Contoh Alamat No. 123, Jakarta, Indonesia",
    phone: "+62 21 1234 5678",
    email: "info@nurrobbi.co.id",
    whatsapp: "6281234567890",
    backgroundImage: ""
  },
  footer: {
    copyright: "© 2024 PT. Nurrobbi. All rights reserved.",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "linkedin", url: "https://linkedin.com" }
    ],
    backgroundImage: ""
  },
  backgrounds: {
    aboutSection: "",
    servicesSection: ""
  }
};

const STORAGE_KEY = 'nurrobbi-site-config';

export function getSiteConfig(): SiteConfig {
  if (typeof window === 'undefined') return defaultConfig;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Merge with default config to ensure all fields exist
      return {
        ...defaultConfig,
        ...parsed,
        colors: { ...defaultConfig.colors, ...parsed.colors },
        hero: { ...defaultConfig.hero, ...parsed.hero },
        about: { ...defaultConfig.about, ...parsed.about },
        services: { ...defaultConfig.services, ...parsed.services },
        contact: { ...defaultConfig.contact, ...parsed.contact },
        footer: { ...defaultConfig.footer, ...parsed.footer },
        backgrounds: { ...defaultConfig.backgrounds, ...parsed.backgrounds },
      };
    } catch {
      return defaultConfig;
    }
  }
  return defaultConfig;
}

export function saveSiteConfig(config: SiteConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function resetSiteConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}
