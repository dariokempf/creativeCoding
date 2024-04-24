function setup()    {
    createCanvas(100, 100)
    background(0, 150, 0);
    noFill();
    beginShape();
    vertex(20, 20);
    vertex(80, 20);
    vertex(80, 80);
    vertex(20, 80);
    endShape();


}

// function draw() {
//     clearInterval();
//     beginShape();
//     curveVertex(mouseX, mouseY);
//     curveVertex(20, 20);

//     curveVertex(mouseX, mouseY);
//     curveVertex(80, 80);

//     curveVertex(20, 80);
//     curveVertex(20, 80);
//     endShape();
// }