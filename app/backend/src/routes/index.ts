import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import playRoutes from './play';

dotenv.config();

const app : Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req : Request, res : Response) => {
    res.send('hello world');
});

app.use('/play', playRoutes);


const fetchPokemon = async () : Promise<any> => {
    try{
        const response: AxiosResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
        const responseData : any = response.data;
        return responseData;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

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

// interface PokedexGen {
//     gen : number;
//     index : [number, number]
// }

// const pokedex : PokedexGen[] = [
//     {
//         gen : 1,
//         index : [1, 151]
//     },
//     {
//         gen : 2,
//         index : [152, 251]
//     },
//     {
//         gen : 3,
//         index : [252, 386]
//     },
//     {
//         gen : 4,
//         index : [387, 493]
//     },
//     {
//         gen : 5,
//         index : [494, 649]
//     },
//     {
//         gen : 6,
//         index : [650, 721]
//     },
//     {
//         gen : 7,
//         index : [722, 809]
//     },
//     {
//         gen : 8,
//         index : [810, 905]
//     },
//     {
//         gen : 9,
//         index : [906, 1025]
//     },
// ];

// function getRange(data : PokedexGen[]) : [number, number] {
//     if(data.length > 1){
//         let res : number[] = [];
//         // const indexes: number[] = data.flatMap((gen: PokedexGen) => gen.index);
//         // const range: [number, number] = [Math.min(...indexes), Math.max(...indexes)];
//         data.forEach((gen : PokedexGen) => {
//             res = [...res, ...gen.index];
//         });
//         const range : [number, number] = [Math.min(...res), Math.max(...res)];
//         return range;
//     }else{
//         return data[0].index;
//     }
// }

// function getRandomUniqueNumbers(count : number, range : [number, number]) {
//     const min : number = range[0];
//     const max : number = range[1];
//     if (count > (max - min + 1)) {
//         throw new Error("Count exceeds the range of unique numbers available.");
//     }

//     const uniqueNumbers = new Set();

//     while (uniqueNumbers.size < count) {
//         const array = new Uint32Array(1);
//         crypto.getRandomValues(array);
//         const randomValue = array[0] / (0xFFFFFFFF + 1);
//         const randomNumber = Math.floor(randomValue * (max - min + 1)) + min;
//         uniqueNumbers.add(randomNumber);
//     }

//     return Array.from(uniqueNumbers);
// }