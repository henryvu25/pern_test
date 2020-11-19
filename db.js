const Pool = require("pg").Pool; //requiring pool from the postgres library
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
};

const proConfig = {
    connectionString: process.env.DATABASE_URL //heroku addons
}

//instantiate new Pool object with attributes of your db
const pool = new Pool(
    process.env.NODE_ENV == "production" ? proConfig : devConfig
); 


module.exports = pool; //export that object