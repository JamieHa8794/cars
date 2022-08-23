const { client, syncAndSeed, getBrands, getModels, createModel, createBrand , deleteModel, deleteBrand} = require('./db');
const {head, nav } = require('./templates')
const express = require('express');
const app = express();
const path = require('path')

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
app.use(require('method-override')('_method'));

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

app.use('/brands', require('./routes/brands'))

app.use('/models', require('./routes/models'))


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