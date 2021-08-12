let canvaspong = document.getElementById("pong");
let context = canvaspong.getContext("2d");
let box = 20;
let bolaXY = [20*box, 20*box];
let dirx = (-1)**(Math.floor(9.9*Math.random()));
let diry = (-1)**(Math.floor(9.9*Math.random()));
let vx =   Math.floor(10*Math.random()+1);
let vy =   Math.floor(10*Math.random());
let veloXY = [dirx*vx, diry*vy];
let p1X = 0;
let p1Y = 400;
let p2X = 800-box;
let p2Y = 400;
let controle1 = "parado";
let controle2 = "parado";
let pontos1= 0;
let pontos2= 0;
let jogo;

/*audio*/
let somWall = new Audio("./sfx/wall.wav");
let somGol = new Audio("./sfx/gol.wav");



/*Botao continuar*/
function rodarJogo(){
    jogo = setInterval(iniciaJogo,17);
    bolaXY = [20*box, 20*box];
    dirx = (-1)**(Math.floor(9.9*Math.random()));
    diry = (-1)**(Math.floor(9.9*Math.random()));
    vx =   Math.floor(10*Math.random()+1);
    vy =   Math.floor(10*Math.random());
    veloXY = [dirx*vx, diry*vy];
    document.getElementById("pontos").innerHTML = " ";
}
function rodarJogonovo(){
    jogo = setInterval(iniciaJogo,17);
    bolaXY = [20*box, 20*box];
    dirx = (-1)**(Math.floor(9.9*Math.random()));
    diry = (-1)**(Math.floor(9.9*Math.random()));
    vx =   Math.floor(10*Math.random()+1);
    vy =   Math.floor(10*Math.random());
    veloXY = [dirx*vx, diry*vy];
    pontos1= 0;
    pontos2= 0;
    document.getElementById("pt2").innerHTML = pontos2; 
    document.getElementById("pt1").innerHTML = pontos1; 
    document.getElementById("pontos").innerHTML = " ";
}

function criaTerreno(){
    context.fillStyle = "black";
    context.fillRect(0,0,40*box,40*box);
}

function criaBola(){
    context.fillStyle = "white";
    context.fillRect(bolaXY[0],bolaXY[1],box,box);
}

function criaP1(){
    context.fillStyle = "white";
    context.fillRect(p1X, p1Y,box,5*box);
}

function criaP2(){
    context.fillStyle = "white";
    context.fillRect(p2X, p2Y,box,5*box);
}

/*botoes*/
document.addEventListener('keydown',update);
function update(event){
    if(event.keyCode == 87 && (p1Y-box)>0) {
        p1Y = p1Y - 2*box;
        controle1 = "cima";
    };
    if(event.keyCode == 83 && (p1Y+5*box)<800 ){
        p1Y = p1Y + 2*box;
        controle1 = "baixo";
    };  
    if(event.keyCode == 38 && (p2Y-box)>0) {
        p2Y = p2Y - 2*box;
        controle2 = "cima";
    };
    if(event.keyCode == 40 && (p2Y+5*box)<800 ){
        p2Y = p2Y + 2*box;
        controle2 = "baixo";
    };  
}


function iniciaJogo(){
    criaTerreno();
    criaBola();
    criaP1();
    criaP2();
    /*colisao com paredes*/
    if(bolaXY[1] >= (800-box)){
        veloXY[1] = -1*veloXY[1];
        somWall.play();
       
    };
    if(bolaXY[1] <= 0){
        veloXY[1] = -1*veloXY[1];
        somWall.play();
       
    };
    /*colisao com jogadores*/
    if(bolaXY[0]<= (p1X+box) &&  bolaXY[1]>(p1Y-box)  && bolaXY[1]<(p1Y+5*box)){
        veloXY[0]= -1*veloXY[0];
        somWall.play();
        if(controle1== "cima"){
            veloXY[1]= veloXY[1]-5;
        };
        if(controle1== "baixo"){
            veloXY[1]= veloXY[1]+5;
        };
    };

    if(bolaXY[0]>= (p2X-box) &&  bolaXY[1]>(p2Y-box)  && bolaXY[1]<(p2Y+5*box)){
        veloXY[0]= -1*veloXY[0];
        somWall.play();
        if(controle2== "cima"){
            veloXY[1]= veloXY[1]-5;
        };
        if(controle2== "baixo"){
            veloXY[1]= veloXY[1]+5;
        };
    };
    /*pontuacao p2 - esquerda*/
    if(bolaXY[0]<0){               
        pontos2= pontos2+1; 
        somGol.play();
        document.getElementById("pontos").innerHTML = "Ponto do jogador 2!";
        document.getElementById("pt2").innerHTML = pontos2; 
        clearInterval(jogo);                  
    };
    /*pontuacao p1 - direita*/
    if(bolaXY[0]>800-box){         
        pontos1= pontos1+1;  
        somGol.play();
        document.getElementById("pontos").innerHTML = "Ponto do jogador 1!";
        document.getElementById("pt1").innerHTML = pontos1;  
        clearInterval(jogo);         
    };

   
    /*bola atualizada */
    bolaXY[0] = bolaXY[0] + veloXY[0];
    bolaXY[1] = bolaXY[1] + veloXY[1];

   
    
}
