'use strict';

let state = 'title';
let cnv;
let points = 0;

let w = 600;
let h = 600;

let trash = [];
let player;

let playerImg;
let trashImg;

//spritesheets and animations
let playerSS;
let trashSS;
let playerJSON;
let trashJSON;
let playerAnimation = [];
let trashAnimation = [];

// let frameRate(0.5);

function preload() {
  // //spritesheets
  playerSS = loadImage('assets/collector.png');
  playerJSON = loadJSON('assets/collector.json');
  trashSS = loadImage('assets/bottle.png');
  trashJSON = loadJSON('assets/bottle.json');
}

let yoff = 0.0; // 2nd dimension of perlin noise

function setup() {
  cnv = createCanvas(w, h);
  textFont('monospace');

  console.log(playerJSON.frames[0].frame);
  let playerFrames = playerJSON.frames;

  for (let i = 0; i < playerFrames.length; i++) {
    console.log(playerFrames[i]);
    let pos = playerFrames[i].frame;
    let img = playerSS.get(pos.x, pos.y, pos.w, pos.h);
    playerAnimation.push(img);
    console.log(playerAnimation);
  }

  player = new Player();
  player.display();


  let trashFrames = trashJSON.frames;

  for (let i = 0; i < trashFrames.length; i++) {
    console.log(trashFrames[i]);
    let pos = trashFrames[i].frame;
    let img = trashSS.get(pos.x, pos.y, pos.w, pos.h);
    trashAnimation.push(img);
    console.log(trashAnimation);
  }

  trash.push(new Trash());
}

function draw() {

  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;

    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;

    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;

    default:
      break;
  }
}

function drawCreek() {
  //yellow-green background for grass
  background(100, 240, 0);

  //add trees to the background

  //let trees remain in same position for every game

  //tree 1
  push();
  //brown triangle for trunk
  noStroke();
  fill(150, 100, 50);
  triangle(50, 200, 35, 320, 65, 320);
  //green circle for canopy
  fill(0, 120, 0);
  circle(50, 200, 100);
  pop();

  //tree 2
  push();
  translate(150, 0);
  //brown triangle for trunk
  noStroke();
  fill(150, 100, 50);
  triangle(50, 200, 35, 320, 65, 320);
  //green circle for canopy
  fill(0, 120, 0);
  circle(50, 200, 100);
  pop();

  //tree 3
  push();
  translate(300, 0);
  //brown triangle for trunk
  noStroke();
  fill(150, 100, 50);
  triangle(50, 200, 35, 320, 65, 320);
  //green circle for canopy
  fill(0, 120, 0);
  circle(50, 200, 100);
  pop();

  //tree 4
  push();
  translate(450, 0);
  //brown triangle for trunk
  noStroke();
  fill(150, 100, 50);
  triangle(50, 200, 35, 320, 65, 320);
  //green circle for canopy
  fill(0, 120, 0);
  circle(50, 200, 100);
  pop();

  //brown rectangle for mud
  fill(206, 154, 113);
  rectMode(CENTER);
  rect(width * 0.5, height * 0.8, width, height * 0.4);

  push();

  //transparent cyan waves for water
  fill(170, 295, 330, 80);
  noStroke();

  //make the waves move slowly
  //draw a polygon with wave points

  // frameRate(0.5);

  beginShape();

  let xoff = 0;

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 5) {
    // Calculate a y value according to noise, map

    //2D Noise
    let y = map(noise(xoff, yoff), 0, 1, height * 0.95, height);
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.03;
  }

  // increment y dimension for noise
  yoff += 0.03;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  pop();
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.direction = 'left';
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right';
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up';
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down';
  } else if (key = ' ') {
    player.direction = 'still';
  }
}


function title() {

  background(0, 150, 0);
  fill(0);

  textSize(36);
  textAlign(CENTER);
  text('Collect the Trash', width / 2, height / 5);

  textSize(24);
  text('to help keep the creek clean', width / 2, height / 2);

}

function titleMouseClicked() {
  state = 'level 1';
}

function level1() {
  // background(200, 200, 0);
  drawCreek();

  if (random(1) <= 0.01) {
    trash.push(new Trash());
  }

  player.display();
  player.move();

  //iterating through trash array to display and move them
  for (let i = 0; i < trash.length; i++) {
    trash[i].display();
    trash[i].move();
  }

  //using forEach loop
  // trash.forEach(function(trash){
  //   trash.display();
  //   trash.move();
  // })

  // //using for of loop
  // for(let trash of trash){
  //   trash.display();
  //   trash.move();
  // }

  //check for collision; if there is one, slice that trash out; increase points
  //need to iterate backwards through array

  for (let i = trash.length - 1; i >= 0; i--) {

    if (dist(player.x, player.y, trash[i].x, trash[i].y) <= (player.r + trash[i].r) / 2) {
      points++;
      trash.splice(i, 1);
    }
  }


  textSize(36);
  fill(0);
  noStroke();
  text(`points: ${points}`, width / 4, height * 0.15);

  if (points >= 10) {
    state = 'you win';
  }
}

function level1MouseClicked() {}

function youWin() {
  background(230, 210, 80);

  noStroke();
  fill(180, 150, 60);
  square(random(0, width), random(0, height), random(25, 75));
  fill(150);
  square(random(0, width), random(0, height), random(25, 75));

  textSize(36);
  fill(150, 120, 40);
  text('You win!', width / 2, height * 0.3);
  textSize(24);
  text('Thank you for picking up litter.', width / 2, height * 0.4);
  text('Now click for drawing fun.', width / 2, height * 0.5);
}

function youWinMouseClicked() {
  state = 'title';
  points = 0;
}
