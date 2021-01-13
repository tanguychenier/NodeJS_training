const express = require('express');
const router = express.Router();
const Test = require('../models/TestModel');

router.post('/', (req, res, next) => {

    delete req.body._id;

    const test = new Test({
        ...req.body
    });

    test.save()
    .then(() => res.status(201).json({ message: 'Object has been registered !' }) )
    .catch(error => res.status(400).json({ error }) );
});

router.put('/:id', (req, res, next) => {
    Test.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Object has been updated !'}))
      .catch(error => res.status(400).json({ error }));
  });

router.delete('/:id', (req, res, next) => {
    Test.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Object has been deleted !' }))
    .catch(error => res.status(404).json({ error }) );
});

router.get('/:id', (req, res, next) => {
    Test.findOne({ _id: req.params.id })
      .then(test => res.status(200).json(test))
      .catch(error => res.status(404).json({ error }));
  });

router.get('/', (req, res, next) => {
    Test.find()
        .then( tests => res.status(200).json(tests) )
        .catch( error => res.status(400).json(error) );

    //res.status(200).json(Test);
    
  });

module.exports = router;