const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

// console.log(prisma.category)

app.get("/api/ping", (req, res) => {
  try {
    res.status(201).json({ message: "Ping success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

app.get("/api/category", async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    console.log(category);
    res.status(201).send(category);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching category" });
  }
});

app.get("/api/product", async (req, res) => {
  try {
    const product = await prisma.product.findMany();
    console.log(product);
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching product" });
  }
});

app.get("/api/getOrders", async (req, res) => {
  try {
    const order = await prisma.order.findMany();
    console.log(order);
    res.send(order);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching getOrders" });
  }
});

// Route to handle order creation
app.post("/api/createOrder", async (req, res) => {
  const { cartItems, total } = req.body;

  try {
    // Create a new order
    const order = await prisma.order.create({
      data: {
        totalPrice: total,
        items: cartItems,
        status: "pending",
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Create a handler function for Vercel
const handler = async (req, res) => {
  await prisma.$connect();
  return app(req, res);
};

// Export the handler function
module.exports = handler;

// Graceful shutdown (this won't be used in Vercel's serverless environment)
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
