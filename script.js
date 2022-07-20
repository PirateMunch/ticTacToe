// Factory function for player creation
function player(name, piece, turn) {
    let wins = 0;
    this.turn = turn;
    this.name = name;
    this.piece = piece;
    function info() {
        return {name, piece, turn, wins}
    };
return { name, piece, wins, turn, info};
}; 


//gameBoard - Factory function  iife  -------------
var gameBoard = ( () => {
    const gameTiles = document.querySelectorAll('[data-value]');
    const resetButton = document.getElementById('resetButton');
    let newBoard = [ ...gameTiles]
    const xClass = "X";
    const oClass = "O";
    const winCombo = [
        [0, 3, 6], [0, 1, 2], [0, 4, 8], [2, 5, 8], 
        [1, 4, 7], [3 ,4 ,5], [2, 4, 6], [6, 7, 8]
    ];

    resetButton.addEventListener('click', reset)
    //set value of a board at specific position and linking it to the dom
    function placeMarker() { 
        index = this.dataset.value 
        this.innerText = xClass
        this.classList.add(xClass)
        newBoard.splice(index, 1, xClass)
    return newBoard
    };

    function reset () {
        console.log(gameTiles)
        gameTiles.forEach(tile => {
            console.log(displayController.checkPlayers)
            tile.classList.remove(xClass);
            tile.classList.remove(oClass);
            tile.innerText = "";
            newBoard = newBoard = [ ...gameTiles]
            
        })
            
    }

    //get state of the board at any given time(this is where we return the board)
    function boardState () {
        console.log(newBoard)
        //get value of a board at specific position(board[index])
        for (var i = 0; i < newBoard.length; i++) {
            console.log(i);
            console.log(newBoard[i]);
            console.log(newBoard[i].classList)
        };
    };

        

return {
    newBoard,
    placeMarker,
    gameTiles,
    boardState,
    reset
};
})();    //////////------------------



const displayController = (() => {
    const startButton = document.getElementById('startButton');

    const user1name = document.getElementById('player1');
    const user1select = document.getElementById('player1select');
    const user2name = document.getElementById('player2');
    const user2select = document.getElementById('player2select');
   
    const gameTiles = gameBoard.gameTiles;
    const placeMarker = gameBoard.placeMarker;
    const reset = gameBoard.reset;
    const xClass = "X";
    const oClass = "O";

    let roundCount = 0;
    let playTurn;
    let user1;
    let user2;

    //eventListners
    startButton.addEventListener('click', beginGame)


    //execute logic of inputting the values to the board
    //attach eventlisteners to each cell
    gameTiles.forEach(tile => {
        tile.addEventListener('click', placeMarker, { once: true})
    });

    //define players
    function beginGame() {
        const user1play = Math.random();
        user1 = player(user1name.value, user1select.value, user1play);
        user2 = player(user2name.value, user2select.value);       
        if (user1.piece === xClass) {
            user2.piece = oClass;
        } else {
            user2.piece = xClass;
        };
        
        console.log(user2.piece)
    };


    //Display controlling game logic Module pattern
    function playRound () {
        gameBoxs.forEach(box => {
            box.removeEventListener('click', placeMarker)
        })
    };


    //define win conditions

    //rotate players
    function swapTurns() {
        playTurn = !playTurn 
    };
    
    //check for win/draw


        const checkPlayers = () =>  user1.info()
        
    
return {
    beginGame,
    checkPlayers
};
})(); // -- function module