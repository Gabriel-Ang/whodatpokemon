import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
// import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import playRoutes from './routes/play.route';
import userRoutes from './routes/user.route';
// import swaggerDocs from './utils/swagger'

dotenv.config();

const app : Express = express();
const port = Number(process.env.PORT) || 3000;
app.use(express.json());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    // swaggerDocs(app, port);
});

// logger middleware
app.use((req : Request, res : Response , next : NextFunction) => {
    // const dateNow = Date.now();
    // console.log('Request Type:', req.method, req.originalUrl, new Date(dateNow).toString());
    console.log('Request Type:', req.method, req.originalUrl, new Date().toISOString());
    next();
});

app.get('/', (req : Request, res : Response) => {
    res.send('hello world');
});

app.use('/play', playRoutes);
app.use('/user', userRoutes);


// const fetchPokemon = async () : Promise<any> => {
//     try{
//         const response: AxiosResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
//         const responseData : any = response.data;
//         return responseData;
//     }
//     catch(err){
//         console.error(err);
//         throw err;
//     }
// }

// app.get('/', async (req : Request, res : Response) => {
//     // const status : any = {
//     //     'status' : 'running'
//     // }
//     // res.send(status);
//     const randomId = getRandomUniqueNumbers(5, getRange(pokedex));
//     res.send(randomId);
// });

// app.get('/play', async (req : Request, res : Response) => {
//     try{
//         const pokemonData = await fetchPokemon();
//         res.json(pokemonData);
//     }catch(err){
//         res.status(500).send(err);
//     }
// });