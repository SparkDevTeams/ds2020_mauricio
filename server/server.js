import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "dotenv/config";
import Fortune from "./schemas/fortune";

let port;
let db_url;
let db_user;
let db_pw;

// Setup environment
if(process.env.NODE_ENV === 'production') {
    console.log("Starting production config");
    port = process.env.PORT;
    db_url = process.env.DB_URL;
    db_user = process.env.DB_USER;
    db_pw = process.env.DB_PW;
} else if(process.env.NODE_ENV === 'development')
{
    console.log("Starting development config");
    port = 3001;
    db_url = "mongodb://localhost:27017/fortunate_dev_db";
    db_user = "";
    db_pw = "";
}
else if(process.env.NODE_ENV === 'test')
{
    console.log("Starting test config");
    port = 3001;
    db_url = "mongodb://localhost:27017/fortunate_test_db";
    db_user = "";
    db_pw = "";
}

// Setup server
const app = express();
app.use(cors())
app.use(express.static('client'))

// API
app.get('/fortune', async (req, res) => {
    res.send(await get_random());
})

// Mongodb
const connectDb = () => {
    return mongoose.connect(db_url);
  };

// Erase DB content and repopulate on synch if true  
const eraseDBOnSynch = true;
connectDb().then(async () => {
    if(eraseDBOnSynch){
        console.log("Clearing DB...");
        await Promise.all([Fortune.deleteMany({})]);
        console.log("DB cleared!");
        createMessages();
    }
})

//--- Start the server
app.listen({ port: port }, () => { 
    console.log("Server listening on port: " + port);

    if(process.env.NODE_ENV !== 'production')
    {
        console.log("Environment: " + process.env.NODE_ENV);
        console.log("DB URL: " + db_url);
        console.log("DB USER: " + db_user);
        console.log("DB PW: " + db_pw);
    }
 });

// Helper function to populate DB
const createMessages = async () => {
    console.log("Creating messages...");
    // Source: https://joshmadison.com/2008/04/20/fortune-cookie-fortunes/
    let messages = ["A beautiful, smart, and loving person will be coming into your life.",
                    "Emulate what you admire in your parents.",
                    "Go take a rest; you deserve it.",
                    "Now is the time to try something new.",
                    "Physical activity will dramatically improve your outlook today.",
                    "Put your mind into planning today. Look into the future.",
                    "Resting well is as important as working hard.",
                    "Staying close to home is going to be best for your morale today",
                    "Success is going from failure to failure without loss of enthusiasm.",
                    "The harder you work, the luckier you get.",
                    "Your love life will be happy and harmonious.",
                    "It takes courage to admit fault."];

    let temp;
    let msg;
    for(msg in messages)
    {
        temp = new Fortune({message: messages[msg]});
        await temp.save(); 
    }
    console.log("Messages created!");
};

// Helper function to get random document
const get_random = async () => {
    let count;
    await Promise.all([count = Fortune.countDocuments()]);
    count = (await count).valueOf()
    // console.log("Fortune count: " + count);

    const rand = Math.floor(Math.random() * count);
    let f = (await Fortune.findOne().skip(rand)).toObject();
    return f.message;
}