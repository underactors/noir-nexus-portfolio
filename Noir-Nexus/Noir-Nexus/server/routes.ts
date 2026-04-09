import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      
      // LOGIC: Ensure when they send an email it goes to cashcodes@hotmail.com
      // In a real production environment, this would trigger an email via Nodemailer/SendGrid
      console.log(`[EMAIL SYSTEM] Sending message from ${input.email} to cashcodes@hotmail.com`);
      console.log(`Subject: New Portfolio Contact from ${input.name}`);
      console.log(`Content: ${input.message}`);

      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
