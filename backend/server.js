import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

dotenv.config();
connectDB();

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Woop! Woop! Server is properly connected",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
