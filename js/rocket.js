function Rocket(dna) {
  this.position = createVector(INITIAL_POSITION_X, INITIAL_POSITION_Y)
  this.history = []
  this.velocity = createVector()
  this.acceleration = createVector()
  this.color = { r: random(255), g: random(255), b: random(255) }
  this.dna = dna ? dna : new DNA()
  this.gravity = createVector(0, 0.05)
  this.completed = false
  this.crashed = false
  this.fitness = 0

  this.setHistory = function(p) {
    if (this.completed || this.crashed) {
      this.history = []
    } else {
      if (this.history.length >= 20) {
        this.history.pop() //pop from end
      }
      this.history.unshift(p) //add to start
    }
  }

  this.outOfBounds = function() {
    return (
      this.position.x < 0 || this.position.x > WIDTH || this.position.y > height
    )
  }

  this.applyForce = function(force) {
    this.acceleration.add(force)
    //this.acceleration.add(general.gravity)
  }

  this.calculateFitness = function() {
    let d = dist(this.position.x, this.position.y, target.x, target.y)
    this.fitness = map(d, 0, width, width, 0)
    if (this.completed) this.fitness *= fitness.completed
    if (this.crashed) this.fitness *= fitness.crash
  }

  this.update = function() {
    if (target.hit(this.position)) {
      this.completed = true
    }
    if (this.outOfBounds() || hitAny(this.position)) {
      this.crashed = true
    }
    this.setHistory(this.position)
    this.applyForce(this.dna.genes[game.moment])
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  this.show = function() {
    stroke(this.color.r, this.color.g, this.color.b, 64)
    strokeWeight(2)
    for (let i = 1; i < this.history.length; i++) {
      line(
        this.history[i].x,
        this.history[i].y,
        this.history[i - 1].x,
        this.history[i - 1].y,
      )
    }
    push()
    noStroke()
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading())
    rotate(PI / 2)
    fill(this.color.r, this.color.g, this.color.b, 255)
    triangle(0, -10, -7, 10, 7, 10)
    ellipse(0, 10, 5, 5)
    pop()
  }
}
