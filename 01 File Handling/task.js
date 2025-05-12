const fs = require("fs");
const filePath = __dirname + '/task.json';


const loadList= ()=>{
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        const actualData = JSON.parse(dataJSON);
        return actualData;
    } catch (error) {
        return [];
    }
}

const saveList = (list)=>{
    const dataJSON = JSON.stringify(list, null, 2); // The 2 adds indentation and ensures new lines.
    fs.writeFileSync(filePath, dataJSON);
}

const addTask = (task)=>{
    const list = loadList();
    list.push({task});
    saveList(list);
}

const listTask = () =>{
    const list = loadList();
    list.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
}

const removeTask = (index)=>{
    index = index - 1;
    const list = loadList();  
    if (index < 0 || index >= list.length) {
        console.log("Invalid task number");
        return;
    }
    list.splice(index, 1);  
    saveList(list);  
    console.log("Task removed successfully!");
}

const command = process.argv[2];
const argument = process.argv[3];

if(command == "add"){
    addTask(argument);
}else if(command == "list"){
    listTask();
}else if(command == 'remove'){
    removeTask(parseInt(argument));
}else{
    console.log("Command not Found");
}