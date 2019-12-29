let p
let target, population
let obstacles = []
let general = new generalVariables()
let fitness = new fitnessVariables()
let game = new gameVariables(GAME_IDLE, Date.now())

function setup() {
  console.log('x')
  var canvas = createCanvas(WIDTH, HEIGHT)
  canvas.parent('p5-canvas-wrapper')
  frameRate(general.frameRate)
  population = new Population(game.id)
  target = new Target(64)
  createObstacles()
  p = createP()
}

function draw() {
  background(45, 40, 62)
  if (game.state === GAME_RUNNING) {
    population.run()
    game.moment++
  }
  target.show()
  obstacles.forEach(obs => obs.show())
  showSummary()

  if (game.moment == general.lifeSpan) {
    population.evaluate()
    population.selection()
    game.moment = 0
    game.generation++
  }
}
