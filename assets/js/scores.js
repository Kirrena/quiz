//select clear button
var clearButton= document.getElementById("clear");

function getScore() {
    

    // Retrieve the score from localStorage
   var record = document.createElement("li");
   var storedUser = JSON.parse(localStorage.getItem("user"));
   var storedInitial = storedUser.initial;
   var storedScore = storedUser.score;
   record.textContent = storedInitial + " - " + storedScore;
   document.body.children[0].children[1].appendChild(record);

}

getScore();

//reset highscore list
clearButton.addEventListener("click", function(){
    var highscoreList = document.body.children[0].children[1];
    while (highscoreList.firstChild) {
        highscoreList.removeChild(highscoreList.firstChild);
    }
    // Clear the data in localStorage
    localStorage.removeItem("user");


});