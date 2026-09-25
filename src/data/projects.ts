export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  column: 'left' | 'center' | 'right';
  challenge: string;
  contribution: string;
  outcome: string;
  href: string;
  tags: string[];
  client: string;
  role: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 'faazo',
    number: '01',
    title: 'FAAZO',
    client: 'FAAZO Commerce',
    role: 'Lead UI/UX Designer',
    year: '2024',
    category: 'E-Commerce · Product Design · UI/UX',
    tagline: 'High-conversion digital storefront and streamlined multi-step checkout.',
    image: '/images/projects/faazo.jpg',
    aspectRatio: 'landscape',
    column: 'left',
    challenge: 'A cluttered checkout architecture and fragmented product pages were causing cart abandonment and mobile drop-offs.',
    contribution: 'Re-engineered the complete information architecture, designed a responsive design system, and created a streamlined 2-step checkout.',
    outcome: 'Eliminated ordering friction, elevated visual product perception, and established consistent component patterns.',
    href: '#faazo',
    tags: ['E-Commerce UX', 'Design System', 'Mobile First'],
  },
  {
    id: 'travinno',
    number: '02',
    title: 'TRAVINNO',
    client: 'Travinno Global',
    role: 'Art Director & UI/UX',
    year: '2024',
    category: 'Travel Experience · Web Platform',
    tagline: 'Immersive editorial travel discovery and curated destination booking.',
    image: '/images/projects/travinno.jpg',
    aspectRatio: 'portrait',
    column: 'center',
    challenge: 'Standard booking grids lacked the editorial luxury and emotional storytelling required for bespoke, high-end travel itineraries.',
    contribution: 'Crafted an art-directed layout system, cinematic destination showcases, interactive itinerary planners, and responsive booking UI.',
    outcome: 'Elevated brand credibility to luxury international standards and provided users with an intuitive, inspiring booking experience.',
    href: '#travinno',
    tags: ['Art Direction', 'Editorial UI', 'Interaction Design'],
  },
  {
    id: 'manzio',
    number: '03',
    title: 'MANZIO',
    client: 'Manzio Creative Studio',
    role: 'Founder & Design Lead',
    year: '2024',
    category: 'Studio Identity · Digital Experience',
    tagline: 'Minimalist brand positioning and digital creative studio showcase.',
    image: '/images/projects/manzio.jpg',
    aspectRatio: 'landscape',
    column: 'right',
    challenge: 'Defining an authoritative digital presence that communicates multidisciplinary capability across engineering, design, and growth.',
    contribution: 'Designed a Swiss-inspired typographic system, dark/light tonal balance, fluid GSAP motion guidelines, and modular case study templates.',
    outcome: 'Positioned the studio as a premier digital partner and drove high-value inbound enterprise inquiries.',
    href: '#manzio',
    tags: ['Brand Identity', 'Creative Direction', 'Web Architecture'],
  },
  {
    id: 'careva',
    number: '04',
    title: 'CAREVA',
    client: 'Careva HealthTech',
    role: 'Product Designer',
    year: '2024',
    category: 'HealthTech · SaaS Platform · Telemedicine',
    tagline: 'Clinical workspace and seamless patient management dashboard.',
    image: '/images/projects/careva.jpg',
    aspectRatio: 'landscape',
    column: 'left',
    challenge: 'Dense diagnostic records and cumbersome clinical tools were slowing down physician consultations.',
    contribution: 'Designed a modular patient dashboard, accessible color-coded vitals visualization, and an integrated real-time telemedicine interface.',
    outcome: 'Simplified physician navigation during consultations and significantly reduced cognitive load across patient handoffs.',
    href: '#careva',
    tags: ['SaaS Dashboard', 'Data Visualization', 'HealthTech UX'],
  },
  {
    id: 'mangalam',
    number: '05',
    title: 'MANGALAM',
    client: 'Mangalam Travels',
    role: 'UI/UX & Frontend Lead',
    year: '2023',
    category: 'Travel Service · Booking Engine',
    tagline: 'Luxury fleet reservation and corporate transport portal.',
    image: '/images/projects/mangalam.jpg',
    aspectRatio: 'portrait',
    column: 'center',
    challenge: 'Reliance on manual phone bookings resulted in booking bottlenecks and lack of transparent vehicle selection.',
    contribution: 'Architected an automated self-service reservation platform with interactive route calculators and high-res vehicle inspect views.',
    outcome: 'Transferred booking volume to digital self-service with instant quotation and booking confirmations.',
    href: '#mangalam',
    tags: ['Service Design', 'Booking Portal', 'Responsive Web'],
  },
  {
    id: 'aura-luxe',
    number: '06',
    title: 'AURA LUXE',
    client: 'Aura Atelier',
    role: 'Visual Designer',
    year: '2023',
    category: 'Luxury Fashion · Digital Flagship',
    tagline: 'Editorial high-fashion digital flagship and lookbook showcase.',
    image: '/images/projects/auraluxe.jpg',
    aspectRatio: 'landscape',
    column: 'right',
    challenge: 'Translating tactile runway experiences and minimalist craftsmanship into a fast-loading digital lookbook.',
    contribution: 'Developed full-screen lookbook transitions, micro-interactions, responsive garment detail views, and high-fidelity typography.',
    outcome: 'Delivered a sophisticated digital flagship reflecting Parisian luxury fashion aesthetics.',
    href: '#aura-luxe',
    tags: ['Luxury E-Commerce', 'Lookbook UI', 'Micro-Interactions'],
  },
];
