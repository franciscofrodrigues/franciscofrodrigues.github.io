let txt =
  "O meu nome é Francisco Rodrigues tenho 21 anos, sou licenciado em Design e Multimédia";

let bg = "#000000";
let fg = "#f1f1f1";

let font;

function preload() {
  font = loadFont("InknutAntiqua-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  rectMode(CENTER, CENTER);
  textFont(font);
  textAlign(LEFT, CENTER);
  textSize(12);
  textWrap(WORD);

  
}

function draw() {
  clear();
  // orbitControl();

  //Camera e Prespectiva
  // perspective(PI / 4.0, float(width / height), 1, 100000);
  // camera(0, 0, height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);
  
  //TRANSFORMAÇÕES INICIAIS
  rotateY(map(mouseX, 0, width, -PI, PI));
  translate(-windowWidth/2, -windowHeight/2);

  //GUIDES
  //Linhas
  stroke("#ff0000");
  line(0, height/2, width, height/2);
  line(width/2, 0, width/2, height);

  //Rectângulo Central
  push();
  fill("#ff0000");
  noStroke();
  rect(width/2, height/2, 10, 10);
  pop();


  //DESCRIÇÃO SOBRE MIM
  push();
  //Propriedades Texto
  fill(fg);

  //Texto
  text(txt, width/2, height/2, 200);
  pop();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
