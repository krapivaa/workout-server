let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

//Practice-test
// router.get('/practice', validateSession, function(req,res){
//     res.send('Hey!! This is a practice route!')
// });

//Allows user to create a workout log
router.post('/', validateSession, (req, res) => {
    const LogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner: req.user.id
    }
    Log.create(LogEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))
});

//Gets all logs for individual user
router.get('/', validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: {owner: userid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

//Gets individuals log by id
router.get('/:id', function (req, res) {
    let id = req.params.id;

    Log.findAll({
        where: {id: id}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

//allows individual logs be updated by a user
router.put('/:id', validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
    };

    const query = { where: {id: req.params.id, owner: req.user.id}};

    Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({error:  err}));
});

//allows individual logs to be delted by a user
router.delete('/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }};

    Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log entry removed"  }))
    .catch((err) => res.status(500).json({ error: err } ));
});


module.exports = router;