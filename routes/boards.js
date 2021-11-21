var express = require('express');
var router = express.Router();
var getBoards = require('../components/miroMethods').listBoardsAsTeam;
var deleteBoard = require('../components/miroMethods').deleteBoard;

router.get('/', async function(req, res, next) {
    new Promise(async function(resolve, reject){
        getBoards().then(res=>{
            var responseData = []
            res.data.forEach(entry =>{
                var importantdata = {
                    id: entry.id,
                    name: entry.name,
                    description: entry.description,
                    viewLink: entry.viewLink
                }
                responseData.push(importantdata)
            });
            console.log(responseData);
            resolve(responseData)
        }).catch(err =>{
            reject(err);
        })
    }).then(board =>{
        res.send(board);
    }).catch(error=>{
        res.send({error: error}).status(500)
    });
});

router.delete('/:id', async function(req, res, next) {
        deleteBoard(req.params.id).then(()=>{
            res.sendStatus(200);
        }).catch(error=>{
            res.send({error: error}).status(500)
        });
});

module.exports = router;
