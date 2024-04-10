let rectangles = [];

function setup() {
    let canvas1 = createCanvas(400, 400);
    canvas1.parent("p5-canvas-1");
    strokeWeight(1);
    noFill();
}

function draw() {
    background('white');

    for (let i = 0; i < rectangles.length; i++) {
        let rectData = rectangles[i];
        stroke(random(255), random(255), random(255));
        rect(rectData.x, rectData.y, rectData.w, rectData.h);
    }
}

function mouseClicked() {
    let x = random(200);
    let y = random(200);
    let w = random(20, 200);
    let h = random(20, 200);
    // let r = random(255);
    // let g = random(255);
    // let b = random(255);
    
    let newRectangle = {
        x: x,
        y: y,
        w: w,
        h: h,
        // color: color(r, g, b)
    };
    rectangles.push(newRectangle);
}
