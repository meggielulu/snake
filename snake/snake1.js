var snakeMove;
var startGameBool = true;
var startPauseBool = true;
var speed = 150;
var scoreBox = document.getElementById('score');
var content = document.getElementById('playpart');
// var lose = document.getElementById('loser');
// var loseScore = document.getElementById('loserScore');
var startPaush = document.getElementsByClassName('pauseBtn')[0];
var closeBtn = document.getElementsByClassName('exitBtn')[0];
var startBtn = document.getElementsByClassName('startBtn')[0];
// var startPage = document.getElementById('startPage');

init();
function init (){
    //map attribute
    this.mapW = parseInt(window.getComputedStyle(document.getElementById('playpart')).width);
    this.mapH = parseInt(window.getComputedStyle(document.getElementById('playpart')).height);
    this.mapDiv = content;
    // food attribute
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    this.foodColor = '#f00';
    //snake attribute
    this.snake;
    this.snakeW = 20 ;
    this.snakeH = 20 ;
    this.snakeBody = [[3,0,'head'],[2,0,'body'],[1,0,'body']];
    //game attribute
    this .direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    //score
    this.score = 0  ;
    scoreBox.innerHTML = this.score;
    bindEvent();
}

function startGame(){
    // startPage.style.display = 'none';
    // startPaush.style.display = 'block';
    food();
    snake();
}

function food(){
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.backgroundColor = 'green';
    food.style.borderRadius = '20%';
    this.foodX = Math.floor(Math.random() * (this.mapW / this.foodW));
    this.foodY = Math.floor(Math.random() * (this.mapH / this.foodH));
    
    food.style.left = this.foodX * this.foodW + 'px';
    food.style.top = this.foodY * this.foodH + 'px';

    food.style.position = 'absolute';
    this.mapDiv.appendChild(food).setAttribute('class','food');
}
function snake(){
    for(var i = 0; i < this.snakeBody.length; i++ ){
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.backgroundColor = 'red';
        snake.style.borderRadius = '50%';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0]*20 + 'px';
        snake.style.top = this.snakeBody[i][1]*20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch(this.direct){
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
            case 'left':
                snake.style.transform = 'rotate(180deg)';
            case 'down':
                snake.style.transform = 'rotate(90deg)';
            default:
                break;
        }
    }
}
function move(){
    //snake bodey position
    for(var i = this.snakeBody.length - 1; i > 0; i--){
        this.snakeBody[i][0] = this.snakeBody[i-1][0];
        this.snakeBody[i][1] = this.snakeBody[i-1][1];
    }
    //sankehead position
    switch (this.direct){
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;;
            break;
        default:
            break;
    }
    //delete before sanke
    removeClass('snake');
    snake();
    //if sankeX,Y = food X,Y eat food
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
        var snakeTailX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeTailY = this.snakeBody[this.snakeBody.length - 1][0];
        switch(this.direct){
            case 'right':
                this.snakeBody.push([snakeTailX + 1 , snakeTailY , 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeTailX , snakeTailY - 1 , 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeTailX - 1 , snakeTailY , 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeTailX , snakeTailY + 1,'body']);
                break;
            default:
                break;
            
        }
        this.score += 3;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    //hit border;
    if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / this.snakeH){
        alert('Game Over! Score:'+ window.score);
        this.reloadGame();

    }
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / this.snakeW){
        alert('Game Over! Score:'+ window.score);
        this.reloadGame();
    }

    var snakeHeaderX = this.snakeBody[0][0];
    var snakeHeaderY = this.snakeBody[0][1];

    for(var i = 1; i < this.snakeBody.length; i++){
        var snakeBodyX = this.snakeBody[i][0];
        var snakeBodyY = this.snakeBody[i][1];
        if(snakeHeaderX == snakeBodyX && snakeHeaderY == snakeBodyY){
            this.reloadGame();
        }
    }
    
}
function setDirect(code){
    switch (code){
        case 37:
            if(this.left){
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if(this.up){
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if(this.right){
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break; 
        case 40:
            if(this.down){
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

function reloadGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    startPaush.setAttribute('src', './img/start.png');
    this.snakeBody = [[3, 2, 'head'], [2, 2, 'body'], [1, 2, 'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    startPauseBool = true;
    startGameBool = true;
    // lose.style.display = 'block';
    // loserScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
}
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function bindEvent(){
    startBtn.onclick = function(){
        startAndPauseGame();
    }
    startPaush.onclick = function(){
        startAndPauseGame();
    }
    closeBtn.onclick = function(){
        alert('退出游戏!得分为：'+window.score);
        console.log("game over");
        window.reloadGame();
    }
}

function startAndPauseGame(){
    if(startPauseBool){
        if(startGameBool){
            startGame();
            startGameBool = false;
        }
        snakeMove = setInterval(function(){
            move();
        },speed);
        document.onkeydown = function(e){
            var code = e.keyCode;
            setDirect(code);
        };
        startPauseBool = false;
    }else{
        //pasu
        clearInterval(snakeMove);
        document.onkeydown = function(e){
            e.returnValue = false;
            return false;
        };
        startPauseBool = true;
    }
    

}