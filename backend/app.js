
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Test = require('./models/TestModel');

mongoose.connect('mongodb+srv://demo:demo@cluster0.vtpmi.mongodb.net/demo?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {

    delete req.body._id;

    const test = new Test({
        ...req.body
    });
    console.log(test)

    test.save()
    .then(() => res.status(201).json({ message: 'Object has been registered !' }) )
    .catch(error => res.status(400).json({ error }) );
});

app.use('/api/stuff', (req, res, next) => {
    Test.find()
        .then( tests => res.status(200).json(tests) )
        .catch( error => res.status(400).json(error) );

    res.status(200).json(stuff);
    
  });

module.exports = app;