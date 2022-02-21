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

        gameBoard.reset();
        displayController.reset();
    })
    const reset = () => {
        for(let i = 0; i < 9; i++){
            gameBoard.reset();
            gridButtons[i].textContent = "";
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
    }
    const setResultMessage = (newMessage) => {
        console.log("hello");
        message.textContent = newMessage;
    }
    return {setResultMessage};
    
})();

const gameFlow = (() => {

    let Personx = Player('X');
    let Persony = Player('O'); 
    let count = 1;
    let isOver = false;

    const playRound = (index) =>{

        let sign = getPlayerSign();
        gameBoard.setField(sign, index - 1);
        isOver = checkWin();
        console.log(sign);
        if(isOver){
            return;
        }
        if(sign == 'X'){
            console.log("wtf");
            displayController.setResultMessage("Player O's turn");
        }
        else if(sign == 'O'){
            displayController.setResultMessage("Player X's turn");
        }

        count++;

    }
    let winConditions = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9]];

    const getPlayerSign = () => {
        if(count % 2  == 1){
            return Personx.getSign();
        }
        else{
            return Persony.getSign();
        }
    }
    const getIsOver = () =>{
        return isOver;
    }
    const checkWin = () => {



    }

    return {getIsOver, playRound};

})();



