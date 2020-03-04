var h2, start, stop, clear, t;
var seconds = 0;
var minutes = 0;
var hours = 0;


function onLoad() {
    h2 = document.getElementsByTagName('h2')[0];
    start = document.getElementById('start');
    stop = document.getElementById('stop');
    clear = document.getElementById('clear');
    gameTimer();

}
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    gameTimer();
}
function gameTimer() {
    t = setTimeout(add, 1000);
}

// Used to remove a heart when the squirrel touches an object
function removeHeart() {

    // Grab all the heart images from the hmtl page 
    var heart1 = $("#heart1");
    var heart2 = $("#heart2");
    var heart3 = $("#heart3");

    if (heart1.hasClass('removed') && heart2.hasClass('removed')) {

        heart3.addClass("removed");
        console.log("End game")
        endGame()


    } else if (heart1.hasClass('removed')) {
        heart2.addClass('removed');
    } else {
        heart1.addClass('removed');
    }

    console.log('Heart Removed');
}

// Used to add heart when the squirrel picks up a heart
function addHeart() {

    // Grab all the heart images from the html page
    var heart1 = $("#heart1");
    var heart2 = $("#heart2");

    if (heart1.hasClass('removed') && heart2.hasClass('removed')) {
        heart2.removeClass('removed');
    } else if (heart1.hasClass('removed')) {
        heart1.removeClass('removed');
    }

    console.log('Heart Added')
}

function startGame() {
    $('#start-page').addClass('hidden');
    $('#directions-page').addClass('hidden');
    $('#endGameScreen').addClass('hidden');
    $('#gameScreen').removeClass('hidden');
    onLoad();
}
function howToPlay() {
    $('#start-page').addClass('hidden');
    $('#directions-page').removeClass('hidden');
}

// Function used to end the game and change screen
function endGame() {

    // Close down game screen, also set hearts back and open endgame
    $('#gameScreen').addClass('hidden');
    $('#heart1').removeClass('removed');
    $('#heart2').removeClass('removed');
    $('#heart3').removeClass('removed');
    $('#endGameScreen').removeClass('hidden');

}