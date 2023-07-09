$(".container1").slideUp(1);

$("#instructions").click(function(){
    $(".container1").slideToggle(100);
})

var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var maxlevel = 0;

$(".start").click(function () {
    if (!started) {
        $(".title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    $(".start").text("Start");
    $(".yscore").text("Your Score: 0");
    level++;
    $(".yscore").text("Your Score: "+(level-1));
    if(level>maxlevel){
        maxlevel = level;
    }
    userClickedPattern = [];
    $(".title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".click").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $(".title").text("Game Over");
        $(".start").text("Restart");

        startOver();
        $(".hscore").text("High Score: "+ (maxlevel-1));
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}