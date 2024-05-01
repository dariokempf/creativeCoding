var canvas = null;
var triangles = null;

var CANVAS_AREA = null;
var CANVAS_W = 960;
var CANVAS_H = 720;

var backgroundColor = 255;
var strokeColor = 20;
var checkbox;

function Triangle(A, B, C) {
  this.A = A;
  this.B = B;
  this.C = C;

  var length1 = p5.Vector.dist(A,B);
  var length2 = p5.Vector.dist(B,C);
  var length3 = p5.Vector.dist(C,A);
  var s = (length1+length2+length3) / 2;
  this.area = Math.sqrt( s*(s-length1)*(s-length2)*(s-length3) );

  this.display = function() {
    var color;
    if(backgroundColor==255) {
      color = Math.floor( map(this.area, 0, CANVAS_AREA/16, 0, 255) );
    } else {
      color = Math.floor( map(this.area, 0, CANVAS_AREA/16, 255, 0) );
    }
    stroke(strokeColor);
    fill(color);
    triangle(this.A.x,this.A.y,this.B.x,this.B.y,this.C.x,this.C.y);
  }

  this.pointInside = function(P) {
    // Compute vectors
    var v0 = createVector(this.C.x - this.A.x, this.C.y - this.A.y);
    var v1 = createVector(this.B.x - this.A.x, this.B.y - this.A.y);
    var v2 = createVector(P.x - this.A.x, P.y - this.A.y);

    // Compute dot products
    var dot00 = p5.Vector.dot(v0, v0)
    var dot01 = p5.Vector.dot(v0, v1)
    var dot02 = p5.Vector.dot(v0, v2)
    var dot11 = p5.Vector.dot(v1, v1)
    var dot12 = p5.Vector.dot(v1, v2)

    // Compute barycentric coordinates
    var invDenom = 1 / (dot00 * dot11 - dot01 * dot01)
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom

    // Check if point is in triangle
    return (u >= 0) && (v >= 0) && (u + v < 1);
  }

}

function setup() {
  CANVAS_W = windowWidth;
  CANVAS_H = windowHeight;
  canvas = createCanvas(CANVAS_W, CANVAS_H);
  background(backgroundColor);
  strokeWeight(.2);
  stroke(strokeColor);
  CANVAS_AREA = CANVAS_W * CANVAS_H;
  // checkbox = createCheckbox('Dark Mode', false);
  // checkbox.mousePressed(toggleTheme);
}

function toggleTheme() {
  var darkTheme = !checkbox.checked();
  console.log('toggleTheme', darkTheme);
  if(darkTheme) {
    backgroundColor = 0;
    strokeColor = 235;
  } else {
    backgroundColor = 255;
    strokeColor = 20;
  }
}

function keyPressed() {
  var k = key.toLowerCase();
  switch(k) {
    case 's':
      saveCanvas(canvas, 'canvas.jpg');
      break;
  }
}

function draw() {
  background(backgroundColor);
  cursor(CROSS);
  var P = createVector(mouseX, mouseY);

  if(triangles==null) {
    // var A = {x:0,y:0};
    var A = createVector(0,0);
    var B = createVector(CANVAS_W, 0);
    var C = createVector(CANVAS_W, CANVAS_H);
    var D = createVector(0, CANVAS_H);
    noFill();
    stroke(strokeColor);
    line(A.x,A.y,P.x,P.y);
    line(B.x,B.y,P.x,P.y);
    line(C.x,C.y,P.x,P.y);
    line(D.x,D.y,P.x,P.y);
    if(mouseIsPressed) {
      triangles = [];
      triangles.push( new Triangle(A,B,P) );
      triangles.push( new Triangle(B,C,P) );
      triangles.push( new Triangle(C,D,P) );
      triangles.push( new Triangle(D,A,P) );
    }
  } else {
    for(var i=0; i<triangles.length; i++) {
      triangles[i].display();
    }
    for(var i=0; i<triangles.length; i++) {
      var pointInside = triangles[i].pointInside(P);
      var A = triangles[i].A;
      var B = triangles[i].B;
      var C = triangles[i].C;
      if(pointInside) {
        noFill();
        stroke(strokeColor);
        triangle(A.x,A.y,B.x,B.y,P.x,P.y);
        triangle(B.x,B.y,C.x,C.y,P.x,P.y);
        triangle(C.x,C.y,A.x,A.y,P.x,P.y);
        if(mouseIsPressed) {
          triangles.push( new Triangle(triangles[i].A,triangles[i].B,P) );
          triangles.push( new Triangle(triangles[i].B,triangles[i].C,P) );
          triangles.push( new Triangle(triangles[i].C,triangles[i].A,P) );
          triangles.splice(i,1);
        }
        break;
      }
    }
  }
}
