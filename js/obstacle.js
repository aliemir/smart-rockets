function Obstacle(x, y, size) {
  this.x = x - size / 2
  this.y = y
  this.size = size
  const randomize = base => {
    let diff = 38
    const rand = random(diff)
    if (rand % 2 === 0) {
      return base + rand
    } else {
      return base - rand
    }
  }
  this.color = {
    r: 176 + random(75) - random(75),
    g: 38 + random(38) - random(38),
    b: 255 + random(255) + random(100) - random(100)
  }

  this.hit = function(input) {
    if (
      collidePointTriangle(
        input.x,
        input.y,
        this.x,
        this.y,
        this.x + this.size,
        this.y,
        this.x + this.size / 2,
        this.y + this.size
      )
    )
      return true
  }

  this.show = function() {
    fill(this.color.r, this.color.g, this.color.b)
    triangle(
      this.x,
      this.y,
      this.x + this.size,
      this.y,
      this.x + this.size / 2,
      this.y + this.size
    )
  }
}
