var startScreen;
var gameHTML;
var counter = 30;

var questions = ["What color is Kyle's hair?", "Mr. Hankey is a ____ poo.", "What band played a part in Cartman's scheme to feed Scott Tennorman's parents to him at the Chili Con Carnival", "Wendy is whose girlfriend?", "Mr. Garison had sex with this evolutionary biologist.", "Who created Southpark?", "What state does Southpark take place in?", "'Ample parking day or night, people shouting ____'"];
var answerArray = [["Ginger", "Brown", "Black", "Blonde"], ["Friendly","Christmas","Stinky","Holiday"], ["Red Hot Chili Peppers", "U2", "Radiohead", "Paramore"], ["Kyle's","Cartman's","Stan's","Butter's"], ["Sam Harris", "Charles Darwin", "Christopher Walken", "Richard Dawkins"], ["Matt Stone and Trey Parker","Fred","Stan Marsh and Kyle Brothsloski","Seth Macfarlane"], ["Alaska", "Colorado", "New Jersey", "West Virgina"], ["Welcome Partner!","Southpark's Awesome!","Sheety Wall!","Howdy Neighbor!"]];
var imageArray = ["<img class='center-block img-right' src='images/kyle.png'>", "<img class='center-block img-right' src='images/hankey.gif'>", "<img class='center-block img-right' src='images/radiohead.gif'>", "<img class='center-block img-right' src='images/StanMarsh.png'>", "<img class='center-block img-right' src='images/dawkins.jpg'>", "<img class='center-block img-right' src='images/mattTrey.gif'>", "<img class='center-block img-right' src='images/colorado.jpg'>", "<img class='center-block img-right' src='images/song.jpg'>"];
var correctAnswers = ["A. Ginger", "B. Christmas", "C. Radiohead", "C. Stan's", "D. Richard Dawkins", "A. Matt Stone and Trey Parker", "B. Colorado", "D. Howdy Neighbor!"];


var i = 0;
var answer;
var timer;
var numCorrect = 0;
var numIncorrect = 0;
var timedOut = 0;

$(document).ready(function() {

    function starterScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start</a></p>";
        $(".mainArea").html(startScreen);
    }

    starterScreen();


    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
      
        print();
        timer_1();

    }); 

    $("body").on("click", ".answer", function(event){
       
        answer = $(this).text();

        if(answer === correctAnswers[i]) {
            

            clearInterval(timer);
            win();
        }
        else {
            
            clearInterval(timer);
            loss();
        }
    }); 

    $("body").on("click", ".reset-button", function(event){
       
        resetGame();
    }); 

});  

function timeOut() {
    timedOut++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[i] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(pause, 4000);  
}

function win() {
    numCorrect++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[i] + "</p>" + imageArray[i];
    $(".mainArea").html(gameHTML);
    setTimeout(pause, 4000); 
}

function loss() {
    numCorrect++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[i] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>" + "<img class='center-block img-right' src='images/incorrect.gif'>";
    $(".mainArea").html(gameHTML);
    setTimeout(pause, 4000); 
}

function print() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[i] + "</p><p class='first-answer answer'>A. " + answerArray[i][0] + "</p><p class='answer'>B. "+answerArray[i][1]+"</p><p class='answer'>C. "+answerArray[i][2]+"</p><p class='answer'>D. "+answerArray[i][3]+"</p>";
    $(".mainArea").html(gameHTML);
}

function pause() {
    if (i < 7) {
        i++;
        print();
        counter = 30;
        timer_1();
    }
    else {
        endScreen();
    }
}

function timer_1() {
    timer = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(timer);
            timeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function endScreen() {
    gameHTML = "<p class='text-center timer-p'>Time: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Times Up! Results: " + "</p>" + "<p class='summary-correct'>Number Correct: " + numCorrect + "</p>" + "<p>Number Incorrect: " + numIncorrect + "</p>" + "<p>Blank: " + timedOut + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset!</a></p>";
    $(".mainArea").html(gameHTML);
}

function resetGame() {
    i = 0;
    numCorrect = 0;
    numIncorrect = 0;
    timedOut = 0;
    counter = 30;
    print();
    timer_1();
}

