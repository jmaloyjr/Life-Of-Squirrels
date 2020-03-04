var h2, start, stop, clear, t, squirrelDiv;
var seconds = 0;
var minutes = 0;
var hours = 0;
var leftKey = 37, rightKey = 39;
var squirrelLeftTree = 200;
var squirrelRightTree = 1200;

function onLoad(){
    h2 = document.getElementsByTagName('h2')[0];
    start = document.getElementById('start');
    stop = document.getElementById('stop');
    clear = document.getElementById('clear');
    squirrelImg = document.getElementById('squirrelImg');

    squirrel = new squirrel(squirrelRightTree, squirrelLeftTree, squirrelRightTree, squirrelImg);

    $('body').keydown(function(event){
        if(!squirrel.inMotion){
            if(event.which == leftKey){
                squirrel.moveLeft();
            }
            else if(event.which == rightKey){
                squirrel.moveRight();
            }
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

var squirrel=function(xPos,leftX,rightX,squirrelImg){
    var self=this;
    this.Position=xPos;
    this.leftX=leftX;
    this.rightX=rightX;
    this.doneMovement = false;
    this.changePosInterval;
    this.checkEndMovementInterval;
    this.frames = 10;
    this.movePixels = 10;
    this.inMotion = false;
    this.squirrelImg = squirrelImg;

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
        self.inMotion = true;
        self.doneMovement = false;
        self.changePosInterval = setInterval(function(){self.changePosition(-1 * self.movePixels);}, self.frames);
        self.checkEndMovementInterval = setInterval(function(){self.atEndLoc(self.leftX);}, self.frames);
    };

    this.moveRight=function(){
        self.inMotion = true;
        self.doneMovement = false;
        self.changePosInterval = setInterval(function(){self.changePosition(self.movePixels);}, self.frames);
        self.checkEndMovementInterval = setInterval(function(){self.atEndLoc(self.rightX);}, self.frames);
    };

    this.atEndLoc=function(endPos){
        if(endPos == self.Position){
            self.doneMovement = true;
            if(endPos == rightX){
                self.squirrelImg.src="../style/images/squirrel-right.gif";
            }
            else{
                self.squirrelImg.src="../style/images/squirrel-left.gif";
            }
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

    this.stopMovement=function(){
        clearInterval(self.changePosInterval);
        clearInterval(self.checkEndMovementInterval);
        self.inMotion = false;
    }

    this.initialize();

    
}

