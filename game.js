var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keydown(function () {
    if(gameStarted == false) {
        $("#level-title").html("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

$("#green").click(function () {
    buttonClick("green");
    checkAnswer(userClickedPattern.length-1);
});
$("#red").click(function () {
    buttonClick("red");
    checkAnswer(userClickedPattern.length-1);
});
$("#yellow").click(function () {
    buttonClick("yellow");
    checkAnswer(userClickedPattern.length-1);
});
$("#blue").click(function () {
    buttonClick("blue");
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    level++;
    $("#level-title").html("Level " + level);
    var id = "#" + randomChosenColor;
    $(id).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function buttonClick(color) {
    var userChosenColor = color;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor)
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(i) {
    var correct = true;
    if(gamePattern[i] !== userClickedPattern[i]) {
        correct = false;
    }

    if(!correct) {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
        return;
    }
    if(i+1 === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
        userClickedPattern = [];
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
    userClickedPattern = [];
}