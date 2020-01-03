var p, target, population, obstacles
var moment = 0
var generation = 0
var first50 = '-'
var bestFit = '0'
var bestFitArr = [0]
var compPercent = ''
var compPercentArr = [0]
var raceArr = []

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

function raceColorChart() {
  var ctx = document.getElementById('raceColor').getContext('2d')

  raceLabels = []
  raceCounts = []

  function calculate(arr) {
    var a = [],
      b = [],
      prev

    arr.sort()
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i])
        b.push(1)
      } else {
        b[b.length - 1]++
      }
      prev = arr[i]
    }

    raceLabels = a
    raceCounts = b
  }
  calculate(raceArr)

  raceNames = raceLabels.map(l => {
    let n = COLORS.findIndex(e => e === l)
    return 'R' + n
  })

  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: raceNames,
      datasets: [
        {
          label: raceCounts,
          data: raceCounts,
          backgroundColor: raceLabels,
          borderColor: raceLabels,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      title: {
        display: true,
        text: 'Color Populations in Generation',
        position: 'top',
        fontSize: 12,
        fontColor: '#676767',
        padding: 10,
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 20,
          fontColor: '#111',
          padding: 15,
        },
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
  population.getRaces()
  showGeneration()
  showBestFit()
  genfitChart()
  compPercentChart()
  raceColorChart()
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
    raceColorChart()
  }

  target.show()
  obstacles.run()
}
