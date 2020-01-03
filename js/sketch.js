var p, target, population, obstacles
var moment = 0
var generation = 0

function showGeneration() {
  let sp = document.querySelector('#generation_span')
  if (sp) {
    sp.innerHTML = generation + 1
  }
}

function setup() {
  console.log('setup')
  let canvas = createCanvas(FIELD_WIDTH, FIELD_HEIGHT)
  canvas.parent('p5-canvas-wrapper')
  frameRate(FRAME_RATE)
  population = new Population()
  target = new Target(64)
  obstacles = new Obstacles()
  p = createP()
  showGeneration()
}

function draw() {
  background(45, 40, 62)
  population.run()

  moment++
  if (moment == LIFE_SPAN) {
    population.evaluate()
    population.selection()
    moment = 0
    generation++
    showGeneration()
  }

  target.show()
  obstacles.run()
}
