$(document).ready(function() {
    animateDiv($('.branch1'));
    animateDiv($('.branch2'));
    animateDiv($('.branch3'));

});

var h2, start, stop, clear, t;
var seconds = 0;
var minutes = 0;
var hours = 0;
var leftKey = 37, rightKey = 39;

function onLoad(){
    h2 = document.getElementsByTagName('h2')[0];
    start = document.getElementById('start');
    stop = document.getElementById('stop');
    clear = document.getElementById('clear');

    squirrel = new squirrel(1200, 200, 1200);

    $('body').keydown(function(event){
        if(event.which == leftKey){
            squirrel.moveLeft();
        }
        else if(event.which == rightKey){
            squirrel.moveRight();
        }
    });    

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
function removeHeart(){

    // Grab all the heart images from the hmtl page 
    var heart1 = $("#heart1");
    var heart2 = $("#heart2");
    var heart3 = $("#heart3");

    if(heart1.hasClass('removed') && heart2.hasClass('removed')){
        // This means that all hearts will be gone so endgame
        heart3.addClass("removed");
        //endGame()
    } else if( heart1.hasClass('removed')) {
        heart2.addClass('removed');
    } else {
        heart1.addClass('removed');
    }  

    console.log('Heart Removed');
} 

function startGame(){
    var page = document.getElementById("start-page");
    page.style.display="none";
    var directionsPage=document.getElementById("directions-page");
    directionsPage.style.display="none";
    var newPage = document.getElementById("gameScreen");
    newPage.className="";
    onLoad();
}
function howToPlay(){
    var page = document.getElementById("start-page");
    page.style.display="none";
    var newPage = document.getElementById("directions-page");
    newPage.className="";
}

function makeNewPosition($bg, $target) {
    // Get viewport dimensions (remove the dimension of the div)
    var nh = $bg.height() - $target.height();
    var nw = $bg.width() - $target.width();

    //var nh = Math.floor(Math.random() * h);
    //var nw = Math.floor(Math.random() * w);

    return [nh, nw];
}

function animateDiv($target) {
   // if($target.yPos + $target.height() > $target.parent().yPos + $target.parent().height()){
        var newq = makeNewPosition($target.parent(), $target);
        var oldq = $target.offset();
        var speed = calcSpeed([oldq.top, oldq.left], newq);

        $target.animate({
            top: newq[0],
            left: newq[1]
        }, speed, function() {
            animateDiv($target);
        });
   // }
}

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.1;

    //var speed = greatest;
    var speed = Math.ceil(greatest / speedModifier);

    return speed;
}

var squirrel=function(xPos,leftX,rightX){
    var self=this;
    this.Position=xPos;
    this.leftX=leftX;
    this.rightX=rightX;
    this.doneMovement = false;
    this.changePosInterval;
    this.checkEndMovementInterval;
    this.frames = 10;
    this.initialize=function()
    {
    };
    this.setPosition=function(xPos){
        if (xPos<self.leftX)
        {
            self.Position=self.leftX;
        }
        else if (xPos>self.rightX){
            self.Position=self.rightX;  
        }
        else
        {
            self.Position=xPos;
        }
    };

    this.moveLeft=function(){
        this.doneMovement = false;
        self.changePosInterval = setInterval(function(){self.changePosition(-10);}, self.frames);
        self.checkEndMovementInterval = setInterval(function(){self.atEndLoc(200);}, self.frames);
    };

    this.moveRight=function(){
        this.doneMovement = false;
        self.changePosInterval = setInterval(function(){self.changePosition(10);}, self.frames);
        self.checkEndMovementInterval = setInterval(function(){self.atEndLoc(875);}, self.frames);
    };

    this.atEndLoc=function(endPos){
        if(endPos == this.Position){
            this.doneMovement = true;
        }
    };
    
    this.changePosition=function(amount){
        if(!self.doneMovement){
            self.setPosition(self.Position+amount);
            $('#squirrel').css("left",self.Position+'px');
        }
        else{
            self.stopMovement();
        }
    };
    this.initialize();

    this.stopMovement=function(){
        clearInterval(self.changePosInterval);
        clearInterval(self.checkEndMovementInterval);
    }
}

