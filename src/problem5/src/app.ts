import express from "express";
import mongoose from "mongoose";
// import Product from "./models/product.model";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/crud-app";

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to connect to MongoDB:", error);
	});

export default app;
