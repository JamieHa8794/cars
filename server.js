const { client, syncAndSeed, getBrands, getModels, createModel, deleteModel } = require('./db');
const express = require('express');
const app = express();

app.get('/', (req, res, next)=>{
    try{
        const html = `
        <html>
        <head>
            <h1>    
                Cars R Us - Home
            </h1>
            <nav>
            <a href='/Brands'> Brands </a>
            <a href='/Models'> Models </a>
            </nav>
        </head>
        <body>
            Welcome to Cars R Us!
        </body>
        </html>
        `
        res.send(html)
    }
    catch(err){
        next(err)
    }
})

app.get('/Brands', (req, res, next)=>{
    try{
        const html = `
        <html>
        <head>
            <h1>    
                Cars R Us - Brands
            </h1>
            <nav>
            <a href='/Brands'> Brands </a>
            <a href='/Models'> Models </a>
            </nav>
        </head>
        <body>
            Welcome to Cars R Us!
        </body>
        </html>
        `
        res.send(html)
    }
    catch(err){
        next(err)
    }
})

app.get('/Models', (req, res, next)=>{
    try{
        const html = `
        <html>
        <head>
            <h1>    
                Cars R Us - Models
            </h1>
            <nav>
            <a href='/Brands'> Brands </a>
            <a href='/Models'> Models </a>
            </nav>
        </head>
        <body>
            Welcome to Cars R Us!
        </body>
        </html>
        `
        res.send(html)
    }
    catch(err){
        next(err)
    }
})

const init = async ()=>{
    try{
        await client.connect();
        console.log('connected to database')
        await syncAndSeed();
        const murano = await createModel({name: 'Murano'});
        console.log(await getModels());
        await deleteModel(murano.id);
        console.log(await getModels());
        console.log(await getBrands());

        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`))
    }
    catch(err){
        console.log(err)
    }

}

init();