/* Main game file: main.js */
/* Game: [Pacman Attack] */
/* Authors: [Mason Januskiewicz, Jayden Conde] */
/* Description: Pacman are coming from the left side of the screen moving to the other side, */
/*and you need to use the ghost to click on them to stop them from reaching the other side. */
/*You try to get rid of them before they make it across, and they increase in speed as you increase in score, while also going at random rates */
/* Citations: We used AI auto complete to make the ghost sprite directional change thing, and splice, 
randomization of color, and when press r game resets (kinda)*/
/* Note: If you use significant AI help you should cite that here as well */
/* including summaries of prompts and/or interactions you had with the AI */
/* In addition, of course, any AI-generated code should be clearly marked */
/* in comments throughout the code, though of course when using e.g. CoPilot */
/* auto-complete it maye be impractical to mark every line, which is why you */
/* should also include a summary here */

import "./style.css";

import { GameInterface, Sprite } from "simple-canvas-library";

let gi = new GameInterface();
//from last project I did -MJ
let topbar = gi.addTopBar();
topbar.addTitle("Pacman Attack");
topbar.addButton({
  text: "Instructions",
  onclick: function () {
    gi.dialog(
      "Instructions",
      "Click on the Pacmen before they reach the right side of the screen!\nClick 'R' to restart the game if you lose."
    );
  },
});

/* Variables: Top-Level variables defined here are used to hold game state */
let balls = []; // array to hold balls
let HitCount = 0; // score
let spawnInterval = 1500; // Initial spawn interval in milliseconds
let lastSpawnTime = 0; // Time when the last ball was spawned
let speedmultiplier = 1.0; // Speed multiplier for ball acceleration
let gameOver = false; // Game over state
let MisClicks = 0; // Number of missed clicks
let cursorX = 0;
let cursorY = 0;
let previouscursorX = 0;
let previouscursorY = 0;
let cherry = {
  x: Math.random() * (200),
  y: Math.random() * (200),
  counter : 0,
  image : new Image(),
};
cherry.image.src = "pacman cherry2.png";
//let fragments = [];


/* Drawing Functions */
//treacher helped with the spawnball function
function spawnBall({ width, height }) {
  // Generate a random color (written with AI assistance)
  const colors = [ "yellow"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  let newBall = {
    x: 0,
    y: Math.random() * height,
    radius: Math.random() * 30 + 20, // Random radius between 20 and 50
    speed: Math.random() * 50 + 50, // Random speed between 50 and 100
    color: randomColor, // Store the color on the ball
  };
  speedmultiplier += 0.080085; // Increase speed multiplier over time
  newBall.speed *= speedmultiplier;
  balls.push(newBall);
}

gi.addDrawing(function drawCherry({ ctx, width, height, stepTime }) {
  // draw cherry png at x or y
  ctx.drawImage(cherry.image, cherry.x-40, cherry.y-60, 80, 80);
  // increment cherry counter
  cherry.counter += stepTime;
  // if counter > 20000, move cherry to new random location and reset counter
  if (cherry.counter > 20000) {
    cherry.x = Math.random() * (width - 100);
    cherry.y = Math.random() * (height - 100);
    cherry.counter = 0;
  }
  for (let ball of balls) {
    //ai assisted collision detection between ball and cherry
    if (ball.x + ball.radius > cherry.x && ball.x - ball.radius < cherry.x + 80 &&
       ball.y + ball.radius > cherry.y && ball.y - ball.radius < cherry.y + 80) {
    balls.splice(balls.indexOf(ball), 1);
      HitCount++;
      }
  }
});

let GHOST_SIZE = 47;
let ghost = new Sprite({
  src: "ghostsprite.png",
  x: 400,
  y: 400,
  frameWidth: 96,
  frameHeight: 96,
  targetHeight: GHOST_SIZE,
  targetWidth: GHOST_SIZE,
  frameRate: 2,
  animate: true,
  frames: 12,
})
gi.addDrawing(ghost);
/*
gi.addDrawing(function drawFragments({ ctx, width, height, elapsed, stepTime }) {
for (let i=0; i<fragments.length; i++) {
  let frag = fragments[i];
  frag.x += frag.vx * stepTime / 1000;
  frag.y += frag.vy * stepTime / 1000;
  frag.vy += 50 * stepTime / 1000;
  fragments.vx *= 0.2;
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(frag.x, frag.y, frag.radius, 0, Math.PI * 2);
  ctx.fill();
  if (frag.y - frag.radius > height) {
    fragments.splice(i, 1);
    i--;
  }
}
}
  */

/*
gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
// draw a ghost that eat balls(figure out later)
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)"; // Semi-transparent white
  // draw ghost body with classic arc, line, and then jagged lines at the bottom
  // starting at ghost.x, ghost.y
  ctx.beginPath();
  ctx.arc(ghost.x, ghost.y, 40, Math.PI, 0); // Head
  ctx.lineTo(ghost.x + 80, ghost.y + 80);
  for (let i = 0; i < 8; i++) {
    ctx.lineTo(ghost.x + 80 - i * 20, ghost.y + 80 + (i % 2 === 0 ? 10 : 0));
  }
  ctx.lineTo(ghost.x, ghost.y + 80);
  ctx.closePath();
  ctx.fill();

}
);
*/
gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
  if (gameOver) {
    let Accuracy = (HitCount / (HitCount + MisClicks)) * 100; // Accuracy percentage
    ctx.fillStyle = "white";
    ctx.font = "48px serif";
    ctx.fillText(`Game Over!`, width / 2 - 100, height / 2);
    ctx.font = "32px serif";
    ctx.fillText(`Score: ${HitCount} \n Accuracy: ${Accuracy.toFixed(2)}%`, width / 2 - 100, height / 2 + 40);
    return;
  }
  // Spawn balls over time
  if (elapsed - lastSpawnTime > spawnInterval) {
    spawnBall({ width, height });
    lastSpawnTime = elapsed;
  }

  // Draw and update all balls
  for (let ball of balls) {
    // Update ball position
    ball.x += ball.speed * 0.016; 

    // If a ball reaches the right side = GAME OVER
    if (ball.x - ball.radius > width) {
      gameOver = true;
    }

    // Draw the ball
    ctx.beginPath();
    // draw line from center to edge...
    ctx.moveTo(ball.x, ball.y);
    let openness = (Math.sin(elapsed / 200) + 1) / 2; // value between 0 and 1
    // arc from 0.15pi to 1.85pi
    ctx.arc(ball.x, ball.y, ball.radius, Math.PI * 0.15 * openness, Math.PI * (2 - .15 * openness));
    // and back to center
    ctx.lineTo(ball.x, ball.y);
    ctx.fillStyle = ball.color; // Use the ball's color instead of "red"
    ctx.fill();
    ctx.closePath();
  }
  // Score display
   let Accuracy = (HitCount / (HitCount + MisClicks)) * 100; // Accuracy percentage
  ctx.fillStyle = "white";
  ctx.font = "24px serif";
  ctx.fillText("Score: " + HitCount, 10, 30);
  // Accuracy display
  ctx.fillText("Accuracy: " + Accuracy.toFixed(2) + "%", 10, 60);
});
//add handler to reset game when R is pressed -barely AI
gi.addHandler("keydown", function ({ event }) {
  if (event.key === "r" || event.key === "R") {
    // Reset game state
    balls = [];
    HitCount = 0;
    spawnInterval = 1500;
    lastSpawnTime = 0;
    speedmultiplier = 1.0;
    MisClicks = 0;
    gameOver = false;
  }
});

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */
//most of this is from jayden's previous project -JC
gi.addHandler("mousedown", function ({ event, x, y }) {
  console.log(event);
  // Your click handling code here...
  for (let ball of balls) {
    const bx = x - ball.x;
    const by = y - ball.y;
    const distance = Math.hypot(bx, by);

    if (distance <= ball.radius) {
      // Ball was clicked
      //ai autocompleted to remove ball and increment score (ball gets added after)-MJ
      balls.splice(balls.indexOf(ball), 1);
      HitCount++;
    } else {
      // Click was outside the ball
      
      MisClicks++;
    }
  }
});


// set ghost position to mouse position
gi.addHandler("mousemove", function ({ x, y }) {
  cursorX = x;
  cursorY = y;
  ghost.x = cursorX-GHOST_SIZE/2; // center ghost sprite
  ghost.y = cursorY-GHOST_SIZE/2 ; // center ghost sprite
  let deltax = cursorX - previouscursorX;
  let deltay = cursorY - previouscursorY;
  if (deltax > 0 && Math.abs(deltax) > Math.abs(deltay)) {
    ghost.frameSequence = [0, 1, 2]
  } else if (deltax < 0 && Math.abs(deltax) > Math.abs(deltay)) {
    ghost.frameSequence = [6, 7, 8]
  } else if (deltay > 0 && Math.abs(deltay) > Math.abs(deltax)) {
    ghost.frameSequence = [3, 4, 5]
  } else if (deltay < 0 && Math.abs(deltay) > Math.abs(deltax)) {
    ghost.frameSequence = [9, 10, 11]
  }
  previouscursorX = cursorX;
  previouscursorY = cursorY;
});

/* Run the game */
gi.run();
