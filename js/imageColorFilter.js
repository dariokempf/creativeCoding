let img;
let originalImg;

function preload() {
  img = loadImage("../js/universe.jpg");
}

function setup() {
  createCanvas(1900, 1500);
  originalImg = img.get(); // Speichert eine Kopie des ursprünglichen Bildes
  image(img, 0, 0, 1900, 950);

  // Buttons erstellen
  let colorButton = createButton('Farben filtern');
  colorButton.position(420, 200);
  colorButton.mousePressed(filterColor);

  let sortButton = createButton('Bild sortieren');
  sortButton.position(550, 200);
  sortButton.mousePressed(sortImage);
}

function filterColor() {
  img = originalImg.get(); // Zurücksetzen des Bildes auf das Original
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    if (r > g && r > b) {
      // Rotwert am höchsten
      img.pixels[i] = r;
      img.pixels[i + 1] = 0;
      img.pixels[i + 2] = 0;
    } else if (g > r && g > b) {
      // Grünwert am höchsten
      img.pixels[i] = 0;
      img.pixels[i + 1] = g;
      img.pixels[i + 2] = 0;
    } else if (b > r && b > g) {
      // Blauwert am höchsten
      img.pixels[i] = 0;
      img.pixels[i + 1] = 0;
      img.pixels[i + 2] = b;
    } else {
      // Mischung der Farben
      img.pixels[i] = r;
      img.pixels[i + 1] = g;
      img.pixels[i + 2] = b;
    }
  }

  img.updatePixels();
  image(img, 0, 0, 1900, 950); // Bild mit den geänderten Pixeln neu zeichnen
}

function sortImage() {
  img = originalImg.get(); // Zurücksetzen des Bildes auf das Original
  img.loadPixels();

  let sortedPixels = [];
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let brightness = (r + g + b) / 3;
    sortedPixels.push({ r, g, b, brightness });
  }

  sortedPixels.sort((a, b) => b.brightness - a.brightness);

  for (let i = 0; i < sortedPixels.length; i++) {
    img.pixels[i * 4] = sortedPixels[i].r;
    img.pixels[i * 4 + 1] = sortedPixels[i].g;
    img.pixels[i * 4 + 2] = sortedPixels[i].b;
  }

  img.updatePixels();
  image(img, 0, 0, 1900, 950); // Bild mit den sortierten Pixeln neu zeichnen
}
