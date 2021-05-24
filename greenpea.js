var score = 0;
var uhp = 3;
var walkck = [0, 0];
var myGamePiece;
var meat = [];
var tiger = [];
function howToPlay() {
  document.getElementById("dsplay").style.display = "none";
  document.getElementById("dshowto").style.display = "inline";
  document.getElementById("dshowto2").style.display = "none";

}
function howToPlay2() {
  document.getElementById("dshowto2").style.display = "inline";
  document.getElementById("dshowto").style.display = "none";
}
function goMain() {
  document.getElementById("dsplay").style.display = "inline";
  document.getElementById("dshowto").style.display = "none";
  document.getElementById("dshowto2").style.display = "none";
}
function startGame() {
  document.getElementById("dsplay").style.display = "none";
  document.getElementById("dshowto").style.display = "none";
  document.getElementById("dshowto2").style.display = "none";
  document.getElementById("canvas").style.display = "initial";
  document.getElementById("stats").style.display = "block";
  myGameArea.start();
  myGamePiece = new component(50, 50, "https://cdn.discordapp.com/attachments/820894723119644672/823820115678068746/Hero_clone_2.gif",225,651, "image");
  tiger[0] = new component(60, 60, "https://cdn.discordapp.com/attachments/820894723119644672/823845422165393468/Tiger_1.gif", 0, 400, "enemy");
  tiger[1] = new component(60, 60, "https://cdn.discordapp.com/attachments/820894723119644672/823845422165393468/Tiger_1.gif", 0, 200, "enemy");
  virus = new component(50, 50, "https://cdn.discordapp.com/attachments/820894723119644672/846266479683043358/New_Virus.gif", 225, 0, "enemy");
  for (let i = 0; i < 3; i++){
    meat[i] = new component(30, 30, "https://cdn.discordapp.com/attachments/786852021315305473/823554666125983784/Meat_1.gif", 0, 0, "food");
  }
}

var myGameArea = { //เขียนหน้าต่างเกม
    canvas : document.getElementById("canvas"),
    start : function() {
        score = 0;
        uhp = 3;
        document.getElementById("hp").innerHTML = "Hp:"+"💗".repeat(uhp);
        this.canvas.width = 500;
        this.canvas.height = 701;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    reset : function(){
      clearInterval(this.interval);
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
}


function component(width, height, color, x, y, type) { //สถานะplayer
    this.type = type;
    if (type == "image" || type == "food" || type == "enemy") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    if (type == "food") {
      this.x = Math.floor(Math.random() * 450)
      this.y = Math.floor(Math.random() * 650)
    }
    else{
      this.x = x;
      this.y = y; 
    }
    this.speedX = 0;
    this.speedY = 0;    
    this.update = function() {
      ctx = myGameArea.context;
      if (type == "image" || type == "food" || type == "enemy") {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } 
      else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.newPosf = function() {
      this.x = Math.floor(Math.random() * 450);
      this.y = Math.floor(Math.random() * 650);
    }
}

function updateGameArea(){
  var mytop = myGamePiece.y + 12;
  var mybottom = myGamePiece.y + (myGamePiece.height);
  var myleft = myGamePiece.x;
  var myright = myGamePiece.x + (myGamePiece.width);
  var virustop = virus.y
  var virusbottom = virus.y + (virus.height)
  var virusleft = virus.x
  var virusright = virus.x + virus.width

myGameArea.clear()
myGamePiece.speedX = 0;
myGamePiece.speedY = 0;
virus.speedX = 0;
virus.speedY = 0;

  if(mytop > 0 && mybottom < 701 && myleft > 0 && myright < 500){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(mytop == 0 && myleft == 0){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(mytop == 0 && myright == 500){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(mybottom == 701 && myright == 500){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 0; }
  }
  else if(mybottom == 701 && myleft == 0){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 0; }
  }
  else if(mytop == 0){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(myleft == 0){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(myright == 500){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(mybottom == 701){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }//l
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }//r
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }//u
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 0; }//d
    }
myGamePiece.newPos();    
myGamePiece.update();  
  
if(virustop > 0 && virusbottom < 701 && virusleft > 0 && virusright < 500){
    if (myGameArea.key && myGameArea.key == 37) {virus.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 39) {virus.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 38) {virus.speedY = 3; }
    if (myGameArea.key && myGameArea.key == 40) {virus.speedY = -3; }
  }
  else if(virustop == 0 && virusleft == 0){
    if (myGameArea.key && myGameArea.key == 37) {virus.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 39) {virus.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 38) {virus.speedY = 3; }
    if (myGameArea.key && myGameArea.key == 40) {virus.speedY = 0; }
  }
  else if(virustop == 0 && virusright == 500){
    if (myGameArea.key && myGameArea.key == 37) {virus.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 39) {virus.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 38) {virus.speedY = 3; }
    if (myGameArea.key && myGameArea.key == 40) {virus.speedY = 0; }
  }
  else if(virusbottom == 701 && virusright == 500){
    if (myGameArea.key && myGameArea.key == 37) {virus.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 39) {virus.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 38) {virus.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 40) {virus.speedY = -3; }
  }
  else if(virusbottom == 701 && virusleft == 0){
    if (myGameArea.key && myGameArea.key == 37) {virus.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 39) {virus.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 38) {virus.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 40) {virus.speedY = -3; }
  }
  else if(virustop == 0){
    if (myGameArea.key && myGameArea.key == 37) {virus.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 39) {virus.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 38) {virus.speedY = 3; }
    if (myGameArea.key && myGameArea.key == 40) {virus.speedY = 0; }
  }
  else if(virusleft == 0){
    if (myGameArea.key && myGameArea.key == 37) {virus.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 39) {virus.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 38) {virus.speedY = 3; }
    if (myGameArea.key && myGameArea.key == 40) {virus.speedY = -3; }
  }
  else if(virusright == 500){
    if (myGameArea.key && myGameArea.key == 37) {virus.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 39) {virus.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 38) {virus.speedY = 3; }
    if (myGameArea.key && myGameArea.key == 40) {virus.speedY = -3; }
  }
  else if(virusbottom == 701){
    if (myGameArea.key && myGameArea.key == 37) {virus.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 39) {virus.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 38) {virus.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 40) {virus.speedY = -3; }
    }
virus.newPos();    
virus.update();

    for (let i = 0; i < 2; i++){
        tiger[i].newPos();
        tiger[i].update();
        if(tiger[i].x+tiger[i].width >= 500){
            walkck[i] = 1;
        }
        else if(tiger[i].x <= 0){
            walkck[i] = 0;
        }
        if (mybottom >= tiger[i].y + 10 && myright >= tiger[i].x + 10 && mytop <= (tiger[i].y+tiger[i].height - 10) && myleft <= tiger[i].x + tiger[i].width - 10){
            myGamePiece.x = 225;
            myGamePiece.y = 651;
            document.getElementById("hp").innerHTML = "Hp:"+"💗".repeat(uhp-=1);
        }
    }
    if (walkck[0] == 0){
        tiger[0].x += 6;
    }
    else{
        tiger[0].x -= 4;
    }
    if (walkck[1] == 0){
        tiger[1].x += 5;
    }
    else{
        tiger[1].x -= 6;
    }

  for (let i = 0 ; i < 3; i++){
    meat[i].update();
    if ((mybottom >= meat[i].y && myright >= meat[i].x && mytop <= (meat[i].y+meat[i].height) && myleft <= meat[i].x + meat[i].width) || 
      (mytop <= (meat[i].y + meat[i].height) && myright >= meat[i].x && mybottom >= meat[i].y && myleft <= meat[i].x + meat[i].width)){
        if (score < 100){
            score += 5
            document.getElementById("myprog").style.width = score + "%"
        }
        if (score == 100){
            myGameArea.reset();
        }
        meat[i].newPosf();
      }
    }
    if (uhp == 0){
        myGameArea.clear();
        myGameArea.reset();
        document.getElementById("dsplay").style.display = "inline";
        document.getElementById("stats").style.display = "none";
        document.getElementById("canvas").style.display = "none";
    }
}
