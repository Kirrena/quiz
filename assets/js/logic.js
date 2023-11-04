//Select start button by Id
var startButton=document.getElementById("start");
//Select questions div
var showQuestions=document.getElementById("questions");
//Select the actual h2 question 
var actualQuestion=document.getElementById("question-title");
//Select choices
var showChoices=document.getElementById("choices");
//Select div with start-screen class to make possible to hide swicthing class
var startScreen=document.getElementById("start-screen");

//Trigger by pressing start button, executing displayQuestions 
startButton.addEventListener("click", displayQuestions);

function displayQuestions(){
     //switch hide and start class with setAttribute
     startScreen.setAttribute("class", "hide");
     showQuestions.setAttribute("class", "start");
     
     //start to display the questions from questions array
     for (var i=0; i<questions.length; i++){
        actualQuestion=questions[i].question;


     }
     

}
