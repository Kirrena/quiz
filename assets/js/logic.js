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

//User object to store highscores with localStorage
var user={};
var questionNr=0;
//create an ordered list for answer buttons
var answerList = document.createElement("ol");


function displayQuestions(){
     
        //start to display the questions from questions array
        actualQuestion.textContent=questions[questionNr].question;
        //creating answers buttons in li items
        questions[questionNr].answer.forEach(function (answerData, j) {
         var answerButton = document.createElement("button");
         answerButton.setAttribute("class", "button");
         answerButton.textContent = (j + 1)+ ". "+answerData[0];
         
         //Check the answer
         answerButton.addEventListener("click", function () {
              answerClick(answerData);
              // Remove feedback if it exists
             var feedback = document.querySelector(".feedback");
              if (feedback) {
              feedback.remove();
    }
          
            nextQuestion(); 
         });
         
         //append buttons
         answerList.appendChild(answerButton);
         // Append the ordered list to the document
         showChoices.appendChild(answerList);

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
      user.score=secondsLeft;
      
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
      user.initial= initials.value.trim();
      // validate the fields
      if (user.initial=== "") {
      alert("Initials cannot be blank");
      return;
      }
      //Convert the user object to a JSON string
      var userJSON = JSON.stringify(user);
      
      // Store the JSON string in localStorage under the key "user"
      localStorage.setItem("user", userJSON);   
   window.location.href="highscores.html";
  
});


