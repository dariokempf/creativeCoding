/*
Code for Codecademy Live: Creative Coding, Session 8

p5.sound.js References: https://p5js.org/reference/#/libraries/p5.sound
Music from: https://freemusicarchive.org/music/Jahzzar/Travellers_Guide/Siesta
*/

let sound;
let amp;
let fft;

let spectrumX = 0;
let spectrumY = 0;

let spectrumSpeed = 2;

let skyLayer;

// Load sound file before setup() function runs
function preload(){
  // Load the sound file saved as "siesta.mp3"
  sound = loadSound('siesta.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Loop sound file
  sound.loop();
  
  // Create an instance of the Amplitude object
  amp = new p5.Amplitude();

  // Create an instance of the FFT object
  fft = new p5.FFT();
  
  // Create a graphics layer 
  // createGraphics() reference - https://p5js.org/reference/#/p5/createGraphics
  skyLayer = createGraphics(width, height);

  skyLayer.colorMode(HSB, 360, 100, 100, 100);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 0, 0, 15);
  skyLayer.background(0, 0, 0, 2);

  // Get waveform and spectrum arrays
  let waveform = fft.waveform();
  let spectrum = fft.analyze();

  // Increment x position of spectrum by 2 pixels every frame
  spectrumX += spectrumSpeed;
  // Use Perlin noise to move y position of spectrum
  spectrumY = noise(frameCount * 0.001) * height / 2;

  // Bounce spectrum back and forth horizontally
  if(spectrumX > width || spectrumX < 0){
    spectrumSpeed *= -1;
  }

  for(let i = 0; i < spectrum.length; i++){
    // Map spectrum, originally between 0 - 255 to a new range between 0 and height / 2
    let spectrumHeight = map(spectrum[i], 0, 255, 0, height / 2);

    // Map hue based on spectrum
    let h = map(spectrum[i], 0, 255, 0, 360);
    // Draw spectrum to skyLayer graphics
    skyLayer.strokeWeight(0.1);
    skyLayer.stroke(int(h), 100, 100, 10);
    skyLayer.line(spectrumX, spectrumY, spectrumX, spectrumY - spectrumHeight);
  }

  // Draw skyLayer graphics to canvas using image() function
  image(skyLayer, 0, 0);

  for (let i = 0; i < waveform.length; i += 10) {
    // Map waveform of each frequency bin across width of canvas
    let x = map(i, 0, waveform.length, -25, width + 25);
    // Map wavefore freqeuncy to y position of rectangle
    let y = map(waveform[i] * 2, -1, 1, height / 2 + 100, height / 2 + 200);

    // Map hue based on waveform between 200 and 240
    let h = map(waveform[i], -1, 1, 200, 240);
    noStroke();
    fill(int(h), 100, 100, 15);
    // Create rounded rectangle with fifth argument
    rect(x, y, 50, height / 2, 25);
  }

  // Draw stars if amplitude is above 0.18
  if(amp.getLevel() > 0.18){
    // Draw 10 ellipses in random location with random width and height
    for(let i = 0; i < 10; i++){
      fill(0, 0, 100, random(20, 80));
      ellipse(random(width), random(0, height / 4 * 3), random(3, 5), random(3, 5));
    }

  }
}