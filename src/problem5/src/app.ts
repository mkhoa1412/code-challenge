import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import db from './models/index';
import route from './routes/index';
dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
route(app);
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
db.connect();
