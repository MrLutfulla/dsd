class Snake {
  constructor(x, y, size){
    this.x = x
    this.y = y
    this.size = size
    this.tail = [{x: this.x, y: this.y}]
    this.rotateX = 0
    this.rotateY = 1

  }
  move(){
    let newRect;
    if(this.rotateX == 1 ){
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y
      } 
    }else if(this.rotateX == -1 ){
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y
      } 
    }else if(this.rotateY == 1 ){
        newRect = {
          x: this.tail[this.tail.length - 1].x,
          y: this.tail[this.tail.length - 1].y + this.size
        } 
    } else if(this.rotateY == - 1 ){
        newRect = {
          x: this.tail[this.tail.length - 1].x,
          y: this.tail[this.tail.length - 1].y - this.size
        } 
    }

    this.tail.shift();
    this.tail.push(newRect);
  }
}



class Apple {
  constructor(){
    let isTouching;
    while(true){
      isTouching = false;
      this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
      this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size// shu yerga eni va buyi
      for(let i = 0; i < snake.tail.length; i++){
        if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
          isTouching = true
        }
          
      }
      this.color = "pink"
      this.size = snake.size
      if(!isTouching){
        break;
      }
    }
  }
}



let canvas = document.querySelector("#canvas")
let snake = new Snake(20, 20, 20);
let apple = new Apple();
let canvasContext = canvas.getContext('2d')

window.onload = ()=>{
  gameLoop()
}



function gameLoop(){
  setInterval(show, 1000/10) //here 10 is our fps value
  
}



function show(){
  update();
  draw();
}



function update(){
  canvasContext.clearRect(0,0, canvas.width, canvas.height)
  console.log('update succes');
  snake.move()
  eatApple()
 checkHitWall()  
  
    
}


function checkHitWall() {
  let headTail = snake.tail[snake.tail.length - 1];
  if(headTail.x == - snake.size){
    headTail.x = canvas.width - snake.size
  }else if(headTail.x == canvas.width){
    headTail.x = 0
  }else  if(headTail.y == - snake.size){
    headTail.y = canvas.height - snake.size
  } else  if(headTail.y == canvas.height){
    headTail.y = 0
  }
  // console.log(canvas.height, headTail);

}
// }
 function eatApple(){
  if (snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1 ].y == apple.y) {
          snake.tail[snake.tail.length] = {x: apple.x, y: apple.y}
          apple = new Apple();
    
  }
 }

//  document.writeln('hello'); 
  
function draw (){
  createRect(0,0,canvas.width, canvas.height,' black' )
  createRect(0,0,canvas.width, canvas.height)
  for(let i = 0; i < snake.tail.length; i++){
    createRect( snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, 'white')
  }
  canvasContext.font = '20px Arial';
  canvasContext.fillStyle = '#00ff42'
  createRect(apple.x, apple.y, apple.size, apple.size, apple.color)

  canvasContext.fillText('Score:'+ (snake.tail.length - 1), canvas.width - 120, 18);

}

function createRect (x, y, width, height, color) {
  canvasContext.fillStyle = color
  canvasContext.fillRect(x,y, width, height)

}

window.addEventListener('keydown',(event)=>{
  setTimeout(()=>{
    if(event.keyCode == 37 && snake.rotateX !=1){
      snake.rotateX = -1
      snake.rotateY = 0

    } else if(event.keyCode == 38 && snake.rotateY !=1){
      snake.rotateX = 0
      snake.rotateY = -1
    }else if(event.keyCode == 39 && snake.rotateX != -1){
      snake.rotateX = 1
      snake.rotateY = 0
    } else if(event.keyCode == 40 && snake.rotateY != -1){
      snake.rotateX = 0
      snake.rotateY = 1
    }



  })
} )




// // canvas
// let canvas = document.getElementById('canvas');
// // canvas 2d
// let context = canvas.getContext('2d');

// // O'yin maydonidagi kataklar o'lcham
// let grid = 16;
// let count = 0;
// let score = 0;
// let max = 0;

// // snake
// const snake = {
//     x: 160,
//     y: 160,

//     dx: grid,
//     dy: 0,

//     maxCells: 1,

//     cells: [],
// }

// const food = {
//     x: 320,
//     y: 320,
// }

// function getRandomInt(min, max){
//     return Math.floor(Math.random() * (max - min)) + min;
// }

// function loop() {
//     requestAnimationFrame(loop)
//     if(++count < 4){ // 60fps / 15fps = 4
//         return;
//     }

//     count = 0;
//     context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

//     snake.x += snake.dx;
//     snake.y += snake.dy;

//     if(snake.x < 0){ // gorizontal
//         snake.x = canvas.clientWidth - grid;
//     } else if (snake.x >= canvas.clientWidth) {
//         snake.x = 0;
//     }

//     if(snake.y < 0){ // vertical
//         snake.y = canvas.clientHeight - grid;
//     } else if (snake.y >= canvas.clientHeight) {
//         snake.y = 0;
//     }

//     snake.cells.unshift({ x: snake.x, y: snake.y });

//     if(snake.cells.length > snake.maxCells){
//         snake.cells.pop();
//     }

//     // ovqat rangi
//     context.fillStyle = '#fff';
//     context.fillRect(food.x, food.y, grid - 1, grid - 1);

//     // snake style
//     context.fillStyle = '#E43F5A';

//     snake.cells.forEach(function (cell, index) {
//         context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
//         if(cell.x === food.x && cell.y === food.y){
//             // ilonni uzunligi
//             snake.maxCells++;
//             // ochko
//             score += 1;
//             document.getElementById('score').innerHTML = score;
//             // ovqat
//             food.x = getRandomInt(0, 25) * grid;
//             food.y = getRandomInt(0, 25) * grid;
//         }
//         for(var i = index + 1; i < snake.cells.length; i++){
//             if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
//                 if(score > max) {
//                     max = score;
//                 }
//                 snake.x = 160,
//                 snake.y = 160,
//                 snake.cells = [];
//                 snake.maxCells = 1;
//                 snake.dx = grid;
//                 snake.dy = 0;
//                 score = 0;
//                 food.x = getRandomInt(0, 25) * grid;
//                 food.y = getRandomInt(0, 25) * grid;
//                 document.getElementById('score').innerHTML = max;
//             }
//         }
//     })
// }

// document.addEventListener('keydown', function(e) {
//     if(e.keyCode === 37 && snake.dx === 0){ // chap
//         snake.dx = -grid;
//         snake.dy = 0
//     } else if(e.keyCode === 38 && snake.dy === 0){ // tepa
//         snake.dy = -grid;
//         snake.dx = 0
//     } else if(e.keyCode === 39 && snake.dx === 0){ // o'ng
//         snake.dx = grid;
//         snake.dy = 0
//     } else if(e.keyCode === 40 && snake.dy === 0){ // past
//         snake.dy = grid;
//         snake.dx = 0
//     } else {
//         return;
//     }
// })

// requestAnimationFrame(loop)