var interval = 4000
var firstPass = true;




let initialInterval = setInterval(() =>{
    const img = document.getElementById("image");

    img.classList.add("fade");

    setTimeout(() => {
        img.src = "MainPodPageLakeSideImage.png";
        img.classList.remove("fade");
    }, 2000);

   startMainInterval();
    clearInterval(initialInterval);
    
}, 4000);


function startMainInterval(){
    let mainInterval = setInterval(() => {
        const img = document.getElementById("image");
    
        img.classList.add("fade");
    
        setTimeout(() => {
            img.src = "MainPodPageLakeSideImage.png";
            img.classList.remove("fade");
        }, 2000);
    
        if (firstPass == true) {
            firstPass = false;
            interval = 8000;
        }
        
        
    }, 8000);
}

