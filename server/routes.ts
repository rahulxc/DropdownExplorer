import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { insertUserSchema, insertCocktailSchema } from "@shared/schema"; // Added import for cocktail schema

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  
  // Seed initial cocktails if none exist
  const seedCocktails = async () => {
    const existingCocktails = await storage.getCocktails();
    if (existingCocktails.length === 0) {
      const mockCocktails = [
        {
          name: "Manhattan",
          ingredients: [
            { name: "Wild Turkey 101 Rye", amount: 2.0 },
            { name: "Sweet Vermouth", amount: 1.0 },
            { name: "Angostura Bitters", amount: 0.125 },
            { name: "Grand Marnier", amount: 0.25 }
          ],
          color: "#8B0000",
          garnish: "Cherry",
          glassware: "coupe",
          method: "stirred",
          description: "Classic whiskey cocktail with a perfect balance of sweet and bitter.",
          preparation: "Add all ingredients to mixing glass with ice. Stir well until properly chilled and diluted. Strain into a chilled coupe glass. Garnish with a cherry."
        },
        {
          name: "Provençal",
          ingredients: [
            { name: "Lavender-infused Roku Gin", amount: 1.75 },
            { name: "Herbs de Provence Vermouth", amount: 0.75 },
            { name: "Cointreau", amount: 0.5 }
          ],
          color: "#E6E6FA",
          garnish: "Lavender Sprig",
          glassware: "coupe",
          method: "stirred",
          description: "Floral and herbal French-inspired gin cocktail with delicate aromatics.",
          preparation: "Add all ingredients to mixing glass with ice. Stir gently to preserve delicate floral notes. Strain into a chilled coupe glass. Garnish with a fresh lavender sprig."
        },
        {
          name: "Ready Fire Aim",
          ingredients: [
            { name: "Siete Misterios Mezcal", amount: 2.0 },
            { name: "Lime Juice", amount: 0.75 },
            { name: "Honey-Pineapple Syrup", amount: 0.75 },
            { name: "Bittermens Hellfire Bitters", amount: 0.125 }
          ],
          color: "#FFD700",
          garnish: "Lime Wheel",
          glassware: "coupe",
          method: "shaken",
          description: "Smoky mezcal with tropical sweetness and a spicy kick.",
          preparation: "Add all ingredients to shaker with ice. Shake vigorously until well-chilled. Double strain into a chilled coupe glass. Garnish with a lime wheel."
        },
        {
          name: "West Side",
          ingredients: [
            { name: "Charbay Meyer Lemon Vodka", amount: 2.0 },
            { name: "Fresh Lemon Juice", amount: 0.75 },
            { name: "Simple Syrup", amount: 0.5 },
            { name: "Fresh Mint", amount: 0.25 },
            { name: "Perrier", amount: 1.0 }
          ],
          color: "#ADFF2F",
          garnish: "Mint Sprig",
          glassware: "highball",
          method: "shaken",
          description: "Bright and refreshing vodka cocktail with vibrant citrus and aromatic mint.",
          preparation: "Gently muddle mint in shaker. Add remaining ingredients except Perrier. Shake with ice. Double strain into highball glass filled with ice. Top with Perrier. Garnish with mint sprig."
        },
        {
          name: "Fraise Sauvage",
          ingredients: [
            { name: "Fords Gin", amount: 1.5 },
            { name: "Wild Strawberries", amount: 0.5 },
            { name: "Tahitian Vanilla", amount: 0.25 },
            { name: "Lemon Juice", amount: 0.5 },
            { name: "EO Prosecco", amount: 1.0 }
          ],
          color: "#FF6B81",
          garnish: "Strawberry",
          glassware: "flute",
          method: "shaken",
          description: "Elegant gin cocktail with fresh strawberries and vanilla, topped with prosecco.",
          preparation: "Muddle strawberries with vanilla. Add gin and lemon juice. Shake with ice. Double strain into a chilled flute. Top with prosecco. Garnish with a fresh strawberry."
        },
        {
          name: "Amelia",
          ingredients: [
            { name: "Haku Vodka", amount: 1.5 },
            { name: "St-Germain", amount: 0.75 },
            { name: "Blackberry Purée", amount: 0.5 },
            { name: "Fresh Lemon Juice", amount: 0.5 }
          ],
          color: "#800080",
          garnish: "Blackberry",
          glassware: "coupe",
          method: "shaken",
          description: "Fruity and floral vodka cocktail with elegant elderflower notes.",
          preparation: "Add all ingredients to shaker with ice. Shake vigorously until well-chilled. Double strain into a chilled coupe glass. Garnish with a fresh blackberry."
        },
        {
          name: "Billionaire Cocktail",
          ingredients: [
            { name: "Wild Turkey Rare Breed Bourbon", amount: 2.0 },
            { name: "Fresh Lemon Juice", amount: 0.75 },
            { name: "EO Grenadine", amount: 0.5 },
            { name: "Absinthe Bitters", amount: 0.25 }
          ],
          color: "#CD5C5C",
          garnish: "Lemon Twist",
          glassware: "coupe",
          method: "shaken",
          description: "Rich and complex bourbon cocktail with bright citrus and subtle anise notes.",
          preparation: "Add all ingredients to shaker with ice. Shake vigorously for 10-12 seconds. Double strain into a chilled coupe glass. Express oils from lemon twist and garnish."
        },
        {
          name: "Mata Hari",
          ingredients: [
            { name: "Pierre Ferrand 1840 Cognac", amount: 1.75 },
            { name: "Chai-infused Rouge Vermouth", amount: 0.75 },
            { name: "Lemon Juice", amount: 0.5 },
            { name: "Pomegranate Juice", amount: 0.5 }
          ],
          color: "#C71585",
          garnish: "Orange Peel",
          glassware: "coupe",
          method: "shaken",
          description: "Mysterious and exotic cognac cocktail with spicy chai notes and tart pomegranate.",
          preparation: "Add all ingredients to shaker with ice. Shake well until properly chilled. Double strain into a chilled coupe glass. Express oils from orange peel and garnish."
        },
        {
          name: "Old Fashioned",
          ingredients: [
            { name: "Bourbon", amount: 2.0 },
            { name: "Sugar Cube", amount: 0.25 },
            { name: "Angostura Bitters", amount: 0.125 },
            { name: "Water", amount: 0.125 }
          ],
          color: "#8B4513",
          garnish: "Orange Peel",
          glassware: "rocks",
          method: "built",
          description: "The original cocktail - sweet, aromatic whiskey with depth and character.",
          preparation: "In a rocks glass, muddle sugar cube with bitters and water. Add bourbon and stir. Add large ice cube. Express oils from orange peel, and garnish."
        },
        {
          name: "Negroni",
          ingredients: [
            { name: "Gin", amount: 1.0 },
            { name: "Campari", amount: 1.0 },
            { name: "Sweet Vermouth", amount: 1.0 }
          ],
          color: "#FF4500",
          garnish: "Orange Peel",
          glassware: "rocks",
          method: "stirred",
          description: "Perfectly balanced bitter and herbal Italian classic.",
          preparation: "Add all ingredients to mixing glass with ice. Stir until well-chilled and properly diluted. Strain into rocks glass over fresh ice. Express oils from orange peel and garnish."
        },
        {
          name: "Mezcalita",
          ingredients: [
            { name: "Mezcal", amount: 2.0 },
            { name: "Lime juice", amount: 0.75 },
            { name: "Pineapple juice", amount: 0.5 }
          ],
          color: "#E6B800",
          garnish: "Lime wheel",
          glassware: "rocks",
          method: "shaken",
          description: "Smoky and tropical mezcal cocktail.",
          preparation: "Shake all ingredients with ice. Strain into a rocks glass over fresh ice. Garnish with a lime wheel."
        },
        {
          name: "Irish Rose",
          ingredients: [
            { name: "Ketel One Vodka", amount: 1.5 },
            { name: "Bombay Sapphire Premier Cru Gin", amount: 1.0 },
            { name: "Cranberry Juice", amount: 0.75 },
            { name: "Apple Juice", amount: 0.5 },
            { name: "Thyme", amount: 0.25 }
          ],
          color: "#FFB6C1",
          garnish: "Thyme Sprig",
          glassware: "coupe",
          method: "shaken",
          description: "A delicate blend of vodka and gin with fruity notes and herbal complexity.",
          preparation: "Shake all ingredients with ice. Double strain into a chilled coupe glass. Garnish with a fresh thyme sprig."
        },
        {
          name: "Emerald Sunset",
          ingredients: [
            { name: "Grey Goose Vodka", amount: 1.5 },
            { name: "Campari", amount: 0.75 },
            { name: "Blood Orange Juice", amount: 1.0 },
            { name: "Carrot Juice", amount: 0.5 },
            { name: "Mint", amount: 0.25 },
            { name: "Lime Juice", amount: 0.5 }
          ],
          color: "#FFA07A",
          garnish: "Mint Sprig",
          glassware: "rocks",
          method: "shaken",
          description: "A vibrant sunset-colored cocktail with earthy and citrus notes.",
          preparation: "Shake all ingredients with ice. Strain into a rocks glass over fresh ice. Garnish with a mint sprig."
        },
        {
          name: "Twilight Zone",
          ingredients: [
            { name: "Roe & Co Irish Whiskey", amount: 2.0 },
            { name: "Guinness Reduction", amount: 0.75 },
            { name: "Blackcurrant Liqueur", amount: 0.5 },
            { name: "Amaro", amount: 0.5 },
            { name: "Lemon Juice", amount: 0.5 }
          ],
          color: "#4A0404",
          garnish: "Lemon Twist",
          glassware: "rocks",
          method: "stirred",
          description: "A complex Irish whiskey cocktail with dark beer notes and berry undertones.",
          preparation: "Stir all ingredients with ice until well-chilled. Strain into a rocks glass over a large ice cube. Garnish with a lemon twist."
        },
        {
          name: "TLC (N/A)",
          ingredients: [
            { name: "Martini & Rossi Floreale NA Vermouth", amount: 2.0 },
            { name: "Blood Orange Juice", amount: 1.0 },
            { name: "Carrot Juice", amount: 0.5 },
            { name: "Tonic Water", amount: 2.0 }
          ],
          color: "#FFA500",
          garnish: "Orange Wheel",
          glassware: "highball",
          method: "built",
          description: "A sophisticated non-alcoholic cocktail with complex botanical notes.",
          preparation: "Build in a highball glass over ice. Start with vermouth, then juices, top with tonic water. Stir gently. Garnish with an orange wheel."
        }
      ];

      for (const cocktail of mockCocktails) {
        await storage.createCocktail(cocktail);
      }
    }
  };

  seedCocktails().catch(console.error);
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