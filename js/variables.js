function generalVariables(
  fr = 60,
  mf = 0.5,
  g = 0.05,
  ls = 400,
  ps = 20,
  mt = true,
  co = true,
) {
  this.frameRate = fr
  this.maxForce = mf
  this.gravity = g
  this.lifeSpan = ls
  this.popSize = ps
  this.mutation = mt
  this.crossover = co

  this.set = function(fr, mf, g, ls, ps, mt, co) {
    this.frameRate = fr
    this.maxForce = mf
    this.gravity = g
    this.lifeSpan = ls
    this.popSize = ps
    this.mutation = mt
    this.crossover = co
  }
}

function fitnessVariables(co = 100, cr = 0.3, pr = 1, mt = 0.001) {
  this.completion = co
  this.crash = cr
  this.proximity = pr
  this.mutation = mt

  this.set = function(co, cr, pr, mt) {
    this.completion = co
    this.crash = cr
    this.proximity = pr
    this.mutation = mt
  }
}

function gameVariables(state, id) {
  this.state = state
  this.id = id
  this.moment = 0
  this.generation = 0
  this.timerActive = false
  this.timePassed = 0

  this.belongs = function(id) {
    return this.id === id
  }

  this.isState = function(state) {
    return this.state === state
  }
}

const WIDTH = 380
const HEIGHT = 800
const INITIAL_POSITION_X = WIDTH / 2
const INITIAL_POSITION_Y = HEIGHT - 10
