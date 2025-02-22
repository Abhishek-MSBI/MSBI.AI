import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertQuerySchema } from "@shared/schema";
import { generateAnswer } from "./palm";
import { z } from "zod";

export async function registerRoutes(app: Express) {
  app.post("/api/query", async (req, res) => {
    try {
      const body = insertQuerySchema.parse(req.body);
      const query = await storage.createQuery(body);

      const answer = await generateAnswer(body.question, body.files);
      query.answer = answer;

      res.json(query);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data" });
      } else {
        res.status(500).json({ message: "Failed to process query" });
      }
    }
  });

  app.get("/api/queries", async (_req, res) => {
    try {
      const queries = await storage.listQueries();
      res.json(queries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch queries" });
    }
  });

  return createServer(app);
}