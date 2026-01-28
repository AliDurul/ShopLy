import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Users routes
app.get('/api/users/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

app.put('/api/users/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id}` });
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`👤 Users Service running on http://localhost:${PORT}`);
});