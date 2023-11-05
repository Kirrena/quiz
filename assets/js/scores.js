//select final score
var finalScore=document.getElementById("final-score");

function getScore() {
    // Retrieve the score from localStorage
    finalScore.textContent = localStorage.getItem("score");
}