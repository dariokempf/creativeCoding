let word = "CreativeCoding";

function setup() {
  createCanvas(1900, 900);
  background(220);
  
  for (let i = 0; i < 30; i++) {
    fill(random(50, 255), 0, 0); // Rotfarbton
    textSize(random(20, 50));
    let x = random(width * 0.25, width * 0.75); // Zufällige x-Position in der Mitte des Canvas
    let y = random(height * 0.25, height * 0.75); // Zufällige y-Position in der Mitte des Canvas
    text(word, x, y);
  }
}
