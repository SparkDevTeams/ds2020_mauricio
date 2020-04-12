import app from './app';
import connect_db, {createMessages} from './database';
import {port} from "./env_setup";

 async function start() {
    await connect_db()
    app.listen({ port: port }, () => { 
        console.log("Server listening on port: " + port);
    });

    return true
}

start()