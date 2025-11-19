const board = document.querySelector('.board');
const blockWidth = 50;
const blockHeight = 50;
const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

const blocks = [];

const snake= [
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
}

setInterval(() => {
    let head = {...snake[0]};
    if(direction === "RIGHT") head.y += 1;
    else if(direction === "LEFT") head.y -= 1;
    else if(direction === "UP") head.x -= 1;
    else if(direction === "DOWN") head.x += 1;

    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.remove('filled');
    });
    snake.unshift(head);
    snake.pop();
    
    
    render();
}, 400);


addEventListener('keydown', (e) => {
    console.log(e.key);
    
    if(e.key === "ArrowUp") direction = "UP";
    else if(e.key === "ArrowDown" ) direction = "DOWN";
    else if(e.key === "ArrowLeft" ) direction = "LEFT";
    else if(e.key === "ArrowRight" ) direction = "RIGHT";
});