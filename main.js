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

/* Variables: Top-Level variables defined here are used to hold game state */
//prelim number WILL be changed 
let balls =[] // array to hold balls
let ClickCount = 0// score
let spawnInterval = 2000; // Initial spawn interval in milliseconds
let lastSpawnTime = 0;// Time when the last ball was spawned
let speedmultiplier = 1.0; // Speed multiplier for ball acceleration
//ball class to create ball objects
//got help from AI to create this class cause idk how ts works-Mason Januskiewicz
class Ball {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }
}
  update(stepTime); {
    this.x += this.speed * stepTime * speedmultiplier;
  }

/* Drawing Functions */

/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */
gi.addDrawing(
  function ({ ctx, width, height, elapsed, stepTime }) {
    // Your drawing code here...    
  }
)

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */

gi.addHandler(
  "click",
  function ({ event, x, y }) {
    // Your click handling code here...
  }
)


/* Run the game */
gi.run();


