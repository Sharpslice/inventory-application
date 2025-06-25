require('dotenv').config({ path: __dirname + '/../.env' });

const {Pool} = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
const main =()=>{
    console.log("DB_PASSWORD type:", typeof process.env.DB_PASSWORD);
console.log("DB_PASSWORD value:", process.env.DB_PASSWORD);

}
main();
module.exports = pool;