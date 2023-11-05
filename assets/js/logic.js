//Select start button by Id
var startButton=document.getElementById("start");
//Select questions div
var showQuestions=document.getElementById("questions");
//Select the actual h2 question 
var actualQuestion=document.getElementById("question-title");
//Select choices
var showChoices=document.getElementById("choices");
//Select div with start-screen id to make possible to hide swicthing class
var startScreen=document.getElementById("start-screen");
//Select div with end-screen Id to make possible to hide swicthing class
var endScreen=document.getElementById("end-screen");
//Select timer
var timeEl=document.getElementById("time");
//select submit button
var submitButton=document.getElementById("submit");
//select initial input text
var initials=document.getElementById("initials");
//select final score
var finalScore=document.getElementById("final-score");

//Trigger by pressing start button, executing displayQuestions 
startButton.addEventListener("click", function(){
//switch hide and start class with setAttribute
   startScreen.setAttribute("class", "hide");
   showQuestions.setAttribute("class", "start");
   displayQuestions();
   setTime();
});


var questionNr=0;
function displayQuestions(){
     
        //start to display the questions from questions array
        actualQuestion.textContent=questions[questionNr].question;
        //creating answers buttons
        questions[questionNr].answer.forEach(function (answerData, j) {
         var answerButton = document.createElement("button");
         answerButton.setAttribute("class", "button");
         answerButton.textContent = answerData[0];
         document.body.appendChild(answerButton);
         //Check the answer, display in a newly created div
         answerButton.addEventListener("click", function () {
              answerClick(answerData);
              // Remove feedback if it exists
             var feedback = document.querySelector(".feedback");
              if (feedback) {
              feedback.remove();
    }
          
            nextQuestion(); 
         });
      
      });
       
      }

  //function for the following question
   function nextQuestion(){
       //validating if we still have questions
     if(questionNr<questions.length-1) { 
         questionNr++;
        // Remove existing answer buttons
        document.querySelectorAll(".button").forEach(function (button) {
         button.remove();
         
        });

      // Display the next question
      displayQuestions(questionNr);
      startTimer();
      }
      //else navigate to scoring HTML part
      else{
         gameOver();
         
   }
}
function gameOver(){
   // Remove existing answer buttons
   document.querySelectorAll(".button").forEach(function (button) {
      button.remove();})
      // Remove feedback if it exists
      var feedback = document.querySelector(".feedback");
      if (feedback) {
      feedback.remove();
      showQuestions.setAttribute("class", "hide"); 
      endScreen.setAttribute("class", "start");
      clearInterval(timerInterval);
      
      finalScore.textContent=secondsLeft;
      
      localStorage.setItem("score", secondsLeft);
   }

}


   //checking the answer is correct or wrong, display in a new div
   function answerClick(answerData) {
      var feedback = document.createElement("div");
      feedback.setAttribute("class", "feedback");
      if (answerData[1]=="Correct"){
         feedback.textContent ="Correct";
         document.body.appendChild(feedback);
         //const audio = new Audio("sfx/correct.wav");
         //audio.play();
        }
      else{
         feedback.textContent = "Wrong";
         document.body.appendChild(feedback);
         secondsLeft -= 10;
         //const audio = new Audio("sfx/incorrect.wav");
         //audio.play();
      }  
      
    }
  //Set timer
  var secondsLeft = 75;
  var timerInterval;  

  function setTime() {
   timeEl.textContent = secondsLeft;
   startTimer();
}

function startTimer() {
   clearInterval(timerInterval);
   timerInterval = setInterval(function () {
       secondsLeft--;
       timeEl.textContent = secondsLeft;
       //Go to scoring part
       if (secondsLeft <= 0) {
           clearInterval(timerInterval);
           gameOver();
           
       }
   }, 1000);
}

//create user initial string and score  
submitButton.addEventListener("click", function(){
   var user= initials.value.trim();
      // validate the fields
      if (user=== "") {
      alert("Initials cannot be blank");
      }
      else{
         localStorage.setItem("user", user);
      }
   window.location.href="highscores.html";
  
});