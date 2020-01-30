import mongoose from "mongoose";
import Fortune from "./schemas/fortune";
import {db_url, db_user, db_pw} from "./env_setup";

// Fix error encountered during npm test: 
// ReferenceError: regeneratorRuntime is not defined 
import "core-js/stable";
import "regenerator-runtime/runtime";

const connect_db = () => {
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
}
    
    
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
export const get_random = async () => {
    let count;
    await Promise.all([count = Fortune.countDocuments()]);
    count = (await count).valueOf()
    // console.log("Fortune count: " + count);

    const rand = Math.floor(Math.random() * count);
    let f = (await Fortune.findOne().skip(rand)).toObject();
    return f.message;
}


export default connect_db;