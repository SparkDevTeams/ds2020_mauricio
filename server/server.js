import app from './app';
import connect_db from './database';
import "dotenv/config";
import {port} from "./env_setup";

connect_db();

app.listen({ port: port }, () => { 
    console.log("Server listening on port: " + port);
 });