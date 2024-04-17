let img; // Variable to hold the image
let scaleFactor = 1.0; // Initial scale factor

function preload() {
  // Load the image
  img = loadImage('image.jpg');
}

function setup() {
  createCanvas(800, 600); // Create a canvas
}

function draw() {
  background(220); // Set background color
  
  // Calculate scaled dimensions
  let scaledWidth = img.width * scaleFactor;
  let scaledHeight = img.height * scaleFactor;
  
  // Display the image at the scaled dimensions
  image(img, mouseX - scaledWidth / 2, mouseY - scaledHeight / 2, scaledWidth, scaledHeight);
}

function mouseWheel(event) {
  // Adjust scale factor based on mouse wheel movement
  scaleFactor += event.delta * 0.01;
  // Clamp scale factor to a minimum of 0.1 and a maximum of 4.0
  scaleFactor = constrain(scaleFactor, 0.1, 4.0);
}
