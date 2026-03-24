// 贪吃蛇小游戏代码，作业必备
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

// 游戏基础设置
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// 蛇的初始状态
let snake = [
    { x: 10, y: 10 }
];
let dx = 0;
let dy = 0;
let food = { x: 15, y: 15 };
let score = 0;
let gameRunning = false;
let gameLoop;

// 游戏主循环
function gameUpdate() {
    // 蛇移动
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // 撞边界判断
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }

    // 撞自己判断
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // 吃到食物判断
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    drawGame();
}

// 绘制游戏画面
function drawGame() {
    // 清空画布
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制食物
    ctx.fillStyle = 'black';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    // 绘制蛇
    ctx.fillStyle = 'black';
    snake.forEach((segment) => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

// 生成随机食物
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    // 防止食物生成在蛇身上
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            generateFood();
        }
    }
}

// 游戏开始
function startGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    gameRunning = true;
    generateFood();
    drawGame();
    clearInterval(gameLoop);
    gameLoop = setInterval(gameUpdate, 150);
}

// 游戏结束
function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    alert(`游戏结束！你的得分是：${score}`);
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    // 防止反向移动
    switch (e.key) {
        case 'ArrowUp':
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

// 重启游戏按钮
restartBtn.addEventListener('click', startGame);

// 页面加载完成后初始化游戏
window.addEventListener('load', () => {
    drawGame();
    alert('按键盘上下左右键开始游戏，点击RESTART按钮可以重启游戏！');
});
