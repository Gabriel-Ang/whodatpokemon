import express, { Express, Request, Response, Router, json } from "express";
import dotenv from "dotenv";
// import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { getPlay, createPlay } from "../controllers/play.controller";

dotenv.config();

const app : Express = express();
const router : Router = express.Router();
app.use(express.json());

// router.get('/', async(req : Request, res : Response) => {
//     res.send('waddup play nigga');
// });

// router.post('/', async(req : Request, res : Response) => {

// });

router.get('/', getPlay);
router.post('/', createPlay);

router.put('/', async(req : Request, res : Response) => {

});

router.delete('/', async(req : Request, res : Response) => {

});

export default router;