let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h2 = document.querySelector('h2');

document.addEventListener("keypress", function(){
    if(started==false){
        // console.log("game is started");
        started=true;
        levelUp();
    }
});

function gameFlash(btn){ // Flashing buttons
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250)
}
function userFlash(btn){ // Flashing while clicking answer buttons by user
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250)
}


function levelUp(){
    userSeq = []; // we are emptying the array so that the user has to press again the earlier buttons with the next button which will be flashed as level progresses
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`); 
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);

}

function btnPress(){ // User button press
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function checkAns(idx){ // checking the user's answers match with the game 
    if(userSeq[idx] == gameSeq[idx]){
        // console.log("same value");
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b>.<br> Press any key to restart the game.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "black";
        },150)
        reset();
    }
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){ // for user pressing button 
    btn.addEventListener("click", btnPress)
}
function reset(){
    started = false;
    gameSeq=[];
    userSeq=[];
    level = 0;
}
