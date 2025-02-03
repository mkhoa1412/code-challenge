import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	category: string;
	createdAt: Date;
	updatedAt: Date;
}

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		category: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IProduct>("Product", ProductSchema);
