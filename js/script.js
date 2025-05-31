const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const scoreElement = document.getElementById('score');
const finalScore = document.getElementById('final-score');
const finalScoreValue = document.getElementById('final-score-value');
const startBtn = document.getElementById('start-btn');

let score = 0;
let gameOver = false;
let passedPipe = false; // flag para controlar se já passou do pipe atual

const jump = () => {
    if (gameOver) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Detecta colisão - Game Over
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver = true;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);

        finalScoreValue.innerText = score;
        finalScore.style.display = 'block';
        startBtn.style.display = 'inline-block';
    }

    // Se o pipe já passou do Mario e não contámos ainda, adiciona ponto
    if (pipePosition < 0 && !passedPipe && !gameOver) {
        score++;
        scoreElement.innerText = score;
        passedPipe = true; // evita contar o mesmo pipe várias vezes
    }

    // Quando o pipe voltar para a posição inicial (do lado direito), reseta a flag para poder contar novamente
    if (pipePosition > 500) { // ajuste esse valor conforme o tamanho da tela / posição do pipe
        passedPipe = false;
    }
}, 10);

document.addEventListener('keydown', jump);

startBtn.addEventListener('click', () => {
    window.location.reload();
});

window.onload = () => {
    startBtn.style.display = 'inline-block';
};
