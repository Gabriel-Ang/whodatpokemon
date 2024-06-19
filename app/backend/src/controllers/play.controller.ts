import express, { Express, Request, Response, NextFunction, RequestHandler } from "express";

export const getPlay : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    // const text : any = req.body.text;
    // res.status(200).json({
    //     generation : [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // });
    res.send('playpage');
}

interface PokedexGen {
    gen : number;
    index : [number, number]
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

export const createPlay : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
    const generation : number[] = req.body.generation;
    const rounds : number = req.body.rounds;
    console.log(req.body);
    const selectedGens : PokedexGen[] = generation.map(num => pokedex[num - 1]);
    const range : number[] = getRange(selectedGens);
    const selectedPokemons : any = getRandomUniqueNumbers(rounds, range); // debug why I can't use static type, have to use any
    console.log('selectedgens', selectedGens);
    console.log('range', range);
    console.log('selectedPokemons', selectedPokemons);
    // const pokemonPromises : Promise<any>[] = [];
    // for(let i = 0; i < rounds; i++){
    // }
    res.status(201).json({
        'generation' : generation,
        'rounds' : rounds
    });
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