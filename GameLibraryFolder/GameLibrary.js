class Game{
    #name;
    #imgSrc;
    #HTMLlink;

    constructor(name,img,link){
        this.#name = name;
        this.#imgSrc = img;
        this.#HTMLlink = link;
    }

    getName(){
        return this.#name;
    }

    getImgSrc(){
        return this.#imgSrc;
    }

    getLink(){
        return this.#HTMLlink;
    }

    //look through all files in folder and get link 

}


const game1 = new Game("X and O's","../HomePage/MainPageLakeSideImage.png",'../XandOGame/XandOPage.html');
const game2 = new Game("Snake","../HomePage/MainPageLakeSideImage.png","../SnakeGame/Snake.html");


let games = [game1,game2];

// bubble sort
for (let i = 0; i < games.length-1 ; i++) {
    for (let j = 0; j < games.length-1-i; j++) {
        if (games[j].getName() > games[j+1].getName()) {
            let temp = games[j];
            games[j] = games[j+1];
            games[j+1] = temp;
        }
        
    }
    
}

const gameLibraryDiv = document.querySelector('.GameLibrary');

for (let i = 0; i < games.length; i++) {
    const gameSelection = document.createElement('div');
    gameSelection.classList.add('gameSelection');
    const gameImg = document.createElement('img');
    gameImg.classList.add('gameImage');
    const gameName = document.createElement('b');
    gameName.classList.add('gameName');

    gameName.textContent = games[i].getName();
    gameImg.src = games[i].getImgSrc();
    gameSelection.onclick = function(){
        window.location.href = games[i].getLink();
    }

    gameSelection.appendChild(gameImg);
    gameSelection.appendChild(gameName);

    gameLibraryDiv.appendChild(gameSelection);
    

}







