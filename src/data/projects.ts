export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  image: string;
  aspectRatio: 'landscape' | 'portrait';
  column: 1 | 2 | 3;
  challenge: string;
  contribution: string;
  outcome: string;
  href: string;
  tags: string[];
}

export const IMAGES_1: ProjectItem[] = [
  {
    id: 'faazo',
    number: '01',
    title: 'FAAZO',
    category: 'E-commerce · UI/UX Design · Software Development',
    year: '2024',
    tagline: 'High-conversion digital storefront & streamlined checkout ecosystem.',
    image: '/images/projects/faazo.jpg',
    aspectRatio: 'landscape',
    column: 1,
    challenge: 'Cluttered mobile checkout flow and fragmented product pages causing user drop-offs during purchase.',
    contribution: 'End-to-end UX architecture, streamlined multi-step checkout flow, modular design system, and responsive component library.',
    outcome: 'Eliminated checkout friction, elevated product visual perception, and established consistent cross-platform UI patterns.',
    href: '#faazo',
    tags: ['E-Commerce UX', 'Design System', 'Mobile First'],
  },
  {
    id: 'careva',
    number: '04',
    title: 'CAREVA',
    category: 'Healthcare · UI/UX Design · Software Development',
    year: '2024',
    tagline: 'Clinical workspace & seamless telemedicine consultation platform.',
    image: '/images/projects/careva.jpg',
    aspectRatio: 'landscape',
    column: 1,
    challenge: 'Complex diagnostic records and fragmented patient charting creating high cognitive friction for clinical teams.',
    contribution: 'Designed a modular patient dashboard, accessible color-coded diagnostic vitals, and real-time telemedicine interface.',
    outcome: 'Simplified physician navigation during live consultations and significantly improved clinical workflow clarity.',
    href: '#careva',
    tags: ['HealthTech', 'Data Visualization', 'SaaS Dashboard'],
  },
];

export const IMAGES_2: ProjectItem[] = [
  {
    id: 'travinno',
    number: '02',
    title: 'TRAVINNO',
    category: 'Travel · UI/UX Design · Digital Experience',
    year: '2024',
    tagline: 'Immersive editorial travel discovery & curated destination booking.',
    image: '/images/projects/travinno.jpg',
    aspectRatio: 'portrait',
    column: 2,
    challenge: 'Standard travel booking grids failed to evoke the luxury and bespoke emotion required for curated international journeys.',
    contribution: 'Art-directed editorial layout, immersive destination showcases, interactive itinerary planners, and seamless booking UI.',
    outcome: 'Elevated brand credibility to luxury international standards and provided users with an intuitive, inspiring booking experience.',
    href: '#travinno',
    tags: ['Art Direction', 'Editorial UI', 'Interaction Design'],
  },
  {
    id: 'mangalam',
    number: '05',
    title: 'MANGALAM TRAVEL',
    category: 'Travel · Website Design · Software Development',
    year: '2023',
    tagline: 'Luxury fleet reservation & corporate transport portal.',
    image: '/images/projects/mangalam.jpg',
    aspectRatio: 'portrait',
    column: 2,
    challenge: 'Heavy reliance on manual telephone bookings resulting in booking bottlenecks and lack of transparent vehicle selection.',
    contribution: 'Architected an automated self-service reservation platform with interactive route calculators and high-res fleet inspection.',
    outcome: 'Transferred booking volume to digital self-service with instant quotation and booking confirmations.',
    href: '#mangalam',
    tags: ['Service Design', 'Booking Portal', 'Responsive Web'],
  },
];

export const IMAGES_3: ProjectItem[] = [
  {
    id: 'manzio',
    number: '03',
    title: 'MANZIO',
    category: 'Creative Studio · UI/UX Design · Digital Experience',
    year: '2024',
    tagline: 'Minimalist brand positioning & digital creative studio showcase.',
    image: '/images/projects/manzio.jpg',
    aspectRatio: 'landscape',
    column: 3,
    challenge: 'Creating an authoritative digital presence that communicates multidisciplinary capability across engineering, design, and growth.',
    contribution: 'Designed a Swiss-inspired typographic system, dark/light tonal balance, fluid motion guidelines, and modular case study templates.',
    outcome: 'Positioned the studio as a premier digital partner and drove high-value inbound enterprise client inquiries.',
    href: '#manzio',
    tags: ['Brand Identity', 'Creative Direction', 'Web Architecture'],
  },
  {
    id: 'aura-luxe',
    number: '06',
    title: 'AURA LUXE',
    category: 'Brand · UI/UX Design · Digital Experience',
    year: '2023',
    tagline: 'Editorial high-fashion digital flagship & lookbook showcase.',
    image: '/images/projects/auraluxe.jpg',
    aspectRatio: 'landscape',
    column: 3,
    challenge: 'Translating tactile runway experiences and minimalist craftsmanship into a fast-loading digital lookbook.',
    contribution: 'Developed full-screen lookbook transitions, micro-interactions, responsive garment detail views, and high-fidelity typography.',
    outcome: 'Delivered a sophisticated digital flagship reflecting Parisian luxury fashion aesthetics.',
    href: '#aura-luxe',
    tags: ['Luxury Brand', 'Lookbook UI', 'Micro-Interactions'],
  },
];

export const allProjects: ProjectItem[] = [
  ...IMAGES_1,
  ...IMAGES_2,
  ...IMAGES_3,
];
