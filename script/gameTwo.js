const BRICKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var tempArray;
const NUMBER_OF_BRICKS_IN_ROW = 4;
var points = 0;
var brickElems = document.getElementsByClassName("brick");

function init() {

    let button = document.getElementById("screen");
    button.addEventListener("click", startGame);
}
window.addEventListener("load", init);

function startGame() {
    for (i = 0; i < brickElems.length; i++) {
        if (brickElems[i].classList.contains("right")) {
            updateScoreboard(0);
        }
    }
    tempArray = BRICKS.slice(0);
    generateBricks();
}

function clearBoardWhite() {
    for (i = 0; i < brickElems.length; i++) {
        brickElems[i].style.backgroundColor = "White";  
    }
}

function generateBricks() {
    for (i = 0; i < NUMBER_OF_BRICKS_IN_ROW; i++) {
        let rnd = Math.floor(tempArray.length * Math.random());
        let currentBrick = document.getElementById(tempArray[rnd]);
        
        currentBrick.classList.add("right");
        currentBrick.style.backgroundColor = "Black";
        tempArray.splice(rnd, 1);
    }
    setTimeout(clearBoardWhite, 1000);
    checkBoards();
}

function updateScoreboard(number) {
    let scoreElem = document.getElementById("level");
   
    if (number == 0) {
        scoreElem.innerHTML = number;
    } else {
        scoreElem.innerHTML++;
    }
    updateHighscore(scoreElem.innerHTML);
}

function checkBoards() {
    for (i = 0; i < brickElems.length; i++) {
        brickElems[i].addEventListener("click", validateBrick);
    }
}

function validateBrick(e) {
    if (e.type == "click") {
        if (this.classList.contains("right")) {
            this.style.backgroundColor = "Green";
            points++;
        
        } else if (!this.classList.contains("right")) {
            updateScoreboard(0);

            setTimeout(changeColor("Red"), 500);
            setTimeout(resetBoard, 1000);
        }
    }
    checkPoints(points)
}

function checkPoints(points) {
    if (points == 4) {
        updateScoreboard();
        setTimeout(changeColor("Green"), 500);
        
        setTimeout(resetBoard, 1000);
    }
}

function resetBoard() {
    clearBoardWhite();
    points = 0;
    
    for (i = 0; i < brickElems.length; i++) {
        brickElems[i].classList.remove("right");
    }
}

function changeColor(color) {
    for (i = 0; i < brickElems.length; i++) {
        brickElems[i].style.backgroundColor = color;
    }
}

function updateHighscore(newHighscore) {
    let topScore = document.getElementById("totPoints");
    if (newHighscore > topScore.innerHTML) {
        topScore.innerHTML = newHighscore;
    }
}
