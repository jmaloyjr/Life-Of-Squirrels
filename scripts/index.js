var leftKey = 37, rightKey = 39, keylock = false;

function onLoad(){
    console.log("Starting");
    squirrel = new squirrel(875, 200, 875);

    $('body').keydown(function(event){
        if(event.which == leftKey){
            squirrel.moveLeft();
        }
        else if(event.which == rightKey){
            squirrel.moveRight();
        }
    });
    
    
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

function moveSquirel(direction){
    
}

