var express = require("express");
var router = express.Router();
const parseSpeech = require('../components/parseSpeech').speechToTask;
const miro = require('../components/miroMethods');

router.post("/", async (req, res) => {
	console.log(req.body)
    var positionIterable = 0;
    var tasks = parseSpeech(req.body.speech);
    new Promise(async function(resolve, reject){
        tasks.forEach(task => {
            miro.createCardItem(req.body.board, "Task: " + task.title, "Task assigned to: " + task.assignee.name, [positionIterable, 0]).then(res =>{
                if (tasks.indexOf(task) === (tasks.length - 1)){
                    resolve(200)
                }
            }).catch(error =>{
                reject(error)
            });
            positionIterable = positionIterable + 340
        })
    }).then(()=>{
        res.sendStatus(200)
    }).catch(error=>{
        res.send({error: error}).status(500)
    })
    
});

module.exports = router;
