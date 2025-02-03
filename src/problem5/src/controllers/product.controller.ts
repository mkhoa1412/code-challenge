import { Request, Response } from "express";
import Product, { IProduct } from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
	try {
		const product = new Product(req.body);
		await product.save();
		res.status(201).json(product);
	} catch (error) {
		res.status(400).json({ error: "Failed to create product" });
	}
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const filters: any = {};

		// Apply filters if provided in query params
		if (req.query.category) {
			filters.category = req.query.category;
		}
		if (req.query.minPrice) {
			filters.price = { $gte: Number(req.query.minPrice) };
		}
		if (req.query.maxPrice) {
			filters.price = {
				...filters.price,
				$lte: Number(req.query.maxPrice),
			};
		}

		const products = await Product.find(filters);
		res.json(products);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch products" });
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json(product);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch product" });
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json(product);
	} catch (error) {
		res.status(400).json({ error: "Failed to update product" });
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete product" });
	}
};
