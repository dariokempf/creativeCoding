let x;
let y;

function setup() {
    createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  background(51);
}

function draw() {
  stroke(255, 100);
  strokeWeight(20);
  point(x, y);
  const r = floor(random(4));
  switch (r) {
    case 0:
      if(x + 20 > windowWidth){
        x = x - 20;
      }
      else{
        x = x + 20;
      }
      break;
    case 1:
        if(x - 20 > windowWidth){
            x = x + 20;
          }
          else{
            x = x - 20;
          }
      break;
    case 2:
        if(y + 20 > windowHeight){
            y = y - 20;
          }
          else{
            y = y + 20;
          }
      break;
    case 3:
      if(y - 20 > windowHeight){
        y = y + 20;
      }
      else{
        y = y - 20;
      }
      break;
  }
}