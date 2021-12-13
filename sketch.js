var gameState = 0
var player1
var player2

function preload(){
    bg = loadImage("rooftop1.png")
    hitSound = loadSound("hit.wav")
    player2Standing= loadAnimation("Player2/tile039.png",'Player2/tile040.png',"Player2/tile041.png")
  
   player2Walking= loadAnimation("Player2/tile014.png",'Player2/tile012.png',"Player2/tile013.png")
  
   player2Punch= loadAnimation("Player2/tile003.png",'Player2/tile004.png',"Player2/tile005.png")
  
   player2Roll= loadAnimation("Player2/tile030.png",'Player2/tile031.png',"Player2/tile032.png")
  
   player1Standing = loadAnimation("Player1Images/tile009.png","Player1Images/tile010.png","Player1Images/tile011.png")
  player1Walking = loadAnimation("Player1Images/tile006.png","Player1Images/tile007.png","Player1Images/tile011.png")
  
  player1Punch = loadAnimation("Player1Images/tile000.png","Player1Images/tile001.png","Player1Images/tile002.png")
  
  player1Punching =  loadAnimation("Player1Images/tile003.png","Player1Images/tile004.png","Player1Images/tile005.png")
  
  player1Fire =     loadAnimation("Player1Images/tile039.png","Player1Images/tile040.png","Player1Images/tile041.png")
  
  arrowKeys = loadImage("arrowkeys.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  redHealthGrp = createGroup()
  greenHealthGrp = createGroup()
  
  redDestroy = false
  greenDestroy = false
  player1 = createSprite(width-200,height-180,40,40)
  player1.addAnimation("Standing",player1Standing)
  player1.addAnimation("Walking",player1Walking)
  player1.addAnimation("Punch",player1Punch)
  player1.addAnimation("Punching",player1Punching)
  player1.addAnimation("Fire",player1Fire)
  player1.scale = 3
  player2 = createSprite(200,height-180,40,40)
 // player2.addImage(plr2)
  player2.addAnimation("Standing",player2Standing)
  player2.addAnimation("Walking",player2Walking)
  player2.addAnimation("Punch",player2Punch)
  player2.addAnimation("Roll",player2Roll)
  player2.scale = 3
  
  player1.setCollider("rectangle",10,0,player1.width-30,player1.height)
  player2.setCollider("rectangle",-5,10,player2.width-30,player2.height)
  
  if(!redDestroy && gameState!==2){
    for(i=40;i<130;i=i+20){
      sprite1 = createSprite(i,30,20,20)  
      sprite1.shapeColor = "red"
      redHealthGrp.add(sprite1)
    }
    }
    if(!greenDestroy && gameState!==2){
    for(i=(width-150);i<(width-60);i=i+20){
      sprite2 = createSprite(i,30,20,20)  
      sprite2.shapeColor = "green"
      greenHealthGrp.add(sprite2)
    }
    }
  if(gameState === 0 ){
    
    background(bg);
    title = createElement('h1', 'SWORD FIGHT!!!');
    title.style('color', 'orange');  
    title.position(width/2-100, 0);
    
    textSize(25)
    fill("white")
    text("Press up to punch",width/2,height-170)
    text("Press down for fire",width/2,height-140)
    text("Press left to step front ",width/2,height-110)
    text("Press right to step back",width/2,height-80)
    
    fill ("white")
    text("Click Play to fight",80,height-60)
    
    img = createImg("arrowkeys.png","use arrow keys");
    img.size(160,120)
    img.position(100, height-200);
    
    inp = createInput('Enter Your Name');
    inp.position(width/2, 75);
    inp.size(100);
    
    button = createButton('Fight');
    button.position(width/2,100);
    button.mousePressed(changegameState);
    button.style('background-color', "Orange");
    button.size(110,30)
    
    
  }
}


function draw() {
  if(gameState === 1){
    background(bg);
    fill("white")
    stroke("black")
    rect(30,20,100,20)
    
    player1Actions()
    player2Actions()
    
    if(player1.isTouching(player2)){
      reduceHealth()
      
      redDestroy = true
     
    }
    if(player2.isTouching(player1)){
      
       greenHealth()
       greenDestroy = true
    }
    
    
  }
 else if(gameState === 2 ){
    
    background(bg);
    
   if(greenHealthGrp.length === 0){
      player2.changeAnimation("Standing",player2Standing)
      player1.changeAnimation("Standing",player1Standing)
      fill("Cyan")
      textSize(30)
      text("Player 2 Won",30,50)
    }
    
    if(redHealthGrp.length === 0){
      player1.changeAnimation("Standing",player1Standing)
      player2.changeAnimation("Standing",player2Standing)
      fill("Cyan")
      textSize(30)
      text("Player 1 Won",width-300,50)
    }
    
    
  }
  drawSprites()
}

function changegameState() {
  gameState = 1
  img.hide()
  button.hide()
  inp.hide()
  title.hide()
}
function player1Actions() {
  if(keyDown("left_arrow")&&player1.x>=width/2){
      player1.changeAnimation("Walking")
      player1.x -= 3
    }
    else if(keyWentUp("left_arrow")){
      player1.changeAnimation("Punch")
    }
    if(keyDown("up_arrow")){
      player1.changeAnimation("Punching")
    }
     else if(keyWentUp("up_arrow")){
      player1.changeAnimation("Punch")
     
       player1.animation.offX = 20
     }
    
  if(keyDown("right_arrow")&&player1.x>=width/2){
      player1.changeAnimation("Walking")
      player1.x += 3
    }
    else if(keyWentUp("right_arrow")){
      player1.changeAnimation("Punch")
      hitSound.play()
    }
}


function player2Actions() {
  if(keyDown("left_arrow")&&player1.x>=width/2){
      player2.changeAnimation("Walking")
      player2.x += 3
    }
    else if(keyWentUp("left_arrow")){
      player2.changeAnimation("Standing")
    }
    
    if(keyDown("down_arrow")){
      player2.changeAnimation("Roll")
      hitSound.play()
    }
    else if(keyWentUp("down_arrow")){
      player2.changeAnimation("Standing")
     }
    if(keyDown("right_arrow")&&player1.x>=width/2){
      player2.changeAnimation("Walking")
      player2.x -= 3
    }
    else if(keyWentUp("right_arrow")){
      player2.changeAnimation("Standing")
    }
}
function reduceHealth(){
  if(player1.isTouching(player2)&& keyDown(UP_ARROW)){
  index = redHealthGrp.length
 
  if(index!==0){
  redHealthGrp[index-1].destroy()
  }
  //index = index -1
  player1.x += 80
  player2.x -= 80
    
  }
  if(redHealthGrp.length === 0){
       gameState = 2
     }
 
}
function greenHealth(){
   if(player2.isTouching(player1)&&keyDown(DOWN_ARROW)){
 
  index = greenHealthGrp.length
 
  if(index!==0){
  greenHealthGrp[index-1].destroy()
  }
  //index = index -1
  player1.x += 80
  player2.x -= 80
     
  }
  if(greenHealthGrp.length === 0){
       gameState = 2
     }
}
