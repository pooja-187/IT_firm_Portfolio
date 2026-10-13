export interface ClientItem {
  id: string;
  name: string;
  href?: string;
  link?: string;
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
  tags?: string[];
}

export interface ServiceItemData {
  id: string;
  serviceKey: string;
  key?: string;
  category: string;
  selectorLabel: string;
  name: string;
  iconName: string;
  icon?: string;
  image: string;
  coverImage?: string;
  description: string;
  bullets: string[];
  featureBullets?: string[];
  note?: string;
  scopeNote?: string;
  ctaText: string;
  ctaHref: string;
  ctaUrl?: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface ProcessStepItem {
  id: string;
  number: string;
  stepNumber?: string;
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

export interface AboutSectionData {
  heading?: string;
  subheading?: string;
  badge?: string;
  founderQuote?: string;
  founderRole?: string;
  mainImage?: string;
  paragraphs?: string[];
  cards: AboutCardItem[];
}

export interface TestimonialItemData {
  id: string;
  name: string;
  clientName?: string;
  role: string;
  company?: string;
  text: string;
  quote?: string;
  image: string;
  avatar?: string;
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
  excerpt?: string;
  readTime?: string;
  body?: string;
  status: "PLANNED" | "DRAFT" | "PUBLISHED";
  image: string;
  coverImage?: string;
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
  icon?: string;
  rotation: number;
  side: "left" | "right";
  displayOrder: number;
  isActive: boolean;
}

export type ExpertiseItem = ExpertisePillItem;

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
  badge?: string;
  location?: string;
  availability?: string;
  headlineHighlight?: string;
  bio?: string;
  portraitImage?: string;
}

export interface ExpertiseSectionData {
  statementLine1: string;
  statementLine2: string;
  statementLine3: string;
  pills: ExpertisePillItem[];
  badge?: string;
  heading?: string;
  statement?: string;
  items?: ExpertisePillItem[];
}

export interface SiteSettingsData {
  brandName: string;
  contactEmail: string;
  contactPhone: string;
  phone?: string;
  whatsappNumber: string;
  whatsapp?: string;
  location: string;
  availability: string;
  footerBio: string;
  copyrightText: string;
}

export type PortfolioSettings = SiteSettingsData;

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  timeline?: string;
  service: string;
  message: string;
  status: "NEW" | "CONTACTED" | "IN_DISCUSSION" | "IN DISCUSSION" | "QUALIFIED" | "CLOSED" | "ARCHIVED";
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
  whyWorkWithMe?: ValuePropositionItem[];
  testimonials: TestimonialItemData[];
  insights: ArticleItemData[];
  faq: FaqItemData[];
  socialLinks: SocialLinkItem[];
  socials?: SocialLinkItem[];
  settings: SiteSettingsData;
  enquiries: ContactEnquiry[];
}
