var h2, start, stop, clear, t, squirrelDiv, flag;
var seconds = 0;
var minutes = 0;
var hours = 0;
var leftKey = 37, rightKey = 39;
var squirrelLeftTree = 200;
var squirrelRightTree = 1200;
var loading = 1;
var obstacles = [];
var spawnInc = 0;
var playerAlive = false;
var shouldCollide = true;

function onLoad() {
    console.log("reached onLoad");
    h2 = document.getElementsByTagName('h2')[0];
    start = document.getElementById('start');
    stop = document.getElementById('stop');
    clear = document.getElementById('clear');
    squirrelImg = document.getElementById('squirrelImg');
    restartTimer();
    playerAlive = true;
    asquirrel = new squirrel(squirrelRightTree, squirrelLeftTree, squirrelRightTree, squirrelImg);

    //obstacles.push(new right_branches());
    //obstacles.push(new left_branches());
    this.on_tick = setInterval(on_tick, 1);

    $('body').keydown(function(event){
        if(!asquirrel.inMotion){
            if(event.which == leftKey){
                asquirrel.moveLeft();
            }
            else if(event.which == rightKey){
                asquirrel.moveRight();
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

function on_tick() {
    //console.log("reached ontick");
    if(loading == 2){
        console.log("first ontick");
        setTimeout(spawnObstacle, 5000);
        loading++;
    }
    else if(playerAlive){
        //console.log("all other onticks")
        spawnObstacle();
    }
    
    /*r = Math.floor((Math.random() * 500) + 1);
    if(r == 1){
        //obstacles.push(new left_branches());
    } else if(r == 2){
        //obstacles.push(new right_branches());
    }*/
    if(obstacles.length > 0)
    {
        obstacles.forEach(obj => obj.newPos());
    }
}

function spawnObstacle() {
    //console.log("reached spawnObstacles");
    if(spawnInc == 2000){//spawn every 5000ms
        spawnInc = 0;
        console.log("inside if of spawnObstacles");
        var r = Math.random();
        //good obstacle
        if(r<0){
            var i = Math.random();
            //chickfila
            if(i < 0.50){

            }
            //acorn
            else{

            }
        }
        //bad obstacle
        else {
            var i = Math.random();
            //branch
            if(i < 1){
                var leftOrRight = Math.random();
                //left branch
                if(leftOrRight < 0.50){
                    console.log("spawning left branch");
                    $("#branch_left").removeClass('hidden');
                    obstacles.push(new left_branches());
                }
                //right branch
                else {
                    console.log("spawning right branch");
                    $("#branch_right").removeClass('hidden');
                    obstacles.push(new right_branches());
                }
            }
            //hawk
            else{

            }
        }
    }
    else{
        spawnInc++;
    }
}

var is_colliding = function( $div1, $div2 ) {
	// Div 1 data
	var d1_offset             = $div1.offset();
	var d1_height             = $div1.outerHeight( true );
	var d1_width              = $div1.outerWidth( true );
	var d1_distance_from_top  = d1_offset.top + d1_height;
	var d1_distance_from_left = d1_offset.left + d1_width;

	// Div 2 data
	var d2_offset             = $div2.offset();
	var d2_height             = $div2.outerHeight( true );
	var d2_width              = $div2.outerWidth( true );
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;

	var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );

	// Return whether it IS colliding
	return ! not_colliding;
};


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
    while(obstacles.length>0){
        obstacles.pop();
    }
    $('#gameScreen').addClass('hidden');
    $('#directions-page').addClass('hidden');
    $('#endGameScreen').addClass('hidden');
    $('#start-page').removeClass('hidden');
    playerAlive = false;
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
    playerAlive = false;
    flag = 1;
    seconds = 0; minutes = 0; hours = 0;
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

function setShouldCollide(){
    shouldCollide = true;
}

class right_branches {
    constructor() {
        this.x = 0; //x_start;
        this.y = 0; //y_start;
        this.speedX = 0;
        this.speedY = 0.5;
        this.gravity = 0.05;
        this.frames = 10;
       // this.shouldCollide = true;
        this.tick = 0;
    }

    update() {
        $('#branch_right').css("top",this.y+'px');

        if(shouldCollide && is_colliding($('#squirrel'), $("#branch_right"))){
            shouldCollide = false;
            setTimeout(setShouldCollide(), 1000);
            console.log("Collided!");
        }
    }

    hitBottom() {
        var rockbottom = 800; // Change this value
        if (this.y > rockbottom) {
          obstacles.splice(0,1);
        }
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY + this.gravity;
        this.hitBottom();
        this.update();
    }
}

class left_branches {
    constructor() {
        this.x = 0; //x_start;
        this.y = 0; //y_start;
        this.speedX = 0;
        this.speedY = 0.5;
        this.gravity = 0.05;
        this.frames = 10;
    }

    
    update() {
        $('#branch_left').css("top",this.y+'px');

        if(shouldCollide && is_colliding($('#squirrel'), $("#branch_left"))){
            shouldCollide = false;
            setTimeout(setShouldCollide(), 1000);
            console.log("Collided!");
        }
    }

    hitBottom() {
        var rockbottom = 800; // Change this value
        if (this.y > rockbottom) {
          //this.y = 0;
          obstacles.splice(0,1);
        }
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY + this.gravity;
        this.hitBottom();
        this.update();
    }
}

