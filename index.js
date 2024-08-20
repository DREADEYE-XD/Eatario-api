const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

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
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

app.get("/api/product", async (req, res) => {
  try {
    const product = await prisma.product.findMany();
    console.log(product);
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

app.get("/api/getOrders", async (req, res) => {
  try {
    const order = await prisma.order.findMany();
    console.log(order);
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching users" });
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
