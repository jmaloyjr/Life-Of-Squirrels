var h2, start, stop, clear, t, squirrelDiv, flag;
var seconds = 0;
var minutes = 0;
var hours = 0;
var leftKey = 37, rightKey = 39;
var squirrelLeftTree = 375;
var squirrelRightTree = 1110;
var loading = 1;
var customFlag = 0;
var obstacles = [];
var spawnInc = 0;
var spawnRate = 1500;
var branchLeftOnScreen = false;
var branchRightOnScreen = false;
var chickfilaLeftOnScreen = false;
var chickfilaRightOnScreen = false;
var acornLeftOnScreen = false;
var acornRightOnScreen = false;
var goldAcornLeftOnScreen = false;
var goldAcornRightOnScreen = false;
var coneLeftOnScreen = false;
var coneRightOnScreen = false;
var hawkLeftOnScreen = false;
var hawkRightOnScreen = false;
var playerAlive = false;
var shouldCollide = true;
var obstacleSpeed = 0.5;

function onLoad() {
    h2 = document.getElementsByTagName('h2')[0];
    start = document.getElementById('start');
    stop = document.getElementById('stop');
    clear = document.getElementById('clear');
    restartTimer();
    playerAlive = true;
    asquirrel = new squirrel(squirrelRightTree, squirrelLeftTree, squirrelRightTree, squirrelImg);

    //obstacles.push(new right_branches());
    //obstacles.push(new left_branches());
    this.difficulty = setInterval(increaseDifficulty, 5000);
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
//This changes the squirrel image to blue
//Must change so this happens to people whos scores are >100
function customChar() {
    window.alert("You can customize your squirrel once you reach 100 points!");
    customFlag++;
    if (customFlag == 3){
        customFlag = 0;
    }
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
    if(loading == 2){
        setTimeout(spawnObstacle, 5000);
        loading++;
    }
    else if(playerAlive){
        spawnObstacle();
    }
    if(obstacles.length > 0)
    {
        obstacles.forEach(obj => obj.newPos());
    }
}

function increaseDifficulty(){
    if(spawnRate>500){
        spawnRate-=200;
        spawnInc = spawnRate;
        spawnObstacle();
    }
    if(obstacleSpeed<1.3){
        obstacleSpeed+=0.2;
    }
}
function spawnObstacle() {
    if(spawnInc >= spawnRate){//spawn every 8 seconds
        spawnInc = 0;
        var r = Math.random();
        //good obstacle
        if(r<0.50){
            var i = Math.random();
            //chickfila
            if(i < 0.40){
                var leftOrRight = Math.random();
                //left chickfila
                if(leftOrRight < 0.50){
                    if(chickfilaLeftOnScreen){
                        spawnObstacle();
                    }
                    else {
                        $("#chickfila_left").removeClass('hidden');
                        chickfilaLeftOnScreen = true;
                        obstacles.push(new left_obstacles("chickfila"));
                    }
                }
                //right chickfila
                else{
                    if(chickfilaRightOnScreen){
                        spawnObstacle();
                    }
                    else {
                        $("#chickfila_right").removeClass('hidden');
                        chickfilaRightOnScreen = true;
                        obstacles.push(new right_obstacles("chickfila"));
                    }
                }
            }
            //regular acorn
            else if(i < 0.80){
                var leftOrRight = Math.random();
                //left reg acorn
                if(leftOrRight < 0.50){
                    if(acornLeftOnScreen){
                        spawnObstacle();
                    }
                    else {
                        $("#acorn_left").removeClass('hidden');
                        acornLeftOnScreen = true;
                        obstacles.push(new left_obstacles("acorn"));
                    }
                }
                //right reg acorn
                else{
                    if(acornRightOnScreen){
                        spawnObstacle();
                    }
                    else {
                        $("#acorn_right").removeClass('hidden');
                        acornRightOnScreen = true;
                        obstacles.push(new right_obstacles("acorn"));
                    }
                }
            }
            //golden acorn
            else {
                var leftOrRight = Math.random();
                //left golden acorn
                if(leftOrRight < 0.50){
                    if(goldAcornLeftOnScreen){
                        spawnObstacle();
                    }
                    else {
                        $("#gold_acorn_left").removeClass('hidden');
                        goldAcornLeftOnScreen = true;
                        obstacles.push(new left_obstacles("gold_acorn"));
                    }
                }
                //right golden acorn
                else{
                    if(goldAcornRightOnScreen){
                        spawnObstacle();
                    }
                    else {
                        $("#gold_acorn_right").removeClass('hidden');
                        goldAcornRightOnScreen = true;
                        obstacles.push(new right_obstacles("gold_acorn"));
                    }
                }
            }
        }
        //bad obstacle
        else {
            var i = Math.random();
            //branch
            if(i < 0.40){
                var leftOrRight = Math.random();
                //left branch
                if(leftOrRight < 0.50){
                    if(branchLeftOnScreen){
                        spawnObstacle();
                    }
                    else{
                        $("#branch_left").removeClass('hidden');
                        branchLeftOnScreen = true;
                        obstacles.push(new left_obstacles("branch"));
                    }
                }
                //right branch
                else {
                    if(branchRightOnScreen){
                        spawnObstacle();
                    }
                    else{
                        $("#branch_right").removeClass('hidden');
                        branchRightOnScreen = true;
                        obstacles.push(new right_obstacles("branch"));
                    }
                }
            }
            //construction cone
            else if(i < 0.80){
                var leftOrRight = Math.random();
                //left cone
                if(leftOrRight < 0.50){
                    if(coneLeftOnScreen){
                        spawnObstacle();
                    }
                    else {
                        $("#cone_left").removeClass('hidden');
                        coneLeftOnScreen = true;
                        obstacles.push(new left_obstacles("cone"));
                    }
                }
                //right cone
                else {
                    if(coneRightOnScreen){
                        spawnObstacle();
                    }
                    else{
                        $("#cone_right").removeClass('hidden');
                        coneRightOnScreen = true;
                        obstacles.push(new right_obstacles("cone"));
                    }
                }
            }
            //hawk
            else {
                var leftOrRight = Math.random();
                //left hawk
                if(leftOrRight < 0.50){
                    if(hawkLeftOnScreen){
                        spawnObstacle();
                    }
                    else {
                        $("#hawk_left").removeClass('hidden');
                        hawkLeftOnScreen = true;
                        obstacles.push(new left_obstacles("hawk"));
                    }
                }
                //right hawk
                else {
                    if(hawkRightOnScreen){
                        spawnObstacle();
                    }
                    else{
                        $("#hawk_right").removeClass('hidden');
                        hawkRightOnScreen = true;
                        obstacles.push(new right_obstacles("hawk"));
                    }
                }
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
    $('#gameScreen').addClass('hidden');
    $('#directions-page').addClass('hidden');
    $('#endGameScreen').addClass('hidden');
    $('#start-page').removeClass('hidden');
    obstacleSpeed = 0.5;
    spawnRate = 1500;
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
    obstacleSpeed = 0.5;
    spawnRate = 1500;
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
        if(customFlag == 1){
        self.squirrelImg.src="../style/images/blue-squirrel-right.gif";
        }
        else if (customFlag == 2){
            self.squirrelImg.src="../style/images/lime-squirrel-right.gif";
        }
        else{
            self.squirrelImg.src="../style/images/squirrel-right.gif";
        }
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
        if(customFlag == 1){
            self.squirrelImg.src="../style/images/blue-squirrel-left-jump.gif";
            }
            else if (customFlag == 2){
                self.squirrelImg.src="../style/images/lime-squirrel-left-jump.gif";
            }
            else{
                self.squirrelImg.src="../style/images/squirrel-left-jump.gif";
            }

    };

    this.moveRight = function () {
        self.inMotion = true;
        self.doneMovement = false;
        self.changePosInterval = setInterval(function () { self.changePosition(self.movePixels); }, self.frames);
        self.checkEndMovementInterval = setInterval(function () { self.atEndLoc(self.rightX); }, self.frames);
        if(customFlag == 1){
            self.squirrelImg.src="../style/images/blue-squirrel-right-jump.gif";
            }
            else if (customFlag == 2){
                self.squirrelImg.src="../style/images/lime-squirrel-right-jump.gif";
            }
            else{
                self.squirrelImg.src="../style/images/squirrel-right-jump.gif";
            }
    };

    this.atEndLoc = function (endPos) {
        if (endPos == self.Position) {
            self.doneMovement = true;
            if (endPos == rightX) {
                if(customFlag == 1){
                    self.squirrelImg.src="../style/images/blue-squirrel-right.gif";
                    }
                    else if (customFlag == 2){
                        self.squirrelImg.src="../style/images/lime-squirrel-right.gif";
                    }
                    else{
                        self.squirrelImg.src="../style/images/squirrel-right.gif";
                    }
            }
            else {
                if(customFlag == 1){
                    self.squirrelImg.src="../style/images/blue-squirrel-left.gif";
                    }
                    else if (customFlag == 2){
                        self.squirrelImg.src="../style/images/lime-squirrel-left.gif";
                    }
                    else{
                        self.squirrelImg.src="../style/images/squirrel-left.gif";
                    }
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
    console.log(is_colliding($('#squirrel'), $("#branch_right")));
    //shouldCollide = true;
}

// Class to create right branches
class right_obstacles {
    constructor(type) {
        this.x = 0; //x_start;
        this.y = 0; //y_start;
        this.type = type;
        if(this.type==="branch"){
            this.height = document.getElementById("branch_right").height
        }
        else if(this.type === "chickfila"){
            this.height = document.getElementById("chickfila_right").height
        }
        else if(this.type === "acorn"){
            this.height = document.getElementById("acorn_right").height
        }
        else if(this.type === "gold_acorn"){
            this.height = document.getElementById("gold_acorn_right").height
        }
        else if(this.type === "cone"){
            this.height = document.getElementById("cone_right").height
        }
        else{
            this.height = document.getElementById("hawk_right").height
        }
        this.speedX = 0;
        this.speedY = obstacleSpeed;
        this.gravity = 0.05;
        this.frames = 10;
        this.tick = 0;
    }

    // Called every tick to update the position of the branch
    update() {
        if(shouldCollide && is_colliding($('#squirrel'), $('#' + this.type + "_right"))){
            shouldCollide = false;
            //setTimeout(setShouldCollide(), 1000);
            console.log("Collided!");
        }
        if(!shouldCollide && !is_colliding($('#squirrel'), $('#' +  this.type + "_right"))){
            console.log("Done Collision");
            shouldCollide = true;
        }

        if(this.type==="branch"){
            $('#branch_right').css("top",this.y+'px');
        }
        else if(this.type === "chickfila"){
            $('#chickfila_right').css("top",this.y+'px');
        }
        else if(this.type === "acorn"){
            $('#acorn_right').css("top",this.y+'px');
        }
        else if(this.type === "gold_acorn"){
            $('#gold_acorn_right').css("top",this.y+'px');
        }
        else if(this.type === "cone"){
            $('#cone_right').css("top",this.y+'px');
        }
        else if(this.type === "hawk"){
            $('#hawk_right').css("top",this.y+'px');
        }
    }

    // Removes the branch if the player hits the bottom
    hitBottom() {
        var rockbottom = 750; // Change this value
        if (this.y + this.height > rockbottom) {
            obstacles.splice(0,1);
            if(this.type === "branch"){
                $('#branch_right').addClass('hidden');
                branchRightOnScreen = false;
            }
            else if(this.type==="chickfila"){
                $('#chickfila_right').addClass('hidden');
                chickfilaRightOnScreen = false;
            }
            else if(this.type==="acorn"){
                $('#acorn_right').addClass('hidden');
                acornRightOnScreen = false;
            }
            else if(this.type==="gold_acorn"){
                $('#gold_acorn_right').addClass('hidden');
                goldAcornRightOnScreen = false;
            }
            else if(this.type === "cone"){
                $('#cone_right').addClass('hidden');
                coneRightOnScreen = false;
            }
            else if(this.type === "hawk"){
                $('#hawk_right').addClass('hidden');
                hawkRightOnScreen = false;
            }
        }
    }

    
    // Creates the new position
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY + this.gravity;
        this.hitBottom();
        this.update();
    }
}

// Class to create left_branches
class left_obstacles {
    constructor(type) {
        this.x = 0; //x_start;
        this.y = 0; //y_start;
        this.type = type;
        if(this.type==="branch"){
            this.height = document.getElementById("branch_left").height
        }
        else if(this.type === "chickfila"){
            this.height = document.getElementById("chickfila_left").height
        }
        else if(this.type === "acorn"){
            this.height = document.getElementById("acorn_left").height
        }
        else if(this.type === "gold_acorn"){
            this.height = document.getElementById("gold_acorn_left").height
        }
        else if(this.type === "cone"){
            this.height = document.getElementById("cone_left").height
        }
        else{
            this.height = document.getElementById("hawk_left").height
        }
        this.speedX = 0;
        this.speedY = obstacleSpeed;
        this.gravity = 0.05;
        this.frames = 10;
    }

    // Called every tick to update position of branch
    update() {
        if(shouldCollide && is_colliding($('#squirrel'), $('#' + this.type + "_left"))){
            shouldCollide = false;
            console.log("Collided!");
        }
        if(!shouldCollide && !is_colliding($('#squirrel'), $('#' + this.type + "_left"))){
            console.log("Done Collision");
            shouldCollide = true;
        }

        if(this.type === "branch"){
            $('#branch_left').css("top",this.y+'px');
        }
        else if(this.type==="chickfila"){
            $('#chickfila_left').css("top",this.y+'px');
        }
        else if(this.type==="acorn"){
            $('#acorn_left').css("top",this.y+'px');
        }
        else if(this.type==="gold_acorn"){
            $('#gold_acorn_left').css("top",this.y+'px');
        }
        else if(this.type === "cone"){
            $('#cone_left').css("top",this.y+'px');
        }
        else if(this.type === "hawk"){
            $('#hawk_left').css("top",this.y+'px');
        }
    }

    // Remove the branch if it hits the bottom
    hitBottom() {
        var rockbottom = 750; // Change this value
        if (this.y + this.height > rockbottom) {
            //this.y = 0;
            obstacles.splice(0,1);
            if(this.type === "branch"){
                $('#branch_left').addClass('hidden');
                branchLeftOnScreen = false;
            }
            else if(this.type==="chickfila"){
                $('#chickfila_left').addClass('hidden');
                chickfilaLeftOnScreen = false;
            }
            else if(this.type==="acorn"){
                $('#acorn_left').addClass('hidden');
                acornLeftOnScreen = false;
            }
            else if(this.type==="gold_acorn"){
                $('#gold_acorn_left').addClass('hidden');
                goldAcornLeftOnScreen = false;
            }
            else if(this.type === "cone"){
                $('#cone_left').addClass('hidden');
                coneLeftOnScreen = false;
            }
            else if(this.type === "hawk"){
                $('#hawk_left').addClass('hidden');
                hawkLeftOnScreen = false;
            }
        }
    }

    // Creates the new position
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY + this.gravity;
        this.hitBottom();
        this.update();
    }
}

