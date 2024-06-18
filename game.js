const addTriangleButton = document.createElement('button');
addTriangleButton.textContent = 'Add Triangle';
document.body.appendChild(addTriangleButton);
  
/*addTriangleButton.addEventListener('click', () => {
	console.log('New button clicked!');
});*/

let clicked = false;
let timesButtorPressed = 0;

let trX = [];
let trY = [];

let colours = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "grey", "lightblue"];
let coloursForeachTriangle = [];

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
			
			console.log('Button clicked!');
		}
	});

	 //?draws the triangle
	for(let i = 0; i < timesButtorPressed; i++){

		context.beginPath();
		context.moveTo(trX[i], trY[i]); //bottom left corner
		context.lineTo(trX[i], trY[i] + 50); //bottom right corner
		context.lineTo(trX[i] + 50, trY[i] + 50); //top corner
		context.lineTo(trX[i], trY[i]);
		context.fillStyle = coloursForeachTriangle[i];
		context.strokeStyle = 'black';
		context.fill();
		context.lineWidth = 1; // set the line width
		context.stroke();


		if(trianglesCollide(trX[i], trY[i], trX[i], trY[i] + 50, trX[i] + 50, trY[i] + 50, mouseX, mouseY, mouseX, mouseY + 1, mouseX + 1, mouseY + 1)){
			if(isKeyPressed[69] || isKeyPressed[32]){ //? pickup tr with "E" or "SPACE" (MOUSE NEEDED! NOT WORKING WITH TOUCHPAD)
				console.log("TR clicked");

				trX[i] = trX[i]+(mouseX-trX[i] - 10);
				trY[i] = trY[i]+(mouseY-trY[i] - 25);
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