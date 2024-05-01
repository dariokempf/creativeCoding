let axiom = "F+F+F";
let sentence = axiom;
let rules = [];
let len = 400;
let angle;

// Regeldefinitionen
rules[0] = {
  a: "F",
  b: "F-F+F"
};

function generate() {
  len *= 0.5;
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  tree();
}

function tree() {
  background(205,38,38);
  resetMatrix();
  translate(width / 2, height / 2); // Verschiebe den Ursprung in die Mitte des Canvas
  stroke(0);
  strokeWeight(1);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    
    if (current == "F") {
      let nextX = 0;
      let nextY = -len;
      line(0, 0, nextX, nextY);
      translate(nextX, nextY);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    }
  }
}

function setup() {
  createCanvas(1900, 800);
  angle = radians(120);
  background(51);
  createP(axiom);
  tree();
  let button = createButton("Generate");
  button.mousePressed(generate);
}

function draw() {
}
