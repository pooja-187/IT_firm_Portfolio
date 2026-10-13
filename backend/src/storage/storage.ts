import { PortfolioDataset } from "../types/index.js";
import { INITIAL_PORTFOLIO_DATA } from "../data/seed.js";

class MemoryStorage {
  private data: PortfolioDataset;

  constructor() {
    // Clone initial seed data
    this.data = JSON.parse(JSON.stringify(INITIAL_PORTFOLIO_DATA));
  }

  public getData(): PortfolioDataset {
    return this.data;
  }

  public setData(data: PortfolioDataset): void {
    this.data = data;
  }

  public reset(): void {
    this.data = JSON.parse(JSON.stringify(INITIAL_PORTFOLIO_DATA));
  }
}

export const memoryStorage = new MemoryStorage();
