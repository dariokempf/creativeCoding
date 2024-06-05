let song;
let fft;
let particles = [];
let flying = false;

function preload() {
  song = loadSound('../mp3/song.mp3');
}

function setup() {
  createCanvas(windowWidth, 1200);
  angleMode(DEGREES);
  fft = new p5.FFT();
  noFill(); // Standardlinie für den Sound deaktivieren
}

function draw() {
  background(0); // Hintergrundfarbe zu Schwarz ändern
  stroke(255);
  strokeWeight(3);
  noFill();
  
  translate(width / 2, height / 2);
  
  fft.analyze();
  let amp = fft.getEnergy(20, 200);

  if (flying) {
    particles.push(new Particle());
  }

  for (let t = -1; t <= 1; t += 2) {
    beginShape(); // Beginne die Form
    for (let i = 0; i <= 360; i += 0.5) { // Änderung: Bis 360 Grad gehen
      let index = floor(map(i, 0, 360, 0, width - 1));
      let r = map(fft.waveform()[index], -1, 1, 150, 350);
      let x = r * sin(i) * t;
      let y = r * cos(i);
      vertex(x, y); // Füge die Eckpunkte hinzu
    }
    endShape(); // Änderung: Kreis schließen
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230);
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
    flying = true;
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(255); // Zufällige Position auf der Kreisbahn
    this.vel = createVector(0, 0); // Zufällige Geschwindigkeit
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001)); // Anfangsbeschleunigung ist Null
    this.w = random(3, 5); // Zufällige Größe des Partikels
    this.color = [random(200, 255), random(200, 255), random(200, 255)];
  }

  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }

  edges() {
    return (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    );
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}
