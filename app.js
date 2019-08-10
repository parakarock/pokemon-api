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

let pokemon = [{
    name: 'Dratini',
    type: 'Dragon'
},
{
    name: 'Rattana',
    type: 'Normal'
},
{
    name: 'Eevee',
    type: 'Normal'
},
{
    name: 'Eeveee',
    type: 'Normall'
}]
app.use(express.json())
app.get('/pokemons', (req, res) => res.send(pokemon))

app.post('/pokemons', (req, res) => {
    pokemon.push(req.body)
    res.sendStatus(201)
})

app.listen(port, () => console.log(`Pokemon API listening on port ${port}`))