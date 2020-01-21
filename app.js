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
            
            console.log("name:", ans.name);
            console.log("id:", ans.id);
            console.log("email:", ans.email);
            console.log("title:", ans.title);
            

        
            if (ans.title == "manager") {

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
                        console.log("office number:", ans1.officenumber);
                        ansmei = ans1.officenumber
                        console.log("office number:", ansmei);
                        anotherEmployee(ans, ansmei);
                    })
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
                        console.log("Git hub profile:", ans2.githubprofile);
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
                        console.log("Git hub profile:", ans3.school);
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
            console.log("Another employee");

            inquirer
            .prompt([
                {
                    type: "list",
                    name: "another",
                    message: "Do you want to add another employee?",
                    choices: ["Yes", "No"] 
                }
            ])
            .then(ans4 => {
                
                console.log("Yes or No?", ans4.another);
                storeData(ans, ansmei);

                if (ans4.another == "Yes") {
                    //console.log("both ans and ansmei:", ans, ansmei);
                   //storeData(ans, ansmei);
                    init();    
                } 
                else {
                    //console.log("both ans and ansmei:", ans, ansmei);
                    //storeData(ans, ansmei);
                    doHtml();
                }
            })
        }

        function storeData(ans, ansmei) {
            console.log("Store data!");
            console.log(ans.name);
            console.log(ans.id);
            console.log(ans.email);
            console.log(ans.title);
            console.log(ansmei);

            answersArray[i] = ans;
            ansmeiArray[i] = ansmei;
            
            
            
            console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii : ", i);
            console.log("answersArray: ", answersArray[i]);
            console.log("ansmeiArray: ", ansmeiArray[i]);

            i++
            
        }
       
        function doHtml() {
            console.log("Do html!");
        }



                    
//                     // Get the response axios sent and set varibles to support pdf file generation
//                     var color = answers.color
//                     var starsUsers = 0
//                     var filehtml = generateHTML({ ...answers, starsUsers, ...response.data })
//                     const options = { format: 'Letter' };

//                     // Generate pdf file
//                     pdf.create(filehtml, options).toFile('./generateHTML.pdf', function (err, res) {
//                         if (err) return console.log(err);
//                         console.log(res);
//                     })
//                 })
//                 .catch(function (error) {
//                     // handle error
//                     console.log(error);
//                 })


        
} // end function init

init();