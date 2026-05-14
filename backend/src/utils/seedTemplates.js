const mongoose = require("mongoose");

const Template = require("../models/Template");

require("dotenv").config();

// ================= TEMPLATE DATA =================
const templates = [
  {
    title: "Birthday Cake",
    image: "https://images.unsplash.com/photo-1551404973-761c83cd8339",
    category: "birthday",
    isPremium: false,
  },

  {
    title: "Birthday Balloons",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
    category: "birthday",
    isPremium: false,
  },

  {
    title: "Festival Lights",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    category: "festival",
    isPremium: true,
  },

  {
    title: "Love Theme",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
    category: "love",
    isPremium: false,
  },

  {
    title: "Motivation Sunrise",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    category: "motivation",
    isPremium: true,
  },
  {
    title: "Motivation Mountain",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    category: "motivation",
    isPremium: false,
  },
  {
    title: "Motivation Success",
    image: "https://images.unsplash.com/photo-1552817549-7fcfcad167dc",
    category: "motivation",
    isPremium: true,
  },
  {
    title: "Congratulations Diploma",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    category: "congratulations",
    isPremium: false,
  },
  {
    title: "Congratulations Victory",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    category: "congratulations",
    isPremium: true,
  },
  {
    title: "Thank You Flowers",
    image: "https://images.unsplash.com/photo-1518241353714-58c45f1b773c",
    category: "thank-you",
    isPremium: false,
  },
  {
    title: "Thank You Gratitude",
    image: "https://images.unsplash.com/photo-1520046996557-37d4c4778269",
    category: "thank-you",
    isPremium: true,
  },
  {
    title: "Get Well Soon",
    image: "https://images.unsplash.com/photo-1559321588-bb2dfed7c5f1",
    category: "get-well",
    isPremium: false,
  },
  {
    title: "Graduation Cap",
    image: "https://images.unsplash.com/photo-1427504494785-cdea177f47a0",
    category: "graduation",
    isPremium: false,
  },
  {
    title: "Graduation Success",
    image: "https://images.unsplash.com/photo-1523050854663-c0ac8981e9c9",
    category: "graduation",
    isPremium: true,
  },
  {
    title: "Birthday Confetti",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    category: "birthday",
    isPremium: true,
  },
  {
    title: "Birthday Party",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
    category: "birthday",
    isPremium: false,
  },
  {
    title: "Birthday Sparkle",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176",
    category: "birthday",
    isPremium: true,
  },
  {
    title: "Anniversary Hearts",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
    category: "anniversary",
    isPremium: false,
  },
  {
    title: "Anniversary Roses",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7",
    category: "anniversary",
    isPremium: false,
  },
  {
    title: "Anniversary Elegant",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60",
    category: "anniversary",
    isPremium: true,
  },
  {
    title: "Festival Diwali",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
    category: "festival",
    isPremium: false,
  },
  {
    title: "Festival Celebration",
    image: "https://images.unsplash.com/photo-1478804185206-84fe2695a59e",
    category: "festival",
    isPremium: false,
  },
  {
    title: "Festival Gold",
    image: "https://images.unsplash.com/photo-1533541038519-440d88662dc1",
    category: "festival",
    isPremium: true,
  },
  {
    title: "Love Romantic",
    image: "https://images.unsplash.com/photo-1505235687588-e2c8d3c5edd8",
    category: "love",
    isPremium: true,
  },
  {
    title: "Love Sunset",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38",
    category: "love",
    isPremium: false,
  },
];

// ================= SEED FUNCTION =================
const seedDB = async () => {
  try {
    // CONNECT DB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🗄️ MongoDB Connected");

    // DELETE OLD DATA
    await Template.deleteMany();

    console.log("🧹 Old Templates Removed");

    // INSERT NEW DATA
    await Template.insertMany(templates);

    console.log("🌱 Templates Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log("❌ Seed Error:", error);

    process.exit(1);
  }
};

seedDB();
