import "dotenv/config";

let db_url;
let db_user;
let db_pw;
let port;

// Setup environment
if(process.env.NODE_ENV === 'production') {
    console.log("Starting production config");
    db_url = process.env.DB_URL;
    db_user = process.env.DB_USER;
    db_pw = process.env.DB_PW;
    port = process.env.PORT;

    console.log("Environment: " + process.env.NODE_ENV);
    console.log("DB URL: " + db_url);
    console.log("DB USER: " + db_user);
    console.log("DB PW: " + db_pw);
} 
else if(process.env.NODE_ENV === 'development')
{
    console.log("Starting development config");
    db_url = "mongodb://localhost:27017/fortunate_dev_db";
    db_user = "";
    db_pw = "";
    port = 3001;

    console.log("Environment: " + process.env.NODE_ENV);
    console.log("DB URL: " + db_url);
    console.log("DB USER: " + db_user);
    console.log("DB PW: " + db_pw);
}
else if(process.env.NODE_ENV === 'test')
{
    console.log("Starting test config");
    db_url = "mongodb://localhost:27017/fortunate_test_db";
    db_user = "";
    db_pw = "";
    port = 3001;

    console.log("Environment: " + process.env.NODE_ENV);
    console.log("DB URL: " + db_url);
    console.log("DB USER: " + db_user);
    console.log("DB PW: " + db_pw);
}

export {db_url, db_user, db_pw, port};