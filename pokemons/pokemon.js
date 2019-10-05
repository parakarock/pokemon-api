const express = require('express')
const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const DB_URL = 'mongodb+srv://admin:1234@cluster0-6wmyz.gcp.mongodb.net/admin?retryWrites=true&w=majority'
const DB_NAME = 'example'
var options = { useNewUrlParser: true, useUnifiedTopology: true}


class Pokemon {
    constructor(name, type) {
        this.id = null
        this.name = name
        this.type = type
        this.type2 = null
    }
}

let pokemon = []

mockPokemon()

function mockPokemon() {
    pokemon.push(generatedNewPokemon('Dratini', 'Dragon'))
    pokemon.push(generatedNewPokemon('Rattana', 'Normal'))
    pokemon.push(generatedNewPokemon('Eevee', 'Normal'))
}

function generatedNewId(num) {
    return num + 1
}

function generatedNewPokemon(name, type) {
    let p = new Pokemon(name, type)
    p.id = generatedNewId(pokemon.length)
    return p
}

function isPokemonExisted(id) {
    return pokemon[id - 1] !== undefined && pokemon[id - 1] !== null

}
   
async function savePokemon(name, type){
    let p = new Pokemon(name, type)
    pokemon.push(p)
    

    try{
        var result = await collection.insert(p)
        return true
    }catch{
        console.error(err)
        return false
    }finally{
        client.close()
    }

    // mongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true},(err,client) =>{
    //     if(err){
    //         return false
    //     }

    //     database = client.db(DB_NAME)
    //     collection = database.collection('pokemons') 
    //     collection.insert(p,(err,result) => {
    //         if(err){
    //             return false
    //         }
    //         return true
    //     })

    // })

    // return true
}

function getPokemon(id){
    return pokemon[id-1]
}

var client,database
async function connectDatabase(){

    if(client != undefined){
        return
    }
    client = await mongoClient.connect(DB_URL,options).catch( err => console.error(err))
    
    database = client.db(DB_NAME)
}
async function getCollection(name){
    await connectDatabase()
    let collection = database.collection(name)
    return collection
}

function update(id,type2){
    pokemon[id-1].type2=type2
    return true

    
}

async function showAll(){
    
    // var collection,database

    // var client = await mongoClient.connect(DB_URL,options).catch( err => console.error(err))

    // database = client.db(DB_NAME)
    // collection = database.collection('pokemons')

    let collection = await getCollection('pokemons')

    try{
        var result = await collection.find({}).toArray()
        return result
    }catch{
        console.error(err)
        return false
    }finally{
        client.close()
    }
}


module.exports.isPokemonExisted = isPokemonExisted
module.exports.generatedNewPokemon = generatedNewPokemon
module.exports.savePokemon = savePokemon
module.exports.getPokemon = getPokemon
module.exports.update = update
module.exports.showAll = showAll

