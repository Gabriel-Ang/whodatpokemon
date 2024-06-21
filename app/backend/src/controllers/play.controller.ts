import express, { Express, Request, Response, NextFunction, RequestHandler } from "express";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { CustomError } from "../utils/CustomError";

export const getPlay : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    res.send('playpage');
}

interface PokedexGen {
    gen : number;
    index : [number, number]
}

interface Pokemon {
    id : number;
    name : string;
    sprite : string;
}

const pokedex : PokedexGen[] = [
    {
        gen : 1,
        index : [1, 151]
    },
    {
        gen : 2,
        index : [152, 251]
    },
    {
        gen : 3,
        index : [252, 386]
    },
    {
        gen : 4,
        index : [387, 493]
    },
    {
        gen : 5,
        index : [494, 649]
    },
    {
        gen : 6,
        index : [650, 721]
    },
    {
        gen : 7,
        index : [722, 809]
    },
    {
        gen : 8,
        index : [810, 905]
    },
    {
        gen : 9,
        index : [906, 1025]
    },
];

export const createPlay : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    const generation : number[] = req.body.generation;
    const rounds : number = req.body.rounds;
    try{
        if (!Array.isArray(generation) || !generation.every(num => num >= 1 && num <= 9) || typeof rounds !== 'number' || rounds < 1 || rounds > 20) {
            throw new CustomError('Validation error: Generation must be from 1 to 9 and number of rounds must be 1 to 20!', 400, { generation, rounds });
        }
        const selectedGens : PokedexGen[] = generation.map(num => pokedex[num - 1]);
        const range : number[] = getRange(selectedGens);
        const selectedPokemons : any = getRandomUniqueNumbers(rounds, range); // debug why I can't use static type, have to use any
        const dataIn : any = await fetchPokemon(rounds, selectedPokemons);
        const pokemon : Pokemon[] = dataToPokemon(dataIn);
        res.status(200).json({
            "pokemon" : pokemon
        });
    }catch(err : any){
        console.error({
            "message" : err.message,
            "status" : err.status,
            "details" : err.details
        });
        res.status(err.status).json({
            "message" : err.message,
            "details" : err.details
        });
    }
}

function getRange(data : PokedexGen[]) : number[] {
    if(data.length === 0) {
        throw new Error("No PokedexGen data provided.");
    }
    const range = data.flatMap(_data => {
        const [start, end] = _data.index;
        const numbersInRange = [];
        for (let i = start; i <= end; i++) {
            numbersInRange.push(i);
        }
        return numbersInRange;
    });
    range.sort((a, b) => a - b);
    return range;
}

function getRandomUniqueNumbers(count : number, range : number[] ) {
    if (count > range.length) {
        throw new Error("Count exceeds the range of unique numbers available.");
    }
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < count) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const randomIndex = array[0] % range.length;
        const randomNumber = range[randomIndex];
        uniqueNumbers.add(randomNumber);
    }
    return Array.from(uniqueNumbers);
}

async function fetchPokemon(count : number, ids : number[]) : Promise<any>{
    const pokeAPI : string = "https://pokeapi.co/api/v2/pokemon/";
    const requests = ids.map(id => axios.get(`${pokeAPI}/${id}`));
    try{
        const responses = await Promise.all(requests);
        return responses.map(response => response.data);
    }catch(err){
        console.error("Error encountered when fetching Pokemon", err);
        throw err;
    }
}

function dataToPokemon(dataIn : any) : Pokemon[]{
    const res : Pokemon[] = dataIn.map((obj : any) => {
        return {
            'id' : obj.id,
            'name' : obj.name,
            'sprite' : obj.sprites.front_default
        }
    });
    return res;
}