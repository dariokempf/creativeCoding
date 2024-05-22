let img;
let slider;
let imgSize = 800;

function preload() {
  img = loadImage("../js/trinken.jpg");
}

function setup() {
  createCanvas(800, 800); // Erhöhen Sie die Breite der Leinwand, um Platz für den Schieberegler zu schaffen
  slider = createSlider(50, 800, 800);
  slider.position(420, 450); // Position des Schiebereglers rechts neben dem Bild
}

function draw() {
  background(220); // Hintergrundfarbe
  imgSize = slider.value(); // Wert des Schiebereglers auslesen
  image(img, 0, 0, imgSize, imgSize); // Bild mit der Größe des Schiebereglers zeichnen
}
