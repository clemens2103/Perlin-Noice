var inc = 0.1; // Increment value for noise calculation, controls the level of detail in noise
var scl = 20; // Scale for each cell in the flow field, controls the size of each cell
var cols, rows; 
var zoff = 0; // Z-offset in noise function, used for 3D noise to create continuous flow
var particles = []; 
var flowfield;
var buffer; // Buffer for off-screen drawing
var maxTime = 10000; // Maximale Zeit in Millisekunden (z.B. 10 Sekunden)
var startTime; // Startzeit speichern
var attractionPoints = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl); // Calculate number of columns based on scale
  rows = floor(height / scl); // Calculate number of rows based on scale

  flowfield = new Array(cols * rows); // Initialize flowfield array

  for (var i = 0; i < 150; i++) {
    particles[i] = new Particle();
  }
  buffer = createGraphics(windowWidth, windowHeight); // Create off-screen graphics buffer
  buffer.background('#1e2526'); // Set background color of buffer
  startTime = millis(); // Save starting time
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buffer.resizeCanvas(windowWidth, windowHeight);
  buffer.background('#1e2526');
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  startTime = millis();
}


// function drawText() {
//   textAlign(CENTER, CENTER); // Textausrichtung auf Mitte setzen
//   textSize(300); // Schriftgröße festlegen
//   fill('#1e2526'); // Textfarbe festlegen (hier weiß)
//   noStroke(); // Keine Umrandung für den Text
//   text('CS', width / 2, height / 2); // Text in der Mitte des Bildschirms zeichnen
// }

function draw() {
  if (millis() - startTime < maxTime) { // check if max time is reached

    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols; // Calculate index in flowfield array
        var angle = noise(xoff, yoff, zoff) * TWO_PI * 4; // Use Perlin noise to determine angle
        var v = p5.Vector.fromAngle(angle); // Create vector from angle
        v.setMag(1); // Set magnitude of vector
        flowfield[index] = v; // Store vector in flowfield array
        xoff += inc;
      }
      yoff += inc;
      zoff += 0.0003;
    }

    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield); // Particles follow the flowfield
      particles[i].update(); // Update particle position
      particles[i].edges(); // Handle particles reaching edges
      particles[i].show(buffer); // Draw particles on the buffer

    } 


  image(buffer, 0, 0); // Draw the buffer on the main canvas
  
  }
}