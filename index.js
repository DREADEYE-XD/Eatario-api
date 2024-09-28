const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

//For vercel
app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/api/ping", (req, res) => {
  try {
    res.status(200).json({ message: "Ping success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while pinging" });
  }
});

app.get("/api/category", async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    console.log(category);
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching category" });
  }
});

// some examples
app.get("/api/product", async (req, res) => {
  try {
    const product = await prisma.product.findMany();
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching product" });
  }
});

app.get("/api/getOrders", async (req, res) => {
  try {
    const order = await prisma.order.findMany();
    console.log(order);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching getOrders" });
  }
});

app.post("/api/createOrder", async (req, res) => {
  const { cartItems, total } = req.body;

  try {
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// For local development
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// For Vercel
module.exports = app;