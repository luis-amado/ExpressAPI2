import 'dotenv/config.js';

import express from 'express';
import indexRoutes from './routes/index.routes.js';
import itemsRoutes from './routes/items.routes.js';
import loginRoutes from './routes/login.routes.js';
import usersRoutes from './routes/users.routes.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(indexRoutes);
app.use(itemsRoutes);
app.use(loginRoutes);
app.use(usersRoutes);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}\nhttp://localhost:${PORT}`);
});
