//Global variables for game
let myPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let inGame = false;
let myTitle = $("#level-title");
let audio;

//Starting the game
$(document).keydown(()=>{
    if(!inGame){
        randomColour();
        myTitle.text("Level 1");
        inGame=true;
    }
});

//Playing
$(".btn").click(function(event){
    if(inGame)game(event);
});


/*-------My functions-------*/
function randomColour(){
    //Choosing a colour
    let myRandomColour = buttonColors[Math.floor(Math.random()*4)]

    //Choosing the sound for that colour
    audio = new Audio("sounds/"+ myRandomColour + ".mp3").play();

    //Animation
    $("#" + myRandomColour).fadeOut(100).fadeIn(100);

    //Add items to game pattern
    gamePattern.push(myRandomColour);
}

function game(e){
    //Pushing my button in myPatter array
    myPattern.push(e.target.id);

    //checking for an error
    for(let i=0; i<myPattern.length; i++){
        if(myPattern[i] != gamePattern[i]){
            endGame();  //Game Over
            break;
        }
    }

    //Some pretty behavior
    if(inGame){
        //Animation
        $("#"+ e.target.id).addClass("pressed");
        setTimeout(() => $("#"+ e.target.id).removeClass("pressed"),100);

        //Sounds
        audio = new Audio("sounds/"+ e.target.id + ".mp3").play();
    }

    //Level completed and next level
    if((myPattern.length >= gamePattern.length) && inGame){
        //Next level text
        let newLevel = myTitle.text().split(" ");
        newLevel[1] = String(Number(newLevel[1]) + 1);
        myTitle.text(newLevel.join(" "))
        
        randomColour();
        myPattern=[];
    }
}

function endGame(){
    //Clearing variables
    gamePattern = [];
    myPattern = [];
    inGame = false;

    //Some pretty behavior
    myTitle.text("Game Over, Press Any Key to Restart"); //Setting Game Over text
    audio = new Audio("sounds/wrong.mp3").play();   //Playing game over sound
    $("body").addClass("game-over");
    setTimeout(()=>$("body").removeClass("game-over"),100);
}