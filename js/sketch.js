/*	_math_noisyWorm // cc teddavis.org 2019	*/

let x, y, s

function setup() {
	createCanvas(windowWidth, windowHeight)
	noCursor()
	background(0)
}

function draw() {
	x = noise(frameCount * .002) * width
	y = noise(frameCount * .003) * height
	s = noise(frameCount * .02) * 100

	ellipse(x, y, s)
}

function keyPressed() {
	if(keyCode == 8)
		background(0)
}