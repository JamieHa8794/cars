const { client, syncAndSeed, getBrands, getModels, createModel, deleteModel, createBrand } = require('./db');
const express = require('express');
const app = express();
const path = require('path')

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))

const nav = ({brands, models}) =>{
    return(`
    <nav>
    <a href='/'>Home</a>
    <a href='/Brands'> Brands (${brands.length}) </a>
    <a href='/Models'> Models (${models.length})</a>
    </nav>
    `)
}

const head = ({ title }) =>{
    return(`
    <head>
        <link rel='stylesheet' href='/public/styles.css'/>
        <h1>
            Cars R Us - ${ title }
        </h1>
        <title>
            ${ title }
        </title>
    </head>
    `)
}
app.get('/', async (req, res, next)=>{
    try{
        const [brands, models] = await Promise.all([
            getBrands(),
            getModels()
        ])
        const html = `
        <html>
            ${head({title: 'Home'})}
            ${nav({brands, models})}
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
            ${head({title: 'Brands'})}
            ${nav({brands, models})}
        <body>
            <form method='POST'>
            <input name ='name'/>
            <button> Add </button>
            </form>
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

app.post('/Brands', async (req, res, next)=>{
    try{
        await createBrand(req.body)
        res.redirect('/Brands')
    }
    catch(err){
        next(err);
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
            ${head({title: 'Models'})}
            ${nav({brands, models})}
        <body>
            <form method='POST'>
                <input name ='name'/>
                <button> Add </button>
            </form>
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

app.post('/Models', async (req, res, next)=>{
    try{
        await createModel(req.body)
        res.redirect('/Models')
    }
    catch(err){
        next(err);
    }
})
const init = async ()=>{
    try{
        await client.connect();
        console.log('connected to database')
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`))
    }
    catch(err){
        console.log(err)
    }

}

init();