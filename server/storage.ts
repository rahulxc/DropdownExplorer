import { users, cocktails, type User, type InsertUser, type Cocktail, type InsertCocktail } from "@shared/schema";

export interface IStorage {
  getCocktails(): Promise<Cocktail[]>;
  getCocktail(id: number): Promise<Cocktail | undefined>;
  createCocktail(cocktail: InsertCocktail): Promise<Cocktail>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cocktails: Map<number, Cocktail>;
  private userCurrentId: number;
  private cocktailCurrentId: number;

  constructor() {
    this.users = new Map();
    this.cocktails = new Map();
    this.userCurrentId = 1;
    this.cocktailCurrentId = 1;
  }

  async getCocktails(): Promise<Cocktail[]> {
    return Array.from(this.cocktails.values());
  }

  async getCocktail(id: number): Promise<Cocktail | undefined> {
    return this.cocktails.get(id);
  }

  async createCocktail(insertCocktail: InsertCocktail): Promise<Cocktail> {
    const id = this.cocktailCurrentId++;
    const cocktail: Cocktail = { ...insertCocktail, id };
    this.cocktails.set(id, cocktail);
    return cocktail;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
