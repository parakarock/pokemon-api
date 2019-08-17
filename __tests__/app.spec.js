const request = require('supertest')
const chai = require('chai')

const app = require('../app')
chai.should()

describe('Pokemon API', () => {
    describe('GET /', () => {
        it('should return 200 OK with "Hello world"', (done) => {
            request(app).get('/')
                .expect(200)
                .end((err, res) => {
                    res.body.should.deep.equal({ message: "Hello world" })
                    done()
                })
        })
    })
    describe('GET /pokemon', () => {
        it('should return pokemon with object', (done) => {
            request(app).get('/pokemon/1')
                .expect(200)
                .end((err, res) => {
                    res.body.should.to.be.a('object')
                    res.body.should.to.have.property('id')
                    res.body.should.to.have.property('name')
                    res.body.should.to.have.property('type')
                    done()
                })
        })

        it('should return 400 Bad Request', (done) => {
            request(app).get('/pokemon/5')
                .expect(400)
                .end((err, res) => {
                    res.body.error.should.equal("The pokemon could not be found" )
                    done()
                })
        })
    })
    describe('PUT /pokemon/:id', ()=>{
        it('should return 200 OK and the pokemon has type2',(done) => {
            request(app).put('/pokemon/1')
            .send({type2 : 'Fire'})
            .set('Accept','application/json')
            .expect(200,done)
        })

        it('should return 400 Bad Request when try to update not existed pokemon', (done) => {
            request(app).put('pokemon/5')
            .expect(400)
            .end((err,res) => {
                res.body.error.should.equal('Insufficient parameters: type2 are required parameter')
            })
            done()
        })
        it('should return 400 Bad Request when pokemon could not be found', (done) => {
            request(app).put('pokemon/5')
            .expect(400)
            .send({type2 : 'Fire'})
            .set('Accept','application/json')
            .end((err,res) => {
                res.body.error.should.equal('The pokemon could not be found')
            })
            done()
        })
    })

    // describe('Integration Test',() =>{
    //     it('GET /pokemons should return list if pokemon' , (done) => {
    //        request('http://localhost:3000').get('/pokemon')
    //     })
    // })
})