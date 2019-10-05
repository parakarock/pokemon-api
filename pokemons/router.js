const express = require('express')
const router = express.Router()
const pokemon = require('./pokemon')

router.get('/pokemons', (req, res) => pokemon.showAll().then((result) => {
    res.send(result)
}).catch((err) => {
    console.error(err)
    res.status(500).send({ error : 'Cannot showAll Pokemon' })
}))   //Show All
router.get('/pokemon/:id', (req, res) => {     //Find Pokemon

    if(!isSufficientParam(req.params.id)){
        res.status(400).send({ error: 'Insufficient parameters: id are required parameter' })
        return
    }

    let id = req.params.id
    if(!pokemon.isPokemonExisted(id)){
        res.status(400).send({ error: 'The pokemon could not be found' })
        return
    }
    let p = pokemon.getPokemon(id)
    res.send(p)
})
router.put('/pokemon/:id', (req, res) => {     //Add type2
    if(!isSufficientParam(req.body.type2)){
        res.status(400).send({ error: 'Insufficient parameters: type2 are required parameter' })
        return
    }

    let id = req.params.id
    if(!pokemon.isPokemonExisted(id)){
        res.status(400).send({ error: 'The pokemon could not be found' })
        return
    }

    let success = pokemon.update(id,req.body.type2)
    if(!success){
        res.status(400).send({ error : 'Pokemon update is unsucessfully.' })
        return
    }

    res.status(200).send(pokemon.getPokemon(id))
})
router.post('/pokemons', (req, res) => {   //AddPokemon

    if (!isSufficientParam(req.body.name) || !isSufficientParam(req.body.type)) {
        res.status(400).send({ error: 'Insufficient parameters: name and type are required parameter' })
        return
    }
    // let p = pokemon.generatedNewPokemon(req.body.name, req.body.type)
    pokemon.savePokemon(req.body.name, req.body.type).then((result) =>{
        res.sendStatus(201) 
    }).catch((err) =>{
        console.error(err)
        res.status(400).send({ error : 'Cannot create Pokemon is unsucessfully: invalid parameter' })
    })
    // if(!success){
    //     res.status(400).send({ error : 'Cannot create Pokemon is unsucessfully: invalid parameter' })
    //     return
    // }
    // pokemon.save(p)
    // pokemon.push(p)
    // res.sendStatus(201)
})

router.delete('/pokemon/:id', (req,res) => {   //delete
    if(!isSufficientParam(req.body.type2)){
        res.status(400).send({ error: 'Insufficient parameters: type2 are required parameter' })
        return
    }

    let id = req.params.id
    if(!pokemon.isPokemonExisted(id)){
        res.status(400).send({ error: 'The pokemon could not be found' })
        return
    }

    delete pokemon[id-1]
    res.sendStatus(204)
})

function isSufficientParam(v) {
    return v !== undefined && v !== null && v !== ''
}

module.exports = router