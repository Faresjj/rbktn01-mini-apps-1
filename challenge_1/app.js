document.addEventListener("DOMContentLoaded", function(event) {
 
    let playButton = document.querySelector('#begin'); 
    let modal = document.querySelector('.modal-background');
    let closeButton = document.querySelector('.close-modal');
    let choiceX = document.querySelector('.x');
    let choiceO = document.querySelector('.o');
    let playAgain = document.querySelector('#again');
    let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    let human;
    let computer;
    let squares = document.getElementsByClassName('square');  
    
    function displayModal() {
      
      modal.style.display = "block";
    }
  
    function hideModal() {
      modal.style.display = "none";
      playAgain.style.display = "none";
      clearBoard();
    }
  
    function displayPlayAgain() {
      playAgain.style.display = "block";
    }
    
    function enableButtons() {
      for(var i = 0; i < squares.length; i++) {
        squares[i].removeAttribute("disabled");
      }
    }
    
    function disableButton(button) {
      squares[button].setAttribute("disabled", "disabled");
    }
    
    
    function isGameOver(board) {

      let availableSpaces = checkBoardState(board);
        if(terminal(board, human)) {
           displayModal();
           displayPlayAgain();
            playAgain.textContent = "You Won";
         } else if(terminal(board, computer)) {
           displayModal();
           displayPlayAgain();
            playAgain.textContent = "I Win";
           
         } else if(availableSpaces.length === 0) {
           displayModal();
           displayPlayAgain();
           playAgain.textContent = "A Tie";
         }
       }
    function clearBoard() {
      for(let square of squares) {
        square.textContent = '';
        square.classList.remove('blue', 'red');
      }
      gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
    
    playButton.addEventListener('click', displayModal, false);
    closeButton.addEventListener('click', hideModal, false);
  
    function playerChoiceX() {
      human = 'X';
      computer = 'O';
      enableButtons();
      hideModal();
    }
    function playerChoiceO() {
      human = 'O';
      computer = 'X';
      enableButtons();
      hideModal();
      squares[4].textContent = 'X';
      squares[4].classList.add('blue');
      gameBoard.splice(4, 1, 'X');
      
    }
    
    choiceX.addEventListener('click', playerChoiceX, false);
    choiceO.addEventListener('click', playerChoiceO, false);
   
    document.querySelector(".board").addEventListener("click", function(e) {
        let elem = e.target.id; 
        
        playersChoice(elem, e.target);
        
        let moveIndex = aiPlay(gameBoard, computer);
        onPlayerTurn(moveIndex, computer, squares[moveIndex]);
        
      }); 
   
     function playersChoice(id, target) {
       
      let choice = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8
      }
       onPlayerTurn(choice[id], human, target);
     }
    
    function onPlayerTurn(arrIndex, player, target) {
      gameBoard.splice(arrIndex, 1, player); 
      target.textContent = player; 
      if(player === "X") {
        target.classList.add('blue');
      } else {
        target.classList.add('red');
      }
      disableButton(arrIndex); 
      isGameOver(gameBoard);
    }

  function checkBoardState(board) {
    return board.filter(spaces => spaces !== 'X' && spaces !== 'O');
  }
  
  function terminal(board, player) { 
    let winningMove = player + player + player;
    let possibleCombinations = [   
      [board[0], board[1], board[2]].join(''), 
      [board[0], board[3], board[6]].join(''),
      [board[0], board[4], board[8]].join(''),
      [board[1], board[4], board[7]].join(''),
      [board[2], board[5], board[8]].join(''),
      [board[2], board[4], board[6]].join(''),
      [board[3], board[4], board[5]].join(''),
      [board[6], board[7], board[8]].join(''),
    ];
    for (let combination of possibleCombinations) {
      if(combination === winningMove) {
        return true;
      }
    }
    return false;
  }

  function aiPlay(state, player) {
    
    let bestMove; 
    
    function minimax(state, depth, player) {
      
      let availableSpaces = checkBoardState(state);
       
       if(terminal(state, human)) {
         return {score: 10};
       } else if(terminal(state, computer)) {
         return  {score: -10};
       } else if(availableSpaces.length === 0 || depth === 0){
         return  {score: 0};
       }

      let allMoves = [];

      for (let i = 0; i < availableSpaces.length; i++){
        let move = {}; 
        let index = availableSpaces[i]; 
        move.index = index;
        state[index] = player;
        if(player === human) {
          let score = minimax(state, depth - 1, computer);
          move.score = score.score;
        } else {
          let score = minimax(state, depth - 1, human);
          move.score = score.score;
        }
        state[index] = index;
        allMoves.push(move);
      }
  
      if(player === human) {
        let bestValue = -100000;
        for(let i = 0; i < allMoves.length; i++) {
          if(allMoves[i].score > bestValue) {
            bestValue = allMoves[i].score;
            bestMove = i;
          }
        }
      } else if(player === computer){
        let bestValue = 100000;
        for(let i = 0; i < allMoves.length; i++) {
          if(allMoves[i].score < bestValue) {
            bestValue = allMoves[i].score;
            bestMove = i;
          }
        }
      } 
      function findTrueResult(result) {
        if(typeof result.score === "object") {
          result = findTrueResult(result.score);
        } 
          return result;
        }  
  
      let finalChoice = findTrueResult(allMoves[bestMove]);
      return finalChoice;
  
      } 
     let result = minimax(state, 4, player);
     return result.index;
  }
  
  }, false);