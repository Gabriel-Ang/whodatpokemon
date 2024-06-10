// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

dotenv.config();

const app : Express = express();
const router : Router = express.Router();
app.use(express.json());