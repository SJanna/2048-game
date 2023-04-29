// Declarar variables globales
const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('#start-button')
let board = [];

//Función Entero aleatorio
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Función para crear un tablero vacío
function createBoard() {
    // console.log('createBoard');
    for (let i = 0; i < 4; i++) {
        board[i] = [];
        for (let j = 0; j < 4; j++) {
            board[i][j] = '';
        }
    }
}

// Función para actualizar el contenido de las celdas en el tablero
function updateCells() {
    // console.log('updateCells');
    for (let i = 0; i < cells.length; i++) {
        let row = Math.floor(i / 4);
        let col = i % 4;
        // console.log(board[row][col]);
        cells[i].textContent = board[row][col];
    }
}

// Función para agregar un número celda vacía aleatoria
function addNumber() {
    console.log('AddNumber');
    const rdn1 = getRandomInt(4)
    const rdn2 = getRandomInt(4)
    if (board[rdn1][rdn2] == "") {
        console.log('IF');
        board[rdn1][rdn2] = 2
        console.log(board);
    } else {
        addNumber()

    }
    updateCells()
}

// Función para mover los números en el tablero
function moveNumbers(direction) {
    for (let index = 0; index < 2; index++) {
        // console.log('moveNumberes');
        for (let i = board.length - 1; i >= 0; i--) {
            for (let j = board.length - 1; j >= 0; j--) {
                let cell = board[i][j];
                console.log('CELL:', cell);
                if (cell != '') {
                    switch (direction) {
                        case 'down':
                            for (let k = i + 1; k < board.length; k++) {
                                if (board[k][j] == '') {
                                    board[k][j] = cell;
                                    board[k - 1][j] = '';
                                } else if (board[k][j] == cell) {
                                    board[k][j] = cell * 2;
                                    board[k - 1][j] = '';
                                    break;
                                } else {
                                    break;
                                }
                            }
                            break;
                        case 'up':
                            for (let k = i - 1; k >= 0; k--) {
                                if (board[k][j] == '') {
                                    board[k][j] = cell;
                                    board[k + 1][j] = '';
                                } else if (board[k][j] == cell) {
                                    board[k][j] = cell * 2;
                                    board[k + 1][j] = '';
                                    break;
                                } else {
                                    break;
                                }
                            }
                            break;
                        case 'right':
                            for (let k = j + 1; k < board.length; k++) {
                                console.log(board[i][k])
                                if (board[i][k] == '') {
                                    console.log('IF');
                                    board[i][k] = cell;
                                    board[i][k - 1] = '';
                                } else if (board[i][k] == cell) {
                                    console.log('Else IF');
                                    board[i][k] = cell * 2;
                                    board[i][k - 1] = '';
                                    break;
                                } else {
                                    console.log('Else');
                                    break;
                                }
                            }
                            break;
                        case 'left':
                            for (let k = j - 1; k >= 0; k--) {
                                if (board[i][k] == '') {
                                    board[i][k] = cell;
                                    board[i][k + 1] = '';
                                } else if (board[i][k] == cell) {
                                    board[i][k] = cell * 2;
                                    board[i][k + 1] = '';
                                    break;
                                } else {
                                    break;
                                }
                            }
                            break;
                    }
                }
            }
        }
    }
    updateCells();
}


// Función para comprobar si el jugador ha ganado
function checkWin() {
    console.log('checkWin');
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 2048) {
                return true;
            }
        }
    }
    return false;
}

// Función para comprobar si el jugador ha perdido
function checkGameOver() {
    console.log('checkGameOver');
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false;
            }
            if (i > 0 && board[i][j] === board[i - 1][j]) {
                return false;
            }
            if (i < 3 && board[i][j] === board[i + 1][j]) {
                return false;
            }
            if (j > 0 && board[i][j] === board[i][j - 1]) {
                return false;
            }
            if (j < 3 && board[i][j] === board[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

// Función para reiniciar el juego
function resetGame() {
    console.log('resetGame');
    board = [];
    createBoard();
    addNumber();
    addNumber();
    updateCells();
}

// Evento para empezar el juego
document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    addNumber();
    addNumber();
    updateCells();
    console.log(board)
    resetBtn.addEventListener('click', resetGame)
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowUp':
                moveNumbers('up');
                break;
            case 'ArrowDown':
                moveNumbers('down');
                break;
            case 'ArrowLeft':
                moveNumbers('left');
                break;
            case 'ArrowRight':
                moveNumbers('right');
                break;
            default:
                break;
        }
        
        if(checkGameOver()){
            alert("You Lost");
        }
        if(checkWin()){
            alert("You Win");
        }
        setTimeout(() => { addNumber() }, 100);
    });
    console.log('-------------------------------------------------------------');
});
