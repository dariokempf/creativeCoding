let img1, img2;
let slider;
let imgSize = 800;
let showSecondImage = false;

function preload() {
  img1 = loadImage("../js/gringe.jpg");
  img2 = loadImage("../js/dog.jpg"); // Lade das zweite Bild
}

function setup() {
  createCanvas(800, 800); // Erhöhen Sie die Breite der Leinwand, um Platz für den Schieberegler zu schaffen
  slider = createSlider(50, 800, 800);
  slider.position(1000, 400); // Position des Schiebereglers rechts neben dem Bild
  
  let button = createButton('Load Second Image');
  button.position(1000, 450); // Position des Knopfs unter dem Schieberegler
  button.mousePressed(toggleSecondImage); // Funktion aufrufen, wenn der Knopf gedrückt wird
}

function draw() {
  background(220); // Hintergrundfarbe
  imgSize = slider.value(); // Wert des Schiebereglers auslesen
  image(img1, 0, 0, imgSize, imgSize); // Erstes Bild mit der Größe des Schiebereglers zeichnen

  if (showSecondImage) {
    tint(255, 127); // Halbtransparent zeichnen
    image(img2, 0, 0, imgSize, imgSize); // Zweites Bild mit der gleichen Größe zeichnen
    noTint(); // Transparenz zurücksetzen
  }
}

function toggleSecondImage() {
  showSecondImage = !showSecondImage; // Zustand umschalten
}
