const {Client} = require("pg");
require('dotenv').config({ path: __dirname + '/../.env' });

const SQL = `

    CREATE TABLE IF NOT EXISTS region(
        id SERIAL PRIMARY KEY,
        region varchar(100) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS trainer (
        id SERIAL PRIMARY KEY,
        name varchar(100) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS pokemon(
        id SERIAL PRIMARY KEY,
        api_id INTEGER UNIQUE NOT NULL,
        name varchar(100) UNIQUE NOT NULL,
        sprite varchar(100) NOT NULL,
        hp INTEGER NOT NULL,
        attack INTEGER NOT NULL,
        defense INTEGER NOT NULL,
        special_attack INTEGER NOT NULL,
        special_defense INTEGER NOT NULL,
        speed INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS region_pokemon(
        pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE,
        region_id INTEGER REFERENCES region(id) ON DELETE CASCADE,
        PRIMARY KEY (pokemon_id,region_id)
    
    );

    CREATE TABLE IF NOT EXISTS trainer_pokemon(
        trainer_id INTEGER REFERENCES trainer(id) ON DELETE CASCADE,
        pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE,
        nickname varchar(100) ,
        level INTEGER ,
        inParty BOOLEAN,
        PRIMARY KEY (trainer_id,pokemon_id)
    );

     CREATE TABLE IF NOT EXISTS types(
        id SERIAL PRIMARY KEY,
        type varchar(100) UNIQUE
    );
    CREATE TABLE IF NOT EXISTS moves(
        id SERIAL PRIMARY KEY,
        name varchar(100) UNIQUE,
        type varchar(100),
        power INTEGER,
        damage_class varchar(100)

    );


    CREATE TABLE IF NOT EXISTS pokemon_moveset(
        pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE, 
        moves_id INTEGER REFERENCES moves(id) ON DELETE CASCADE,
        PRIMARY KEY (pokemon_id,moves_id)
    );

    CREATE TABLE IF NOT EXISTS learned_moves(
        trainer_id INTEGER,
        pokemon_id INTEGER,
        moves_id INTEGER REFERENCES moves(id) ON DELETE CASCADE,
        slots INTEGER CHECK (slots>=0 AND slots <=3),
        PRIMARY KEY (trainer_id,pokemon_id, slots),
        FOREIGN KEY (trainer_id, pokemon_id) REFERENCES trainer_pokemon(trainer_id, pokemon_id) ON DELETE CASCADE,
        UNIQUE (trainer_id,pokemon_id,moves_id)
    );

   
    CREATE TABLE IF NOT EXISTS types_pokemon(
        type_id INTEGER REFERENCES types(id) ON DELETE CASCADE,
        pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE,
        PRIMARY KEY(type_id,pokemon_id)
    )

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