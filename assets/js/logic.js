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

//Trigger by pressing start button, executing displayQuestions 
startButton.addEventListener("click", displayQuestions);


var questionNr=0;
function displayQuestions(){
     //switch hide and start class with setAttribute
     startScreen.setAttribute("class", "hide");
     showQuestions.setAttribute("class", "start");
    
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
     if(questionNr<questions.length) { 
         questionNr++;
        // Remove existing answer buttons
        document.querySelectorAll(".button").forEach(function (button) {
         button.remove();
         
        });

     // Display the next question
     displayQuestions();
   
      }
      //else navigate to scoring HTML
      else{
         showQuestions.setAttribute("class", "hide"); 
         endScreen.setAttribute("class", "start");
      }

   }

   //checking the answer is correct or wrong, display in a new div
   function answerClick(answerData) {
      var feedback = document.createElement("div");
      feedback.setAttribute("class", "feedback");
      if (answerData[1]=="Correct"){
         feedback.textContent ="Correct";
         document.body.appendChild(feedback);
        }
      else{
         feedback.textContent = "Wrong";
         document.body.appendChild(feedback);
      }  
      
    }
console.log(document);