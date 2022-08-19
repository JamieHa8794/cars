const { client, syncAndSeed, getBrands, getModels, createModel, deleteModel } = require('./db');
const express = require('express');
const app = express();

app.get('/', async (req, res, next)=>{
    try{
        const [brands, models] = await Promise.all([
            getBrands(),
            getModels()
        ])

        const html = `
        <html>
        <head>
            <h1>    
                Cars R Us - Home
            </h1>
            <nav>
            <a href='/Brands'> Brands (${brands.length}) </a>
            <a href='/Models'> Models (${models.length})</a>
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

app.get('/Brands', async (req, res, next)=>{
    try{
        const [brands, models] = await Promise.all([
            getBrands(),
            getModels()
        ])
        const html = `
        <html>
        <head>
            <h1>    
                Cars R Us - Brands
            </h1>
            <nav>
            <a href='/Brands'> Brands (${brands.length}) </a>
            <a href='/Models'> Models (${models.length})</a>
            </nav>
        </head>
        <body>
            <ul>
                ${brands.map(brand =>{
                    return(`
                    <li>
                        ${brand.name}
                    </li>
                    `)
                }).join('')
                }
            </ul>
        </body>
        </html>
        `
        res.send(html)
    }
    catch(err){
        next(err)
    }
})

app.get('/Models', async (req, res, next)=>{
    try{
        const [brands, models] = await Promise.all([
            getBrands(),
            getModels()
        ])
        const html = `
        <html>
        <head>
            <h1>    
                Cars R Us - Models
            </h1>
            <nav>
            <a href='/Brands'> Brands (${brands.length}) </a>
            <a href='/Models'> Models (${models.length})</a>
            </nav>
        </head>
        <body>
            <ul>
                ${models.map(model =>{
                    return(`
                    <li>
                        ${model.name}
                    </li>
                    `)
                }).join('')
            }
            </ul>
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