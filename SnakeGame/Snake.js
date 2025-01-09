const gridContainer = document.querySelector(".grid");
const grid = [];
var snakePositionsRow = [5,5,5,5,5,5,5];
var snakePositionsColumn = [6,5,4,3,2,1,0];
var headDirection = 'right';
var canChangeDirection = true;
var applePosition = [];
var freeSpaces = new Set();
var total= 0;


for (let row = 0; row < 10; row++) {
    const rowArray = [];
    for (let column = 0; column < 10; column++) {
        const block = document.createElement('div');
        block.classList.add('block');
        gridContainer.appendChild(block);
        rowArray.push(block);
        
    }

    grid.push(rowArray);
    
}

grid[snakePositionsRow[0]][snakePositionsColumn[0]].classList.add('snakeHead');
grid[snakePositionsRow[1]][snakePositionsColumn[1]].classList.add('snakeBody');
grid[snakePositionsRow[2]][snakePositionsColumn[2]].classList.add('snakeBody');
grid[snakePositionsRow[3]][snakePositionsColumn[3]].classList.add('snakeBody');

spawnApple();

let gameTimer = setInterval(() => {

    let headPosition = [];
    headPosition.push(snakePositionsRow[0]);
    headPosition.push(snakePositionsColumn[0]);

    grid[snakePositionsRow[0]][snakePositionsColumn[0]].classList.remove('snakeHead');
    
    if (headDirection == 'right') {
        snakePositionsColumn[0] +=1;
    }
    else if (headDirection == 'left') {
        snakePositionsColumn[0] -=1;
    }
    else if (headDirection == 'up') {
        snakePositionsRow[0] -=1;
    }
    else if (headDirection == 'down') {
        snakePositionsRow[0] +=1;
    }

    let collisionOccured = collisionCheck(headPosition);
    let appleEaten = appleCollision();

    if (collisionOccured[0]) {
        alert("gameOver");
        const collisionResult = collisionOccured[1];
        grid[collisionResult[0]][collisionResult[1]].classList.add('snakeHead');
        clearInterval(gameTimer);
    }
    else {

        grid[snakePositionsRow[0]][snakePositionsColumn[0]].classList.remove('block');
        grid[snakePositionsRow[0]][snakePositionsColumn[0]].classList.add('snakeHead');
        canChangeDirection = true;

        if (appleEaten) {
            
            moveBody(headPosition,true);
            spawnApple();
        }
        else{
            moveBody(headPosition,false);
        
        }
    }

    
}, 250);


function moveBody(originalHeadPosition,grow){

    let lastPosition = [];
    let previousTail = [];

    lastPosition.push(snakePositionsRow[snakePositionsRow.length-1]);
    lastPosition.push(snakePositionsColumn[snakePositionsColumn.length-1]);

    if (grow) {
        
        previousTail.push(snakePositionsRow[snakePositionsRow.length-1]);
        previousTail.push(snakePositionsColumn[snakePositionsColumn.length-1]);
    }
    else{
        grid[lastPosition[0]][lastPosition[1]].classList.remove('snakeBody');
        grid[lastPosition[0]][lastPosition[1]].classList.add('block');
    }
    

    for (let index = snakePositionsRow.length-1; index > 0; index--) {

        if (index == 1) {
            snakePositionsRow[index] = originalHeadPosition[0];
            snakePositionsColumn[index] = originalHeadPosition[1];

            
        }
        else{
            snakePositionsRow[index] = snakePositionsRow[index - 1];
            snakePositionsColumn[index] = snakePositionsColumn[index - 1];
        }

        grid[snakePositionsRow[index]][snakePositionsColumn[index]].classList.remove('block');
        grid[snakePositionsRow[index]][snakePositionsColumn[index]].classList.add('snakeBody');
      
    }

    if (grow) {
        snakePositionsRow.push(previousTail[0]);
        snakePositionsColumn.push(previousTail[1]);
        grid[snakePositionsRow[snakePositionsRow.length-1]][snakePositionsColumn[snakePositionsColumn.length-1]].classList.remove('block');
        grid[snakePositionsRow[snakePositionsRow.length-1]][snakePositionsColumn[snakePositionsColumn.length-1]].classList.add('snakeBody');
    }

}



document.addEventListener('keydown',function(event){
  
    if (canChangeDirection) {

        if (event.key == 'w' && headDirection != 'down') {
            headDirection = 'up';
            canChangeDirection = false;
        }
        else if (event.key == 'd' && headDirection != 'left') {
            headDirection = "right";
            canChangeDirection = false;
        }
        else if (event.key == 's' && headDirection != 'up') {
            headDirection = "down";
            canChangeDirection = false;
        }
        else if (event.key == 'a' && headDirection != 'right') {
            headDirection = "left";
            canChangeDirection = false;
        }
    }
    else{
        return;
    }
})

function collisionCheck(originalHeadPosition){
    var snakeHeadPositions = [snakePositionsRow[0],snakePositionsColumn[0]];

    var result = [];

    for (let i = 1; i < snakePositionsRow.length; i++) {
        
        if (snakePositionsRow[i] == snakeHeadPositions[0] && snakePositionsColumn[i] == snakeHeadPositions[1]) {
            result.push(true);
            result.push(originalHeadPosition);
            return result;
        }
    }

    if (snakeHeadPositions[0] == 10) {
        snakeHeadPositions[0] = 9;
        result.push(true);
        result.push(snakeHeadPositions);
        return result;
    }
    else if ( snakeHeadPositions[1] == 10) {
        snakeHeadPositions[1] = 9;
        result.push(true);
        result.push(snakeHeadPositions);
        return result;
    }
    else if ( snakeHeadPositions[0] == -1) {
        snakeHeadPositions[0] = 0;
        result.push(true);
        result.push(snakeHeadPositions);
        return result;
    }
    else if (snakeHeadPositions[1] == -1) {
        snakeHeadPositions[1] = 0;
        result.push(true);
        result.push(snakeHeadPositions);
        return result;
    }
    
    result.push(false);
    result.push(snakeHeadPositions);
    return result;;

    
}


function spawnApple(){

    applePosition = [];
    let row = Math.floor(Math.random()*10);
    let column = Math.floor(Math.random()*10);

    if (grid[row][column] != 'snakeHead' && grid[row][column] != 'snakeBody' && row) {
        
    }

    applePosition.push(row);
    applePosition.push(column);

    grid[applePosition[0]][applePosition[1]].classList.remove('block');
    grid[applePosition[0]][applePosition[1]].classList.add('apple');


    // without placing in same position

    
}

function appleCollision(){
    
    if (applePosition[0] == snakePositionsRow[0] && applePosition[1] == snakePositionsColumn[0]) {
        grid[applePosition[0]][applePosition[1]].classList.remove('apple');
        return true;
    }

    return false;
}

