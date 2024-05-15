// Daniel Shiffman
// Game of Life

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;
    background(0); // Hintergrund schwarz setzen

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // Zufällige Zuweisung der Gruppen
            grid[i][j] = {
                state: floor(random(2)), // Zustand: 0 oder 1
                color: color(random(255), random(255), random(255)) // Zufällige Farbe
            };
        }
    }
}

function draw() {

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            fill(grid[i][j].color); // Farbe aus der Grid-Zelle übernehmen
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
    }

    let next = make2DArray(cols, rows);

    // Berechne den nächsten Zustand basierend auf dem aktuellen Zustand
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j].state;
            // Zähle lebende Nachbarn!
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);

            if (state == 0 && neighbors == 3) {
                next[i][j] = {
                    state: 1, // Wächst
                    color: color(255, 255, 255) // Grüne Farbe für das Wachstum
                };
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = {
                    state: 0, // Stirbt
                    color: color(0, 0, 0) // Rote Farbe für das Sterben
                };
            } else {
                next[i][j] = grid[i][j]; // Bleibt gleich
            }

        }
    }

    grid = next;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row].state;
        }
    }
    sum -= grid[x][y].state;
    return sum;
}
