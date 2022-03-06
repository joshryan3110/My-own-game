var player, playerImg
var enemy,enemyImg,enemyImg2,enemyImg3,enemyImg4
var bullet, bulletImg
var bgImg
var enemyGroup;
var bulletGroup; 
var playLife=3;
var score=0;
var badLife=2;
var edges;
var gameState="start"
var playButton,playButtonImg;
var resetButton, resetButtonImg;
var repair, repairImg
var title, titleImg



function preload(){
    playerImg=loadImage("assets/player.png")
    bulletImg=loadImage("assets/bullet.png")

    titleImg=loadImage("assets/Untitled.png")

    bgImg=loadImage("assets/background.jpg")

    playButtonImg=loadImage("assets/playbutton.png")
    resetButtonImg=loadImage("assets/restart.png")

    enemyImg=loadImage("assets/enemy.png")
    enemyImg2=loadImage("assets/enemy2.png")
    enemyImg3=loadImage("assets/enemy3.png")
    enemyImg4=loadImage("assets/enemy4.png")
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    player=createSprite(100,300,20,20)
    player.addImage(playerImg)
    player.scale=0.2

    playButton=createSprite(width/2,height/2+150)
    playButton.addImage(playButtonImg)

    resetButton=createSprite(width/2,height/2-50)
    resetButton.addImage(resetButtonImg)
    resetButton.scale=1.2

    title=createSprite(width/2+50,height/2-100)
    title.addImage(titleImg)
    title.scale=1.4

    edges=createEdgeSprites()

    bulletGroup=new Group()
    enemyGroup=new Group()
}

function draw(){
    if(gameState==="start"){
        background("black")
        player.visible=false
        playButton.visible=true
        title.visible=true
        resetButton.visible=false
        if(mousePressedOver(playButton)){
            gameState="play"
        }
    }

    if(gameState==="play"){
        background(bgImg)

        player.visible=true
        playButton.visible=false
        resetButton.visible=false
        title.visible=false

        addEnemies()
        
        player.bounceOff(edges);
    
        enemyGroup.bounceOff(edges[3]);
        enemyGroup.bounceOff(edges[2]);
        enemyGroup.bounceOff(edges[1]);
    
        bulletGroup.bounceOff(edges[1])
    
        playerControl()
    
        //bulletgroup[]   enemygroup[]
        
        for(var a=0; a<bulletGroup.length; a++){
            for(var i=0; i<enemyGroup.length; i++){
                if(bulletGroup[a].isTouching(enemyGroup[i])){
                    enemyGroup[i].remove();
                    bulletGroup[a].remove();
                    score=score+1;
                }
            }
        } 
        
        for(var a=0; a<bulletGroup.length; a++){
            if(bulletGroup[a].isTouching(player)){
                bulletGroup[a].remove()
                playLife=playLife-1
            }
        } 
    
        for(var x=0;x<enemyGroup.length;x++){
            if(enemyGroup[x].isTouching(player)){
                enemyGroup[x].remove()
                playLife=playLife-1
            }
        }   
        
        if(playLife<1){
            gameState="end"
        }
        
        fill("yellow")
        textSize(25)
        text("Lives: "+playLife,25,50)
        fill("red")
        textSize(25)
        text("Score:  "+score,25,75)
    }

    if(gameState==="end"){
        background("red")
        fill("black")
        textSize(55)
        text("You died.",width/2-100,height/2+50)
        textSize(20)
        text("Press the button to try again",width/2-50,height/2-100)
        player.visible=false
        playButton.visible=false
        resetButton.visible=true
        title.visible=false
        enemyGroup.destroyEach()
        bulletGroup.destroyEach()
        if(mousePressedOver(resetButton)){
            reset()
        }
    }

    drawSprites()

}

function addEnemies(){
    if(frameCount%45===0){
        enemy=createSprite(width+10,random(50,height-50),20,20)
        //enemy.debug=true;
        enemy.setCollider("circle",0,0,80)
        enemy.addImage(enemyImg)
        enemy.scale=0.3
        enemyGroup.add(enemy)
        enemy.velocity.x=-(score/10+7)
        enemy.velocity.y=random(-5,5);
       

        //randomizing whole numbers
        var r=Math.round(random(1,4))

        //add different images to the numbers
        switch(r){
            case 1: enemy.addImage(enemyImg)
            break;
            case 2: enemy.addImage(enemyImg2)
            enemy.setCollider("circle",0,0,150)
            enemy.scale=0.15
            break;
            case 3: enemy.addImage(enemyImg3)
            enemy.scale=0.6
            break;
            case 4: enemy.addImage(enemyImg4)
            enemy.scale=0.2
            break;
            default: break
        }
    }  
}

function playerControl(){
    if(keyDown("w")){
        player.position.y-=5
    }
    if(keyDown("s")){
        player.position.y+=5
    }
    if(keyDown("a")){
        player.position.x-=5
    }
    if(keyDown("d")){
        player.position.x+=5
    }
    if(keyWentDown("t")){
        bullet=createSprite(player.x+60,player.y,20,20)
        bullet.addImage(bulletImg)
        //bullet.debug=true;
        bullet.scale=0.03
        bulletGroup.add(bullet)
        bullet.velocity.x=score/10+20
        bullet.lifetime=400
    }
}

function reset(){
    player.x=100
    player.y=300
    enemyGroup.destroyEach()
    bulletGroup.destroyEach()
    playLife=3
    score=0
    gameState="start"
}



