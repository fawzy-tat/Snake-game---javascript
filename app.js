const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit 
const box = 32; // pixel 

//load images 
const ground = new Image();
ground.src="img/ground2.png";

const foodImg = new Image();
foodImg.src="img/food2.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.wav";
eat.src = "audio/eat.wav";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";



//create the snake 
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}; 


// create the food 

let food = {
    x : Math.floor(Math.random()* 17 + 1 ) * box,
    y : Math.floor(Math.random()* 15 + 3 ) * box
} 

// create the score variable

let score = 0;
// control the snake move 

document.addEventListener("keydown",direction);
let d;
function direction(event){
    if(event.keyCode == 37 && d !="RIGHT"){
        d = "LEFT";
        left.play();
    }else if (event.keyCode == 38 && d !="DOWN"){
        d = "UP";
        up.play();
    }else if (event.keyCode == 39 && d !="LEFT"){
        d = "RIGHT";
        right.play();
    }else if (event.keyCode == 40 && d !="UP"){
        d = "DOWN";
        down.play();
    }
}

// check collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


// draw everything to canvas 
function draw()
{
    ctx.drawImage(ground,0,0);
    //draw the snake 
    for(let i = 0; i <snake.length; i++){

        ctx.fillStyle = ( i == 0) ? "#880001" : "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);


    }

    // draw the food icon and the score text 
    ctx.drawImage(foodImg,food.x,food.y);

     // old head position 
     let snakeX = snake[0].x;
     let snakeY = snake[0].y;
     
     // in case the snake eats food 
     if ( snakeX == food.x && snakeY == food.y)
     {
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()* 17 + 1 ) * box,
            y : Math.floor(Math.random()* 15 + 3 ) * box
        } 
        //we don't remove the tail
     }
     else
     {
        // remove the tail
         snake.pop();
     }
     
     if(d =="LEFT"){ snakeX -= box }
     if(d =="RIGHT"){ snakeX += box }
     if(d =="UP"){ snakeY -= box }
     if(d =="DOWN"){ snakeY += box }
 
     //add new head 
     let newHead = {
         x : snakeX,
         y : snakeY,
     };
     
       // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }

     snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font  = "30px Courier New";
    ctx.fillText(score,3*box,1.8*box)

   
}  

// call draw function every 100mseconds 

let game = setInterval(draw,100);