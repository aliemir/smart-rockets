function Obstacle(x, y, size) {
  this.x = x - size / 2
  this.y = y
  this.size = size

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
        this.y + this.size,
      )
    )
      return true
  }

  this.show = function() {
    fill(176, 38, 255)
    triangle(
      this.x,
      this.y,
      this.x + this.size,
      this.y,
      this.x + this.size / 2,
      this.y + this.size,
    )
    //rect(this.x, this.y, this.w, this.h)
  }
}
