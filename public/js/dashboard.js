// // Some global variables to make things easier.
// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");

// ctx.beginPath();
// ctx.arc(100, 75, 50, 0, 2 * Math.PI);
// ctx.stroke();

// // Defines a brick
// class Dots {
//     constructor(dotRowCount, dotColumnCount, dotWidth, dotHeight,
//         dotPadding, dotOffsetTop, dotOffsetLeft, dots, dotX) {
//         this.status = 1;
//         this.dotCount = dotCount;
//         this.dotColumnCount = dotColumnCount
//         this.dotWidth = dotWidth
//         this.dotHeight = dotHeight;
//         this.brickPadding = brickPadding;
//         this.dotOffsetTop = dotOffsetTop;
//         this.dotOffsetLeft = dotOffsetLeft;
//         this.dots = dots;
//         this.dotsX = 0;
//         this.dotsY = 0;
//     }

//     drawBricks(ctx) {

//         for(let c = 0; c < this.dotColumnCount; c++) {
//             // this.bricks[c] = [];
//             for(let r = 0; r < this.dotRowCount; r++) {
//                 if(this.dots[c][r].status == 1) {
//                     this.dotX = (c*(this.dotWidth+this.dotPadding))+this.dotOffsetLeft;
//                     this.dotY = (r*(this.dotHeight+this.dotPadding))+this.dotOffsetTop;                
//                     this.dots[c][r].x = this.dotX; //the coordinates of dot
//                     this.dots[c][r].y = this.dotY;

//                     ctx.beginPath();
//                     ctx.rect(this.brickX, this.brickY, this.brickWidth, this.brickHeight);
//                     ctx.fillStyle = "#0095DD";
//                     ctx.fill();
//                     ctx.closePath();
//                 }
//                 // console.log("bricks c:", this.bricks[c][r].x);
//                 // console.log("bricks r:", this.bricks[c][r].y);
//                 // console.log("brickX:", this.brickX);
//                 // console.log("brickY:", this.brickY);
//             }
//         }
//     }

// }

// class Journal {
//     constructor() {
//         const { width, height } = canvas;
//         // instantiate ball object with ball radius, color, x and y.
//         this.dots = new Dots();
//         // set dot properties
//         this.dots.dotRowCount = 3;
//         this.dots.dotColumnCount = 5;
//         this.dots.dotWidth = 75;
//         this.dots.dotHeight = 20;
//         this.dots.dotPadding = 10;
//         this.dots.dotOffsetTop = 30;
//         this.dots.dotOffsetLeft = 30;
//         this.dots.dots = [];
        
//         // es6 syntax to call draw one time to start the engine and do it over and over again.
//         setInterval(() => {
//             this.draw();
//             // do other stuff
//         }, 10);
//     } // end of constructor

//     draw() {
//         this.bricks.drawBricks(ctx);
//     }
// }

// ctx.beginPath();
// ctx.arc(100, 75, 50, 0, 2 * Math.PI);
// ctx.stroke();