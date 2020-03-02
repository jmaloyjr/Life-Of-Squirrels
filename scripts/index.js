var leftKey = 37, rightKey = 39;

function onLoad(){
    $('body').keydown(function(event){
        if(event.which == leftKey){
            moveSquirel(-1);
        }
        else if(event.which == rightKey){
            moveSquirel(1);
        }
    });
    
}

function moveSquirel(direction){
    
}

