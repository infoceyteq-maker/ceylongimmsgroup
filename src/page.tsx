'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Network,
  TrendingUp,
  ShieldCheck,
  Atom,
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  Search,
  X,
  ChevronRight,
  Menu,
  Sparkles,
  Building2,
  Briefcase,
  GraduationCap,
  Award,
  Plane,
  Utensils,
  Calendar,
  Scissors,
  Coffee,
  ShoppingCart,
  Pill,
  LineChart,
  Coins,
  Compass,
  Send,
  Check,
  Layers,
  Clock,
  Share2
} from 'lucide-react';

// --- DATA STRUCTURES & DEFINITIONS ---

interface Subsidiary {
  id: string;
  name: string;
  tagline: string;
  category: 'Tech & Digital' | 'Tourism & Mobility' | 'Hospitality & Food' | 'Events & Lifestyle' | 'Finance & Education';
  locations: string[];
  description: string;
  longDescription: string;
  keyHighlights: string[];
  imageUrl: string;
  fallbackGradient: string;
  icon: React.ElementType;
  accentColor: string;
}

const SUBSIDIARIES: Subsidiary[] = [
  {
    id: 'ceyteq',
    name: 'Ceyteq',
    tagline: 'Digital Tech Solutions & High-Performance Marketing',
    category: 'Tech & Digital',
    locations: ['Sri Lanka', 'France'],
    description: 'Enterprise digital engineering, cloud architectures, and data-driven marketing systems bridging European and South Asian tech ecosystems.',
    longDescription: 'Ceyteq represents Ceylon GIMMS’ flagship digital transformation arm. Operating seamlessly between Colombo and Paris, Ceyteq delivers bespoke web architectures, enterprise automation pipelines, full-funnel digital marketing campaigns, and algorithmic conversion optimization for multinational clients.',
    keyHighlights: [
      'Dual-continent tech hub (Colombo & Paris)',
      'Custom web architectures & enterprise SaaS systems',
      'Data-driven performance marketing & SEO intelligence',
      'Cloud migration & mission-critical maintenance'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#126c1e] to-[#0a3811]',
    icon: Network,
    accentColor: '#2fd253'
  },
  {
    id: 'c-voyage',
    name: 'C-Voyage',
    tagline: 'Cross-Continental Travel, Bespoke Tourism & Logistics',
    category: 'Tourism & Mobility',
    locations: ['France', 'Sri Lanka'],
    description: 'Curated luxury expeditions, cultural heritage journeys, and bilateral travel experiences linking France and the wonders of Sri Lanka.',
    longDescription: 'C-Voyage redefines transnational travel by integrating authentic cultural immersion with European hospitality standards. From exclusive French traveler circuits across the hill country to bespoke eco-retreats along the southern coast, C-Voyage provides end-to-end concierge logistics.',
    keyHighlights: [
      'Bespoke inbound itineraries for European travelers',
      'Exclusive boutique eco-resorts & plantation access',
      'Multilingual private guides (French, English, Sinhala)',
      'Full VIP transit & luxury safari arrangements'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#0d5c1e] to-[#126c1e]',
    icon: Plane,
    accentColor: '#126c1e'
  },
  {
    id: 'tuk-tuk-malli',
    name: 'Tuk Tuk Malli',
    tagline: 'Authentic Island Mobility, Self-Drive Rentals & Tours',
    category: 'Tourism & Mobility',
    locations: ['Sri Lanka'],
    description: 'Island-wide three-wheeler rentals, licensed self-drive adventures, and curated insider city navigations across Sri Lanka.',
    longDescription: 'Tuk Tuk Malli brings freedom to travelers and locals alike through safe, verified three-wheeler leases, professional local driving permits, GPS-tracked fleet safety, and unforgettable coastal excursions that support local driver cooperatives.',
    keyHighlights: [
      'International license endorsement & driving lessons',
      'Mechanically certified, insured 200cc modern tuk-tuks',
      '24/7 island-wide roadside assistance & route support',
      'Empowerment of community micro-entrepreneurs'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#2fd253] to-[#0d5c1e]',
    icon: Compass,
    accentColor: '#2fd253'
  },
  {
    id: 'steps-kitchen',
    name: 'Steps Kitchen',
    tagline: 'Traditional Sri Lankan Culinary & Village Living',
    category: 'Hospitality & Food',
    locations: ['Sri Lanka'],
    description: 'Clay-pot gastronomy, farm-to-table heirloom spices, and immersive heritage village dining celebrating authentic Ceylon recipes.',
    longDescription: 'Steps Kitchen is an homage to Sri Lanka’s ancient agrarian cooking. Using zero artificial additives, hand-ground spices from local farmers, and slow wood-fire hearths, guests taste centuries of royal and village culinary traditions.',
    keyHighlights: [
      'Heirloom spice blends & wood-fired clay pot preparation',
      'Live village cooking masterclasses for culinary tourists',
      'Direct sourcing from local organic smallholder farmers',
      'Eco-sustainable dining with zero single-use plastics'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#126c1e] to-[#848785]',
    icon: Utensils,
    accentColor: '#a31c6d'
  },
  {
    id: 'eventra',
    name: 'Eventra',
    tagline: 'High-Impact Corporate Events & Destination Celebrations',
    category: 'Events & Lifestyle',
    locations: ['Sri Lanka'],
    description: 'Precision stagecraft, corporate summits, brand spectacles, and destination weddings executed with theatrical flair.',
    longDescription: 'Eventra operates at the intersection of creative storytelling and operational discipline. From high-level bilateral trade congresses to bespoke private gala affairs, our team handles spatial design, audiovisual engineering, talent booking, and crisis-proof schedule management.',
    keyHighlights: [
      'Turnkey conference & gala event staging',
      'State-of-the-art audiovisual & architectural lighting',
      'Celebrity artist management & cultural repertoires',
      'Precision budget governance and real-time execution'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#848785] to-[#0d5c1e]',
    icon: Calendar,
    accentColor: '#a31c6d'
  },
  {
    id: 'irish-salon',
    name: 'Irish Salon',
    tagline: 'Cosmetic Innovation, Editorial Hair & Wellness Clinics',
    category: 'Events & Lifestyle',
    locations: ['Sri Lanka'],
    description: 'Premium aesthetic cosmetology, certified organic hair care, and bespoke beauty treatments calibrated for contemporary lifestyles.',
    longDescription: 'Irish Salon combines clinical dermatology-approved cosmetic practices with high-fashion salon experiences. Catering to discerning clients, brides, and wellness seekers, Irish Salon employs internationally certified stylists and dermatologically tested organic formulations.',
    keyHighlights: [
      'Certified master stylists & bridal aesthetic packages',
      'Cruelty-free organic scalp treatments & color science',
      'Private VIP styling suites & consultation lounges',
      'Comprehensive hygiene standards & sterilised equipment'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#a31c6d] to-[#126c1e]',
    icon: Scissors,
    accentColor: '#a31c6d'
  },
  {
    id: 'doctor-house',
    name: 'Doctor House Hostel & Cafe',
    tagline: 'Vintage Coastal Hostel, Art Hub & International Social Cafe',
    category: 'Hospitality & Food',
    locations: ['Sri Lanka'],
    description: 'Colonial heritage retreat, artisan roast cafe, and bohemian gathering hub for global travelers, creatives, and digital nomads.',
    longDescription: 'Preserving the historic charm of a colonial Dutch doctor’s estate, this vintage hostel and open-air garden cafe features live acoustic sunset sessions, specialty espresso bar, shared creative workspaces, and surf-front community gatherings.',
    keyHighlights: [
      'Heritage colonial architecture & tropical garden grounds',
      'Artisanal coffee roasts, wood-fired sourdough & tapas',
      'Co-working facilities with high-speed fiber connectivity',
      'Nightly acoustic cultural sessions & nomad events'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#126c1e] to-[#0d5c1e]',
    icon: Coffee,
    accentColor: '#2fd253'
  },
  {
    id: 'osho-lk',
    name: 'Osho.lk',
    tagline: 'Direct-to-Consumer Curated Island Marketplace',
    category: 'Tech & Digital',
    locations: ['Sri Lanka'],
    description: 'High-speed e-commerce portal connecting vetted local producers, wellness goods, and consumer electronics to nationwide households.',
    longDescription: 'Osho.lk eliminates middlemen in Sri Lanka’s retail supply chain. With secure cash-on-delivery and digital payment gateways, rapid regional fulfillment, and strict quality verification for every vendor, Osho.lk powers island-wide consumer commerce.',
    keyHighlights: [
      'Verified authenticity assurance on every catalog item',
      'Automated nationwide island delivery within 24-48 hours',
      'Multi-currency checkout (LKR, EUR, USD) & mobile wallets',
      'Dedicated vendor empowerment onboarding program'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#2fd253] to-[#126c1e]',
    icon: ShoppingCart,
    accentColor: '#2fd253'
  },
  {
    id: 'medisoft',
    name: 'Medisoft',
    tagline: 'Pharma Informatics, Clinical Records & Pharmacy ERP',
    category: 'Tech & Digital',
    locations: ['Sri Lanka'],
    description: 'Compliant pharmacy management systems, prescription auditing tools, and hospital supply chain informatics software.',
    longDescription: 'Medisoft provides mission-critical enterprise software to retail pharmacies, medical clinics, and pharmaceutical distributors. Its proprietary algorithms monitor batch expiry dates, drug-interaction flags, automated reorder thresholds, and regulatory compliance.',
    keyHighlights: [
      'Real-time prescription tracking & narcotics compliance log',
      'Automated batch expiry alarms & supplier inventory reconciliation',
      'HIPAA and local ministry data privacy compliance',
      'Barcode / QR scan POS terminal with instant bill generation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#0d5c1e] to-[#848785]',
    icon: Pill,
    accentColor: '#2fd253'
  },
  {
    id: 'be-gen-solution',
    name: 'Be-Gen Solution',
    tagline: 'Enterprise Growth Consulting, Capital Structuring & SME Financing',
    category: 'Finance & Education',
    locations: ['Sri Lanka'],
    description: 'Strategic advisory, business incubation, feasibility modeling, and access to capital credit facilities for burgeoning Sri Lankan ventures.',
    longDescription: 'Be-Gen Solution mentors next-generation founders and revitalizes established enterprises. Specializing in financial auditing, business plan engineering, debt-restructuring, and strategic loan syndication, we bridge Sri Lankan SMEs with institutional capital.',
    keyHighlights: [
      'Comprehensive financial health audits & cash-flow restructuring',
      'Venture pitching decks & institutional capital facilitation',
      'Cross-border expansion roadmaps into European markets',
      'Regulatory compliance, corporate taxation & legal advisory'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#126c1e] to-[#a31c6d]',
    icon: LineChart,
    accentColor: '#126c1e'
  },
  {
    id: 'steps-crypto',
    name: 'Steps Crypto',
    tagline: 'Decentralized Finance Literacy, Web3 Analytics & Risk Governance',
    category: 'Finance & Education',
    locations: ['Sri Lanka', 'Global'],
    description: 'Empirical cryptocurrency education, blockchain analysis, algorithmic trading risk mechanics, and security self-custody masterclasses.',
    longDescription: 'Steps Crypto debunks hype by grounding digital asset management in rigorous scientific market principles. Through hands-on simulations, cold-storage security tutorials, and macro liquidity analysis, learners master responsible trading and blockchain innovation.',
    keyHighlights: [
      'Comprehensive risk-adjusted trading frameworks & backtesting',
      'Hardware wallet security, multi-sig custody & scam defense',
      'Blockchain smart-contract auditing & Web3 protocols',
      'Live weekly market teardowns led by certified market quants'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#0d5c1e] to-[#2fd253]',
    icon: Coins,
    accentColor: '#2fd253'
  },
  {
    id: 'steps-future',
    name: 'Steps Future',
    tagline: 'Grassroots Community Innovation, STEM Research & Future Foresight',
    category: 'Finance & Education',
    locations: ['Sri Lanka'],
    description: 'Next-gen scientific incubation, scholarship mentorship, environmental sustainability research, and youth digital skilling labs.',
    longDescription: 'Steps Future is the philanthropic and future-focused R&D pillar of Ceylon GIMMS. Dedicated to bridging Sri Lanka’s educational divide, it builds free community tech hubs, sponsors rural STEM talent, and runs collaborative studies on renewable island energies.',
    keyHighlights: [
      'Underprivileged student coding & robotics fellowships',
      'Island biodiversity & climate adaptation research studies',
      'Open-access community maker labs equipped with 3D printers',
      'Annual Young Innovator grant seed fund for rural innovators'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-[#126c1e] to-[#d0d0d0]',
    icon: GraduationCap,
    accentColor: '#126c1e'
  }
];

const GIMMS_PILLARS = [
  {
    letter: 'G',
    title: 'Geography',
    subtitle: 'Spatial Intelligence & Global Footprint',
    icon: Globe,
    description: 'Mapping planetary interconnectedness. Strategic positioning between the crossroads of Sri Lanka and European markets in France, harmonizing human commerce with geographical ecosystems.',
    stats: '2 Continents · Bilateral Trade Hubs'
  },
  {
    letter: 'I',
    title: 'Information',
    subtitle: 'Data Architecture & Market Intelligence',
    icon: Network,
    description: 'Transforming chaotic raw signals into structured, actionable intelligence. Enterprise software, real-time telemetry, algorithmic marketing, and verifiable knowledge networks.',
    stats: '100% Real-Time Data Pipeline'
  },
  {
    letter: 'M',
    title: 'Marketing',
    subtitle: 'Strategic Narrative & Global Reach',
    icon: TrendingUp,
    description: 'Disciplined consumer psychology, culturally resonant brand equity, and high-conversion omni-channel campaigns engineered to dominate competitive international landscapes.',
    stats: '15+ Years Advertising Excellence'
  },
  {
    letter: 'M',
    title: 'Management',
    subtitle: 'Fiduciary Governance & Agile Execution',
    icon: ShieldCheck,
    description: 'Operational rigor and prudent capital allocation. Overseeing twelve diverse corporate subsidiaries with unified ethics, accountability, and sustainable enterprise longevity.',
    stats: '12 Active Subsidiaries'
  },
  {
    letter: 'S',
    title: 'Science',
    subtitle: 'Empirical Rigor & Technological Foresight',
    icon: Atom,
    description: 'Testing hypotheses with relentless scientific scrutiny. Grounding retail, pharmaceutical tech, tourism, and community learning in verifiable laws of nature and digital mechanics.',
    stats: 'Evidence-Based Incubation'
  }
];

export default function CeylonGimmsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<Subsidiary | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subsidiary: 'General Corporate Inquiry',
    message: ''
  });

  // Founder Photo & Quality Enhancement State
  const [founderPhoto, setFounderPhoto] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ceylon_gimms_founder_photo');
      if (saved) return saved;
    }
    // High-resolution executive portrait baseline
    return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&auto=format&fit=crop&q=85';
  });
  const [photoFilterMode, setPhotoFilterMode] = useState<'enhanced' | 'crisp' | 'natural'>('enhanced');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFounderPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setFounderPhoto(result);
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('ceylon_gimms_founder_photo', result);
          } catch (err) {
            console.warn('Storage quota exceeded, photo active in session', err);
          }
        }
        setPhotoUploadSuccess(true);
        setTimeout(() => setPhotoUploadSuccess(false), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFounderPhoto(result);
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem('ceylon_gimms_founder_photo', result);
            } catch (err) {
              console.warn('Storage quota exceeded, photo active in session', err);
            }
          }
          setPhotoUploadSuccess(true);
          setTimeout(() => setPhotoUploadSuccess(false), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = ['All', 'Tech & Digital', 'Tourism & Mobility', 'Hospitality & Food', 'Events & Lifestyle', 'Finance & Education'];

  const filteredSubsidiaries = useMemo(() => {
    return SUBSIDIARIES.filter((sub) => {
      const matchesCategory = activeCategory === 'All' || sub.category === activeCategory;
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subsidiary: 'General Corporate Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#e8eae9] text-black font-sans selection:bg-[#2fd253] selection:text-black">
      {/* ========================================================================= */}
      {/* 1. HEADER (Sticky Navbar with 3D Neo-Brutalism + Glassmorphism)           */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b-2 border-black/15 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Lockup */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#126c1e]">
            <div className="relative flex flex-col justify-center">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#126c1e] border-b-2 border-[#126c1e] pb-0.5 leading-none">
                  Ceylon
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-2xl font-extrabold tracking-tighter text-black font-display leading-none">
                  GIMMS
                </span>
                <div className="w-2 h-2 rounded-full bg-[#2fd253] animate-pulse" />
              </div>
            </div>
            
            {/* Subtle vertical separator */}
            <div className="hidden sm:block h-7 w-px bg-black/15 mx-1" />
            <span className="hidden sm:inline-block text-[11px] font-medium text-black/60 max-w-[140px] leading-tight">
              Planetary Knowledge & Strategic Execution
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold tracking-wide">
            <a href="#hero" className="text-black/80 hover:text-[#126c1e] transition-colors relative py-1 hover:border-b-2 hover:border-[#126c1e]">
              Home
            </a>
            <a href="#about" className="text-black/80 hover:text-[#126c1e] transition-colors relative py-1 hover:border-b-2 hover:border-[#126c1e]">
              About & Pillars
            </a>
            <a href="#portfolio" className="text-black/80 hover:text-[#126c1e] transition-colors relative py-1 hover:border-b-2 hover:border-[#126c1e]">
              Portfolio (12)
            </a>
            <a href="#founder" className="text-black/80 hover:text-[#126c1e] transition-colors relative py-1 hover:border-b-2 hover:border-[#126c1e]">
              Founder
            </a>
            <a href="#contact" className="text-black/80 hover:text-[#126c1e] transition-colors relative py-1 hover:border-b-2 hover:border-[#126c1e]">
              Contact
            </a>
          </nav>

          {/* Desktop Right Action - 3D Green Neo-Brutalist Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-[#126c1e] border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000] hover:bg-[#0d5c1e] hover:shadow-[5px_5px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] transition-all whitespace-nowrap inline-flex items-center gap-2"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t-2 border-black bg-white/95 backdrop-blur-lg px-6 py-6 space-y-4"
            >
              <nav className="flex flex-col space-y-3 font-bold text-base">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-black/80 hover:text-[#126c1e]"
                >
                  Home
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-black/80 hover:text-[#126c1e]"
                >
                  About GIMMS Principles
                </a>
                <a
                  href="#portfolio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-black/80 hover:text-[#126c1e]"
                >
                  Subsidiaries Portfolio (12)
                </a>
                <a
                  href="#founder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-black/80 hover:text-[#126c1e]"
                >
                  Founder & Leadership
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-black/80 hover:text-[#126c1e]"
                >
                  Contact & Hotlines
                </a>
              </nav>
              <div className="pt-2 border-t border-black/10">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider text-white bg-[#126c1e] border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000] block"
                >
                  Inquire Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (3D Neo-Brutalism + Gradient Matrix + Floating Cards)    */}
      {/* ========================================================================= */}
      <section id="hero" className="relative pt-12 pb-20 md:py-24 overflow-hidden border-b-2 border-black/15">
        {/* Animated 3D background aesthetic using Tailwind gradients & organic textures */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Subtle Ash / Metallic Gradients */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#126c1e]/15 blur-3xl" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#2fd253]/15 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-[#a31c6d]/10 blur-3xl" />
          
          {/* Isometric grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline, Narrative & 3D Tactile Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-7"
            >
              {/* Category / Scope Kicker */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_0px_#000] text-xs font-bold uppercase tracking-wider text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2fd253] border border-black" />
                <span>Planetary Conglomerate · Sri Lanka & France</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-[1.08] font-display text-balance">
                Ceylon GIMMS -{' '}
                <span className="bg-gradient-to-r from-[#126c1e] via-[#0d5c1e] to-[#2fd253] bg-clip-text text-transparent">
                  Bridging Planetary Knowledge
                </span>{' '}
                and Strategic Execution.
              </h1>

              {/* Subtext */}
              <p className="text-lg sm:text-xl text-black/80 font-medium leading-relaxed max-w-2xl">
                Founded on the principles of{' '}
                <strong className="text-black font-semibold">Geography, Information, Marketing, Management, and Science</strong>. 
                Unifying 12 multidisciplinary subsidiaries into an agile corporate ecosystem.
              </p>

              {/* Dual 3D Buttons (Green + Ash/White) */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#portfolio"
                  className="px-7 py-3.5 text-sm font-extrabold tracking-wider uppercase text-white bg-[#126c1e] border-2 border-black rounded-xl shadow-[5px_5px_0px_0px_#000] hover:bg-[#0d5c1e] hover:shadow-[7px_7px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] transition-all inline-flex items-center gap-3 group"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#contact"
                  className="px-7 py-3.5 text-sm font-extrabold tracking-wider uppercase text-black bg-[#ffffff] border-2 border-black rounded-xl shadow-[5px_5px_0px_0px_#000] hover:bg-[#d0d0d0] hover:shadow-[7px_7px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] transition-all inline-flex items-center gap-2"
                >
                  <span>Contact Us</span>
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Operational Trust Markers */}
              <div className="pt-4 border-t-2 border-black/10 flex flex-wrap items-center gap-6 text-xs font-semibold text-black/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#126c1e]" />
                  <span>12 Dedicated Subsidiaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#126c1e]" />
                  <span>Cross-Border Reach (SL & France)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#126c1e]" />
                  <span>15+ Years Industry Experience</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3D Neo-Brutalism Matrix Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative">
                {/* 3D Offset Background Plate */}
                <div className="absolute inset-0 bg-[#0d5c1e] rounded-2xl translate-x-3 translate-y-3 -z-10 border-2 border-black" />
                
                {/* Main Glass Neo-Brutalist Card */}
                <div className="bg-white/85 backdrop-blur-xl border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b-2 border-black/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2fd253]/20 border-2 border-black flex items-center justify-center text-[#126c1e]">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-black font-display">GIMMS Core Matrix</h2>
                        <p className="text-xs text-black/60 font-medium">Interlocking Systems Architecture</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-black rounded-md">
                      EST. 2024
                    </span>
                  </div>

                  {/* 5-Pillar Compact Bar */}
                  <div className="grid grid-cols-5 gap-2 text-center">
                    {['G', 'I', 'M', 'M', 'S'].map((letter, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-[#2fd253]/30 transition-colors"
                      >
                        <span className="block text-lg font-black text-black font-display">{letter}</span>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-black/60 truncate">
                          {idx === 0 ? 'Geo' : idx === 1 ? 'Info' : idx === 2 ? 'Mktg' : idx === 3 ? 'Mgmt' : 'Sci'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* International Operating Hubs Showcase */}
                  <div className="space-y-3 bg-[#e8eae9]/80 border-2 border-black/20 rounded-xl p-4">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black">
                      <span>International Operations</span>
                      <span className="flex items-center gap-1 text-[#126c1e]">
                        <span className="w-2 h-2 rounded-full bg-[#2fd253] animate-ping" />
                        Live Channels
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-black/15">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#126c1e]" />
                          <span className="font-bold text-black">Colombo Headquarters</span>
                        </div>
                        <span className="text-black/60 font-mono text-[11px]">Sri Lanka Hub</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-black/15">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#a31c6d]" />
                          <span className="font-bold text-black">Paris Liaison Network</span>
                        </div>
                        <span className="text-black/60 font-mono text-[11px]">France Operations</span>
                      </div>
                    </div>
                  </div>

                  {/* Rapid Metric Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000]">
                      <div className="text-2xl font-black text-[#126c1e] font-display">12</div>
                      <div className="text-xs font-bold text-black/70">Integrated Ventures</div>
                    </div>
                    <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000]">
                      <div className="text-2xl font-black text-black font-display">100%</div>
                      <div className="text-xs font-bold text-black/70">Strategic Discipline</div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT & MISSION / VISION + 5-PILLAR GIMMS ARCHITECTURE                  */}
      {/* ========================================================================= */}
      <section id="about" className="py-20 md:py-28 bg-[#d0d0d0]/40 border-b-2 border-black/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_0px_#000] text-xs font-extrabold uppercase tracking-wider text-black">
              <span>Enterprise Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black font-display tracking-tight text-balance">
              Where Scientific Rigor Meets Market Intelligence
            </h2>
            <p className="text-base sm:text-lg text-black/75 font-medium leading-relaxed">
              At Ceylon GIMMS, enterprise longevity is not an accident. We synthesize geography, data architectures,
              strategic narratives, and scientific discipline into one unified operating model.
            </p>
          </div>

          {/* Mission & Vision (3D Floating Glass Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-black rounded-2xl translate-x-2.5 translate-y-2.5 -z-10" />
              <div className="h-full bg-white/90 backdrop-blur-md border-2 border-black rounded-2xl p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#126c1e] text-white rounded-md text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#2fd253]" />
                    <span>Our Mission</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black font-display">
                    Organizing Knowledge. Creating Enduring Value.
                  </h3>
                  <blockquote className="text-base sm:text-lg text-black/85 font-medium leading-relaxed italic border-l-4 border-[#126c1e] pl-4">
                    “To scientifically organize global information and deploy it through disciplined management and strategic marketing, creating sustainable value...”
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-bold text-black/60">
                  <span>Principle: Scientific Execution</span>
                  <span className="text-[#126c1e]">Empirical & Measured</span>
                </div>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-[#0d5c1e] rounded-2xl translate-x-2.5 translate-y-2.5 -z-10 border-2 border-black" />
              <div className="h-full bg-white/90 backdrop-blur-md border-2 border-black rounded-2xl p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a31c6d] text-white rounded-md text-xs font-bold uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5 text-white" />
                    <span>Our Vision</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black font-display">
                    Planetary Awareness in Every Decision.
                  </h3>
                  <blockquote className="text-base sm:text-lg text-black/85 font-medium leading-relaxed italic border-l-4 border-[#a31c6d] pl-4">
                    “To be a globally conscious enterprise where scientific rigor, market intelligence, and planetary awareness converge...”
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-bold text-black/60">
                  <span>Horizon: Cross-Continental Impact</span>
                  <span className="text-[#a31c6d]">Sri Lanka to the World</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* The 5-Item G.I.M.M.S Architecture Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b-2 border-black/15 pb-4">
              <div>
                <h3 className="text-2xl font-black text-black font-display">
                  The G.I.M.M.S Foundational Pillars
                </h3>
                <p className="text-xs sm:text-sm text-black/70 font-medium">
                  Five disciplined domains underpinning every subsidiary in our umbrella.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-black bg-white px-3 py-1 rounded-md border border-black/20">
                FRAMEWORK V1.0
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {GIMMS_PILLARS.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.letter + pillar.title}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="relative group bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_#000] hover:shadow-[7px_7px_0px_0px_#126c1e] transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Pillar Letter Badge */}
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-lg bg-[#e8eae9] border-2 border-black flex items-center justify-center font-display font-black text-2xl text-black shadow-[2px_2px_0px_0px_#000]">
                          {pillar.letter}
                        </div>
                        <div className="p-2 rounded-md bg-[#2fd253]/20 border border-black/15 text-[#126c1e]">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Titles */}
                      <div>
                        <h4 className="text-lg font-bold text-black font-display leading-snug">
                          {pillar.title}
                        </h4>
                        <p className="text-[11px] font-semibold text-[#126c1e] tracking-tight">
                          {pillar.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-black/75 font-normal leading-relaxed pt-1">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Footer stats */}
                    <div className="mt-4 pt-3 border-t border-black/10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-black/60 block">
                        {pillar.stats}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMPANIES PORTFOLIO (Interactive Responsive Grid - 12 Subsidiaries)     */}
      {/* ========================================================================= */}
      <section id="portfolio" className="py-20 md:py-28 bg-[#e8eae9] border-b-2 border-black/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_0px_#000] text-xs font-bold uppercase tracking-wider text-black">
                <Building2 className="w-3.5 h-3.5 text-[#126c1e]" />
                <span>Subsidiaries & Ventures</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black font-display tracking-tight">
                Corporate Portfolio
              </h2>
              <p className="text-sm sm:text-base text-black/70 font-medium">
                Twelve specialized companies engineering solutions across technology, tourism, food, retail, pharma, and future learning.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subsidiaries..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black rounded-xl text-xs font-semibold placeholder:text-black/40 shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#126c1e]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider whitespace-nowrap transition-all border-2 border-black ${
                  activeCategory === cat
                    ? 'bg-[#126c1e] text-white shadow-[3px_3px_0px_0px_#000] -translate-y-0.5'
                    : 'bg-white text-black/80 hover:bg-[#d0d0d0] shadow-[2px_2px_0px_0px_#000]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3 or 4-Column Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSubsidiaries.map((sub, index) => {
                const SubIcon = sub.icon;
                const hasImageError = imageErrorMap[sub.id];

                return (
                  <motion.div
                    key={sub.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    className="relative group bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[5px_5px_0px_0px_#000] hover:shadow-[9px_9px_0px_0px_#126c1e] hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame with Styled Fallback */}
                      <div className="relative h-44 w-full overflow-hidden bg-slate-200 border-b-2 border-black">
                        {!hasImageError ? (
                          <img
                            src={sub.imageUrl}
                            alt={sub.name}
                            referrerPolicy="no-referrer"
                            onError={() => {
                              setImageErrorMap((prev) => ({ ...prev, [sub.id]: true }));
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${sub.fallbackGradient} flex flex-col items-center justify-center p-4 text-white text-center`}>
                            <SubIcon className="w-10 h-10 mb-2 opacity-90" />
                            <span className="font-display font-extrabold text-lg">{sub.name}</span>
                            <span className="text-[10px] uppercase tracking-wider opacity-80">{sub.category}</span>
                          </div>
                        )}

                        {/* Top Overlay Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {sub.locations.map((loc) => (
                            <span
                              key={loc}
                              className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-sm text-black border border-black rounded shadow-[1.5px_1.5px_0px_0px_#000]"
                            >
                              {loc}
                            </span>
                          ))}
                        </div>

                        {/* Icon Watermark Pill */}
                        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center border border-white/60 shadow">
                          <SubIcon className="w-4 h-4 text-[#2fd253]" />
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 space-y-3">
                        <div className="space-y-1">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#126c1e]">
                            {sub.category}
                          </div>
                          <h3 className="text-xl font-black text-black font-display tracking-tight group-hover:text-[#126c1e] transition-colors">
                            {sub.name}
                          </h3>
                        </div>

                        <p className="text-xs font-semibold text-black/90 leading-tight">
                          {sub.tagline}
                        </p>

                        <p className="text-xs text-black/70 line-clamp-3 leading-relaxed">
                          {sub.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => setSelectedSubsidiary(sub)}
                        className="w-full py-2.5 px-3 bg-white border-2 border-black rounded-lg text-xs font-extrabold uppercase tracking-wider text-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#2fd253]/20 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Explore Subsidiary</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredSubsidiaries.length === 0 && (
            <div className="text-center py-16 bg-white border-2 border-black rounded-2xl shadow-[5px_5px_0px_0px_#000] p-8 max-w-md mx-auto space-y-4">
              <Search className="w-10 h-10 mx-auto text-black/40" />
              <h4 className="text-lg font-bold text-black font-display">No subsidiaries found</h4>
              <p className="text-xs text-black/60">Try adjusting your search criteria or resetting filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="px-4 py-2 bg-[#126c1e] text-white border-2 border-black rounded-lg text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#000]"
              >
                Reset Search
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FOUNDER PROFILE (Premium 3D Card for Mr. S Nilan)                       */}
      {/* ========================================================================= */}
      <section id="founder" className="py-20 md:py-28 bg-[#d0d0d0]/50 border-b-2 border-black/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative">
            {/* 3D Drop-Shadow Base */}
            <div className="absolute inset-0 bg-black rounded-3xl translate-x-3 translate-y-3 -z-10" />

            {/* Main Founder Card Container */}
            <div className="bg-white/95 backdrop-blur-xl border-2 border-black rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left: Founder Portrait Frame with HD Quality & Upload Capabilities */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handlePhotoDrop}
                    className="relative group w-full max-w-[340px]"
                  >
                    {/* 3D Offset Border Behind Portrait */}
                    <div className="absolute inset-0 bg-[#126c1e] rounded-2xl translate-x-3 translate-y-3 -z-10 border-2 border-black" />
                    
                    {/* Portrait Frame */}
                    <div className="relative aspect-[4/5] w-full rounded-2xl border-2 border-black overflow-hidden bg-slate-900 shadow-xl group">
                      <img
                        src={founderPhoto}
                        alt="Mr. S Nilan - Founder of Ceylon GIMMS"
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover object-top transition-all duration-300 ${
                          photoFilterMode === 'enhanced'
                            ? 'contrast-[1.08] brightness-[1.03] saturate-[1.05]'
                            : photoFilterMode === 'crisp'
                            ? 'contrast-[1.15] brightness-[1.01]'
                            : ''
                        }`}
                      />

                      {/* Top Action Pill for HD Zoom & Quick Upload */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setIsPhotoModalOpen(true)}
                          title="Inspect HD Portrait"
                          className="p-2 bg-white/90 backdrop-blur-md text-black border border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:bg-[#2fd253] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs"
                          aria-label="View Fullscreen"
                        >
                          <Search className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          title="Upload Custom Photo"
                          className="p-2 bg-[#126c1e] text-white border border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:bg-[#0d5c1e] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs flex items-center gap-1"
                          aria-label="Upload Photo"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Drag & Drop Prompt Overlay on Hover */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer p-4 text-center"
                      >
                        <div className="p-3 rounded-full bg-white/20 border border-white mb-2">
                          <Share2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-extrabold uppercase tracking-wider block">
                          Change / Upload Photo
                        </span>
                        <span className="text-[11px] text-white/80 block mt-0.5">
                          Click or Drop "WhatsApp Image" Here
                        </span>
                      </div>
                      
                      {/* Bottom Banner */}
                      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/85 to-transparent text-white pointer-events-none">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-[#2fd253] uppercase block font-semibold">
                              Executive Founder
                            </span>
                            <span className="text-xl font-black font-display tracking-wide">
                              Mr. S Nilan
                            </span>
                          </div>
                          <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#2fd253] text-black rounded border border-black">
                            HQ Leader
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hidden File Input for Image Upload */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFounderPhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Upload Notification Toast */}
                  {photoUploadSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 px-3 py-1.5 bg-[#2fd253]/25 border-2 border-[#126c1e] rounded-lg text-xs font-bold text-black flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-[#126c1e]" />
                      <span>HD Founder Photo updated successfully!</span>
                    </motion.div>
                  )}

                  {/* Photo Quality Tuning Bar */}
                  <div className="mt-4 w-full max-w-[340px] bg-white border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_0px_#000] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-black px-1">
                      <span className="flex items-center gap-1 text-[#126c1e]">
                        <Sparkles className="w-3 h-3" />
                        <span>Quality Mode</span>
                      </span>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] text-black/70 hover:text-[#126c1e] underline font-bold"
                      >
                        Upload Local File
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <button
                        onClick={() => setPhotoFilterMode('enhanced')}
                        className={`py-1 px-1.5 rounded-md text-[10px] font-extrabold uppercase tracking-tight border transition-all ${
                          photoFilterMode === 'enhanced'
                            ? 'bg-[#126c1e] text-white border-black shadow-[1.5px_1.5px_0px_0px_#000]'
                            : 'bg-[#e8eae9] text-black border-black/20 hover:bg-slate-200'
                        }`}
                      >
                        Studio HD
                      </button>
                      <button
                        onClick={() => setPhotoFilterMode('crisp')}
                        className={`py-1 px-1.5 rounded-md text-[10px] font-extrabold uppercase tracking-tight border transition-all ${
                          photoFilterMode === 'crisp'
                            ? 'bg-[#126c1e] text-white border-black shadow-[1.5px_1.5px_0px_0px_#000]'
                            : 'bg-[#e8eae9] text-black border-black/20 hover:bg-slate-200'
                        }`}
                      >
                        Executive
                      </button>
                      <button
                        onClick={() => setPhotoFilterMode('natural')}
                        className={`py-1 px-1.5 rounded-md text-[10px] font-extrabold uppercase tracking-tight border transition-all ${
                          photoFilterMode === 'natural'
                            ? 'bg-[#126c1e] text-white border-black shadow-[1.5px_1.5px_0px_0px_#000]'
                            : 'bg-[#e8eae9] text-black border-black/20 hover:bg-slate-200'
                        }`}
                      >
                        Natural 4K
                      </button>
                    </div>
                  </div>

                  {/* Credentials Pills */}
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    <span className="px-3 py-1 bg-white border border-black rounded-md text-[11px] font-bold text-black shadow-[2px_2px_0px_0px_#000]">
                      University of London
                    </span>
                    <span className="px-3 py-1 bg-[#2fd253]/20 border border-black rounded-md text-[11px] font-bold text-[#126c1e] shadow-[2px_2px_0px_0px_#000]">
                      Google & Meta Certified
                    </span>
                  </div>
                </div>

                {/* Right: Founder Narrative, Philosophy & Credentials */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Badge & Title */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#126c1e] text-white rounded-md text-xs font-bold uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5 text-[#2fd253]" />
                      <span>Executive Leadership</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black font-display tracking-tight">
                      Mr. S Nilan
                    </h2>
                    <p className="text-base font-semibold text-[#126c1e]">
                      Founder & Chief Executive Strategist · Ceylon GIMMS
                    </p>
                  </div>

                  {/* Required Bio Copy */}
                  <p className="text-base sm:text-lg text-black/85 leading-relaxed font-medium">
                    Founder of GIMMS. Bachelor's in IT Science and Digital Business (University of London), Google &amp; Meta certified in Digital Marketing, over 15 years of pro-level experience in Advertising, Marketing, and Management in Sri Lanka.
                  </p>

                  {/* Leadership Philosophy Quote */}
                  <div className="bg-[#e8eae9] border-2 border-black rounded-xl p-5 shadow-[3px_3px_0px_0px_#000] relative">
                    <p className="text-sm text-black/80 italic font-medium leading-relaxed">
                      “True enterprise agility emerges when scientific methods govern creative marketing, and geographical reality shapes digital systems. GIMMS was built to turn this discipline into an island-wide and cross-continental reality.”
                    </p>
                  </div>

                  {/* 4 Key Pillars of Qualification */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-[#126c1e] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-black">BSc IT Science & Digital Business</div>
                        <div className="text-[11px] text-black/60 font-medium">University of London</div>
                      </div>
                    </div>

                    <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] flex items-start gap-3">
                      <Award className="w-5 h-5 text-[#a31c6d] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-black">Google & Meta Certified</div>
                        <div className="text-[11px] text-black/60 font-medium">Digital Marketing & Growth</div>
                      </div>
                    </div>

                    <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-[#126c1e] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-black">15+ Years Pro Mastery</div>
                        <div className="text-[11px] text-black/60 font-medium">Advertising & Brand Management</div>
                      </div>
                    </div>

                    <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] flex items-start gap-3">
                      <Globe className="w-5 h-5 text-[#2fd253] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-black">Transnational Visionary</div>
                        <div className="text-[11px] text-black/60 font-medium">Sri Lanka - France Corridor</div>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Button */}
                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="px-6 py-3 bg-[#126c1e] text-white border-2 border-black rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] hover:bg-[#0d5c1e] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact Executive Office</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FOOTER & CONTACT SECTION (Ash Background #d0d0d0 + Verified Details)   */}
      {/* ========================================================================= */}
      <footer id="contact" className="bg-[#d0d0d0] border-t-2 border-black pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Contact Section Header & Interactive Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info, Hotlines, WhatsApp & Hubs */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_0px_#000] text-xs font-bold uppercase tracking-wider text-black">
                  <span>Connect With Ceylon GIMMS</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-black font-display tracking-tight">
                  Reach Our Global Headquarters
                </h3>
                <p className="text-sm text-black/80 font-medium leading-relaxed">
                  Whether exploring joint-venture partnerships, subsidiary contracts, or strategic investments, our corporate liaison teams in Colombo and Paris respond promptly.
                </p>
              </div>

              {/* Direct Verification Contacts (Strictly matching prompt specs) */}
              <div className="space-y-3">
                
                {/* Email Card */}
                <a
                  href="mailto:ceylongimmspvtltd@gmail.com"
                  className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#126c1e] hover:-translate-y-0.5 transition-all flex items-center gap-4 block group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#126c1e] text-white flex items-center justify-center shrink-0 border border-black">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black/60 block">Official Corporate Email</span>
                    <span className="text-sm font-extrabold text-black group-hover:text-[#126c1e] transition-colors truncate block">
                      ceylongimmspvtltd@gmail.com
                    </span>
                  </div>
                </a>

                {/* Hotline Card */}
                <a
                  href="tel:+94776655493"
                  className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#126c1e] hover:-translate-y-0.5 transition-all flex items-center gap-4 block group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2fd253] text-black flex items-center justify-center shrink-0 border border-black">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black/60 block">Corporate Hotline (Sri Lanka)</span>
                    <span className="text-sm font-extrabold text-black group-hover:text-[#126c1e] transition-colors truncate block">
                      +94 77 66 55 493
                    </span>
                  </div>
                </a>

                {/* Dual WhatsApp Channels */}
                <div className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    <MessageSquare className="w-3.5 h-3.5 text-[#126c1e]" />
                    <span>Dedicated WhatsApp Direct Lines</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href="https://wa.me/94788607143"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-[#e8eae9] rounded-lg border border-black/20 hover:border-black hover:bg-[#2fd253]/20 transition-colors flex items-center gap-2 text-xs font-bold text-black"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#126c1e]" />
                      <span>SL: +94 78 86 07 143</span>
                    </a>

                    <a
                      href="https://wa.me/33744284269"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-[#e8eae9] rounded-lg border border-black/20 hover:border-black hover:bg-[#2fd253]/20 transition-colors flex items-center gap-2 text-xs font-bold text-black"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#a31c6d]" />
                      <span>FR: +33 7 44 28 42 69</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Operating Location Nodes */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white/70 border border-black/20 rounded-xl space-y-1">
                  <span className="font-extrabold text-black block">Sri Lanka Corporate HQ</span>
                  <span className="text-black/70 text-[11px] block">Colombo & Island Hubs</span>
                </div>
                <div className="p-3 bg-white/70 border border-black/20 rounded-xl space-y-1">
                  <span className="font-extrabold text-black block">France Operations</span>
                  <span className="text-black/70 text-[11px] block">Paris Strategic Corridor</span>
                </div>
              </div>

            </div>

            {/* Right: Interactive 3D Contact Form */}
            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute inset-0 bg-black rounded-2xl translate-x-2.5 translate-y-2.5 -z-10" />
                
                <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-10 space-y-6">
                  <div>
                    <h4 className="text-2xl font-black text-black font-display">
                      Send a Direct Inquiry
                    </h4>
                    <p className="text-xs sm:text-sm text-black/70 font-medium">
                      Select the respective subsidiary or submit an umbrella partnership proposal.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="p-6 bg-[#2fd253]/20 border-2 border-[#126c1e] rounded-xl text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 mx-auto text-[#126c1e]" />
                      <h5 className="text-lg font-bold text-black font-display">Inquiry Received</h5>
                      <p className="text-xs text-black/80 font-medium max-w-sm mx-auto">
                        Thank you for reaching out to Ceylon GIMMS. Our corporate liaison office has recorded your message and will respond within 24 business hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-black uppercase tracking-wider block">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Jean Dupont / Samantha Silva"
                            className="w-full px-4 py-2.5 bg-[#e8eae9] border-2 border-black rounded-xl text-xs font-semibold placeholder:text-black/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#126c1e]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-black uppercase tracking-wider block">
                            Corporate Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full px-4 py-2.5 bg-[#e8eae9] border-2 border-black rounded-xl text-xs font-semibold placeholder:text-black/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#126c1e]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-black uppercase tracking-wider block">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+94 ... / +33 ..."
                            className="w-full px-4 py-2.5 bg-[#e8eae9] border-2 border-black rounded-xl text-xs font-semibold placeholder:text-black/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#126c1e]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-black uppercase tracking-wider block">
                            Subsidiary of Interest
                          </label>
                          <select
                            value={formData.subsidiary}
                            onChange={(e) => setFormData({ ...formData, subsidiary: e.target.value })}
                            className="w-full px-4 py-2.5 bg-[#e8eae9] border-2 border-black rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#126c1e]"
                          >
                            <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                            {SUBSIDIARIES.map((s) => (
                              <option key={s.id} value={s.name}>
                                {s.name} ({s.category})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-black uppercase tracking-wider block">
                          Message / Proposal Details *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Outline your partnership scope, project requirements, or strategic proposal..."
                          className="w-full px-4 py-2.5 bg-[#e8eae9] border-2 border-black rounded-xl text-xs font-semibold placeholder:text-black/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#126c1e]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#126c1e] text-white border-2 border-black rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] hover:bg-[#0d5c1e] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Corporate Inquiry</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Lower Footer: Navigation Links & Copyright */}
          <div className="pt-12 border-t-2 border-black/15 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Brand Wordmark */}
            <div className="flex items-center gap-3">
              <span className="text-lg font-black tracking-tight text-black font-display">
                Ceylon GIMMS
              </span>
              <span className="text-xs text-black/60 font-semibold">
                (Pvt) Ltd
              </span>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-black/80">
              <a href="#hero" className="hover:text-[#126c1e] transition-colors">Home</a>
              <a href="#about" className="hover:text-[#126c1e] transition-colors">Principles</a>
              <a href="#portfolio" className="hover:text-[#126c1e] transition-colors">Subsidiaries</a>
              <a href="#founder" className="hover:text-[#126c1e] transition-colors">Founder</a>
              <a href="#contact" className="hover:text-[#126c1e] transition-colors">Contact</a>
            </div>

            {/* Fiduciary / Copyright Line */}
            <div className="text-xs text-black/60 text-center md:text-right font-medium">
              &copy; {new Date().getFullYear()} Ceylon GIMMS (Pvt) Ltd. All rights reserved.
            </div>

          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 7. SUBSIDIARY DETAIL MODAL (Rich Interactive Preview)                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedSubsidiary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubsidiary(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white border-2 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000] z-10 overflow-hidden my-8 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header Media */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900 border-b-2 border-black shrink-0">
                <img
                  src={selectedSubsidiary.imageUrl}
                  alt={selectedSubsidiary.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedSubsidiary(null)}
                  className="absolute top-4 right-4 p-2 bg-white text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:bg-[#d0d0d0] transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Title inside overlay */}
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#2fd253] text-black rounded border border-black">
                      {selectedSubsidiary.category}
                    </span>
                    {selectedSubsidiary.locations.map((loc) => (
                      <span key={loc} className="text-xs font-semibold text-white/90">
                        {loc}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-display">
                    {selectedSubsidiary.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-medium">
                    {selectedSubsidiary.tagline}
                  </p>
                </div>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#126c1e]">
                    Executive Overview
                  </h4>
                  <p className="text-sm text-black/85 leading-relaxed font-normal">
                    {selectedSubsidiary.longDescription}
                  </p>
                </div>

                {/* Key Operational Highlights */}
                <div className="space-y-3 bg-[#e8eae9] border-2 border-black/15 rounded-xl p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                    Key Strategic Highlights & Capabilities
                  </h4>
                  <ul className="space-y-2.5 text-xs text-black/85">
                    {selectedSubsidiary.keyHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#126c1e] shrink-0 mt-0.5" />
                        <span className="font-medium">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Action CTA */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-black/10">
                  <div className="text-xs font-semibold text-black/70">
                    Direct inquiries routed to: <strong className="text-black">ceylongimmspvtltd@gmail.com</strong>
                  </div>
                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        subsidiary: selectedSubsidiary.name
                      }));
                      setSelectedSubsidiary(null);
                      const contactElem = document.getElementById('contact');
                      if (contactElem) {
                        contactElem.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-5 py-2.5 bg-[#126c1e] text-white border-2 border-black rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] hover:bg-[#0d5c1e] transition-all"
                  >
                    Inquire About {selectedSubsidiary.name}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 8. FOUNDER HD PORTRAIT LIGHTBOX MODAL                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPhotoModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-xl w-full bg-white border-2 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000] z-10 overflow-hidden"
            >
              <div className="relative aspect-[4/5] w-full bg-black">
                <img
                  src={founderPhoto}
                  alt="Mr. S Nilan HD Portrait"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-top ${
                    photoFilterMode === 'enhanced'
                      ? 'contrast-[1.08] brightness-[1.03] saturate-[1.05]'
                      : photoFilterMode === 'crisp'
                      ? 'contrast-[1.15] brightness-[1.01]'
                      : ''
                  }`}
                />
                <button
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-white text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:bg-[#d0d0d0]"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-white border-t-2 border-black flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-black font-display">
                    Mr. S Nilan
                  </h4>
                  <p className="text-xs text-[#126c1e] font-semibold">
                    Founder & Chief Executive Strategist · Ceylon GIMMS
                  </p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-[#126c1e] text-white border border-black rounded-lg text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#000] hover:bg-[#0d5c1e]"
                >
                  Change Photo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
