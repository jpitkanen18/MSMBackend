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

function speechToTask(speechData = "Hello Lorem Ipsum is simply dummy text of alex will do garbage stuff the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. world Jesse will do git merge Jaisal will do mqtt Lavan will do installation"){
    const names = info.memberNames;
    const taskPhrases = info.taskPhrases
    var speechParsed = [];
    var taskList = [];
    names.forEach((name) =>{
        if (speechData.includes(name)){
            speechParsed.push(speechData.substring(speechData.indexOf(name)).split('.')[0]);
            console.log(speechParsed);
        }
    });
    speechParsed.forEach(task =>{
        taskPhrases.forEach(phrase=>{
            if(task.includes(phrase)){
                console.log(task);
                var processed = task.split(phrase);
                var taskItem = new Task(Math.floor(1000 + Math.random() * 9000),processed[1].trim(), processed[0].trim(), info.memberIds[processed[0].trim()])
                taskList.push(taskItem);
                console.log(taskItem)
                console.log(taskList)
            }
        })
    });
    return taskList;
}

//Uncomment the line below to test
//speechToTask();

exports.Task = Task;
exports.speechToTask = speechToTask;