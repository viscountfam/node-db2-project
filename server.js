const express = require('express')

const db = require('./data/dbConfig')

const server = express()
server.use(express.json())


server.get('/', (req, res) => {
    db.select('*').from('cars')
    .then(cars => {
        res.status(200).json(cars)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: "failed to find the list of accounts"})
    })
})

server.get('/:id', (req, res) => {
    db('cars').where( {id: req.params.id})
    .first()
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "failed to find the car with that ID"})
    })
})

server.post('/', (req,res) => {
    const newCarInfo = req.body
    db('cars').insert(newCarInfo, 'id')
        .then(ids => {
            db('cars')
            .where('id', ids[0])
            .then(car => {
                res.status(201).json(car)
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "failed to add the car"})
        })
})

server.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    db('cars')
    .where({id: id})
    .update(changes)
        .then( count => {
            db('cars').where( { id: id})
            .first()
            .then(car => {
                res.status(200).json(car)
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "failed to update the car"})
        })
} )

server.delete('/:id', (req, res) => {
    db('cars').where({id: req.params.id}).del()
    .then( count => {
        db.select('cars')
        .then(cars => {
            res.status(200).json(cars)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "failed to delete the car"})
    })
})

module.exports = server