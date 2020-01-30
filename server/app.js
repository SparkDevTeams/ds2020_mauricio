import express from "express";
import cors from "cors";
import "dotenv/config";

import {get_random} from './database';

// Fix error encountered during npm test: 
// ReferenceError: regeneratorRuntime is not defined 
import "core-js/stable";
import "regenerator-runtime/runtime";

// Setup server
const app = express();
app.use(cors())
app.use(express.static('client'))

// API
app.get('/fortune', async (req, res) => {
    res.send(await get_random());
})

export default app;