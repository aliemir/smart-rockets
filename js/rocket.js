function Rocket(dna, color) {
  this.position = createVector(INITIAL_POSITION_X, INITIAL_POSITION_Y)
  this.velocity = createVector()
  this.acceleration = createVector()

  this.color = color ? color : random(COLORS)
  this.dna = dna ? dna : new DNA()
  this.completed = false
  this.crashed = false
  this.fitness = 0

  this.outOfBounds = function() {
    return (
      this.position.x < 0 ||
      this.position.x > FIELD_WIDTH ||
      this.position.y > FIELD_HEIGHT
    )
  }

  this.applyForce = function(force) {
    this.acceleration.add(force)
  }

  this.calculateFitness = function() {
    let d = dist(this.position.x, this.position.y, target.x, target.y)
    this.fitness = map(d, 0, FIELD_WIDTH, FIELD_WIDTH, 0)
    if (this.completed) this.fitness *= COMPLETION_MULTIPLIER
    if (this.crashed) this.fitness *= CRASH_MULTIPLIER
    if (this.position.y <= FIELD_HEIGHT / 2)
      this.fitness *= PROXIMITY_MULTIPLIER
  }

  this.update = function() {
    if (target.hit(this.position)) {
      this.completed = true
      return
    }
    if (this.outOfBounds() || obstacles.hit(this.position)) {
      this.crashed = true
      return
    }
    this.applyForce(this.dna.genes[moment])
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  this.show = function() {
    push()
    noStroke()
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading())
    rotate(PI / 2)
    fill(this.color)
    triangle(0, -10, -7, 10, 7, 10)
    ellipse(0, 10, 5, 5)
    pop()
  }
}
