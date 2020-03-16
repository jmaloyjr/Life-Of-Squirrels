var h2, start, stop, clear, t, squirrelDiv, flag;
var seconds = 0;
var minutes = 0;
var hours = 0;
var leftKey = 37, rightKey = 39;
var squirrelLeftTree = 200;
var squirrelRightTree = 1200;
var loading = 1;

function onLoad() {
    h2 = document.getElementsByTagName('h2')[0];
    start = document.getElementById('start');
    stop = document.getElementById('stop');
    clear = document.getElementById('clear');
    squirrelImg = document.getElementById('squirrelImg');
    chickfilaImg = document.getElementById('chickfilaImg');

    restartTimer();
    asquirrel = new squirrel(squirrelRightTree, squirrelLeftTree, squirrelRightTree, squirrelImg);
    achickfila = new chickfila(squirrelRightTree, 0, 1000, squirrelImg);
    $('body').keydown(function(event){
        if(!asquirrel.inMotion){
            if(event.which == leftKey){
                asquirrel.moveLeft();
            }
            else if(event.which == rightKey){
                asquirrel.moveRight();
            }
        }
        if(!achickfila.inMotion){
            achickfila.moveDown();
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

function firstLoad(){
    if(loading == 1){
        onLoad();
        loading++;
    }
}

// Used to remove a heart when the squirrel touches an object
function removeHeart() {

    // Grab all the heart images from the hmtl page 
    var heart1 = $("#heart1");
    var heart2 = $("#heart2");
    var heart3 = $("#heart3");

    if (heart1.hasClass('removed') && heart2.hasClass('removed')) {
        heart3.addClass("removed");
        endGame()
    } else if (heart1.hasClass('removed')) {
        heart2.addClass('removed');
    } else {
        heart1.addClass('removed');
    }
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
}

function titleScreen() {
    $('#gameScreen').addClass('hidden');
    $('#directions-page').addClass('hidden');
    $('#endGameScreen').addClass('hidden');
    $('#start-page').removeClass('hidden');
    flag = 1;
}
function startGame() {
    $('#start-page').addClass('hidden');
    $('#directions-page').addClass('hidden');
    $('#endGameScreen').addClass('hidden');
    $('#gameScreen').removeClass('hidden');
    $('#playerScore').text(0);

    firstLoad();
    restartTimer();
}

function restartTimer() {
    if(flag == 1){
        h2.textContent = "00:00:00";
        seconds = 0; minutes = 0; hours = 0;
        flag = 0;
    }
}
// Function used to end the game and change screen
function endGame() {
    // Close down game screen, also set hearts back and open endgame
    $('#gameScreen').addClass('hidden');
    $('#heart1').removeClass('removed');
    $('#heart2').removeClass('removed');
    $('#heart3').removeClass('removed');
    $('#endGameText').text("Your score was: "  + $('#playerScore').text());
    $('#endGameScreen').removeClass('hidden');
    flag = 1;
    seconds = 0; minutes = 0; hours = 0;
}
var chickfila = function(xPos, yPos, top, bottom, chickfilaImg) {
    var self = this;
    this.XPosition = xPos;
    this.YPosition = yPos;
    this.topY = top;
    this.bottomY = bottom;
    this.doneMovement = false;
    this.chickfilaImg = chickfilaImg;
    this.frames = 10;
    this.movePixels = 10;
    this.changePosInterval;
    this.checkEndMovementInterval;
    
    this.initialize=function()
    {
        //generate random number, 1 or 2. 1 = left tree, 2 = right tree
        var rand = Math.floor((Math.random()*2) + 1);
        if(rand==1){
            $('#chickfila').css("left",squirrelLeftTree+'px');
        }
        else{
            $('#chickfila').css("left", squirrelRightTree+'px');
        }
    }

    this.moveDown = function(){
        self.doneMovement=false;
        self.changePosInterval = setInterval(function() { self.changePosition(-1*self.movePixels); }, self.frames);
        self.checkEndMovementInterval=setInterval(function () { self.atEndLoc(self.bottomY); }, self.frames);
    }

    this.atEndLoc = function (endPos) {
        if (endPos == self.Position) {
            self.doneMovement = true;
            self.addClass('hidden');
        }
    };
}
var squirrel = function (xPos, leftX, rightX, squirrelImg) {
    var self = this;
    this.Position = xPos;
    this.leftX = leftX;
    this.rightX = rightX;
    this.doneMovement = false;
    this.changePosInterval;
    this.checkEndMovementInterval;
    this.frames = 10;
    this.movePixels = 10;
    this.inMotion = false;
    this.squirrelImg = squirrelImg;

    this.initialize=function()
    {
        $('#squirrel').css("left",self.Position+'px');
        self.squirrelImg.src="../style/images/squirrel-right.gif";
    };
    this.setPosition = function (xPos) {
        if (xPos < self.leftX) {
            self.Position = self.leftX;
        }
        else if (xPos > self.rightX) {
            self.Position = self.rightX;
        }
        else {
            self.Position = xPos;
        }
    };

    this.moveLeft = function () {
        self.inMotion = true;
        self.doneMovement = false;
        self.changePosInterval = setInterval(function () { self.changePosition(-1 * self.movePixels); }, self.frames);
        self.checkEndMovementInterval = setInterval(function () { self.atEndLoc(self.leftX); }, self.frames);
        self.squirrelImg.src = "../style/images/squirrel-left-jump.gif";
    };

    this.moveRight = function () {
        self.inMotion = true;
        self.doneMovement = false;
        self.changePosInterval = setInterval(function () { self.changePosition(self.movePixels); }, self.frames);
        self.checkEndMovementInterval = setInterval(function () { self.atEndLoc(self.rightX); }, self.frames);
        self.squirrelImg.src = "../style/images/squirrel-right-jump.gif";
    };

    this.atEndLoc = function (endPos) {
        if (endPos == self.Position) {
            self.doneMovement = true;
            if (endPos == rightX) {
                self.squirrelImg.src = "../style/images/squirrel-right.gif";
            }
            else {
                self.squirrelImg.src = "../style/images/squirrel-left.gif";
            }
        }
    };

    this.changePosition = function (amount) {
        if (!self.doneMovement) {
            self.setPosition(self.Position + amount);
            $('#squirrel').css("left", self.Position + 'px');
        }
        else {
            self.stopMovement();
        }
    };

    this.stopMovement = function () {
        clearInterval(self.changePosInterval);
        clearInterval(self.checkEndMovementInterval);
        self.inMotion = false;
    }

    this.initialize();


}

