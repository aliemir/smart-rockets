function Obstacles() {
  this.stack = []
  // 800 600
  //this.stack.push(new Obstacle(200, 300, 100))

  //this.stack.push(new Obstacle(300, 250, 100))

  //this.stack.push(new Obstacle(350, 350, 100))
  this.stack.push(new Obstacle(300, 150, 40))
  this.stack.push(new Obstacle(300, 25, 50))

  this.stack.push(new Obstacle(400, 150, 40))
  this.stack.push(new Obstacle(400, -25, 50))

  this.stack.push(new Obstacle(500, 150, 40))
  this.stack.push(new Obstacle(500, 25, 50))

  // this.stack.push(new Obstacle(325, 325, 50))
  // this.stack.push(new Obstacle(350, 300, 50))
  // this.stack.push(new Obstacle(375, 300, 50))
  this.stack.push(new Obstacle(350, 360, 40))
  this.stack.push(new Obstacle(400, 430, 40))
  this.stack.push(new Obstacle(450, 360, 40))

  this.stack.push(new Obstacle(400, 290, 40))
  this.stack.push(new Obstacle(350, 220, 40))
  this.stack.push(new Obstacle(450, 220, 40))

  this.stack.push(new Obstacle(300, 290, 40))

  this.stack.push(new Obstacle(500, 290, 40))

  this.stack.push(new Obstacle(250, 220, 40))

  this.stack.push(new Obstacle(250, 360, 40))
  this.stack.push(new Obstacle(550, 360, 40))

  this.stack.push(new Obstacle(550, 220, 40))

  this.stack.push(new Obstacle(300, 430, 40))
  this.stack.push(new Obstacle(500, 430, 40))

  // this.stack.push(new Obstacle(425, 300, 50))
  // this.stack.push(new Obstacle(450, 300, 50))
  // this.stack.push(new Obstacle(475, 325, 50))

  // this.stack.push(new Obstacle(250, 350, 50))
  // this.stack.push(new Obstacle(300, 325, 50))
  // this.stack.push(new Obstacle(200, 325, 50))

  // this.stack.push(new Obstacle(550, 350, 50))
  // this.stack.push(new Obstacle(500, 325, 50))
  // this.stack.push(new Obstacle(600, 325, 50))

  //this.stack.push(new Obstacle(500, 250, 100))

  //this.stack.push(new Obstacle(600, 300, 100))

  this.stack.push(new Obstacle(0, 100, 300))
  this.stack.push(new Obstacle(0, FIELD_HEIGHT - 150, 300))
  this.stack.push(new Obstacle(FIELD_WIDTH, 100, 300))
  this.stack.push(new Obstacle(FIELD_WIDTH, FIELD_HEIGHT - 150, 300))
  //this.stack.push(new Obstacle(380, 250, 200))

  //this.stack.push(new Obstacle(0, 450, 160))
  //this.stack.push(new Obstacle(380, 450, 160))

  //this.stack.push(new Obstacle(95, 100, 80))
  //this.stack.push(new Obstacle(285, 100, 80))

  this.run = function() {
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i].show()
    }
  }

  this.hit = function(pos) {
    let flag = false
    for (let i = 0; i < this.stack.length; i++) {
      if (flag) {
        break
      }
      if (this.stack[i].hit(pos)) {
        flag = true
      }
    }
    return flag
  }
}
