const { client, syncAndSeed, getBrands, getModels, createModel, deleteModel } = require('./db');
const express = require('express');
const app = express();


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