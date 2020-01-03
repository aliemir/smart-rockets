var p, target, population, obstacles
var moment = 0
var generation = 0
var first50 = '-'
var bestFit = '0'
var bestFitArr = [0]
var compPercent = ''
var compPercentArr = [0]

function showGeneration() {
  let sp = document.querySelector('#generation_span')
  if (sp) {
    sp.innerHTML = generation + 1
  }
}

function showFirst50() {
  let sp = document.querySelector('#first50_span')
  if (sp) {
    sp.innerHTML = generation + 1
  }
}

function showBestFit() {
  let sp = document.querySelector('#bestfit_span')
  if (sp) {
    sp.innerHTML = bestFit
  }
}

function genfitChart() {
  var ctx = document.getElementById('genFits').getContext('2d')
  labArr = []
  for (let i = 0; i < bestFitArr.length; i++) {
    labArr.push('' + i)
  }
  console.log(labArr)
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labArr,
      datasets: [
        {
          label: 'Best fitness in generation',
          data: bestFitArr,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  })
}

function compPercentChart() {
  var ctx = document.getElementById('compPercent').getContext('2d')
  labArr = []
  for (let i = 0; i < compPercentArr.length; i++) {
    labArr.push('' + i)
  }
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labArr,
      datasets: [
        {
          label: 'Completion % of Generations',
          data: compPercentArr,
          backgroundColor: ['rgba(99, 255, 75, 0.2)'],
          borderColor: ['rgba(99, 255, 75, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  })
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
  showBestFit()
  genfitChart()
  compPercentChart()
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
    showBestFit()
    genfitChart()
    compPercentChart()
  }

  target.show()
  obstacles.run()
}
