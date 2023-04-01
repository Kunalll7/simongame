var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  $("h1").text("Level " + level);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  var timeOut = setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
 if(window.innerWidth<=1028){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("sucsess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("failure");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over!");
    $(".start").text("restart");
    startOver();
  }
 }
 else{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("sucsess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("failure");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to restart!");
    startOver();
  }
 }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
if (window.innerWidth <= 1028) {
  $(".start").click(function () {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
} else {
  $(document).keydown(function () {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}
