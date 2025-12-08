/* Main game file: main.js */
/* Game: [Ball Attack] */
/* Authors: [Mason Januskiewicz, Jayden Conde] */
/* Description: [Balls are coming from the left side of the screen moving to the other side, */
/*and you need to click on them to get rid of them depending on the radius. */
/*You try to get rid of them before they make it across. They accelerate over time.] */
/* Citations: [AI will most likely be used to spot check and clear up any small bugs we do not understand */
/*and will get help from teacher whenever option is avalable] */
/* Note: If you use significant AI help you should cite that here as well */
/* including summaries of prompts and/or interactions you had with the AI */
/* In addition, of course, any AI-generated code should be clearly maked */
/* in comments throughout the code, though of course when using e.g. CoPilot */
/* auto-complete it maye be impractical to mark every line, which is why you */
/* should also include a summary here */


import "./style.css";

import { GameInterface } from 'simple-canvas-library';

let gi = new GameInterface();
//from last project I did -MJ
let topbar = gi.addTopBar();
topbar.addTitle("Ball Attack");
topbar.addButton({
  text: "Instructions",
  onclick: function () {
    gi.dialog(
      "Instructions",
      "Click on the balls before they reach the right side of the screen!"
    );
  },
});

/* Variables: Top-Level variables defined here are used to hold game state */
//prelim number WILL be changed 
let balls =[] // array to hold balls
let ClickCount = 0// score
let spawnInterval = 2000; // Initial spawn interval in milliseconds
let lastSpawnTime = 0;// Time when the last ball was spawned
let speedmultiplier = 1.0; // Speed multiplier for ball acceleration
let gameOver = false; // Game over state
/* Drawing Functions */
//treacher helped with the spawnball function
function spawnBall({width, height}) { 
 
  let newBall = {
    x: 0,
    y: Math.random() * height,
    radius: Math.random() * 30 + 10, // Random radius between 10 and 40
    speed: Math.random() * 50 + 50, // Random speed between 50 and 100
  };

  newBall.speed *= speedmultiplier;
  balls.push(newBall);
}

gi.addDrawing(
  function ({ ctx, width, height, elapsed, stepTime }) {
    if (gameOver) {
      ctx.fillStyle = "black";
      ctx.font = "48px serif";
      ctx.fillText("Game Over!", width / 2 - 100, height / 2);
      return;
    }
  }
);
/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */

gi.addHandler(
  "click",
  function ({ event, x, y }) {
    // Your click handling code here...
    const bx = x - ball.x;
    const by = y - ball.y;
    const distance = Math.hypot(bx, by);

    if (distance <= ball.radius) {
      // Ball was clicked
      balls.splice(balls.indexOf(ball), 1);
      ClickCount++;
    }
  }
)


/* Run the game */
gi.run();


