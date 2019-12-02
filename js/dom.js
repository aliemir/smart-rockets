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

function setGenerals(vals) {
  general.mutation = vals.mutation == 'on' ? true : false
  general.crossover = vals.crossover == 'on' ? true : false
  general.frameRate = parseInt(vals.frameInput)
  general.popSize = parseInt(vals.popInput)
  general.lifeSpan = parseInt(vals.lifeInput)
  general.maxForce = parseFloat(vals.forceInput)
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
    let values = {}
    $('#variable-form')
      .serializeArray()
      .forEach(el => {
        values[el.name] = el.value
      })
    values.mutation = values.mutation === 'on' ? true : false
    values.crossover = values.crossover === 'on' ? true : false
    values.frameRate = parseInt(values.frameInput)
    values.gravity = 0.05
    values.popSize = parseInt(values.popInput)
    values.lifeSpan = parseInt(values.lifeInput)
    values.maxForce = parseFloat(values.forceInput)
    general.set(
      values.frameRate,
      values.maxForce,
      values.gravity,
      values.lifeSpan,
      values.popSize,
      values.mutation,
      values.crossover,
    )
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
    values.co = parseFloat(values.compMultInput)
    values.cr = parseFloat(values.crashMultImput)
    values.pr = parseFloat(values.proxMultInput)
    values.mt = parseFloat(values.mutProbInput)
    fitness.set(values.co, values.cr, values.pr, values.mt)
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
  $('#status-label-value').text(game.state)
  $('#generation-label-value').text(game.generation)
  $('#all-population-label-value').text(game.generation * general.popSize)
  $('#total-mutation-label-value').text('-')
  // $('#total-completed-label-value').text(
  //   totalCompleted + '(' + (totalCompleted / (pops * popSize)) * 100 + '%)',
  // )
  $('#total-time-label-value').text(game.timePassed)
}
