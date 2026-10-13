import { memoryStorage } from "../storage/storage.js";
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
} from "../types/index.js";

export class PortfolioService {
  // ── BOOTSTRAP ─────────────────────────────────────────────────────
  public getBootstrap(): PortfolioDataset {
    return memoryStorage.getData();
  }

  public resetAll(): void {
    memoryStorage.reset();
  }

  // ── HERO ──────────────────────────────────────────────────────────
  public getHero(): HeroData {
    return memoryStorage.getData().hero;
  }

  public updateHero(hero: HeroData): HeroData {
    const data = memoryStorage.getData();
    data.hero = hero;
    memoryStorage.setData(data);
    return data.hero;
  }

  // ── EXPERTISE ─────────────────────────────────────────────────────
  public getExpertise(): ExpertiseSectionData {
    return memoryStorage.getData().expertise;
  }

  public updateExpertise(expertise: ExpertiseSectionData): ExpertiseSectionData {
    const data = memoryStorage.getData();
    data.expertise = expertise;
    memoryStorage.setData(data);
    return data.expertise;
  }

  // ── PROJECTS ──────────────────────────────────────────────────────
  public getProjects(): ProjectItem[] {
    return [...memoryStorage.getData().projects].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  public getProjectById(id: string): ProjectItem | undefined {
    return memoryStorage.getData().projects.find((p) => p.id === id);
  }

  public createProject(project: Omit<ProjectItem, "id">): ProjectItem {
    const data = memoryStorage.getData();
    const newProject: ProjectItem = {
      ...project,
      id: "proj-" + Date.now(),
      displayOrder: project.displayOrder ?? data.projects.length + 1,
    };
    data.projects.push(newProject);
    memoryStorage.setData(data);
    return newProject;
  }

  public updateProject(id: string, updates: Partial<ProjectItem>): ProjectItem | null {
    const data = memoryStorage.getData();
    const idx = data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    data.projects[idx] = { ...data.projects[idx], ...updates, id };
    memoryStorage.setData(data);
    return data.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.projects.length;
    data.projects = data.projects.filter((p) => p.id !== id);
    memoryStorage.setData(data);
    return data.projects.length < initialLen;
  }

  public reorderProjects(orderedIds: string[]): ProjectItem[] {
    const data = memoryStorage.getData();
    data.projects.forEach((p) => {
      const idx = orderedIds.indexOf(p.id);
      if (idx !== -1) {
        p.displayOrder = idx + 1;
      }
    });
    memoryStorage.setData(data);
    return this.getProjects();
  }

  // ── CLIENTS ───────────────────────────────────────────────────────
  public getClients(): ClientItem[] {
    return [...memoryStorage.getData().clients].sort(
      (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    );
  }

  public createClient(client: Omit<ClientItem, "id">): ClientItem {
    const data = memoryStorage.getData();
    const newClient: ClientItem = {
      ...client,
      id: "client-" + Date.now(),
      displayOrder: client.displayOrder ?? data.clients.length + 1,
    };
    data.clients.push(newClient);
    memoryStorage.setData(data);
    return newClient;
  }

  public updateClient(id: string, updates: Partial<ClientItem>): ClientItem | null {
    const data = memoryStorage.getData();
    const idx = data.clients.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    data.clients[idx] = { ...data.clients[idx], ...updates, id };
    memoryStorage.setData(data);
    return data.clients[idx];
  }

  public deleteClient(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.clients.length;
    data.clients = data.clients.filter((c) => c.id !== id);
    memoryStorage.setData(data);
    return data.clients.length < initialLen;
  }

  public reorderClients(orderedIds: string[]): ClientItem[] {
    const data = memoryStorage.getData();
    data.clients.forEach((c) => {
      const idx = orderedIds.indexOf(c.id);
      if (idx !== -1) {
        c.displayOrder = idx + 1;
      }
    });
    memoryStorage.setData(data);
    return this.getClients();
  }

  // ── SERVICES ──────────────────────────────────────────────────────
  public getServices(): ServiceItemData[] {
    return [...memoryStorage.getData().services].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  public createService(service: Omit<ServiceItemData, "id">): ServiceItemData {
    const data = memoryStorage.getData();
    const newService: ServiceItemData = {
      ...service,
      id: "srv-" + Date.now(),
      displayOrder: service.displayOrder ?? data.services.length + 1,
    };
    data.services.push(newService);
    memoryStorage.setData(data);
    return newService;
  }

  public updateService(id: string, updates: Partial<ServiceItemData>): ServiceItemData | null {
    const data = memoryStorage.getData();
    const idx = data.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    data.services[idx] = { ...data.services[idx], ...updates, id };
    memoryStorage.setData(data);
    return data.services[idx];
  }

  public deleteService(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.services.length;
    data.services = data.services.filter((s) => s.id !== id);
    memoryStorage.setData(data);
    return data.services.length < initialLen;
  }

  // ── PROCESS ───────────────────────────────────────────────────────
  public getProcess(): ProcessStepItem[] {
    return [...memoryStorage.getData().process].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  public createProcessStep(step: Omit<ProcessStepItem, "id">): ProcessStepItem {
    const data = memoryStorage.getData();
    const newStep: ProcessStepItem = {
      ...step,
      id: "step-" + Date.now(),
      displayOrder: step.displayOrder ?? data.process.length + 1,
    };
    data.process.push(newStep);
    memoryStorage.setData(data);
    return newStep;
  }

  public updateProcessStep(id: string, updates: Partial<ProcessStepItem>): ProcessStepItem | null {
    const data = memoryStorage.getData();
    const idx = data.process.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    data.process[idx] = { ...data.process[idx], ...updates, id };
    memoryStorage.setData(data);
    return data.process[idx];
  }

  public deleteProcessStep(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.process.length;
    data.process = data.process.filter((p) => p.id !== id);
    memoryStorage.setData(data);
    return data.process.length < initialLen;
  }

  // ── ABOUT ─────────────────────────────────────────────────────────
  public getAbout(): AboutCardItem[] {
    return [...memoryStorage.getData().about].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  public updateAbout(cards: AboutCardItem[]): AboutCardItem[] {
    const data = memoryStorage.getData();
    data.about = cards;
    memoryStorage.setData(data);
    return data.about;
  }

  // ── VALUES ────────────────────────────────────────────────────────
  public getValues(): ValuePropositionItem[] {
    return [...memoryStorage.getData().values].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  public createValue(value: Omit<ValuePropositionItem, "id">): ValuePropositionItem {
    const data = memoryStorage.getData();
    const newVal: ValuePropositionItem = {
      ...value,
      id: "val-" + Date.now(),
      displayOrder: value.displayOrder ?? data.values.length + 1,
    };
    data.values.push(newVal);
    memoryStorage.setData(data);
    return newVal;
  }

  public updateValue(id: string, updates: Partial<ValuePropositionItem>): ValuePropositionItem | null {
    const data = memoryStorage.getData();
    const idx = data.values.findIndex((v) => v.id === id);
    if (idx === -1) return null;
    data.values[idx] = { ...data.values[idx], ...updates, id };
    memoryStorage.setData(data);
    return data.values[idx];
  }

  public deleteValue(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.values.length;
    data.values = data.values.filter((v) => v.id !== id);
    memoryStorage.setData(data);
    return data.values.length < initialLen;
  }

  // ── TESTIMONIALS ──────────────────────────────────────────────────
  public getTestimonials(): TestimonialItemData[] {
    return [...memoryStorage.getData().testimonials].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  public createTestimonial(t: Omit<TestimonialItemData, "id">): TestimonialItemData {
    const data = memoryStorage.getData();
    const newT: TestimonialItemData = {
      ...t,
      id: "test-" + Date.now(),
      displayOrder: t.displayOrder ?? data.testimonials.length + 1,
    };
    data.testimonials.push(newT);
    memoryStorage.setData(data);
    return newT;
  }

  public updateTestimonial(id: string, updates: Partial<TestimonialItemData>): TestimonialItemData | null {
    const data = memoryStorage.getData();
    const idx = data.testimonials.findIndex((item) => item.id === id);
    if (idx === -1) return null;
    data.testimonials[idx] = { ...data.testimonials[idx], ...updates, id };
    memoryStorage.setData(data);
    return data.testimonials[idx];
  }

  public deleteTestimonial(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.testimonials.length;
    data.testimonials = data.testimonials.filter((item) => item.id !== id);
    memoryStorage.setData(data);
    return data.testimonials.length < initialLen;
  }

  // ── INSIGHTS ──────────────────────────────────────────────────────
  public getInsights(): ArticleItemData[] {
    return [...memoryStorage.getData().insights].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  public createInsight(article: Omit<ArticleItemData, "id">): ArticleItemData {
    const data = memoryStorage.getData();
    const newA: ArticleItemData = {
      ...article,
      id: "art-" + Date.now(),
      displayOrder: article.displayOrder ?? data.insights.length + 1,
    };
    data.insights.push(newA);
    memoryStorage.setData(data);
    return newA;
  }

  public updateInsight(id: string, updates: Partial<ArticleItemData>): ArticleItemData | null {
    const data = memoryStorage.getData();
    const idx = data.insights.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    data.insights[idx] = { ...data.insights[idx], ...updates, id };
    memoryStorage.setData(data);
    return data.insights[idx];
  }

  public deleteInsight(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.insights.length;
    data.insights = data.insights.filter((a) => a.id !== id);
    memoryStorage.setData(data);
    return data.insights.length < initialLen;
  }

  // ── FAQ ───────────────────────────────────────────────────────────
  public getFaq(): FaqItemData[] {
    return [...memoryStorage.getData().faq].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  public createFaq(faq: Omit<FaqItemData, "id">): FaqItemData {
    const data = memoryStorage.getData();
    const newF: FaqItemData = {
      ...faq,
      id: "faq-" + Date.now(),
      displayOrder: faq.displayOrder ?? data.faq.length + 1,
    };
    data.faq.push(newF);
    memoryStorage.setData(data);
    return newF;
  }

  public updateFaq(id: string, updates: Partial<FaqItemData>): FaqItemData | null {
    const data = memoryStorage.getData();
    const idx = data.faq.findIndex((f) => f.id === id);
    if (idx === -1) return null;
    data.faq[idx] = { ...data.faq[idx], ...updates, id };
    memoryStorage.setData(data);
    return data.faq[idx];
  }

  public deleteFaq(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.faq.length;
    data.faq = data.faq.filter((f) => f.id !== id);
    memoryStorage.setData(data);
    return data.faq.length < initialLen;
  }

  // ── SETTINGS ──────────────────────────────────────────────────────
  public getSettings(): SiteSettingsData {
    return memoryStorage.getData().settings;
  }

  public updateSettings(settings: SiteSettingsData): SiteSettingsData {
    const data = memoryStorage.getData();
    data.settings = settings;
    memoryStorage.setData(data);
    return data.settings;
  }

  // ── SOCIALS ───────────────────────────────────────────────────────
  public getSocialLinks(): SocialLinkItem[] {
    return [...memoryStorage.getData().socialLinks].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  public createSocialLink(link: Omit<SocialLinkItem, "id">): SocialLinkItem {
    const data = memoryStorage.getData();
    const newL: SocialLinkItem = {
      ...link,
      id: "soc-" + Date.now(),
      displayOrder: link.displayOrder ?? data.socialLinks.length + 1,
    };
    data.socialLinks.push(newL);
    memoryStorage.setData(data);
    return newL;
  }

  public updateSocialLink(id: string, updates: Partial<SocialLinkItem>): SocialLinkItem | null {
    const data = memoryStorage.getData();
    const idx = data.socialLinks.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    data.socialLinks[idx] = { ...data.socialLinks[idx], ...updates, id };
    memoryStorage.setData(data);
    return data.socialLinks[idx];
  }

  public deleteSocialLink(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.socialLinks.length;
    data.socialLinks = data.socialLinks.filter((s) => s.id !== id);
    memoryStorage.setData(data);
    return data.socialLinks.length < initialLen;
  }

  // ── ENQUIRIES ─────────────────────────────────────────────────────
  public getEnquiries(): ContactEnquiry[] {
    return [...memoryStorage.getData().enquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public createEnquiry(enquiry: Omit<ContactEnquiry, "id" | "status" | "createdAt">): ContactEnquiry {
    const data = memoryStorage.getData();
    const newEnq: ContactEnquiry = {
      ...enquiry,
      id: "enq-" + Date.now(),
      status: "NEW",
      createdAt: new Date().toISOString(),
    };
    data.enquiries.unshift(newEnq);
    memoryStorage.setData(data);
    return newEnq;
  }

  public updateEnquiryStatus(
    id: string,
    status: ContactEnquiry["status"],
    notes?: string
  ): ContactEnquiry | null {
    const data = memoryStorage.getData();
    const idx = data.enquiries.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    data.enquiries[idx].status = status;
    if (notes !== undefined) {
      data.enquiries[idx].notes = notes;
    }
    memoryStorage.setData(data);
    return data.enquiries[idx];
  }

  public deleteEnquiry(id: string): boolean {
    const data = memoryStorage.getData();
    const initialLen = data.enquiries.length;
    data.enquiries = data.enquiries.filter((e) => e.id !== id);
    memoryStorage.setData(data);
    return data.enquiries.length < initialLen;
  }
}

export const portfolioService = new PortfolioService();
