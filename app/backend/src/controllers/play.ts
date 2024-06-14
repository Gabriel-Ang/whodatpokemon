import { RequestHandler } from "express";

export const getPlay : RequestHandler = (req, res, next) => {
    const text : any = req.body.text;
    // const text = (req.body as { text:string } ).text;
    res.status(200).json({
        generation : [1, 2, 3, 4, 5, 6, 7, 8, 9]
    })
}

export const createPlay : RequestHandler = (req, res, next) => {
    const generation : any = req.body.generation;
    console.log(generation);
    
    // const text = (req.body as { text:string } ).text;
    res.status(201).json({
        // message : text
        'generation' : generation
    })
}