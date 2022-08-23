
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

module.exports = {
    head,
    nav
}