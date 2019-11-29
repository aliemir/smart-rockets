const GAME_IDLE = 'IDLE'
const GAME_RUNNING = 'RUNNING'
const GAME_PAUSED = 'PAUSED'
var target, population
var obstacles = []

const general = {
  frameRate: 60, //done
  maxForce: 0.5, //done
  lifeSpan: 400, //done
  popSize: 20, //done
  mutation: true, //done
  crossover: true
}
const fitness = {
  completion: 100,
  crash: 0.3,
  proximity: 1,
  mutation: 0.001
}

const gameStatus = {
  status: GAME_IDLE
}
var stopCount = 0
var count = 0
var totalMutation = 0
var totalCompleted = 0
var pops = 0
var p
let timerActive = false
let time = 0
let timer = setInterval(function() {
  if (timerActive) {
    time++
  }
}, 1000)

function setGenerals(vals) {
  general.mutation = vals.mutation == 'on' ? true : false
  general.crossover = vals.crossover == 'on' ? true : false
  general.frameRate = parseInt(vals.frameInput)
  general.popSize = parseInt(vals.popInput)
  general.lifeSpan = parseInt(vals.lifeInput)
  general.maxForce = parseFloat(vals.forceInput)
}

function startGame() {
  if (gameStatus.status == GAME_IDLE || gameStatus.status == GAME_PAUSED) {
    gameStatus.status = GAME_RUNNING
    timerActive = true
    if (gameStatus.status == GAME_IDLE) {
      setup()
      pops = 1
    }
  }
}
function pauseGame() {
  if (gameStatus.status == GAME_RUNNING) {
    gameStatus.status = GAME_PAUSED
    timerActive = false
  }
}
function resetGame() {
  gameStatus.status = GAME_IDLE
  setup()
  time = 0
  pops = 1
  timerActive = false
}

function frameListener() {
  const val = $('#frameInput').val()
  $('#frameInput-value').text(val)
}

function popListener() {
  const val = $('#popInput').val()
  $('#popInput-value').text(val)
}
function lifeListener() {
  const val = $('#lifeInput').val()
  $('#lifeInput-value').text(val)
}
function forceListener() {
  const val = $('#forceInput').val()
  $('#forceInput-value').text(val)
}
function completeListener() {
  const val = $('#compMultInput').val()
  $('#compMultInput-value').text(val)
}
function crashListener() {
  const val = $('#crashMultImput').val()
  $('#crashMultImput-value').text(val)
}
function proximityListener() {
  const val = $('#proxMultInput').val()
  $('#proxMultInput-value').text(val)
}
function mutationListener() {
  const val = $('#mutProbInput').val()
  $('#mutProbInput-value').text(val)
}

$(document).ready(function() {
  popListener()
  lifeListener()
  forceListener()
  frameListener()
  completeListener()
  crashListener()
  proximityListener()
  mutationListener()

  $('#variable-form').on('submit', function(e) {
    // Get all the forms elements and their values in one step
    e.preventDefault()
    var values = {}
    $('#variable-form')
      .serializeArray()
      .forEach(el => {
        values[el.name] = el.value
      })
    //setGenerals(values)
  })
  $('#fitness-form').on('submit', function(e) {
    // Get all the forms elements and their values in one step
    e.preventDefault()
    var values = {}
    $('#fitness-form')
      .serializeArray()
      .forEach(el => {
        values[el.name] = el.value
      })
    //setGenerals(values)
  })

  $('button#start-game').click(startGame)
  $('button#pause-game').click(pauseGame)
  $('button#reset-game').click(resetGame)

  $('#frameInput').on('input', function() {
    $('#frameInput').trigger('change')
  })
  $('#popInput').on('input', function() {
    $('#popInput').trigger('change')
  })
  $('#lifeInput').on('input', function() {
    $('#lifeInput').trigger('change')
  })
  $('#forceInput').on('input', function() {
    $('#forceInput').trigger('change')
  })
  $('#compMultInput').on('input', function() {
    $('#compMultInput').trigger('change')
  })
  $('#crashMultImput').on('input', function() {
    $('#crashMultImput').trigger('change')
  })
  $('#proxMultInput').on('input', function() {
    $('#proxMultInput').trigger('change')
  })
  $('#mutProbInput').on('input', function() {
    $('#mutProbInput').trigger('change')
  })

  $('#compMultInput').change(completeListener)
  $('#crashMultImput').change(crashListener)
  $('#proxMultInput').change(proximityListener)
  $('#mutProbInput').change(mutationListener)

  $('#frameInput').change(frameListener)
  $('#popInput').change(popListener)
  $('#lifeInput').change(lifeListener)
  $('#forceInput').change(forceListener)
})

function showSummary() {
  $('#status-label-value').text(gameStatus.status)
  $('#generation-label-value').text(pops)
  $('#all-population-label-value').text(pops * general.popSize)
  $('#total-mutation-label-value').text(totalMutation)
  // $('#total-completed-label-value').text(
  //   totalCompleted + '(' + (totalCompleted / (pops * popSize)) * 100 + '%)',
  // )
  $('#total-time-label-value').text(time)
}

// var last3gentrails = [[],[],[]]

// function addToTrails(rockets) {
//   if(last3gentrails.length >= 3) {
//     last3gentrails.pop();
//   }
//   const histories = rockets.map(el => (el.history));
//   last3gentrails.unshift(histories);
// }

function createObstacles() {
  obstacles.push(new Obstacle(190, 350, 140))

  obstacles.push(new Obstacle(0, 250, 200))
  obstacles.push(new Obstacle(380, 250, 200))

  obstacles.push(new Obstacle(0, 450, 160))
  obstacles.push(new Obstacle(380, 450, 160))

  obstacles.push(new Obstacle(95, 100, 80))
  obstacles.push(new Obstacle(285, 100, 80))
}

function hitAny(point) {
  let flag = false
  obstacles.forEach(obs => {
    if (obs.hit(point)) {
      flag = true
    }
  })
  return flag
}

function setup() {
  var canvas = createCanvas(380, 800)
  canvas.parent('p5-canvas-wrapper')
  frameRate(general.frameRate)
  population = new Population()
  createObstacles()
  target = new Target(64)
  p = createP()
}

function draw() {
  background(45, 40, 62)
  if (gameStatus.status === GAME_RUNNING) {
    population.run()
    count++
  }
  target.show()
  obstacles.forEach(obs => obs.show())
  // last3gentrails.forEach((trailgen, ind) => {
  //   trailgen.forEach(trails => {
  //     for(let i = 1;i<trails.length;i++){
  //       stroke(0,0,0,(3-ind)*25)
  //       strokeWeight(1);
  //       line(trails[i].x,trails[i].y,trails[i-1].x,trails[i-1].y)
  //     }
  //   });
  // })
  showSummary()

  if (count == general.lifeSpan) {
    population.evaluate()
    population.selection()
    count = 0
    pops++
  }
}

function Rocket(dna) {
  this.counted = false
  this.pos = createVector(width / 2, height - 10)
  this.history = []
  this.vel = createVector()
  this.acc = createVector()
  this.col = { r: random(255), g: random(255), b: random(255) }
  //this.col = color(random(255), random(255), random(255))

  if (dna) this.dna = dna
  else this.dna = new DNA()

  this.gravity = createVector(0, 0.05)
  this.completed = false
  this.crashed = false
  this.fitness = 0

  this.applyForce = function(force) {
    this.acc.add(force)
    //this.acc.add(this.gravity);
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y)
    this.fitness = map(d, 0, width, width, 0)
    if (this.completed) this.fitness *= 100
    if (this.crashed) this.fitness /= 10
    if (this.pos.y >= height) this.fitness /= 2
    if (this.pos.y < 0) this.fitness /= 2
    if (this.pos.y < height / 2) this.fitness *= 3
  }

  this.update = function() {
    if (target.hit(this.pos)) {
      if (this.completed == false) {
        totalCompleted++
      }
      this.completed = true
    }
    if (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y > height ||
      hitAny(this.pos)
    )
      this.crashed = true

    if (this.crashed || this.completed) {
      if (this.history.length != 0) {
        this.history.pop()
      }
    }

    if (!this.crashed && !this.completed) {
      if (this.history.length >= 20) {
        this.history.pop()
      }
      this.history.unshift({ x: this.pos.x, y: this.pos.y })

      this.applyForce(this.dna.genes[count])
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.mult(0)
    }
  }

  this.show = function() {
    stroke(this.col.r, this.col.g, this.col.b, 64)
    strokeWeight(2)
    for (let i = 1; i < this.history.length; i++) {
      line(
        this.history[i].x,
        this.history[i].y,
        this.history[i - 1].x,
        this.history[i - 1].y
      )
    }
    push()
    noStroke()
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading())
    rotate(PI / 2)
    fill(this.col.r, this.col.g, this.col.b, 255)
    triangle(0, -10, -7, 10, 7, 10)
    ellipse(0, 10, 5, 5)
    pop()
  }
}

function Population() {
  this.rockets = []
  this.matingpool = []

  for (var a = 0; a < general.popSize; a++) this.rockets[a] = new Rocket()

  this.evaluate = function() {
    var maxfit = 0
    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].calcFitness()
      if (this.rockets[i].fitness > maxfit) maxfit = this.rockets[i].fitness
    }

    for (var i = 0; i < this.rockets.length; i++)
      this.rockets[i].fitness /= maxfit

    this.matingpool = []
    for (var i = 0; i < this.rockets.length; i++) {
      var n = this.rockets[i].fitness * 100
      for (var j = 0; j < n; j++) this.matingpool.push(this.rockets[i])
    }
  }

  this.selection = function() {
    var newRockets = []
    for (var i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingpool)
      var parentB = random(this.matingpool)
      if (parentA.fitness > parentB.fitness) {
        var child = parentA.dna.crossover(parentB.dna)
      } else {
        var child = parentB.dna.crossover(parentA.dna)
      }
      if (general.mutation) {
        child.mutation()
      }
      newRockets[i] = new Rocket(child)
    }
    //addToTrails(this.rockets);
    this.rockets = newRockets
  }

  this.failed = function() {
    for (var i = 0; i < this.rockets.length; i++) {
      if (!this.rockets[i].crashed) return false
    }
    return true
  }

  this.run = function() {
    if (general.popSize <= this.rockets.length) {
      for (var a = 0; a < general.popSize; a++) {
        this.rockets[a].update()
        this.rockets[a].show()
      }
    } else {
      for (var a = 0; a < this.rockets.length; a++) {
        this.rockets[a].update()
        this.rockets[a].show()
      }
      let diff = general.popSize - this.rockets.length
      for (let x = 0; x < diff; x++) {
        this.rockets.push(new Rocket())
      }
    }
  }
}

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
        this.y + this.size
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
      this.y + this.size
    )
    //rect(this.x, this.y, this.w, this.h)
  }
}

function Target(r) {
  this.r = r
  this.x = width / 2
  this.y = height / 4

  this.hit = function(input) {
    var d = dist(input.x, input.y, this.x, this.y)
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

function DNA(genes) {
  if (genes) {
    this.genes = genes
  } else {
    this.genes = []

    for (var i = 0; i < general.lifeSpan; i++) {
      this.genes[i] = p5.Vector.random2D()
      this.genes[i].setMag(general.maxForce)
    }
  }

  this.crossover = function(partner) {
    if (!general.crossover) {
      return new DNA(this.genes)
    }
    var newgenes = []
    var mid = floor(random(this.genes.length / 2))
    for (var i = 0; i < this.genes.length; i++) {
      var rand = random(this.genes.length)
      if (rand > mid) {
        newgenes[i] = this.genes[i]
      } else {
        newgenes[i] = partner.genes[i]
      }
    }
    return new DNA(newgenes)
  }

  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.001) {
        totalMutation++
        this.genes[i] = p5.Vector.random2D()
        this.genes[i].setMag(general.maxForce)
      }
    }
  }
}
