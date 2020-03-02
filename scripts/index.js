var h1, start, stop, clear
    seconds = 0, minutes = 0, hours = 0,
    t;

function onLoad(){
    h1 = document.getElementsByTagName('h1')[0];
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
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    gameTimer();
}
function gameTimer() {
    t = setTimeout(add, 1000);
}
function startGame(){
    var page = document.getElementById("start-page");
    page.style.display="none";
    var directionsPage=document.getElementById("directions-page");
    directionsPage.style.display="none";
    var newPage = document.getElementById("gameScreen");
    newPage.className="";
}
function howToPlay(){
    var page = document.getElementById("start-page");
    page.style.display="none";
    var newPage = document.getElementById("directions-page");
    newPage.className="";
}