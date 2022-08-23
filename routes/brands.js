const { getBrands, getModels, createBrand , deleteBrand} = require('../db');
const {head, nav } = require('../templates')

const app = require('express').Router();

module.exports = app;


app.get('/', async (req, res, next)=>{
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
                        <form method='POST' action='/brands/${brand.id}?_method=DELETE'}>
                        <button>x</button>
                        </form>
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

app.post('/', async (req, res, next)=>{
    try{
        await createBrand(req.body)
        res.redirect('/Brands')
    }
    catch(err){
        next(err);
    }
})

app.delete('/:id', async (req, res, next)=>{
    try{
        await deleteBrand(req.params.id)
        res.redirect('/Brands')
    }
    catch(err){
        next(err);
    }
})


