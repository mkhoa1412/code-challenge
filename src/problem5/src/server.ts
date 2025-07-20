import express from 'express';
import { resourceRouter } from './routes/resource';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/resources', resourceRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
