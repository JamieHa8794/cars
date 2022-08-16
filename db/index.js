const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgress://localhost/cars');

const getBrands = async ()=>{
    return(await client.query('SELECT * FROM Brands;')).rows;
}
const getModels = async ()=>{
    return(await client.query('SELECT * FROM Models;')).rows;
}

const createModel = async ({name})=>{
    return(await client.query('INSERT INTO Models(name) VALUES($1) RETURNING *', [name])).rows[0];
}

const deleteModel = async (id)=>{
    await client.query('DELETE FROM Models WHERE id=$1', [id]);
}


const syncAndSeed = async()=>{
    const SQL = `
        DROP TABLE IF EXISTS Models;
        DROP TABLE IF EXISTS Brands;
        CREATE TABLE Brands(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20) NOT NULL UNIQUE
        );
        INSERT INTO Brands(name) VALUES ('Honda');
        INSERT INTO Brands(name) VALUES ('Nissan');
        INSERT INTO Brands(name) VALUES ('Toyota');
        INSERT INTO Brands(name) VALUES ('Ford');
        CREATE TABLE Models(
            id SERIAL PRIMARY KEY,
            name VARCHAR (20) NOT NULL UNIQUE
        );
        INSERT INTO Models(name) VALUES ('Accord');
        INSERT INTO Models(name) VALUES ('Maxima');
        INSERT INTO Models(name) VALUES ('Corolla');
        INSERT INTO Models(name) VALUES ('Camry');
        INSERT INTO Models(name) VALUES ('Avalon');
        INSERT INTO Models(name) VALUES ('Explorer');
        INSERT INTO Models(name) VALUES ('Mustang');
        INSERT INTO Models(name) VALUES ('Civic');
        INSERT INTO Models(name) VALUES ('Pilot');
        
    `;
    await client.query(SQL);

}


module.exports = {
    client, 
    getBrands,
    getModels,
    createModel,
    deleteModel,
    syncAndSeed
}