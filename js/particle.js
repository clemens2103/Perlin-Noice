class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height)); // Initial position set to a random location
    this.vel = createVector(0, 0); // Initial velocity set to zero
    this.acc = createVector(0, 0); // Initial acceleration set to zero
    this.maxspeed = 4; // Maximum speed of the particle
    this.prevPos = this.pos.copy(); // Storing the previous position for drawing
  }

  update() {
    this.vel.add(this.acc); // Add acceleration to velocity
    this.vel.limit(this.maxspeed); // Limit the velocity to the maximum speed
    this.pos.add(this.vel); // Update position based on velocity
    this.acc.mult(0); // Reset acceleration
  }

  follow(vectors) {
    var x = floor(this.pos.x / scl); // Calculate x index in the flowfield
    var y = floor(this.pos.y / scl); // Calculate y index in the flowfield
    var index = x + y * cols; // Calculate overall index in the flowfield
    var force = vectors[index]; // Get the force vector from the flowfield
    this.applyForce(force); // Apply this force
  }

  applyForce(force) {
    this.acc.add(force); // Add force to acceleration
  }

  show(pg) {
    pg.stroke(149, 184, 191); // Set stroke color for drawing
    pg.strokeWeight(1); // Set stroke weight
    pg.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y); // Draw a line from the previous position to the current position
    this.updatePrev(); // Update the previous position
  }

  updatePrev() {
    this.prevPos.x = this.pos.x; // Set previous x position
    this.prevPos.y = this.pos.y; // Set previous y position
  }

  edges() {
    // Check if the particle is out of the canvas bounds and wrap it around
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
