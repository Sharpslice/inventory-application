const {Client} = require("pg");
require('dotenv').config();
const SQL = `

    CREATE TABLE IF NOT EXISTS region(
        id SERIAL PRIMARY KEY,
        region varchar(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS trainer (
        id SERIAL PRIMARY KEY,
        name varchar(100) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS pokemon(
        id SERIAL PRIMARY KEY,
        api_id INTEGER NOT NULL,
        name varchar(100) NOT NULL,
        type varchar(100) NOT NULL,
        sprite varchar(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS trainer_pokemon(
        id SERIAL PRIMARY KEY,
        trainer_id INTEGER REFERENCES trainer(id),
        pokemon_id INTEGER REFERENCES pokemon(id),
        nickname varchar(100) NOT NULL,
        level INTEGER NOT NULL
    
    );
    CREATE TABLE IF NOT EXISTS moves(
        id SERIAL PRIMARY KEY,
        name varchar(100)
    );


    CREATE TABLE IF NOT EXISTS pokemon_moveset(
        pokemon_id INTEGER REFERENCES pokemon(id),
        moves_id INTEGER REFERENCES moves(id),
        PRIMARY KEY (pokemon_id,moves_id)
    );

    CREATE TABLE IF NOT EXISTS learned_moves(
        trainer_pokemon_id INTEGER REFERENCES trainer_pokemon(id),
        moves_id INTEGER REFERENCES moves(id),
        PRIMARY KEY (trainer_pokemon_id, moves_id)
    );

`;



async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end()
    console.log("done")
}
main();