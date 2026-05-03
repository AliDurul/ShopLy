import express from 'express';
import cors from 'cors';
import { fn } from './helper';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

fn()

app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully!' });
});

app.get('/users', (req, res) => {
  const users = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
  ];
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});