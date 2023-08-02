//game constants and variables
let inputDir={x: 0,y: 0};
const foodSound=new Audio('Crunch-sound.mp3');
const gameOverSound=new Audio('gameover.wav');
const moveSound= new Audio('click.wav');
const musicSound=new Audio('music.mp3');
let score=0;
let speed=7;
let lastPaintTime=0;
let snakearr=[{x:13, y:15}];
food= {x:10, y:12};
//game functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
          return ;

    }
    else{
        lastPaintTime=ctime;
    }
    
    gameEngine();
}

function isCollide(arr)
{
    //if snake collide with yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(arr[i].x===arr[0].x && arr[i].y===arr[0].y)
        {
            return true;
        }   
    }
    //if snake collide with the wall
    if(arr[0].x>=18 || arr[0].x<=0 || arr[0].y>=18 || arr[0].y<=0 ) {
        return true;
    }
}

function gameEngine()
{
    //part 1:updating the snake array and food
    if(isCollide(snakearr))
    {
       gameOverSound.play();
       musicSound.pause();
       inputDir={x: 0,y: 0};
       alert("GAME OVER........press any key to play again");
       snakearr=[{x:13, y:15}];
       musicSound.play();
       score=0;

    }
     
    //if you have eaten the food then implement this code and shift the food element
    if(snakearr[0].y===food.y&&snakearr[0].x===food.x)
    {
        foodSound.play();
        score+=1;
        if(score>highscoreval)
        {
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highscoreBox.innerHTML="Highest Score : 0" + highscoreval;
        }
        scoreBox.innerHTML="score: " + score;
         snakearr.unshift({x: snakearr[0].x + inputDir.x , y: snakearr[0].y + inputDir.y});
         let a=1;
         let b=17;
         food={x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())}

    }
     
     //moving the snake
     for (let i = snakearr.length-2; i >= 0; i--) {
        snakearr[i+1]={...snakearr[i]};
        
     }
     snakearr[0].x+=inputDir.x;
     snakearr[0].y+=inputDir.y;

    //part2 2: display the snake and food
    //display the snake
    background.innerHTML="";
    snakearr.forEach((e,index)=>{
         snakeElement=document.createElement('div');
         snakeElement.style.gridRowStart=e.y;
         snakeElement.style.gridColumnStart=e.x;
    
    if(index===0)
    {
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('tail');
    }
    
    background.appendChild(snakeElement);

    })

    //display the food
   
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    background.appendChild(foodElement);
}







//main logic start here
musicSound.play();
let highscore=localStorage.getItem("highscore");
if(highscore===null)
{
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore);
    highscoreBox.innerHTML="Highest Score : 0" + highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir={x:0,y:1}//start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;

        default:
            break;



    }


})