import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import playRoutes from './routes/play.route';
import userRoutes from './routes/user.route';

dotenv.config();

const app : Express = express();
const port = Number(process.env.PORT) || 3000;
app.use(cors({
    origin: 'http://localhost:5173' // dev frontend
}));
app.use(express.json());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

// logger middleware
// app.use((req : Request, res : Response , next : NextFunction) => {
//     // const dateNow = Date.now();
//     // console.log('Request Type:', req.method, req.originalUrl, new Date(dateNow).toString());
//     console.log('Request Type:', req.method, req.originalUrl, new Date().toISOString());
//     next();
// });

app.get('/', (req : Request, res : Response) => {
    res.send('hello world');
});

app.use('/play', playRoutes);
app.use('/user', userRoutes);