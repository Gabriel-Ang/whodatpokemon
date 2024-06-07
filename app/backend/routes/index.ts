import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

dotenv.config();

const app : Express = express();
const port = process.env.PORT || 3000;

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

app.get('/', async (req : Request, res : Response) => {
    // res.send('Express, Typescript Server nigerrrrrr');
    try{
        const pokemonData = await fetchPokemon();
        res.json(pokemonData);
    }catch(err){
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/play', (req : Request, res : Response) => {
    const status : any = {
        'status' : 'running'
    }
    res.send(status);
});

// axios({
//     method : 'get',
//     url : 'https://pokeapi.co/api/v2/pokemon/ditto',
//     responseType : "json"
// })
//     .then((res : AxiosResponse))

