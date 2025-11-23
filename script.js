const board = document.querySelector('.board');
const startButton = document.querySelector('.start-btn');
const modal = document.querySelector('.modal');

const restartButton = document.querySelector('.restart-btn');
const startModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');

const highScoreElement=document.getElementById('high-score');
const scoreElement=document.getElementById('score');
const timeElement=document.getElementById('time');
    
let score=0;
let highScore=localStorage.getItem('highScore') || 0;
let time='00-00';

highScoreElement.innerText=highScore;

const blockWidth = 50;
const blockHeight = 50;

const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

let intervalId=null;
let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};

const blocks = [];

let snake= [
    {x: 2, y: 2}, 
    
];

let direction="DOWN";

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        block.innerText = `${row},${col}`;
        blocks[`${row},${col}`] = block;
    }
    
}

function render() {

    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.add('filled');
    });

      let head = {...snake[0]};
        
    if(direction === "RIGHT") head.y += 1;
    else if(direction === "LEFT") head.y -= 1;
    else if(direction === "UP") head.x -= 1;
    else if(direction === "DOWN") head.x += 1;
    

    snake.unshift(head);

    if(snake.length > 2){
        const tail = snake[snake.length -1];
        console.log(tail);
        
        blocks[`${tail.x},${tail.y}`].classList.remove('filled');
        snake.pop();
    }
    
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    
        clearInterval(intervalId);
        modal.style.display = 'flex';
        startModal.style.display = 'none';
        gameOverModal.style.display = 'flex';
        return;
        
    }
    
    blocks[`${food.x},${food.y}`].classList.add('food');

    if(head.x === food.x && head.y === food.y) {
        snake.push({...snake[snake.length - 1]});
        blocks[`${food.x},${food.y}`].classList.remove('food');
        score+=10;
        scoreElement.innerText=score;
        if(score>highScore){
            highScore=score;
            localStorage.setItem('highScore', highScore);

        };

        food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
    }
    console.log(snake);
    
    console.log(snake.length);
}
console.log(`snake before inter:${snake}`);
console.log(`snake before inter:${snake.length}`);

startButton.addEventListener('click', () => {
    modal.style.display = 'none';
   intervalId=setInterval(() => {
    render();
}, 400);

});

console.log(`snake after inter: ${snake}`);
restartButton.addEventListener('click', () => {
    restartGame();
    
});

function restartGame() {
    modal.style.display = 'none';
    // gameOverModal.style.display = 'none';
    score=0;
    scoreElement.innerText=score;
    time='00-00';
    timeElement.innerText=time;
    highScoreElement.innerText=highScore;

    // clearInterval(intervalId);

    blocks[`${food.x},${food.y}`].classList.remove('food');
    
    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`]?.classList.remove('filled');
    });

    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};

    snake= [
        {x: 2, y: 2},
    ]; 
    direction = "DOWN";
    intervalId = setInterval(() => {
        render();
    }, 400);
   
};

addEventListener('keydown', (e) => {
    console.log(e.key);
    
    if(e.key === "ArrowUp") direction = "UP";
    else if(e.key === "ArrowDown" ) direction = "DOWN";
    else if(e.key === "ArrowLeft" ) direction = "LEFT";
    else if(e.key === "ArrowRight" ) direction = "RIGHT";
});