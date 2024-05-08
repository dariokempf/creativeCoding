var txt = "  From fairest creatures we desire increase, That thereby beauty's rose might never die, But as the riper should by time decease, His tender heir might bear his memory: But thou contracted to thine own bright eyes, Feed'st thy light's flame with self-substantial fuel, Making a famine where abundance lies, Thy self thy foe, to thy sweet self too cruel: Thou that art now the world's fresh ornament, And only herald to the gaudy spring, Within thine own bud buriest thy content, And tender churl mak'st waste in niggarding: Pity the world, or else this glutton be, To eat the world's due, by the grave and thee.";
var order = 2;
var ngrams = {};
var button;

function setup() {
  noCanvas();

  for (var i = 0; i <= txt.length - order; i++) {
    var gram = txt.substring(i, i + order);

    if (!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(txt.charAt(i + order));
  }
  button = createButton("generate");
  button.mousePressed(markovIt);
  console.log(ngrams);
}

function markovIt() {

  var currentGram = txt.substring(0, order);
  var result = currentGram;

  for (var i = 0; i < 100; i++) {
    var possibilities = ngrams[currentGram];
    if (!possibilities) {
      break;
    }
    var next = random(possibilities);
    result += next;
    var len = result.length;
    currentGram = result.substring(len - order, len);
  }

  var p = createP(result);
  p.style('color', 'white'); // Setze die Farbe des generierten Textes auf Weiß
}
