const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('score-display');

let circleTurn;
let XWins = 0;
let OWins = 0;

startGame();

restartButton.addEventListener('click', startGame);


function startGame(){

    scoreDisplay.innerText = `X:${XWins}  O:${OWins}`;
    circleTurn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick,{once:true});
    });

    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
    scoreDisplay.classList.remove('message');
}

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentClass);

    if(checkWin(currentClass)){
        endGame(false);
    }else if( isDraw()){
        endGame(true);
    }else{

        swapTurns()

        setBoardHoverClass()
    }

}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    let turn = circleTurn ? CIRCLE_CLASS : X_CLASS;
    board.classList.add(turn);
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = `Draw!`;
    }else{
        if(circleTurn){
            ++OWins;
        }else{
            ++XWins;
        }
        winningMessageTextElement.innerText = `${circleTurn ? " O's": "X's"} Wins!`;
    }
    scoreDisplay.innerText = `X:${XWins}  O:${OWins}`;
    scoreDisplay.classList.add('message');
    winningMessageElement.classList.add('show');
}
