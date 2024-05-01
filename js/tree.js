let axiom = "X";
let sentence = axiom;
let rules = [];
let len = 250;
let angle;
rules[0] = {
  a: "X",
  b: "F+[[X]-X]-F[-FX]+X"
}
rules[1] = {
  a: "F",
  b: "FF"
}

function generate() {
  len *= 0.5
  let nextSentence = ""
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false
    for(let j = 0; j < rules.length; j++) {
      if(current == rules[j].a) {
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
  translate(width/2, height);
  stroke(255,100);
  strokeWeight(1);
  for(let i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    
    if (current == "F"){
      line(0,0,0,-len);
      translate(0,-len);
    } else if (current == "+") {
      rotate(angle);
    }else if (current == "-") {
      rotate(-angle);
    }else if (current == "[") {
      push();
    }else if (current == "]") {
      pop();
    }
  }
}


function setup() {
  createCanvas(1900,700);
  angle = radians(35);
  background(51);
  createP(axiom);
  tree();
  var button = createButton("Äste generieren");
  button.mousePressed(generate)
}

function draw() {
}