const boxes = Array.from(document.querySelectorAll('.box'));
const playText = document.querySelector('#playText');

const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "O";
const X_TEXT = "X";
let gameOver = false;
let currPlayer = O_TEXT;

const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if(index < 6){
            styleString += 'border-bottom: 3px solid var(--purple);';
        }
        if(index % 3 === 0){
            styleString += 'border-right: 3px solid var(--purple);';
        }
        if(index % 3 === 2 ){
            styleString += 'border-left: 3px solid var(--purple);';
        }

        box.style = styleString;
        box.addEventListener('click', boxClicked);
    });
};



function boxClicked(e) {
    const id = e.target.id;
    console.log('here1', gameOver, spaces[id])
    if(!spaces[id] && !gameOver){
        console.log('here2', gameOver)
        spaces[id] = currPlayer;
        e.target.innerText = currPlayer;
        

        if(playerHasWon(currPlayer)){
            playText.innerText = `${currPlayer} HAS WON!`;
            gameOver = true;
            return;
        }

        currPlayer = (currPlayer === O_TEXT) ? X_TEXT : O_TEXT;
    }
}

const playerHasWon = (player) => {
     //from top left, check across, down, and diagonal
    if (spaces[0] === player) {
        if (spaces[1] === player && spaces[2] === player) {
            console.log(`${player} wins up top`);
            return true;
        }
        if (spaces[3] === player && spaces[6] === player) {
            console.log(`${player} wins on the left`);
            return true;
        }
        if (spaces[4] === player && spaces[8] === player) {
            console.log(`${player} wins on the diagonal`);
            return true;
        }
    }
    //from bottom check up and across
    if (spaces[8] === player) {
        if (spaces[2] === player && spaces[5] === player) {
            console.log(`${player} wins on the right`);
            return true;
        }
        if (spaces[7] === player && spaces[6] === player) {
            console.log(`${player} wins on the bottom`);
            return true;
        }
    }
    //from middle check middle vertical and middle horizontal
    if (spaces[4] === player) {
        if (spaces[3] === player && spaces[5] === player) {
            console.log(`${player} wins on the middle horizontal`);
            return true;
        }
        if (spaces[1] === player && spaces[7] === player) {
            console.log(`${player} wins on the middle vertical`);
            return true;
        }
    }
};

const restart = document.querySelector('#restartBtn');

restartBtn.addEventListener('click', () => {
    spaces.forEach((s, index) => {
        spaces[index] = null;
    });
    console.log(spaces);

    boxes.forEach((box) => {
        box.innerText = "";
    });
    playText.innerHTML = `Let's Play!!`;
    gameOver = false;
    currPlayer = O_TEXT;
});

drawBoard();