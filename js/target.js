function Target(r) {
  this.r = r
  this.x = TARGET_X
  this.y = TARGET_Y

  this.hit = function(input) {
    let d = dist(input.x, input.y, this.x, this.y)
    if (d < this.r / 2) return true
  }

  this.show = function() {
    noStroke()
    fill(244, 244, 244)
    ellipse(this.x, this.y, this.r, this.r)
    fill(202, 202, 202)
    ellipse(this.x - 10, this.y - 16, 15, 15)
    fill(202, 202, 202)
    ellipse(this.x - 20, this.y - 2, 6, 6)
    fill(202, 202, 202)
    ellipse(this.x - 10, this.y + 8, 4, 4)
    fill(202, 202, 202)
    ellipse(this.x + 8, this.y + 18, 8, 8)
    fill(202, 202, 202)
    ellipse(this.x + 12, this.y, 9, 9)
    fill(202, 202, 202)
    ellipse(this.x + 6, this.y - 12, 5, 5)
  }
}
