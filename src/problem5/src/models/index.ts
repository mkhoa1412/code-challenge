import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const MONGODB_URL = process.env.DATABASE_URL as string;

async function connect() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Connected DB');
  } catch (error) {
    console.log('Error connecting');
  }
}
export default { connect };
