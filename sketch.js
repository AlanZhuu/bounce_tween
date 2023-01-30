
// example taken from:
// https://github.com/Milchreis/p5.tween


let button;

let food = 0;
let feeding = false;

let hungry = 0;
let full = 1;
let tweenState = hungry;


const myShape = {
  x: 200,
  y: 100,
  w: 50,
  h: 50
}

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER)

  p5.tween.manager.addTween(myShape, 'tween1')
    .addMotions([
      { key: 'y', target: height },
      { key: 'w', target: 30 },
      { key: 'h', target: 80 },
    ], 600, 'easeInQuad')
    .addMotions([
        { key: 'w', target: 100 },
        { key: 'h', target: 10 },
      ], 120)
    .addMotions([
        { key: 'w', target: 10 },
        { key: 'h', target: 100 },
      ], 100)
    .addMotions([
        { key: 'w', target: 50 },
        { key: 'h', target: 50 },
        { key: 'y', target: 100 }
     ], 500, 'easeOutQuad')
    .startLoop();
     //replace this with .startTween() to just play once

     addGUI();
}

function draw() {
  background(220,224,8);
  noStroke();
  fill(255, 0, 0);

  if (tweenState == hungry){
    fill(255, 0, 0) ;

    if (myShape.w > width/4){
     tweenState = full;
    }
    else if (tweenState == full){
      fill (255);
    }

    if(myShape.w > width/6){
      if (frameCount% 2 == 0) myShape.w--;

    }else{
      tweenState = hungry;
    }
  }
  ellipse(myShape.x, myShape.y, myShape.w, myShape.h);
fill (0);
let mouthOffset = myShape.w/2;
rect (myShape.x-mouthOffset/12,myShape.y+10,mouthOffset,3);

if (food>0){

  if (frameCount %30<15 && tweenState == hungry){
    eatFood();
  }

  fill (0,random(255),random(255));
  circle(myShape.x, myShape.y+food, food);

}else if (feeding){

  feeding = false;
  button.html("FEED");
  button.removeClass("inactive");
}

}


function eatFood(){

  fill(0);
  ellipse(myShape.x, myShape.y, myShape.w/2, myShape.h/2)

  food= food- 0.5;
  
}

function addGUI()
{

  //add a button
  button = createButton("FEED");

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 

}

function handleButtonPress()
{
    if(!feeding){
      //set food to random value
      food = random(40,60);
      feeding = true;

      button.html("FEEDING");
      button.addClass("inactive");
    }
    
}


// function mousePressed() {
//   let tween = p5.tween.manager.getTween('tween1');

//   if(tween.isPaused){
//     tween.resume();
//   } else {
//     tween.pause();
//   }               
// }