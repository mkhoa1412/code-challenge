import mongoose, { Schema, Document } from 'mongoose';

interface IResource extends Document {
  name: string;
  description: string;
}

const ResourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Resource = mongoose.model<IResource>('Resource', ResourceSchema);
export default Resource;
