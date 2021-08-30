let inputDir = { x: 0, y: 0 }
const start = document.getElementById("btn");
let score = 0;
let highScore = 0;
const looseSound = new Audio("./assets/loose.wav");
const EatingSound = new Audio("./assets/eating.wav");
const bgSound = new Audio("./assets/bg.wav");
let currentTime = 0;
let playGround = document.getElementById('playground');
let getScore = document.getElementById("score");
let getHighScore = document.getElementById("HighScore");
const FPS = 10;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 17, y: 27 };

function displayScore(score, highScore) {
    getScore.innerText = "Score: " + score;
    getHighScore.innerText = "HighScore: " + highScore;
}
function main(ctime) {
    window.requestAnimationFrame(main);
    //Game FPS controlling
    if ((ctime - currentTime) / 1000 < 1 / FPS) {
        return;
    }
    currentTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // if snake touches his body
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y)
            return true;
    }

    if (snakeArr[0].x <= 0 || snakeArr[0].x >= 30 || snakeArr[0].y >= 30 || snakeArr[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    displayScore(score, highScore);
    // 1-> updating snake Array and food pos
    if (isCollide(snakeArr)) {
        looseSound.play();
        bgSound.pause();
        alert("Game Over ! Press any key to play again")
        inputDir = { x: 0, y: 0 };
        snakeArr = [
            { x: 13, y: 15 }
        ]
        score = 0;
        start.innerText = "START"
        start.style.color = "green";
    }

    // if snake eats the food 
    if (food.x == snakeArr[0].x && food.y == snakeArr[0].y) {
        EatingSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 28;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score++;
        highScore = Math.max(score, highScore);
        displayScore(score, highScore);
    }

    // for moving snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // 2-> display snake and food
    playGround.innerHTML = "";
    // displaying the snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake")
        }
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        playGround.appendChild(snakeElement);
    })

    // displaying the food
    foodElement = document.createElement('div');
    foodElement.classList.add("food");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    playGround.appendChild(foodElement);
}


//Game Main Logic Here
let tempx = 0, tempy = 1;
window.requestAnimationFrame(main);
start.addEventListener("click", () => {
    if (start.innerText == "START") {
        start.style.color = "red";
        inputDir = { x: tempx, y: tempy };
        bgSound.play();
        start.innerText = "END";
        window.addEventListener("keydown", (e) => {
            if (start.innerText == "END") {
                bgSound.play();
                switch (e.key) {
                    case "ArrowUp":
                        inputDir.x = 0;
                        inputDir.y = -1;
                        console.log(e.key);
                        break;
                    case "ArrowRight":
                        console.log(e.key);
                        inputDir.x = 1;
                        inputDir.y = 0;
                        break;
                    case "ArrowLeft":
                        console.log(e.key);
                        inputDir.x = -1;
                        inputDir.y = 0;
                        break;
                    case "ArrowDown":
                        console.log(e.key);
                        inputDir.x = 0;
                        inputDir.y = 1;
                        break;
                    default:
                        break;
                }
                tempx = inputDir.x;
                tempy = inputDir.y;
                console.log(tempx);
                console.log(tempy);
            }
        });
    }
    else {
        start.style.color = "green";
        bgSound.pause();
        inputDir.x = 31;
        start.innerText = "START";
    }

})