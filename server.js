const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const app = express()

app.engine('mst', mustacheExpress())

app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let allDinos = [
  {
    id:1,
    name: 'DinoMom',
    color: 'Purple',
    weight: '20lbs',
    habitat: 'Jungle'
  },
  {
    id:2,
    name: 'DinoDad',
    color: 'Green',
    weight: '35lbs',
    habitat: 'Mountain'
  },
  {
    id:3,
    name: 'DinoSon',
    color: 'Red',
    weight: '15lbs',
    habitat: 'Plain'
  },
  {
    id:4,
    name: 'DinoDaughter',
    color: 'Yello',
    weight: '12lbs',
    habitat: 'Desert'
  },
  {
    id:5,
    name: 'DinoBaby',
    color: 'Pink',
    weight: '5lbs',
    habitat: 'Jungle'
  }
]

app.get('/api/dinosaurs/:id', (req, res) => {
  const dinoId = parseInt(req.params.id)
  const myDino = allDinos.find(dino => {
    return dino.id === dinoId
  })
  res.json(myDino)
})

app.get('/api/dinosaurs/:id/:habitat', (req, res) => {
  const dinoHabitat = req.params.habitat
  const myDinoHabitat = allDinos.find(dino => {
    return dino.habitat === dinoHabitat
  })
  res.json(myDinoHabitat)
})

app.get('/api/dinosaurs', (req, res) => {
  res.json(allDinos)
})

app.post('/api/dinosaurs', (req, res) => {
  let newDino = {
    id: allDinos.length +1,
    name: req.body.name,
    color: req.body.color,
    weight: req.body.weight,
    habitat: req.body.habitat
  }
  allDinos.push(newDino)
  res.json(newDino)
})

app.delete('/api/dinosaurs/:id', (req, res) => {
  const dinoId = parseInt(req.params.id)
  allDinos = allDinos.filter(oneDino => oneDino.id !== dinoId)
  res.json(allDinos)
})

app.put('/api/dinosaurs/:id', (req, res) => {
  const dinoId = parseInt(req.params.id)
  let myDino = allDinos.find(oneDino => oneDino.id === dinoId)
  myDino.name = req.body.name || myDino.name
  myDino.color = req.body.color || myDino.color
  myDino.weight = req.body.weight || myDino.weight
  myDino.habitat = req.body.habitat || myDino.habitat
  console.log(req.body.name)
  allDinos.splice(dinoId, 1, myDino)

  res.json(myDino)
})

app.listen(3000, () => {
  console.log('Heck yes on 3000!');
})
