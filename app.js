const inquirer = require("inquirer");
//const Employee = require("./employee");
//const Manager = require("./manager");
//const Engineer = require("./engineer");
//const Intern = require("./intern");
// const generateHTML = require("./generateHTML");
let ansmei = "";
let i = 0;
var answersArray = [""];
var ansmeiArray = [""];
let managerjustOne = true;

function init() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the employee's name?",
                validate: validateName
            },
            {
                type: "input",
                name: "id",
                message: "What is the employee's id number?",
                validate: validateNumber
            },
            {
                type: "input",
                name: "email",
                message: "What is the employee's email?",
                validate: validateEmail
            },
            {
                type: "list",
                name: "title",
                message: "What is the employee's title?",
                choices: ["manager", "engineer", "intern"]
            }
           
        ])
        .then(ans => {
            
                if (ans.title == "manager") {

                    if (managerjustOne === true) {

                        managerjustOne = false;
                        inquirer
                            .prompt([
                            {
                                type: "input",
                                name: "officenumber",
                                message: "What is the employee's office number?",
                                validate: validateNumber
                            }
                            ])
                            .then(ans1 => {
                                ansmei = ans1.officenumber;
                                anotherEmployee(ans, ansmei);
                            })

                    } else {
                        console.log("Only one manager, please... otherwise too many chiefs!!!");
                        init();
                    } // end of managerjustOne if/else

                } else if (ans.title == "engineer") {

                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "githubprofile",
                                message: "What is the employee's GitHub profile?",
                                validate: validateGithub
                            }
                        ])
                        .then(ans2 => {
                            ansmei = ans2.githubprofile
                            anotherEmployee(ans, ansmei);
                        })
                    
                } else if (ans.title == "intern") {

                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "school",
                                message: "What is the employee's school name?",
                                validate: validateName
                            }
                        ])
                        .then(ans3 => {
                            ansmei = ans3.school
                            anotherEmployee(ans, ansmei);
                        })
                } // end of ifs
       
        }) // end of .then


        // Input validation functions    
        function validateName(input) {
            if (!input.match(/^[A-Z][A-Z ]{0,}/i)) {
                return "Must contain at least 1 character and may contain only letters and spaces!"; 
            } else {
                return true;
            }
        }
        function validateNumber(input) {
            if (!input.match(/^[0-9]+$/)) {
            return "Must be a number!";
            } else {
            return true;
            }
        }
        function validateEmail(input) {
            if (!input.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
            return "Must be a valid email address!";
            } else {
            return true;
            }
        }
        function validateGithub(input) {
            if (!input.match(/^[A-Z0-9_]{3,}$/i)) {
            return "Must be a valid Github name! (3 characters - numbers and/or letters)";
            } else {
            return true;
        }
        }
        // end of Input validation functions 


        function anotherEmployee(ans, ansmei) {

            inquirer
            .prompt([
                {
                    type: "list",
                    name: "whattodo",
                    message: "What to do next?",
                    choices: ["Add another employee", "Print HTML", "Exit program"] 
                }
            ])
            .then(ans4 => {
                
                storeData(ans, ansmei);
                               
                if (ans4.whattodo == "Add another employee") {
                    init();  
                }                
                else if (ans4.whattodo == "Print HTML") {
                   
                    var a;
                    console.log("array length: ", ansmeiArray.length);
         
                    for (a = 0; a < ansmeiArray.length; a++) {
                        console.log(answersArray[a]);
                        console.log("Office/Git/School: ", ansmeiArray[a]);
                    }

                    for (a = 0; a < ansmeiArray.length; a++) {
                        
                        if (answersArray[a].title == "manager") {
                            ansmeiArray[a] = 'Office number: ' + ansmeiArray[a];
                            console.log(ansmeiArray[a]);
                        } 
                        else if (answersArray[a].title == "engineer") {
                            ansmeiArray[a] = 'Github Profile: ' + ansmeiArray[a];
                            console.log(ansmeiArray[a]);
                        }
                        else if (answersArray[a].title == "intern") {
                            ansmeiArray[a] = 'School: ' + ansmeiArray[a];
                            console.log(ansmeiArray[a]);
                        }

                    } //end for loop
               
                    // var filehtml = generateHTML({ ...answers, starsUsers, ...response.data });
                   
                } 
                else if (ans4.whattodo == "Add another employee") {
                    console.log("Thank for using the app! Goodbye!");

                }
            }) // end inquire prompt/then
        } // end anotherEmployee function

        function storeData(ans, ansmei) {
            answersArray[i] = ans;
            ansmeiArray[i] = ansmei;
            i++
        } //end function storeData
        
} // end function init

init();