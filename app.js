const express = require('express')
const app = express()
const port = 3000

// class pokemon{
//     constructor(name,type){
//         this.name = name
//         this.type = type
//     }

//     echo(){
//         console.log(`Type of ${this.name} is ${this.type}`);
//     }
// }
// Dratini = new pokemon('Dratini','Dragon')
// Rattana = new pokemon('Rattana','Normal')
// Eevee = new pokemon('Eevee','Normal')
//https://bit.ly/2KQb0gR
class Pokemon {
    constructor(name, type) {
        this.id = null
        this.name = name
        this.type = type
        this.type2 = null
    }
}

let pokemon = []

pokemon.push(generatedNewPokemon('Dratini', 'Dragon'))
pokemon.push(generatedNewPokemon('Rattana', 'Normal'))
pokemon.push(generatedNewPokemon('Eevee', 'Normal'))

app.use(express.json())
app.get('/pokemons', (req, res) => res.send(pokemon))
app.get('/pokemon/:id', (req, res) => {
    let p = pokemon[req.params.id - 1]
    res.send(p)
})
app.put('/pokemon/:id', (req, res) => {
    if(!isSufficientParam(req.body.type2)){
        res.status(400).send({ error: 'Insufficient parameters: type2 are required parameter' })
        return
    }

    let p = pokemon[req.params.id - 1]
    if( p === undefined){
        res.status(400).send({ error: 'Cannot update pokemon is not found' })
        return
    }
    p.type2 = req.body.type2
    pokemon[req.params.id - 1] = p
    res.status(201).send(p)
})
app.post('/pokemons', (req, res) => {

    if (isSufficientParam(req.body.name) || isSufficientParam(req.body.type)) {
        res.status(400).send({ error: 'Insufficient parameters: name and type are required parameter' })
        return
    }
    let p = generatedNewPokemon(req.body.name, req.body.type)
    pokemon.push(p)


    res.sendStatus(201)
})

app.listen(port, () => console.log(`Pokemon API listening on port ${port}`))

function generatedNewId(num) {
    return num + 1
}

function generatedNewPokemon(name, type) {
    let p = new Pokemon(name, type)
    p.id = generatedNewId(pokemon.length)
    return p
}

function isSufficientParam(v) {
    return v !== undefined || v !== null || v !== ''
}
