import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw, Upload, Palette, Type, Image, Settings, Check, Trash2, ImagePlus } from 'lucide-react';
import { SiteConfig, saveSiteConfig, resetSiteConfig, defaultConfig } from '../lib/siteConfig';

interface EditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  setConfig: (config: SiteConfig) => void;
}

type TabType = 'logo' | 'colors' | 'backgrounds' | 'hero' | 'about' | 'services' | 'contact';

export default function EditPanel({ isOpen, onClose, config, setConfig }: EditPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('logo');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadTarget, setCurrentUploadTarget] = useState<string>('');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'logo', label: 'Logo', icon: <Image size={18} /> },
    { id: 'colors', label: 'Warna', icon: <Palette size={18} /> },
    { id: 'backgrounds', label: 'Background', icon: <ImagePlus size={18} /> },
    { id: 'hero', label: 'Hero', icon: <Type size={18} /> },
    { id: 'about', label: 'Tentang', icon: <Settings size={18} /> },
    { id: 'services', label: 'Layanan', icon: <Settings size={18} /> },
    { id: 'contact', label: 'Kontak', icon: <Settings size={18} /> },
  ];

  const handleSave = () => {
    saveSiteConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan ke pengaturan default?')) {
      resetSiteConfig();
      setConfig(defaultConfig);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig(currentUploadTarget, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (target: string) => {
    setCurrentUploadTarget(target);
    fileInputRef.current?.click();
  };

  const updateConfig = (path: string, value: any) => {
    const keys = path.split('.');
    const newConfig = { ...config };
    let current: any = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setConfig(newConfig);
  };

  const ImageUploadField = ({ label, path, currentValue }: { label: string; path: string; currentValue: string }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="flex items-center gap-3">
        {currentValue && (
          <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-border">
            <img src={currentValue} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <button
          onClick={() => triggerUpload(path)}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm"
        >
          <Upload size={16} />
          {currentValue ? 'Ganti' : 'Upload'}
        </button>
        {currentValue && (
          <button
            onClick={() => updateConfig(path, '')}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Hapus"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );

  const renderLogoTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Teks Logo</label>
        <input
          type="text"
          value={config.logo.text}
          onChange={(e) => updateConfig('logo.text', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      
      <ImageUploadField 
        label="Gambar Logo" 
        path="logo.imageUrl" 
        currentValue={config.logo.imageUrl || ''} 
      />
      <p className="text-xs text-muted">Jika gambar logo diupload, teks logo akan diganti dengan gambar.</p>
    </div>
  );

  const renderColorsTab = () => (
    <div className="space-y-6">
      {[
        { key: 'primary', label: 'Warna Utama' },
        { key: 'primaryLight', label: 'Warna Utama Terang' },
        { key: 'primaryDark', label: 'Warna Utama Gelap' },
        { key: 'secondary', label: 'Warna Sekunder' },
        { key: 'secondaryLight', label: 'Warna Sekunder Terang' },
      ].map((color) => (
        <div key={color.key} className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">{color.label}</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={config.colors[color.key as keyof typeof config.colors]}
              onChange={(e) => updateConfig(`colors.${color.key}`, e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0"
            />
            <input
              type="text"
              value={config.colors[color.key as keyof typeof config.colors]}
              onChange={(e) => updateConfig(`colors.${color.key}`, e.target.value)}
              className="w-24 px-2 py-1 text-sm border border-border rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderBackgroundsTab = () => (
    <div className="space-y-6">
      <div className="p-4 bg-accent rounded-xl">
        <h3 className="font-medium text-foreground mb-4">Background Sections</h3>
        <div className="space-y-6">
          <ImageUploadField 
            label="Background Hero" 
            path="hero.backgroundImage" 
            currentValue={config.hero.backgroundImage} 
          />
          
          <ImageUploadField 
            label="Background Tentang" 
            path="backgrounds.aboutSection" 
            currentValue={config.backgrounds.aboutSection} 
          />
          
          <ImageUploadField 
            label="Background Layanan" 
            path="backgrounds.servicesSection" 
            currentValue={config.backgrounds.servicesSection} 
          />
          
          <ImageUploadField 
            label="Background Kontak" 
            path="contact.backgroundImage" 
            currentValue={config.contact.backgroundImage} 
          />
          
          <ImageUploadField 
            label="Background Footer" 
            path="footer.backgroundImage" 
            currentValue={config.footer.backgroundImage} 
          />
        </div>
      </div>
      <p className="text-xs text-muted">Upload gambar untuk mengganti background setiap section. Kosongkan untuk menggunakan warna default.</p>
    </div>
  );

  const renderHeroTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Judul</label>
        <input
          type="text"
          value={config.hero.title}
          onChange={(e) => updateConfig('hero.title', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Subtitle</label>
        <textarea
          value={config.hero.subtitle}
          onChange={(e) => updateConfig('hero.subtitle', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Teks Tombol CTA</label>
        <input
          type="text"
          value={config.hero.ctaText}
          onChange={(e) => updateConfig('hero.ctaText', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
    </div>
  );

  const renderAboutTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Judul</label>
        <input
          type="text"
          value={config.about.title}
          onChange={(e) => updateConfig('about.title', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Deskripsi</label>
        <textarea
          value={config.about.description}
          onChange={(e) => updateConfig('about.description', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none resize-none"
        />
      </div>
      
      <ImageUploadField 
        label="Gambar Tentang" 
        path="about.image" 
        currentValue={config.about.image} 
      />
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-4">Statistik</label>
        {config.about.stats.map((stat, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              value={stat.number}
              onChange={(e) => {
                const newStats = [...config.about.stats];
                newStats[index] = { ...newStats[index], number: e.target.value };
                updateConfig('about.stats', newStats);
              }}
              placeholder="Angka"
              className="w-24 px-3 py-2 border border-border rounded-lg"
            />
            <input
              type="text"
              value={stat.label}
              onChange={(e) => {
                const newStats = [...config.about.stats];
                newStats[index] = { ...newStats[index], label: e.target.value };
                updateConfig('about.stats', newStats);
              }}
              placeholder="Label"
              className="flex-1 px-3 py-2 border border-border rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderServicesTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Judul Seksi</label>
        <input
          type="text"
          value={config.services.title}
          onChange={(e) => updateConfig('services.title', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Subtitle</label>
        <input
          type="text"
          value={config.services.subtitle}
          onChange={(e) => updateConfig('services.subtitle', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-4">Layanan</label>
        {config.services.items.map((service, index) => (
          <div key={index} className="p-4 border border-border rounded-lg mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted">Layanan {index + 1}</span>
            </div>
            <input
              type="text"
              value={service.title}
              onChange={(e) => {
                const newItems = [...config.services.items];
                newItems[index] = { ...newItems[index], title: e.target.value };
                updateConfig('services.items', newItems);
              }}
              placeholder="Judul Layanan"
              className="w-full px-3 py-2 border border-border rounded-lg mb-3"
            />
            <textarea
              value={service.description}
              onChange={(e) => {
                const newItems = [...config.services.items];
                newItems[index] = { ...newItems[index], description: e.target.value };
                updateConfig('services.items', newItems);
              }}
              placeholder="Deskripsi"
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-lg resize-none mb-3"
            />
            <div className="flex items-center gap-3">
              {service.image && (
                <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-border">
                  <img src={service.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <button
                onClick={() => triggerUpload(`services.items.${index}.image`)}
                className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg hover:bg-accent transition-colors text-xs"
              >
                <Upload size={14} />
                {service.image ? 'Ganti Gambar' : 'Upload Gambar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Judul</label>
        <input
          type="text"
          value={config.contact.title}
          onChange={(e) => updateConfig('contact.title', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Subtitle</label>
        <input
          type="text"
          value={config.contact.subtitle}
          onChange={(e) => updateConfig('contact.subtitle', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Alamat</label>
        <input
          type="text"
          value={config.contact.address}
          onChange={(e) => updateConfig('contact.address', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Telepon</label>
        <input
          type="text"
          value={config.contact.phone}
          onChange={(e) => updateConfig('contact.phone', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
        <input
          type="email"
          value={config.contact.email}
          onChange={(e) => updateConfig('contact.email', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">WhatsApp (tanpa +)</label>
        <input
          type="text"
          value={config.contact.whatsapp}
          onChange={(e) => updateConfig('contact.whatsapp', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
          placeholder="6281234567890"
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'logo': return renderLogoTab();
      case 'colors': return renderColorsTab();
      case 'backgrounds': return renderBackgroundsTab();
      case 'hero': return renderHeroTab();
      case 'about': return renderAboutTab();
      case 'services': return renderServicesTab();
      case 'contact': return renderContactTab();
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Edit Website
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderTabContent()}
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-accent flex gap-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-white transition-colors"
              >
                <RotateCcw size={18} />
                Reset
              </button>
              <button
                onClick={handleSave}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  saved
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white hover:bg-primary-light'
                }`}
              >
                {saved ? (
                  <>
                    <Check size={18} />
                    Tersimpan!
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
