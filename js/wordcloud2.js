let bg;
var lines;
var counts;
var total;

function preload() {
  lines = loadStrings('/js/shakespeare.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('white');  
  var params = {
    ignoreStopWords: true,
    ignoreCase: true,
    ignorePunctuation: true
  };
  counts = RiTa.concordance(lines.join(" "), params); 
  total = totalValues(counts);

  textAlign(CENTER, CENTER);
  textSize(40);
  noStroke();
  fill(random(255));
  noLoop();
}

function draw() {
  for (var k in counts) {
    if (counts.hasOwnProperty(k)) {
      if (counts[k] / total > 0.001) {
        fill(0, random(255), random(255));
        textSize((counts[k] / total) * 10000);
        let x = random(width * 0.25, width * 0.75); // Zufällige x-Position im mittleren Bereich
        let y = random(height * 0.25, height * 0.75); // Zufällige y-Position im mittleren Bereich
        text(k, x, y); // Positionierung im mittleren Bereich des Canvas
      }
    }
  }
}

function totalValues(obj) {
  var total = 0;
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      total += obj[k];
    }
  }
  return total;
}
