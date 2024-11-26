let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let wrong = document.getElementById("rich");
let final_score = document.getElementById("final_score");
let timerInterval;
let moleInterval;
let plantInterval;

const highproteinmeal = ["images/r1.png", "images/r2.png", "images/r3.png","images/r4.png","images/r5.png","images/r6.png"]; // Add paths to all rich images
const lowproteinmeal = ["images/p1.png", "images/p2.png", "images/p3.png","images/p4.png","images/p5.png","images/p6.png"]; // Add paths to all poor images

// Load sounds for correct and incorrect clicks
const correctSound = new Audio("sounds/correct.mp3");
const incorrectSound = new Audio("sounds/incorrect.mp3");

// fun facts
const facts=["images2/fact1.png","images2/fact2.png","images2/fact3.png"];
  
    


window.onload = function () {
    document.getElementById("play-button").addEventListener("click", startGame);
    document.getElementById("exit-button").addEventListener("click", exitGame);
    document.getElementById("restart").addEventListener("click", restartGame);
    document.getElementById("exit").addEventListener("click", exitToFrontPage);
};

function startGame() {
    document.getElementById("front-page").style.display = "none";
    document.getElementById("game-content").style.display = "block";
    score = 0;
    gameOver = false;
    document.getElementById("live_score").innerText = score.toString();
    setGame();
    startTimer(); // Start the timer
}

function exitGame() {
    window.close(); // Only works in some browsers and if the script is allowed to close windows
}

function exitToFrontPage() {
    document.getElementById("front-page").style.display = "block";
    document.getElementById("game-content").style.display = "none";
    resetGame(); // Ensure the game is reset when exiting to the front page
}

function setGame() {
    let board = document.getElementById("board");
    board.innerHTML = ""; // Clear the board before setting up new tiles
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }
    moleInterval = setInterval(setMole, 2000);
    plantInterval = setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}


function getRandomImage(imagesArray) {
    let index = Math.floor(Math.random() * imagesArray.length);
    return imagesArray[index];
}

/* function displayRandomFact(){
    const container=document.getElementById("factbox");
    const img=document.createElement("img");
    img.src=getRandomImage(facts);
    container.innerHTML = "";
    container.appendChild(img);
} */

function setMole() {
    if (gameOver) {
        /* displayRandomFact(); */
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = getRandomImage(highproteinmeal);

    let number = getRandomTile();
    if (currPlantTile && currPlantTile.id == number) {
        return;
    }
    currMoleTile = document.getElementById(number);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = getRandomImage(lowproteinmeal);

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function gameOverFunctionsToPerform() {
    document.getElementById("overlay").style.zIndex = 4;
    document.getElementById("data").style.display = "none";
    wrong.textContent = "POOR";
    final_score.textContent = score;
    document.getElementById("dialogue-box").style.display = "block";
    clearInterval(timerInterval); // Stop the timer
    clearInterval(moleInterval); // Stop mole interval
    clearInterval(plantInterval); // Stop plant interval
}

function resetGame() {
    clearInterval(timerInterval);
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    currMoleTile = null;
    currPlantTile = null;
    score = 0;
    gameOver = false;
    document.getElementById("live_score").innerText = score.toString();
    document.getElementById("time_left").innerText = "45";
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("data").style.display = "block";
    document.getElementById("board").innerHTML = ""; // Clear the board
    document.getElementById("overlay").style.zIndex = 2; // Remove the blur effect
    document.getElementById("timer_call").style.display = "none";
    document.getElementById("wrong_answer").style.display = "none";
    
}

function selectTile() {
    if (gameOver) {
        return;
    }
   


    if (this == currMoleTile) {
        score += 10; // Add 10 points for hitting the mole
        document.getElementById("live_score").innerText = score.toString();
        currMoleTile.style.color="greenyellow";
        currMoleTile.innerHTML = "<h1> +10 </h1>"; // Show the score change


        // add additional sound
        correctSound.currentTime = 0; // Reset sound to start
        correctSound.play();


    } else if (this == currPlantTile) {
        score -= 5; // Deduct 5 points for clicking the plant (poor)
        
        document.getElementById("live_score").innerText = score.toString();
        currPlantTile.style.color="red";
        currPlantTile.innerHTML = "<h1> -5 </h1>"; // Show the deduction


        // add lose sound 
        incorrectSound.currentTime = 0; // Reset sound to start
        incorrectSound.play();
        // add end lose sound 

        document.getElementById("wrong_answer").style.display = "block"; // Optional: Display feedback
        setTimeout(() => {
            document.getElementById("wrong_answer").style.display = "none"; // Hide feedback after a short delay
        }, 1000);
    }
}

function startTimer() {
    let timeLeft = 20;
    document.getElementById("time_left").innerText = timeLeft;
    timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameOverFunctionsToPerform(); // End the game when the timer reaches 0
            document.getElementById("timer_call").style.display = "block";
        } else {
            document.getElementById("time_left").innerText = timeLeft;
            timeLeft -= 1;
        }
    }, 1000);
}

function restartGame() {
    resetGame();
    setGame();
    startTimer();
}
