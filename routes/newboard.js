var express = require('express');
var router = express.Router();
var createBoard = require('../components/miroMethods').createBoard;
const dateTime = require('../components/dateTime').dateTime;

router.post('/', async function(req, res, next) {
    new Promise(async function(resolve, reject){
        createBoard("Tasks " + dateTime()[2], "Task board for " + dateTime()[2]).then(res=>{
            resolve(res)
        }).catch(err =>{
            reject(err);
        })
    }).then(board =>{
        res.send(board);
    }).catch(error=>{
        res.send({error: error}).status(500)
    });
});

module.exports = router;
