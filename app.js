const Player = (sign) => {

    this.sign = sign;
    const getSign = () => {
        return sign;
    }
    return {getSign};
}

const gameBoard = (() => {

    let board = ["", "", "", "", "", "", "", "", ""];
    const getField = (index) => {
        return board[index];
    }
    const setField = (sign, index) => {
        board[index] = sign;
        return;
    }
    const reset = () => {

        for(let i = 0; i<9; i++){
            board[i] = "";
        }
    }
    return {getField, setField, reset};
})();

const displayController = (() =>{

    let gridButtons = document.getElementsByClassName('item');
    let restartButton = document.getElementById('restart');
    let message = document.getElementById('turn');

    restartButton.addEventListener('click', (event) => {

        reset();
    })
    const reset = () => {
        for(let i = 0; i < 9; i++){
            gameBoard.reset();
            setResultMessage("Player X's turn");
            gameFlow.setCount(1);
            updateGameBoard();
            setRestartButton("Restart");
            gameFlow.setIsOver(false);
        }
    }

    for(let i = 0; i<9; i++){
        gridButtons[i].addEventListener('click', (event) => {

            if(gameFlow.getIsOver() || event.target.textContent != "") return;
            gameFlow.playRound(parseInt(event.target.id));
            updateGameBoard();
        })
    }
    const updateGameBoard = () => {

        for(let i = 0; i < 9; i++){
            gridButtons[i].textContent = gameBoard.getField(i);
        }
        return;
    }
    const setResultMessage = (newMessage) => {
        
        message.textContent = newMessage;
    }

    const setRestartButton = (str) => {
        restartButton.textContent = str;
    }

    return {setResultMessage, setRestartButton};
    
})();

const gameFlow = (() => {

    let Personx = Player('X');
    let Persony = Player('O'); 
    let count = 1;
    let isOver = false;

    const playRound = (index) =>{

        let sign = getPlayerSign();
        gameBoard.setField(sign, index - 1);
        if(count == 9){
            displayController.setResultMessage("It's a tie");
            isOver = true;
        }
        checkWin();
        if(isOver){
            displayController.setRestartButton("Play Again");
            return;
        }
        if(sign == 'X'){
            //console.log("wtf");
            displayController.setResultMessage("Player O's turn");
        }
        else if(sign == 'O'){
            displayController.setResultMessage("Player X's turn");
        }

        count++;

    }
    let winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    const getPlayerSign = () => {
        if(count % 2  == 1){
            return Personx.getSign();
        }
        else{
            return Persony.getSign();
        }
    }
    const setIsOver = (newIsOVer) => {
        isOver = newIsOVer;
        return;
    } 
    const setCount = (cnt) => {
        count = cnt;
        return;
    }
    const getIsOver = () =>{
        return isOver;
    }
    const checkWin = () => {

        
        for(let i = 0; i<8; i++){
            
            if((gameBoard.getField(winConditions[i][0]) != "") &&  (gameBoard.getField(winConditions[i][0]) == gameBoard.getField(winConditions[i][1])) && (gameBoard.getField(winConditions[i][1]) == gameBoard.getField(winConditions[i][2]))){
                let whoWin = gameBoard.getField(winConditions[i][0]);
                displayController.setResultMessage(`Player ${whoWin} won the game!`);
                isOver = true;
                count = 1;
            } 
        }
        return;

    }

    return {getIsOver, playRound, setCount, setIsOver};

})();



