const addTriangleButton = document.createElement('button');
addTriangleButton.textContent = 'Add Triangle';
document.body.appendChild(addTriangleButton);

let clicked = false;
let timesButtorPressed = 0;

let trianglesSizes = [];
let trSize;

let trX = [];
let trY = [];

let colours = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "grey", "lightblue"];
let coloursForeachTriangle = [];

let rotationForeachTriangle = [];

function init() {
	
}

function update() {
	// Napisanoto tuk se izpulnqva otnovo i otnovo mnogo puti v sekunda
	/*myX = myX+(mouseX-myX)/10;
	myY = myY+(mouseY-myY)/10;*/
	
}

function draw() {
	// tuk naprogramirai kakvo da se risuva
	//drawImage(backCake, 0, 0, 800, 600);

	// if(clicked == true){
	// 	context.beginPath();
	// 	context.moveTo(75,75); //bottom corner
	// 	context.lineTo(10,75); //top right corner
	// 	context.lineTo(10,25); //top left corner
	// 	context.fillStyle = "red";
	// 	context.fill();
	// }

	context.font = "50px Arial"
	context.fillStyle = "Black"
	context.fillText("Triangles Count: " + timesButtorPressed, 20, 590, 300, 20);


	//? draws the border
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(750, 0);
	context.lineTo(750, 550);
	context.lineTo(0, 550);
	context.lineTo(0, 0);
	context.strokeStyle = 'black';
	context.lineWidth = 3; // set the line width
	context.stroke();


	clicked = false;

	addTriangleButton.addEventListener('click', () => {
		if(clicked == false){
			clicked = true;
			timesButtorPressed++;

			let newX = (randomInteger(700));
			let newY = (randomInteger(500));

			for(let i = 0; i < timesButtorPressed; i++){
				if(trianglesCollide(trX[i], trY[i], trX[i], trY[i] + 50, trX[i] + 50, trY[i] + 50, newX, newY, newX, newY + 50, newX + 50, newY + 50)){
					newX = (randomInteger(700));
					newY = (randomInteger(500));
					i = 0;
				}
			}

			trX.push(newX);
			trY.push(newY);

			coloursForeachTriangle.push(colours[randomInteger(colours.length)]);

			rotationForeachTriangle.push(0);
			
			//console.log('Button clicked!');
		}
	});

	 //?draws the triangle
	for(let i = 0; i < timesButtorPressed; i++){

		if(Math.ceil(rotationForeachTriangle[i]) == 0){
			drawRegularTriangle(trX[i], trY[i], coloursForeachTriangle[i]);

		}else if(Math.ceil(rotationForeachTriangle[i]) == 1){
			drawRotatedTriangle90(trX[i], trY[i], coloursForeachTriangle[i]);

		}else if(Math.ceil(rotationForeachTriangle[i]) == 2){
			drawRotatedTriangle180(trX[i], trY[i], coloursForeachTriangle[i]);
		}else if(Math.ceil(rotationForeachTriangle[i]) == 3){
			drawRotatedTriangle270(trX[i], trY[i], coloursForeachTriangle[i]);
		}

		if(rotationForeachTriangle[i] > 3){
			rotationForeachTriangle[i] = -1;

		}

		//! collision detection not properly working when rotating a triangle
		if(trianglesCollide(trX[i], trY[i], trX[i], trY[i] + 50, trX[i] + 50, trY[i] + 50, mouseX, mouseY, mouseX, mouseY + 1, mouseX + 1, mouseY + 1)){
			if(isKeyPressed[69] || isKeyPressed[32]){ //? pickup tr with "E" or "SPACE" (MOUSE NEEDED! NOT WORKING WITH TOUCHPAD)
				//console.log("TR clicked");

				trX[i] = trX[i]+(mouseX - trX[i] - 10);
				trY[i] = trY[i]+(mouseY - trY[i] - 25);
			}

			if(isKeyPressed[82]){//? rotate a triangle with "R"
				rotationForeachTriangle[i] += 0.1;
				
			}
			
		}
	}
}

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
}

function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}

/*if(document.getElementById('button').clicked == true){
	console.log("clicked");
 };*/


function drawRegularTriangle(x, y, color) {
		context.beginPath();
		context.moveTo(x, y); //bottom left corner
		context.lineTo(x, y + 50); //bottom right corner
		context.lineTo(x + 50, y + 50); //top corner
		context.lineTo(x, y);
		context.fillStyle = color; //coloursForeachTriangle[i];
		context.strokeStyle = 'black';
		context.fill();
		context.lineWidth = 1; // set the line width
		context.stroke();
		context.restore();
}

 function drawRotatedTriangle90(x, y, color) {
    context.save(); // Save the current context state
    context.translate(x + 25, y + 25); // Translate to the center of the triangle
    context.rotate(Math.PI / 2); // Rotate 90 degrees (π/2 radians)
    context.beginPath();
    context.moveTo(0, 0); //bottom left corner
	context.lineTo(0, 50); //bottom right corner
	context.lineTo(50, 50); //top corner
	context.lineTo(0, 0);
    context.closePath(); // Close the path
    context.fillStyle = color;
    context.strokeStyle = 'black';
    context.fill();
    context.lineWidth = 1;
    context.stroke();
    context.restore(); // Restore the context to its original state
}

function drawRotatedTriangle180(x, y, color) {
    context.save(); // Save the current context state
    context.translate(x + 25, y + 25); // Translate to the center of the triangle
    context.rotate(Math.PI); // Rotate 180 degrees
    context.beginPath();
    context.moveTo(0, 0); //bottom left corner
	context.lineTo(0, 50); //bottom right corner
	context.lineTo(50, 50); //top corner
	context.lineTo(0, 0);
    context.closePath(); // Close the path
    context.fillStyle = color;
    context.strokeStyle = 'black';
    context.fill();
    context.lineWidth = 1;
    context.stroke();
    context.restore(); // Restore the context to its original state
}

function drawRotatedTriangle270(x, y, color) {
    context.save(); // Save the current context state
    context.translate(x + 25, y + 25); // Translate to the center of the triangle
    context.rotate(3 * Math.PI / 2); // Rotate 270
    context.beginPath();
    context.moveTo(0, 0); //bottom left corner
	context.lineTo(0, 50); //bottom right corner
	context.lineTo(50, 50); //top corner
	context.lineTo(0, 0);
    context.closePath(); // Close the path
    context.fillStyle = color;
    context.strokeStyle = 'black';
    context.fill();
    context.lineWidth = 1;
    context.stroke();
    context.restore(); // Restore the context to its original state
}
