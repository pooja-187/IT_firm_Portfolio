export interface ClientItem {
  id: string;
  name: string;
  href?: string;
  isFeatured?: boolean;
  category?: string;
  displayOrder?: number;
  isPublished?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  client?: string;
  category: string;
  year?: string;
  shortDescription?: string;
  coverImage: string;
  caseStudyImage?: string;
  galleryImages?: string[];
  projectUrl?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  displayOrder: number;
}

export interface ServiceItemData {
  id: string;
  serviceKey: string;
  category: string;
  selectorLabel: string;
  name: string;
  iconName: string;
  image: string;
  description: string;
  bullets: string[];
  note?: string;
  ctaText: string;
  ctaHref: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface ProcessStepItem {
  id: string;
  number: string;
  title: string;
  description: string;
  rotation?: number;
  displayOrder: number;
  isPublished: boolean;
}

export interface ValuePropositionItem {
  id: string;
  number: string;
  title: string;
  description: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface AboutCardItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  image: string;
  displayOrder: number;
}

export interface TestimonialItemData {
  id: string;
  name: string;
  role: string;
  company?: string;
  text: string;
  image: string;
  rating?: number;
  displayOrder: number;
  isPublished: boolean;
}

export interface ArticleItemData {
  id: string;
  number: string;
  category: string;
  title: string;
  slug: string;
  description: string;
  body?: string;
  status: "PLANNED" | "DRAFT" | "PUBLISHED";
  image: string;
  publishedDate?: string;
  displayOrder: number;
}

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
}

export interface ExpertisePillItem {
  id: string;
  name: string;
  iconBg: string;
  rotation: number;
  side: "left" | "right";
  displayOrder: number;
  isActive: boolean;
}

export interface HeroData {
  name: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  locationText: string;
  availabilityText: string;
  ctaText: string;
  ctaUrl: string;
}

export interface ExpertiseSectionData {
  statementLine1: string;
  statementLine2: string;
  statementLine3: string;
  pills: ExpertisePillItem[];
}

export interface SiteSettingsData {
  brandName: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  location: string;
  availability: string;
  footerBio: string;
  copyrightText: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  timeline?: string;
  service: string;
  message: string;
  status: "NEW" | "CONTACTED" | "IN_DISCUSSION" | "QUALIFIED" | "CLOSED" | "ARCHIVED";
  createdAt: string;
  notes?: string;
}

export interface PortfolioDataset {
  hero: HeroData;
  expertise: ExpertiseSectionData;
  projects: ProjectItem[];
  clients: ClientItem[];
  services: ServiceItemData[];
  process: ProcessStepItem[];
  about: AboutCardItem[];
  values: ValuePropositionItem[];
  testimonials: TestimonialItemData[];
  insights: ArticleItemData[];
  faq: FaqItemData[];
  socialLinks: SocialLinkItem[];
  settings: SiteSettingsData;
  enquiries: ContactEnquiry[];
}
