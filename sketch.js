'use strict';


let state = 'title';
let cnv;
let points = 0;
let w = 600;
let h = 600;
let player;
let grasses = [];
let dogImg;
let grassImg;
let badgrass = [];
let bg;
let bonesign;
let catenemysign;
let lives = 3;
let badgrassImg;
let switchoff1 = false;
let switchoff2 = false;
let themesong;
let dingfx;
let meowfx;
let titlepage;
let losepage;
let winpage;


function preload(){
  soundFormats("mp3");
  dingfx = loadSound("dingfx.mp3");
  meowfx = loadSound("angymowfx.mp3");
  themesong = loadSound("funnybit.mp3");
  dogImg = loadImage('dogDOWN.gif');
  grassImg = loadImage('grasssprite.png');
  badgrassImg = loadImage('badgrasssprite.png');
  bg = loadImage('yardbg.png');
  bonesign = loadImage('bonesign.gif');
  catenemysign = loadImage('catenemysign.gif');
  titlepage = loadImage('titlepage.gif');
  losepage = loadImage('losepage.gif');
  winpage = loadImage('winpage.gif');
}


function setup() {
   cnv = createCanvas(w, h);
     textAlign(CENTER);
   textFont('monospace');
  player = new Player();
  //grasses[0] = new Grass();
  grasses.push(new Grass());
  badgrass.push(new Badgrass());
  themesong.loop();
}

function draw() {
switch(state){
  case 'title':
    title();
    cnv.mouseClicked(titleMouseClicked);
      break;
  case 'main screen':
    mainScreen();
    if (points >= 10){
      state = 'win';
    }
    if (lives == 0){
      state = 'lose'
    }
      break;
  case 'win':
    winScreen();
    cnv.mouseClicked(winmouseClicked);
      break;
  case 'lose':
    loseScreen();
    cnv.mouseClicked(winmouseClicked);
  default:
      break;
}

}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    player.direction = 'left';
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'
  } else if (key == ' ') {
    player.direction = 'still';
  }
}

function keyReleased(){

  let numKeysPressed = 0;
  if(keyIsDown(LEFT_ARROW)){
    numKeysPressed++;
  }
  if(keyIsDown(RIGHT_ARROW)){
    numKeysPressed++;
  }
  if(keyIsDown(UP_ARROW)){
    numKeysPressed++;
  }
  if(keyIsDown(DOWN_ARROW)){
    numKeysPressed++;
  }

  console.log(numKeysPressed);

if (numKeysPressed == 0){
  player.direction = 'still';
  }
}

function title(){
  background(titlepage);
  textSize(60);
  stroke(255);
  fill(255);


  textSize(30);
}


function titleMouseClicked(){
    console.log('canvas is clicked on title page');
    state = 'main screen';
    dingfx.play();
}


function mainScreen(){
  textAlign(CENTER);
  background(bg);

if (random(1) <= 0.01){
  grasses.push(new Grass());
}
if (random(5) <= 0.01){
  badgrass.push(new Badgrass());
}

  player.display();
  player.move();



//BAD GRASS STUFF
for (let i = 0; i < badgrass.length; i++){
  badgrass[i].display();
  //grasses[i].move();

}

//check collision. collision = true? points + 1 and splice coin
//iterate backwards through array
for(let i = badgrass.length - 1; i >= 0; i--){
if (dist(player.x, player.y, badgrass[i].x, badgrass[i].y) <= (player.r + badgrass[i].r) / 2){
  switchoff1 = true;
  switchoff2 = false;
  lives--;
  meowfx.play();
  console.log(lives);
  badgrass.splice(i, 1);

}
}

textSize(20);
text('Lives: ' + lives,  w * .9 , h - 20);
//BAD GRASS END

//GRASS STUFF
  for (let i = 0; i < grasses.length; i++){
    grasses[i].display();
    //grasses[i].move();

  }

  //check collision. collision = true? points + 1 and splice coin
  //iterate backwards through array
  for(let i = grasses.length - 1; i >= 0; i--){
  if (dist(player.x, player.y, grasses[i].x, grasses[i].y) <= (player.r + grasses[i].r) / 2){
    switchoff2 = true;
    switchoff1 = false;
    points++;
    dingfx.play();
    console.log(points);
    grasses.splice(i, 1);

  }
  }
  textSize(20);
  text('points total: ' + points,  w/5.3 , h - 20);

  if (lives < 3 && switchoff1 == true){
    switchoff2 = false;
    console.log('hello!');
        image(catenemysign,w/2,h-h);
    }

if (points > 0 && switchoff2 == true){
    switchoff1 = false;
      image(bonesign,w/2,h-h);
    }


}




function mainscreenObjective(){
  if (points >= 10){
    state = 'win';

  }
}


function winScreen(){
  textAlign(CENTER);
  background(winpage);
  textSize(30);
  stroke(0);
  textSize(30);

}

function loseScreen(){
  textAlign(CENTER);
  background(losepage);
  textSize(30);

}

function winmouseClicked(){
state = 'main screen'
points = 0;
lives = 3;
}
