import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { insertUserSchema, insertCocktailSchema } from "@shared/schema"; // Added import for cocktail schema

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const router = express.Router();

  router.get("/api/cocktails", async (req, res) => {
    try {
      const cocktails = await storage.getCocktails();
      res.json(cocktails);
    } catch (error) {
      console.error("Error fetching cocktails:", error);
      res.status(500).json({ error: "Failed to fetch cocktails" });
    }
  });

  router.get("/api/cocktails/:id", async (req, res) => {
    try {
      const cocktailId = parseInt(req.params.id);
      const cocktail = await storage.getCocktail(cocktailId);
      if (!cocktail) {
        res.status(404).json({ error: "Cocktail not found" });
        return;
      }
      res.json(cocktail);
    } catch (error) {
      console.error("Error fetching cocktail:", error);
      res.status(500).json({ error: "Failed to fetch cocktail" });
    }
  });

  app.use(router); // Use the router middleware

  const httpServer = createServer(app);

  return httpServer;
}