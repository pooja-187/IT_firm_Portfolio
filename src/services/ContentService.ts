"use client";

import { storageService, STORAGE_KEYS } from "./StorageService";
import { INITIAL_PORTFOLIO_DATA } from "./seedData";
import {
  PortfolioDataset,
  HeroData,
  ExpertiseSectionData,
  ProjectItem,
  ClientItem,
  ServiceItemData,
  ProcessStepItem,
  AboutCardItem,
  ValuePropositionItem,
  TestimonialItemData,
  ArticleItemData,
  FaqItemData,
  SocialLinkItem,
  SiteSettingsData,
  ContactEnquiry,
} from "@/types/portfolio";

export class ContentService {
  // ── HERO ──────────────────────────────────────────────────────────
  public getHero(): HeroData {
    const hero = storageService.get<HeroData>(STORAGE_KEYS.HERO, INITIAL_PORTFOLIO_DATA.hero);
    if (
      !hero.headlineLine1 ||
      hero.headlineLine1.toLowerCase().includes("ceo") ||
      hero.headlineLine2 === "ui" ||
      !hero.headlineLine2
    ) {
      return {
        ...hero,
        headlineLine1: "Kerala's Best",
        headlineHighlight: "UI/UX",
        headlineLine2: "Designer",
      };
    }
    return hero;
  }

  public updateHero(hero: HeroData): boolean {
    return storageService.set(STORAGE_KEYS.HERO, hero);
  }

  // ── EXPERTISE ─────────────────────────────────────────────────────
  public getExpertise(): ExpertiseSectionData {
    return storageService.get<ExpertiseSectionData>(
      STORAGE_KEYS.EXPERTISE,
      INITIAL_PORTFOLIO_DATA.expertise
    );
  }

  public updateExpertise(expertise: ExpertiseSectionData): boolean {
    return storageService.set(STORAGE_KEYS.EXPERTISE, expertise);
  }

  // ── PROJECTS ──────────────────────────────────────────────────────
  public getProjects(onlyPublished = false): ProjectItem[] {
    const list = storageService.get<ProjectItem[]>(
      STORAGE_KEYS.PROJECTS,
      INITIAL_PORTFOLIO_DATA.projects
    );
    const sorted = [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return onlyPublished ? sorted.filter((p) => p.isPublished !== false) : sorted;
  }

  public getProjectBySlug(slug: string): ProjectItem | undefined {
    const projects = this.getProjects();
    return projects.find((p) => p.slug === slug);
  }

  public saveProject(project: ProjectItem): boolean {
    const projects = this.getProjects();
    const idx = projects.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      projects[idx] = project;
    } else {
      projects.push(project);
    }
    return storageService.set(STORAGE_KEYS.PROJECTS, projects);
  }

  public deleteProject(id: string): boolean {
    const projects = this.getProjects().filter((p) => p.id !== id);
    return storageService.set(STORAGE_KEYS.PROJECTS, projects);
  }

  public reorderProjects(orderedIds: string[]): boolean {
    const projects = this.getProjects();
    const reordered = projects.map((p) => {
      const newOrder = orderedIds.indexOf(p.id);
      return newOrder >= 0 ? { ...p, displayOrder: newOrder + 1 } : p;
    });
    return storageService.set(STORAGE_KEYS.PROJECTS, reordered);
  }

  // ── CLIENTS ───────────────────────────────────────────────────────
  public getClients(onlyPublished = false): ClientItem[] {
    const list = storageService.get<ClientItem[]>(
      STORAGE_KEYS.CLIENTS,
      INITIAL_PORTFOLIO_DATA.clients
    );
    const sorted = [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return onlyPublished ? sorted.filter((c) => c.isPublished !== false) : sorted;
  }

  public saveClient(client: ClientItem): boolean {
    const clients = this.getClients();
    const idx = clients.findIndex((c) => c.id === client.id);
    if (idx >= 0) {
      clients[idx] = client;
    } else {
      clients.push(client);
    }
    return storageService.set(STORAGE_KEYS.CLIENTS, clients);
  }

  public deleteClient(id: string): boolean {
    const clients = this.getClients().filter((c) => c.id !== id);
    return storageService.set(STORAGE_KEYS.CLIENTS, clients);
  }

  public reorderClients(orderedIds: string[]): boolean {
    const clients = this.getClients();
    const reordered = clients.map((c) => {
      const newOrder = orderedIds.indexOf(c.id);
      return newOrder >= 0 ? { ...c, displayOrder: newOrder + 1 } : c;
    });
    return storageService.set(STORAGE_KEYS.CLIENTS, reordered);
  }

  // ── SERVICES ──────────────────────────────────────────────────────
  public getServices(onlyPublished = false): ServiceItemData[] {
    const list = storageService.get<ServiceItemData[]>(
      STORAGE_KEYS.SERVICES,
      INITIAL_PORTFOLIO_DATA.services
    );
    const sorted = [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return onlyPublished ? sorted.filter((s) => s.isPublished !== false) : sorted;
  }

  public saveService(service: ServiceItemData): boolean {
    const services = this.getServices();
    const idx = services.findIndex((s) => s.id === service.id);
    if (idx >= 0) {
      services[idx] = service;
    } else {
      services.push(service);
    }
    return storageService.set(STORAGE_KEYS.SERVICES, services);
  }

  public deleteService(id: string): boolean {
    const services = this.getServices().filter((s) => s.id !== id);
    return storageService.set(STORAGE_KEYS.SERVICES, services);
  }

  // ── PROCESS ───────────────────────────────────────────────────────
  public getProcess(onlyPublished = false): ProcessStepItem[] {
    const list = storageService.get<ProcessStepItem[]>(
      STORAGE_KEYS.PROCESS,
      INITIAL_PORTFOLIO_DATA.process
    );
    const sorted = [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return onlyPublished ? sorted.filter((p) => p.isPublished !== false) : sorted;
  }

  public saveProcessStep(step: ProcessStepItem): boolean {
    const steps = this.getProcess();
    const idx = steps.findIndex((s) => s.id === step.id);
    if (idx >= 0) {
      steps[idx] = step;
    } else {
      steps.push(step);
    }
    return storageService.set(STORAGE_KEYS.PROCESS, steps);
  }

  public deleteProcessStep(id: string): boolean {
    const steps = this.getProcess().filter((s) => s.id !== id);
    return storageService.set(STORAGE_KEYS.PROCESS, steps);
  }

  // ── ABOUT ─────────────────────────────────────────────────────────
  public getAbout(): AboutCardItem[] {
    const list = storageService.get<AboutCardItem[]>(
      STORAGE_KEYS.ABOUT,
      INITIAL_PORTFOLIO_DATA.about
    );
    return [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }

  public updateAbout(cards: AboutCardItem[]): boolean {
    return storageService.set(STORAGE_KEYS.ABOUT, cards);
  }

  public saveAboutCard(card: AboutCardItem): boolean {
    const cards = this.getAbout();
    const idx = cards.findIndex((c) => c.id === card.id);
    if (idx >= 0) {
      cards[idx] = card;
    } else {
      cards.push(card);
    }
    return storageService.set(STORAGE_KEYS.ABOUT, cards);
  }

  // ── VALUES (WHY WORK WITH ME) ─────────────────────────────────────
  public getValues(onlyPublished = false): ValuePropositionItem[] {
    const list = storageService.get<ValuePropositionItem[]>(
      STORAGE_KEYS.VALUES,
      INITIAL_PORTFOLIO_DATA.values
    );
    const sorted = [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return onlyPublished ? sorted.filter((v) => v.isPublished !== false) : sorted;
  }

  public saveValue(val: ValuePropositionItem): boolean {
    const values = this.getValues();
    const idx = values.findIndex((v) => v.id === val.id);
    if (idx >= 0) {
      values[idx] = val;
    } else {
      values.push(val);
    }
    return storageService.set(STORAGE_KEYS.VALUES, values);
  }

  public deleteValue(id: string): boolean {
    const values = this.getValues().filter((v) => v.id !== id);
    return storageService.set(STORAGE_KEYS.VALUES, values);
  }

  // ── TESTIMONIALS ──────────────────────────────────────────────────
  public getTestimonials(onlyPublished = false): TestimonialItemData[] {
    const list = storageService.get<TestimonialItemData[]>(
      STORAGE_KEYS.TESTIMONIALS,
      INITIAL_PORTFOLIO_DATA.testimonials
    );
    const sorted = [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return onlyPublished ? sorted.filter((t) => t.isPublished !== false) : sorted;
  }

  public saveTestimonial(testimonial: TestimonialItemData): boolean {
    const testimonials = this.getTestimonials();
    const idx = testimonials.findIndex((t) => t.id === testimonial.id);
    if (idx >= 0) {
      testimonials[idx] = testimonial;
    } else {
      testimonials.push(testimonial);
    }
    return storageService.set(STORAGE_KEYS.TESTIMONIALS, testimonials);
  }

  public deleteTestimonial(id: string): boolean {
    const testimonials = this.getTestimonials().filter((t) => t.id !== id);
    return storageService.set(STORAGE_KEYS.TESTIMONIALS, testimonials);
  }

  // ── INSIGHTS (BLOG) ───────────────────────────────────────────────
  public getInsights(onlyPublished = false): ArticleItemData[] {
    const list = storageService.get<ArticleItemData[]>(
      STORAGE_KEYS.INSIGHTS,
      INITIAL_PORTFOLIO_DATA.insights
    );
    const sorted = [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return onlyPublished ? sorted.filter((a) => a.status !== "DRAFT") : sorted;
  }

  public saveInsight(article: ArticleItemData): boolean {
    const articles = this.getInsights();
    const idx = articles.findIndex((a) => a.id === article.id);
    if (idx >= 0) {
      articles[idx] = article;
    } else {
      articles.push(article);
    }
    return storageService.set(STORAGE_KEYS.INSIGHTS, articles);
  }

  public deleteInsight(id: string): boolean {
    const articles = this.getInsights().filter((a) => a.id !== id);
    return storageService.set(STORAGE_KEYS.INSIGHTS, articles);
  }

  // ── FAQ ───────────────────────────────────────────────────────────
  public getFaq(onlyPublished = false): FaqItemData[] {
    const list = storageService.get<FaqItemData[]>(
      STORAGE_KEYS.FAQ,
      INITIAL_PORTFOLIO_DATA.faq
    );
    const sorted = [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return onlyPublished ? sorted.filter((f) => f.isPublished !== false) : sorted;
  }

  public saveFaq(faq: FaqItemData): boolean {
    const faqs = this.getFaq();
    const idx = faqs.findIndex((f) => f.id === faq.id);
    if (idx >= 0) {
      faqs[idx] = faq;
    } else {
      faqs.push(faq);
    }
    return storageService.set(STORAGE_KEYS.FAQ, faqs);
  }

  public deleteFaq(id: string): boolean {
    const faqs = this.getFaq().filter((f) => f.id !== id);
    return storageService.set(STORAGE_KEYS.FAQ, faqs);
  }

  // ── SETTINGS & SOCIALS ────────────────────────────────────────────
  public getSettings(): SiteSettingsData {
    return storageService.get<SiteSettingsData>(
      STORAGE_KEYS.SETTINGS,
      INITIAL_PORTFOLIO_DATA.settings
    );
  }

  public updateSettings(settings: SiteSettingsData): boolean {
    return storageService.set(STORAGE_KEYS.SETTINGS, settings);
  }

  public getSocialLinks(onlyActive = false): SocialLinkItem[] {
    const list = storageService.get<SocialLinkItem[]>(
      STORAGE_KEYS.SOCIALS,
      INITIAL_PORTFOLIO_DATA.socialLinks
    );
    const sorted = [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return onlyActive ? sorted.filter((s) => s.isActive) : sorted;
  }

  public saveSocialLink(social: SocialLinkItem): boolean {
    const list = this.getSocialLinks();
    const idx = list.findIndex((s) => s.id === social.id);
    if (idx >= 0) {
      list[idx] = social;
    } else {
      list.push(social);
    }
    return storageService.set(STORAGE_KEYS.SOCIALS, list);
  }

  public deleteSocialLink(id: string): boolean {
    const list = this.getSocialLinks().filter((s) => s.id !== id);
    return storageService.set(STORAGE_KEYS.SOCIALS, list);
  }

  // ── CONTACT ENQUIRIES ─────────────────────────────────────────────
  public getEnquiries(): ContactEnquiry[] {
    const list = storageService.get<ContactEnquiry[]>(
      STORAGE_KEYS.ENQUIRIES,
      INITIAL_PORTFOLIO_DATA.enquiries
    );
    return [...list].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public submitEnquiry(
    data: Omit<ContactEnquiry, "id" | "status" | "createdAt">
  ): ContactEnquiry {
    const enquiries = this.getEnquiries();
    const newEnquiry: ContactEnquiry = {
      ...data,
      id: "enq-" + Date.now(),
      status: "NEW",
      createdAt: new Date().toISOString(),
    };
    enquiries.unshift(newEnquiry);
    storageService.set(STORAGE_KEYS.ENQUIRIES, enquiries);
    return newEnquiry;
  }

  public updateEnquiryStatus(
    id: string,
    status: ContactEnquiry["status"],
    notes?: string
  ): boolean {
    const enquiries = this.getEnquiries();
    const idx = enquiries.findIndex((e) => e.id === id);
    if (idx >= 0) {
      enquiries[idx].status = status;
      if (notes !== undefined) {
        enquiries[idx].notes = notes;
      }
      return storageService.set(STORAGE_KEYS.ENQUIRIES, enquiries);
    }
    return false;
  }

  public deleteEnquiry(id: string): boolean {
    const enquiries = this.getEnquiries().filter((e) => e.id !== id);
    return storageService.set(STORAGE_KEYS.ENQUIRIES, enquiries);
  }

  public reorderServices(orderedIds: string[]): boolean {
    const list = this.getServices();
    const reordered = list.map((item) => {
      const idx = orderedIds.indexOf(item.id);
      return idx >= 0 ? { ...item, displayOrder: idx + 1 } : item;
    });
    return storageService.set(STORAGE_KEYS.SERVICES, reordered);
  }

  public reorderProcessSteps(orderedIds: string[]): boolean {
    const list = this.getProcess();
    const reordered = list.map((item) => {
      const idx = orderedIds.indexOf(item.id);
      return idx >= 0 ? { ...item, displayOrder: idx + 1 } : item;
    });
    return storageService.set(STORAGE_KEYS.PROCESS, reordered);
  }

  public reorderValues(orderedIds: string[]): boolean {
    const list = this.getValues();
    const reordered = list.map((item) => {
      const idx = orderedIds.indexOf(item.id);
      return idx >= 0 ? { ...item, displayOrder: idx + 1 } : item;
    });
    return storageService.set(STORAGE_KEYS.VALUES, reordered);
  }

  public reorderTestimonials(orderedIds: string[]): boolean {
    const list = this.getTestimonials();
    const reordered = list.map((item) => {
      const idx = orderedIds.indexOf(item.id);
      return idx >= 0 ? { ...item, displayOrder: idx + 1 } : item;
    });
    return storageService.set(STORAGE_KEYS.TESTIMONIALS, reordered);
  }

  public reorderInsights(orderedIds: string[]): boolean {
    const list = this.getInsights();
    const reordered = list.map((item) => {
      const idx = orderedIds.indexOf(item.id);
      return idx >= 0 ? { ...item, displayOrder: idx + 1 } : item;
    });
    return storageService.set(STORAGE_KEYS.INSIGHTS, reordered);
  }

  public reorderFaq(orderedIds: string[]): boolean {
    const list = this.getFaq();
    const reordered = list.map((item) => {
      const idx = orderedIds.indexOf(item.id);
      return idx >= 0 ? { ...item, displayOrder: idx + 1 } : item;
    });
    return storageService.set(STORAGE_KEYS.FAQ, reordered);
  }

  public updateSocialLinks(links: SocialLinkItem[]): boolean {
    return storageService.set(STORAGE_KEYS.SOCIALS, links);
  }

  // ── GENERAL ───────────────────────────────────────────────────────
  public resetAll(): boolean {
    return storageService.resetToInitial();
  }

  public resetToInitial(): boolean {
    return this.resetAll();
  }

  public getAll(): PortfolioDataset {
    return storageService.getAll();
  }

  public getAllData(): PortfolioDataset {
    return this.getAll();
  }

  public subscribe<T = any>(
    keyOrCallback: string | ((key: string, data: any) => void),
    maybeCallback?: (data: T) => void
  ): () => void {
    if (typeof keyOrCallback === "string" && maybeCallback) {
      const targetKey = keyOrCallback;
      const callback = maybeCallback;
      return storageService.subscribe((k, data) => {
        if (k === targetKey || k === "ALL") {
          callback(data);
        }
      });
    } else if (typeof keyOrCallback === "function") {
      return storageService.subscribe(keyOrCallback);
    }
    return () => {};
  }
}

export const contentService = new ContentService();
