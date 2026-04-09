import { storage } from "./storage";

async function seedDatabase() {
  // Add 3-5 realistic example messages
  await storage.createContactMessage({
    name: "Bruce Wayne",
    email: "bwayne@wayneenterprises.com",
    message: "I am interested in your design capabilities. We have a discreet project that requires your aesthetic.",
  });
  
  await storage.createContactMessage({
    name: "Patrick Bateman",
    email: "pbateman@pierceandpierce.com",
    message: "Your portfolio has a subtle off-white coloring, the tasteful thickness of it... Oh my god, it even has a watermark.",
  });

  await storage.createContactMessage({
    name: "J. Robert Oppenheimer",
    email: "robert@losalamos.gov",
    message: "Theory will take you only so far. I appreciate the stark reality presented in your work.",
  });

  console.log("Database seeded with contact messages!");
  process.exit(0);
}

seedDatabase().catch((e) => {
  console.error("Failed to seed database:", e);
  process.exit(1);
});
