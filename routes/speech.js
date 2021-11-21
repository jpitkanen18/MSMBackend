var express = require("express");
var router = express.Router();
const parseSpeech = require('../components/parseSpeech').speechToTask;
const miro = require('../components/miroMethods');

router.post("/", async (req, res) => {
	console.log(req.body)
    var positionXIterable = 0;
    var tasksObject = parseSpeech(req.body.speech);
    new Promise(async function(resolve, reject){
        var userCards = [];
        var newUsers = [];
        var boardTextItems = {};
        var boardCardItems = {};
        miro.getItemsOnBoard(req.body.id).then(items =>{
            console.log(items.data);
                tasksObject.users.forEach(user => {
                    items.data.forEach(item =>{
                        if(item.type === "text"){
                            if(item.data.content.includes(user)){
                                boardTextItems[user] = item.geometry.x;
                            }
                        } else if (item.type === "card"){
                            if(item.data.description.includes(user)){
                                if(boardCardItems[user] > 0){
                                    boardCardItems[user] = boardCardItems[user] + 1;
                                } else {
                                    boardCardItems[user] = 1;
                                }
                                return
                            }
                        } else{
                            return;
                        }
                    });
    
                    if(!boardTextItems[user]){
                        newUsers.push(user);
                    }
                    if (tasksObject.users.indexOf(user) === (tasksObject.users.count - 1)){
                        resolve2(true);
                    } else if (tasksObject.users.indexOf(user) === (tasksObject.users.count - 1)){

                    }
                });
                new Promise(async function(resolve3, reject3){
                    positionXIterable = (Object.keys(boardTextItems).length * 340)
                    var amount = 0;
                    newUsers.forEach(user => {
                        miro.createTextItem(req.body.id, user, [positionXIterable, 0]).then(textItem =>{
                            userCards.push(textItem);
                            boardTextItems[user] = textItem.geometry.x
                            if (amount === newUsers.length - 1){
                                resolve3(true);
                            }
                            amount = amount + 1
                        }).catch(error =>{
                            reject3(error);
                        });
                        boardCardItems[user] = 1;
                        positionXIterable = positionXIterable + 340;
                    })
                }).then(() => {
                    new Promise(function(resolve4, reject4){
                        var amount = 0;
                        tasksObject.tasks.forEach(task => {
                            console.log(boardCardItems);
                            console.log(boardTextItems);
                            console.log(boardCardItems[task.assignee.name]);
                            console.log((boardCardItems[task.assignee.name] * (80 + 114)) + "BORGIR");
                            miro.createCardItem(req.body.id, "Task: " + task.title, "Task assigned to: " + task.assignee.name, [boardTextItems[task.assignee.name], (boardCardItems[task.assignee.name] * (30 + 114))]).then(res =>{
                                if (boardCardItems[task.assignee.name] > 0){
                                    boardCardItems[task.assignee.name] = boardCardItems[task.assignee.name] + 1; 
                                } else{
                                    boardCardItems[task.assignee.name] = 1;
                                }
                                if (amount === tasksObject.tasks.length - 1){
                                    resolve4()
                                }
                                amount = amount + 1
                                
                            }).catch(error =>{
                                reject4(error)
                            });
                        });
                    }).then(()=>{
                        resolve(true);
                    })
                }).catch(err =>{
                    reject(err);
                    console.log(err);
                });
            
        }).catch(err =>{
            console.log(err)
        });
            
        }).then(()=>{
            res.sendStatus(200)
        }).catch(error=>{
            res.send({error: error}).status(500)
        })
    
});

module.exports = router;
