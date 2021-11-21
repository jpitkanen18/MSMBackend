const info = require('../data.json');

class Task{
    constructor(id, title, assigneeName, assigneeId){
        this.id = id;
        this.title = title;
        this.assignee = {
            name: assigneeName,
            id: assigneeId
        }
        this.active = true;
    }
    complete(){
        this.active = false;
    }
    reactivate(){
        this.active = true;
    }
    updateTitle(title){
        this.title = title;
    }
    updateAssignee(assignee){
        this.assignee = assignee
    }
    getTaskJSON(){
        var json = {
            id: this.id,
            title: this.title,
            assignee: this.assignee,
            active: this.active
        }
        return json
    }
    getTaskJSONString(){
        var json = {
            id: this.id,
            title: this.title,
            assignee: this.assignee,
            active: this.active
        }
        return JSON.stringify(json)
    }
}

function speechToTask(speechData = "Hello Lorem Ipsum is simply dummy text of alex will do garbage stuff as well as git cleanup you dirty man. the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. world Jesse will do git merge Jaisal will do mqtt Lavan will do installation and cleaning of office and making coffee."){
    const names = info.memberNames;
    const taskPhrases = info.taskPhrases
    const additionPhrases = info.additionPhrases
    var speechParsed = [];
    var taskList = [];
    var userList = [];
    var taskDone = false;

    names.forEach((name) =>{
        if (speechData.includes(name)){
            speechParsed.push(speechData.substring(speechData.indexOf(name)).split('.')[0]);
            console.log(speechParsed);
        }
    });

    speechParsed.forEach(task =>{
        for(let phrase of taskPhrases){
            if(task.includes(phrase)){
                var processed = task.split(phrase);
                for(let addition of additionPhrases){
                    var text = processed[1]
                    if(text.includes(addition)){
                        console.log(text.split(addition))
                        var additionProcessed = text.split(addition);
                        additionProcessed.forEach(additionStr =>{
                            console.log(additionStr)
                            var taskItem2 = new Task(Math.floor(1000 + Math.random() * 9000), additionStr.trim(), processed[0].trim(), info.memberIds[processed[0].trim()])
                            taskList.push(taskItem2);
                        })
                        if(!userList.includes(processed[0].trim())){
                            userList.push(processed[0].trim())
                        }
                        taskDone = true;
                        break;
                    }
                }
                if(!taskDone){
                    var taskItem = new Task(Math.floor(1000 + Math.random() * 9000), processed[1].trim(), processed[0].trim(), info.memberIds[processed[0].trim()])
                    taskList.push(taskItem);
                    if(!userList.includes(processed[0].trim())){
                        userList.push(processed[0].trim())
                    }
                } else {
                    taskDone = false;
                }
            }
        };
        });
        var tasksObject = {
            users: userList,
            tasks: taskList
        }
        return tasksObject;
    };

//Uncomment the line below to test
//speechToTask();

exports.Task = Task;
exports.speechToTask = speechToTask;