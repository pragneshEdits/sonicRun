const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var obstacle,obstacleIMG,obstacleGroup;

var engine, world;
var ground,grIMG;
var backIMG,back;
var pet,pet_running;
var spikes,spIMG,spikesGroup;
var grnot,upAnimate,downAnimate;
var enemies,enmy,enmyGroup;
var coin,coinGroup,coinImage;
var END = 0;
var PLAY = 1;
var LEVEL,intro,introIMG,button,buttonIMG;
var gameState = PLAY;
var score,end,endBack;
function preload(){
  // polygon_img=loadImage("polygon.png");
  pet_running = loadAnimation("images/pet1.png","images/pet2.png","images/pet3.png",
  "images/pet4.png","images/pet5.png","images/pet6.png","images/pet7.png");

  upAnimate = loadAnimation("images/pet dead.png")
  downAnimate = loadAnimation("images/pet down.png");
  backIMG = loadImage("images/day.jpg");
  spIMG = loadImage("images/spike.png");
  enemies = loadAnimation("images/e1.png","images/e2.png","images/e3.png","images/e4.png","images/e5.png");
  coinImage = loadAnimation("images/coin1.png","images/coin2.png","images/coin3.png",
  "images/coin4.png","images/coin5.png","images/coin6.png",
  "images/coin7.png","images/coin8.png","images/coin9.png");
  obstacleIMG = loadAnimation("images/ob1.png","images/ob2.png","images/ob3.png","images/ob4.png","images/ob6.png",);
  end = loadImage("images/end.jpg");
  buttonIMG = loadImage("images/button.png");
  introIMG = loadImage("images/introduction.jpg");
}

function setup() {
  engine  = Engine.create();
  world = engine.world;

  createCanvas(900,400);
  
  score = 0;
  pet = createSprite(150,320,1,10);
  pet.addAnimation("running",pet_running);
  pet.addAnimation("collide",upAnimate);
  pet.addAnimation("down",downAnimate);
  pet.scale = 0.5;

  back = createSprite(450,150,1500,400);
  back.addImage(backIMG);
  
  back.scale = 1;
  
  ground = createSprite(500,390,2000,10);
  ground.shapeColor=("yellow");
  ground.scale = 2;
  grnot = createSprite(330,360,1000,20);

  pet.setCollider("circle",0,0,90);
  //pet.setCollider("circle",0,0,10);

  pet.debug = false;
  spikesGroup = new Group();
  enmyGroup = new Group();
  coinGroup = new Group();
  obstacleGroup = new Group();

   endBack = createSprite(450,150,1,10);
   endBack.addImage(end);
  // intro = createSprite(450,150,1,10);
  // intro.addImage(introIMG);
  // button = createSprite(200,200);
   //button.addImage(buttonIMG);
}

function draw() {

  background(100);  
  
  
  Engine.update(engine);
  if(gameState === PLAY){
    back.velocityX = -5;
    
  if(back.x<0){
    back.x=back.width/2;
  }
  spikesGroup.setLifetimeEach(-1);
  enmyGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);


  if(coinGroup.isTouching(pet)){
    coinGroup.destroyEach();
      score = score+1;
    }
    
  if(keyWentDown("UP_ARROW") && pet.y >= 280){
    pet.velocityY = -22;

  }

  if(keyWentUp("UP_ARROW") && pet.y >= 280){
    pet.velocityY = -22;

  }
  if (keyWentDown ("DOWN_ARROW")) {
    pet.changeAnimation("down",downAnimate);
    pet.setCollider("circle",0,0,10);

  }

  if(keyWentUp ("DOWN_ARROW")){
    pet.changeAnimation("running",pet_running);
    pet.setCollider("circle",0,0,90);

  }
  pet.velocityY = pet.velocityY + 0.8

  pet.collide(grnot);

  back.display();

  grnot.display();

  grnot.visible = false;
  endBack.visible = false;
  drawSprites();
  ground.display();
  pet.display();
  spikers();
  strangers();
  points();
  ob();
  if(spikesGroup.isTouching(pet)){
        gameState = END;
      }
  
      

  }
 if(gameState === END){

     back.velocityX = 0;
     endBack.display();
     endBack.visible = true;
     spikers();
     fill("orange");
     stroke("black");
     strokeWeight(10);
     textSize(30);
     text("you lose the game",200,320);
     fill("indigo");
     stroke("white");
     strokeWeight(10);
     textSize(30);
     text("COINS COLLECTED :"+score,500,50);

    

 }

 //if(gameState === LEVEL){
 // intro.display();
  //button.display();
  //ground.visible = false;
  //pet.visible = false;
  //if(mousePressedOver(button)){
  //  gameState = PLAY;
 //}
 //} 
 
    if(obstacleGroup.isTouching(pet)){
      gameState = END;
    }
    if(enmyGroup.isTouching(pet)){
      gameState = END;
    }
}

function spikers(){
    if(frameCount % 500 === 0){
    var spikes = createSprite(1000,310,10,-10);
    spikes.addImage(spIMG);
    spikes.scale = 1;
    spikes.velocityX = -8;
    spikes.lifetime = 100;
    //spikes.y = Math.round(random(80,120));
     spikes.debug = false;
     spikes.setCollider("circle",0,2,80);

    spikesGroup.add(spikes);
    }

}

function strangers(){
  if(frameCount % 700 === 0){
    var enmy = createSprite(500,320,10,10);
    enmy.addAnimation("e",enemies);
    enmy.scale = 0.5;
    enmy.velocityX = -5;
    enmy.lifetime = 100;
    enmy.debug = false;
    enmy.setCollider("circle",0,2,70);

    enmyGroup.add(enmy);
  }

}

function points(){
  if(frameCount % 200 === 0){
    var coin = createSprite(1000,320,10,10);
    coin.addAnimation("coins",coinImage);
    coin.scale = 0.2;
    coin.velocityX = -5;
    coin.lifetime = 100;
    coinGroup.add(coin);
  }

}

function ob(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(1000,150,10,10);
    obstacle.addAnimation("obs",obstacleIMG);
    obstacle.scale = 0.8;
    obstacle.velocityX = -10;
    obstacle.lifetime = 100;
    obstacle.debug = false;
    obstacle.setCollider("circle",2,5,190);

    obstacleGroup.add(obstacle);
  }
}
