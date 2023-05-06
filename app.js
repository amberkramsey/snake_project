const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

let foodX; 
let foodY;

let score = 0;

let gameOver = false;

window.onload = function () {
    board = document.getElementById ("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);

    gameRestart()
    restart = document.getElementById("restart");
    document.addEventListener("click", gameRestart);
    
}


function update(){
    if (gameOver) {
        return;
    }
    //the board
    context.fillStyle ="gray";
    context.fillRect(0, 0, board.width, board.height);

    //game score text
    context.fillStyle = "white";
    context.font = "15px veranda";
    context.fillText("SCORE: " + score, 10, 20);
    highScore()

    //the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //snake eats food and grows
    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
    }
    //add new snake segment to tail / snake moves forward from tail
    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    //the snake
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //draw new snake segment
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        
    }

    endGame();
}

function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } 
    else if (e.code == "ArrowDown" && velocityY != -1){
            velocityX = 0;
            velocityY = 1;
        }
    else if (e.code == "ArrowLeft" && velocityX != 1){
            velocityX = -1;
            velocityY = 0;
            }
    else if (e.code == "ArrowRight" && velocityX != -1){
            velocityX = 1;
            velocityY = 0;
         }
 }

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function highScore (){
    let highScore = localStorage.getItem("highScore")
    if (highScore !== null) {
    if (score > highScore){
        localStorage.setItem("highScore", score)
        } 
    }
    else {
        localStorage.setItem ("highScore", score)
    }
        context.fillStyle = "white";
        context.font = "15px veranda";
        context.fillText("HIGH SCORE:" + highScore, 385, 20);

}

function endGame (){
    //snake goes outside grid
        
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over");
    }
    
    //snake eats itself
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
}

function gameRestart (){
    board;
    context;

    snakeX = blockSize * 5;
    snakeY = blockSize * 5;

    velocityX = 0;
    velocityY = 0;

    snakeBody = [];

    foodX; 
    foodY;
    score = 0;
    gameOver = false;
    update();
    placeFood();

}