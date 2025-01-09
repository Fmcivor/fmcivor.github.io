var usedPositions = [];
var board = [[0,0,0],[0,0,0],[0,0,0]];

function clicked(event){
    var selectedCell = event.target;
    selectedCell.classList.remove("AvailableCell");
    selectedCell.classList.add("UnavailableCell");
    
    selectedCell.textContent = "X";
    usedPositions.push(selectedCell.id);

    let selectedPosition = selectedCell.id;
    let row = -1;
    let column = -1;

    if (selectedPosition <4) {
        row = 0;
        column = selectedPosition -1;
    }
    else if (selectedPosition <7) {
        row = 1;
        column = selectedPosition -4;
    }
    else {
        row = 2;
        column = selectedPosition -7;
    }

    board[row][column] = 1;
    let win = checkWin(1);
    if (win == true) {
        alert("you won");
        let cellList = document.querySelectorAll(".AvailableCell");
        cellList.forEach( cell =>{
            cell.classList.remove("AvailableCell");
            cell.classList.add("UnavailableCell");
        });
    }
    else if(usedPositions.length <9){
        aiMakeMove();
    }
    else{
        alert("The game ended as a draw");
    }
    
}


function aiMakeMove(){
    let rowPositionEmpty = [];
    let columnPositionEmpty = [];

    let selectedCellId = 0;


    let emptyPositionCounter = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j <3; j++) {
            if (board[i][j] == 0) {
                rowPositionEmpty[emptyPositionCounter] = i;
                columnPositionEmpty[emptyPositionCounter] = j;
                emptyPositionCounter ++;
            }
            
        }
        
    }

    let winningMove = [];
    let winningMoveAvailable = false;

    for (let i = 0; i < emptyPositionCounter; i++) {
        let testBoard = [[0,0,0],[0,0,0],[0,0,0]];
        for (let j = 0; j < 3; j++) {
            for (let j2 = 0; j2 < 3; j2++) {
                testBoard[j][j2] = board[j][j2];            
            }
            
        }

        winningMoveAvailable = false;

        testBoard[rowPositionEmpty[i]][columnPositionEmpty[i]] = 2;


        // top row
			if (testBoard[0][0] == 2 && testBoard[0][1] == 2 && testBoard[0][2] == 2) {
				winningMoveAvailable = true;
			}
			//middle row
			else if (testBoard[1][0] == 2 && testBoard[1][1] == 2 && testBoard[1][2] == 2) {
				winningMoveAvailable = true;
			}
			// bottom row
			else if (testBoard[2][0] == 2 && testBoard[2][1] == 2 && testBoard[2][2] == 2) {
				winningMoveAvailable = true;
			}
			// first vertical
			else if (testBoard[0][0] == 2 && testBoard[1][0] == 2 && testBoard[2][0] == 2) {
				winningMoveAvailable = true;
			}
			// second vertical
			else if (testBoard[0][1] == 2 && testBoard[1][1] == 2 && testBoard[2][1] == 2) {
				winningMoveAvailable = true;
			}
			// third vertical
			else if (testBoard[0][2] == 2 && testBoard[1][2] == 2 && testBoard[2][2] == 2) {
				winningMoveAvailable = true;
			}
			// top left bottom right
			else if (testBoard[0][0] == 2 && testBoard[1][1] == 2  && testBoard[2][2] == 2) {
				winningMoveAvailable = true;
			}
			// top left bottom right
			else if (testBoard[0][2] == 2 && testBoard[1][1] == 2 && testBoard[2][0] == 2) {
				winningMoveAvailable = true;
			}


            if (winningMoveAvailable) {
				winningMove[0] = rowPositionEmpty[i];
				winningMove[1] = columnPositionEmpty[i];
				break;
			}

    }

    if (winningMoveAvailable) {
        board[winningMove[0]][winningMove[1]] = 2;
        
        if (winningMove[0] == 0) {
            selectedCellId = winningMove[1] + 1;
        }
        else if (winningMove[0] == 1) {
            selectedCellId = winningMove[1] + 4;
        }
        else if (winningMove[0] == 2) {
            selectedCellId = winningMove[1] +7;
        }

        document.getElementById(selectedCellId).textContent = "O";
        document.getElementById(selectedCellId).classList.remove("AvailableCell");
        document.getElementById(selectedCellId).classList.add("UnavailableCell");
        
    }
    else{
        let defensiveMove = [];
        let defensiveMoveAvailable = false;

        for (let i = 0; i < emptyPositionCounter; i++) {
            let testBoard = [[0,0,0],[0,0,0],[0,0,0]];
            for (let j = 0; j < 3; j++) {
                for (let j2 = 0; j2 < 3; j2++) {
                    testBoard[j][j2] = board[j][j2];            
                }
                
            }
    
            defensiveMoveAvailable = false;
    
            testBoard[rowPositionEmpty[i]][columnPositionEmpty[i]] = 1;
    
    
            // top row
                if (testBoard[0][0] == 1 && testBoard[0][1] == 1 && testBoard[0][2] == 1) {
                    defensiveMoveAvailable = true;
                }
                //middle row
                else if (testBoard[1][0] == 1 && testBoard[1][1] == 1 && testBoard[1][2] == 1) {
                    defensiveMoveAvailable = true;
                }
                // bottom row
                else if (testBoard[2][0] == 1 && testBoard[2][1] == 1 && testBoard[2][2] == 1) {
                    defensiveMoveAvailable = true;
                }
                // first vertical
                else if (testBoard[0][0] == 1 && testBoard[1][0] == 1 && testBoard[2][0] == 1) {
                    defensiveMoveAvailable = true;
                }
                // second vertical
                else if (testBoard[0][1] == 1 && testBoard[1][1] == 1 && testBoard[2][1] == 1) {
                    defensiveMoveAvailable = true;
                }
                // third vertical
                else if (testBoard[0][2] == 1 && testBoard[1][2] == 1 && testBoard[2][2] == 1) {
                    defensiveMoveAvailable = true;
                }
                // top left bottom right
                else if (testBoard[0][0] == 1 && testBoard[1][1] == 1  && testBoard[2][2] == 1) {
                    defensiveMoveAvailable = true;
                }
                // top left bottom right
                else if (testBoard[0][2] == 1 && testBoard[1][1] == 1 && testBoard[2][0] == 1) {
                    defensiveMoveAvailable = true;
                }
    
    
                if (defensiveMoveAvailable) {
					defensiveMove[0] = rowPositionEmpty[i];
					defensiveMove[1] = columnPositionEmpty[i];
					if (rowPositionEmpty[i] == 0) {
						usedPositions.push(columnPositionEmpty[i]+1);
                        document.getElementById(columnPositionEmpty[i]+1).textContent = "O";
                        document.getElementById(columnPositionEmpty[i]+1).classList.remove("AvailableCell");
                        document.getElementById(columnPositionEmpty[i]+1).classList.add("UnavailableCell");
					}
					else if (rowPositionEmpty[i] == 1) {
						usedPositions.push(columnPositionEmpty[i]+4);
                        document.getElementById(columnPositionEmpty[i]+4).textContent = "O";
                        document.getElementById(columnPositionEmpty[i]+4).classList.remove("AvailableCell");
                        document.getElementById(columnPositionEmpty[i]+4).classList.add("UnavailableCell");
                    }
					else {
						usedPositions.push(columnPositionEmpty[i] + 7);
                        document.getElementById(columnPositionEmpty[i]+7).textContent = "O";
                        document.getElementById(columnPositionEmpty[i]+7).classList.remove("AvailableCell");
                        document.getElementById(columnPositionEmpty[i]+7).classList.add("UnavailableCell");
					}
						
					break;
				}
    
        }

        if (defensiveMoveAvailable) {
            board[defensiveMove[0]][defensiveMove[1]] = 2;
        }
        else{

            let validSelection = true;
            let row = -1;
            let column = -1;
            let selection = -1;

            do {
                selection = Math.floor(Math.random()*8);
                selection ++;
                validSelection = true;
                usedPositions.forEach(usedPos => {
                    if (selection == usedPos) {
                        validSelection = false;
                    }
                });
                
            } while (validSelection == false);

            

            if (selection <4) {
                row = 0;
                column = selection -1;
            }
            else if (selection <7) {
                row = 1;
                column = selection -4;
            }
            else {
                row = 2;
                column = selection -7;
            }

            usedPositions.push(selection);
                document.getElementById(selection).textContent = "O";
                document.getElementById(selection).classList.remove("AvailableCell");
                document.getElementById(selection).classList.add("UnavailableCell");
                board[row][column] = 2;
           
           
        }
    }

    let win = checkWin(2);

    if (win == true) {
        alert("The ai won");
    }
}


function checkWin(player){

    // top row
		if (board[0][0] == player && board[0][1] == player && board[0][2] == player) {
			return true;
		}
		// middle row
		else if (board[1][0] == player && board[1][1] == player && board[1][2] == player) {
			return true;
		}
		// bottom row
		else if (board[2][0] == player && board[2][1] == player && board[2][2] == player) {
			return true;
		}
		// first vertical
		else if (board[0][0] == player && board[1][0] == player && board[2][0] == player) {
			return true;
		}
		// second vertical
		else if (board[0][1] == player && board[1][1] == player && board[2][1] == player) {
			return true;
		}
		// third vertical
		else if (board[0][2] == player && board[1][2] == player && board[2][2] == player) {
			return true;
		}
		// top left bottom right
		else if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
			return true;
		}
		// top left bottom right
		else if (board[0][2] == player  && board[1][1] == player && board[2][0] == player) {
			return true;
		}
}
