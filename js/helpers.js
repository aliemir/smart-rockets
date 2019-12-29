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

let timer = setInterval(function() {
  if (game.timerActive) {
    game.timePassed++
  }
}, 1000)

function startGame() {
  if (game.state == GAME_IDLE || game.state == GAME_PAUSED) {
    console.log('bb')
    game.state = GAME_RUNNING
    timerActive = true
    if (game.state == GAME_IDLE) {
      setup()
      game.generation = 1
    }
  }
}
function pauseGame() {
  if (game.state == GAME_RUNNING) {
    game.state = GAME_PAUSED
    game.timerActive = false
  }
}
function resetGame() {
  game.state = GAME_IDLE
  game.id = Date.now()
  setup()
  game.timePassed = 0
  game.generation = 1
  game.timerActive = false
}
