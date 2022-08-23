const { getBrands, getModels, createModel,  deleteModel} = require('../db');
const {head, nav } = require('../templates')
const app = require('express').Router()

module.exports = app;


app.get('/', async (req, res, next)=>{
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
                        <form method='POST' action='/models/${model.id}?_method=DELETE'}>
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
        await createModel(req.body)
        res.redirect('/Models')
    }
    catch(err){
        next(err);
    }
})

app.delete('/:id', async (req, res, next)=>{
    try{
        await deleteModel(req.params.id)
        res.redirect('/Models')
    }
    catch(err){
        next(err);
    }
})