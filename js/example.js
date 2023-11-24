let txt =
  "O meu nome é Francisco Rodrigues tenho 21 anos, sou licenciado em Design e Multimédia";

let img = [];
let numberImages = 4;

let randomX = [];

let white = "#f1f1f1";

let font;

let lockPosition = -1000;

function preload() {
  font = loadFont("assets/fonts/InknutAntiqua-Regular.ttf");

  for (let i = 0; i < numberImages; i++) {
    img[i] = loadImage("assets/images/" + i + ".jpeg");
  }
  // img[1] = loadImage("assets/images/eu.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  imageMode(CENTER);
  rectMode(CENTER, CENTER);
  textFont(font);
  textAlign(LEFT, CENTER);
  textSize(12);
  textWrap(WORD);

  let res = 500;
  // img.resize(res, 0);

  for (let i = 0; i < img.length; i++) {
    img[i].resize(res, 0);
    randomX[i] = random(width/4,width/2);
  }
  // img[0].resize(res, res);
  // img[0].resize(res, 0);
}

function draw() {
  clear();

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––CÂMERA E PRESPECTIVA
  perspective(PI / 2.9, float(width / height), 1, 100000);
  camera(0, 0, height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);

  // let wave = map(sin(radians(frameCount)), -1, 1, -22, 22);
  // let wave = map(mouseX, 0, width, -22, 22);
  // rotateY(radians(wave));

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––TRANSFORMAÇÕES INICIAIS

  translate(-windowWidth / 2, -windowHeight / 2, lockPosition);

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––GUIDES
  //Linhas
  stroke("#ff0000");
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);

  //Rectângulo Central
  push();
  fill("#ff0000");
  noStroke();
  rect(width / 2, height / 2, 10, 10);
  pop();

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––IMAGENS
  for (let i = 0; i < img.length; i++) {
    push();
    if(i % 2 === 0) {
      translate(width / 2 - randomX[i], height / 2, 1000*i);
      rotateY(PI / 3);
    } else {
      translate(width / 2 + randomX[i], height / 2, 1000*i);
      rotateY(-PI / 3);
    }
    
    image(img[i], 0, 0);
    
    pop();
  }
  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––DESCRIÇÃO SOBRE MIM
  push();
  //Propriedades Texto
  fill(white);

  translate(width / 2, height / 2, 0);

  //Texto
  text(txt, 0, 0, 200);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
  lockPosition += event.delta * 0.7;
  return false;
}
