let img;
let originalPixels;

function preload() {
  // Lade ein Bild vorab
  img = loadImage("../cat.jpg");
}

function setup() {
  createCanvas(img.width, img.height).parent('canvas-container');
  // Zeige das Originalbild
  image(img, 0, 0);
  // Speichere die Originalpixel des Bildes
  img.loadPixels();
  originalPixels = img.pixels.slice();
}

function applyBlackAndWhiteFilter() {
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      // Berechne die Helligkeit des Pixels
      let brightness = (r + g + b) / 3;
      // Setze den Pixel auf Schwarz oder Weiß basierend auf seiner Helligkeit
      if (brightness > 127) {
        img.pixels[index] = 255;
        img.pixels[index + 1] = 255;
        img.pixels[index + 2] = 255;
      } else {
        img.pixels[index] = 0;
        img.pixels[index + 1] = 0;
        img.pixels[index + 2] = 0;
      }
    }
  }
  img.updatePixels();
  // Zeige das gefilterte Bild an
  image(img, 0, 0);
}

function revertToOriginal() {
  // Setze die Pixel des Bildes auf die Originalpixel zurück
  img.pixels = originalPixels.slice();
  img.updatePixels();
  // Zeige das Originalbild an
  image(img, 0, 0);
}
