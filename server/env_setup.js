import "dotenv/config";

let db_url;
let port;

// Setup environment
console.log("Starting config");
db_url = "mongodb://mongo:27017/fortune";
port = 8080;

console.log("Environment: " + process.env.NODE_ENV);
console.log("DB URL: " + db_url);

export {db_url, port};