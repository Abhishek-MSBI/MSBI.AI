import { queries, type Query, type InsertQuery } from "@shared/schema";

export interface IStorage {
  createQuery(query: InsertQuery): Promise<Query>;
  getQuery(id: number): Promise<Query | undefined>;
  listQueries(): Promise<Query[]>;
}

export class MemStorage implements IStorage {
  private queries: Map<number, Query>;
  private currentId: number;

  constructor() {
    this.queries = new Map();
    this.currentId = 1;
  }

  async createQuery(insertQuery: InsertQuery): Promise<Query> {
    const id = this.currentId++;
    const query: Query = {
      id,
      ...insertQuery,
      answer: "",
      createdAt: new Date(),
    };
    this.queries.set(id, query);
    return query;
  }

  async getQuery(id: number): Promise<Query | undefined> {
    return this.queries.get(id);
  }

  async listQueries(): Promise<Query[]> {
    return Array.from(this.queries.values());
  }
}

export const storage = new MemStorage();
