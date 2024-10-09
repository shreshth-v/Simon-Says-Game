let started = false;
let h4 = document.querySelector("h4");
let p = document.querySelector("p");

let highestScore = 0;

let gameSequence = [];
let userSequence = [];

let level = 0;

let btns = ["red", "yellow", "blue", "green"];

document.addEventListener("keypress", function() {
    if(started === false) {
        started = true;
        
        levelUp();
    }
})


function levelUp() {
    level++;

    h4.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()* 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);

    gameSequence.push(randColor);

    gameFlash(randBtn);
}


function gameFlash(btn) {
    btn.classList.add("gameFlash");

    setTimeout(function() {
        btn.classList.remove("gameFlash");
    }, 250);
}


function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

let buttons = document.querySelectorAll(".box");

for(button of buttons) {
    button.addEventListener("click", function() {

        userFlash(this);

        userSequence.push(this.getAttribute("id"));

        checkSeq(userSequence.length - 1);
    })
}


function checkSeq(idx) {
    if(gameSequence[idx] === userSequence[idx]) {
        if(gameSequence.length === userSequence.length){
            userSequence = [];
            setTimeout(levelUp, 500);
        }
    } else {
        h4.innerHTML = `Game Over your score is <b>${level}</b> <br> Press any key to play again.`;

        if (level > highestScore) {
            highestScore = level;
        } 

        p.innerHTML =  `Highest Score <b>${highestScore}</b>`;

        restart();
    }
}


function restart() {
    userSequence = [];
    gameSequence = [];
    level = 0;
    started = false;
}
