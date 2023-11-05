//select final score
var highScores=document.getElementById("highscores");

function getScore() {
    // Retrieve the score from localStorage
   highScores.textContent=localStorage.getItem("score");
}