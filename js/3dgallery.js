//TEXTO
let txt =
  "O meu nome é Francisco Rodrigues tenho 21 anos, sou de Pombal, Leiria. \nAtualmente estou a tirar Mestrado em Design e Multimédia, na Universidade de Coimbra.";
let info =
  "Desloque a página\n para me conhecer a mim \ne a algum do meu trabalho";
let font;

//ARRAY DE IMAGENS
let img = [];
let numberImages = 21;
let imageW;

//POSICIONAMENTO IMAGENS
let randomX = [];
let intervalZ = -1500;
let objectAng;

//POSIÇÃO SCROLL
let lockPosition = 0;

//HTML BODY BACKGROUND
let fromColor;
let toColor;
let currentColor;
let lerpedColor;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––PRELOAD
function preload() {
  font = loadFont("assets/fonts/InknutAntiqua-Regular.ttf");

  for (let i = 0; i < numberImages; i++) {
    img[i] = loadImage("assets/images/" + i + ".jpeg");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––PROPRIEDADES TEXTO + IMAGEM
  imageMode(CENTER);
  textFont(font);

  objectAng = PI / 6;
  imageW = 500;

  for (let i = 0; i < img.length; i++) {
    img[i].resize(imageW, 0);
    randomX[i] = random(width / 4, width / 2);
  }

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––LERPCOLOR
  fromColor = color(53, 82, 74);
  toColor = color(0, 0, 0);

  currentColor = fromColor;
}

function draw() {
  clear();

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––COR DO BODY
  lerpedColor = lerpColor(fromColor, toColor, map(lockPosition, 0, 1500, 0, 1));
  currentColor = lerpedColor;

  document.body.style.backgroundColor = currentColor;

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––CÂMERA E PRESPECTIVA
  perspective(PI / 2.9, float(width / height), 1, 100000);
  camera(0, 0, height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––TRANSFORMAÇÕES INICIAIS
  translate(-windowWidth / 2, -windowHeight / 2, lockPosition);

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––IMAGENS
  if (lockPosition >= 800) {
    for (let i = 0; i < img.length; i++) {
      push();
      if (i % 2 === 0) {
        translate(
          width / 2 - randomX[i],
          height / 2,
          intervalZ + intervalZ * i
        );
        rotateY(objectAng);
      } else {
        translate(
          width / 2 + randomX[i],
          height / 2,
          intervalZ + intervalZ * i
        );
        rotateY(-objectAng);
      }

      image(img[i], 0, 0);
      pop();
    }
  }

  if (lockPosition <= 500) {
    push();
    let textOpacity = map(lockPosition, 0, 300, 255, 0);

    let textColor = color(255);
    textColor.setAlpha(textOpacity);

    fill(textColor);
    translate(width / 2, height / 2 + height / 4, 0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(info, 0, 0);
    pop();
  }
  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––DESCRIÇÃO SOBRE MIM
  push();
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(20);
  textWrap(WORD);
  translate(width / 2-width/4, height / 2, 0);

  text(txt, 0, 0, width - width / 2);
  pop();
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––REDIMENSIONAR CANVAS COM BASE NO VIEWPORT
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––EVENTO DE SCROLL
function mouseWheel(event) {
  if (lockPosition <= 0) lockPosition = 0;
  if (lockPosition >= 35000) lockPosition = 0;

  console.log(lockPosition);
  lockPosition += event.delta * 0.7;
  return false;
}
