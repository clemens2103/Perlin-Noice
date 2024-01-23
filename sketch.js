var inc = 0.1;
var scl = 15;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;
var buffer; // Buffer for off-screen drawing

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl); // Calculate number of columns based on scale
  rows = floor(height / scl); // Calculate number of rows based on scale

  flowfield = new Array(cols * rows); // Initialize flowfield array

  for (var i = 0; i < 150; i++) {
    particles[i] = new Particle(); // Create particles
  }
  buffer = createGraphics(windowWidth, windowHeight); // Create off-screen graphics buffer
  buffer.background('#1e2526'); // Set background color of buffer
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize canvas when window is resized
  buffer.resizeCanvas(windowWidth, windowHeight); // Resize buffer accordingly
  buffer.background('#1e2526'); // Reset background color after resizing
  cols = floor(width / scl); // Recalculate columns after resize
  rows = floor(height / scl); // Recalculate rows after resize
  flowfield = new Array(cols * rows); // Reinitialize flowfield array
}

function draw() {
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
    zoff += 0.0003; // Increment z-offset for noise
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield); // Particles follow the flowfield
    particles[i].update(); // Update particle position
    particles[i].edges(); // Handle particles reaching edges
    particles[i].show(buffer); // Draw particles on the buffer
  }

  image(buffer, 0, 0); // Draw the buffer on the main canvas
}
