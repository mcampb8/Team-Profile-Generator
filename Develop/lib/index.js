const Manager = require("./Manager");
const Intern = require("./Intern");
const Engineer = require("./Engineer");
const generateHtml = require("../util/generateHtml");
const inquirer = require('inquirer');
const fs = require('fs');
const employeeArray = [];
function isManager (){
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the name of the Manager?",
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the employee number of the Manager?",
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is the Email of the Manager?",
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What is the Office Number of the Manager?",
        },
    ]).then((answer) =>{
        const newManager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOffice);
        employeeArray.push(newManager);
        menuOption();
    })
}
function menuOption(){
    inquirer.prompt([
    {
        type: "list",
        name: "menuOption",
        message: "Please choose an option:",
        choices: ["Add Engineer", "Add Intern", "Finish Building Team"]
    }
]).then((answer)=>{
    if(answer.menuOption === "Add Engineer"){
        isEngineer();
    } else if (answer.menuOption === "Add Intern"){
        isIntern();
    }
    else{
        buildTeam();
    }
})
}
function isIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the name of the Intern?",
        },
        {
            type: "input",
            name: "internId",
            message: "What is the employee number of the Intern?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the Email of the Intern?",
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the Intern's School?",
        },
    ]).then((answer) =>{
        const newIntern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internSchool);
        employeeArray.push(newIntern);
        menuOption();
    })
}
function isEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the name of the Engineer?",
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the employee number of the Engineer?",
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the Email of the Engineer?",
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the Engineer's Github Username?",
        },
    ]).then((answer) =>{
        const newEngineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGithub);
        employeeArray.push(newEngineer);
        menuOption();
    })

}
function buildTeam(){
    fs.writeFile("roster.html",generateHtml(employeeArray), (err)=>{
        if(err){
            throw err;
        }
        console.log("success");
    })
}
isManager();
