function Population() {
  this.rockets = []
  this.matingPool = []

  for (let i = 0; i < POPULATION_SIZE; i++) {
    this.rockets[i] = new Rocket()
  }

  this.evaluate = function() {
    let maxfit = 0
    // Iterate through all rockets and calcultes their fitness
    for (let i = 0; i < POPULATION_SIZE; i++) {
      // Calculates fitness
      this.rockets[i].calculateFitness()
      // If current fitness is greater than max, then make max equal to current
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness
      }
    }
    // Normalises fitnesses
    for (var i = 0; i < POPULATION_SIZE; i++) {
      this.rockets[i].fitness /= maxfit
    }

    this.matingPool = []
    // Take rockets fitness make in to scale of 1 to 100
    // A rocket with high fitness will highly likely will be in the mating pool
    for (var i = 0; i < POPULATION_SIZE; i++) {
      var n = this.rockets[i].fitness * 100
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i])
      }
    }
  }

  this.selection = function() {
    var newRockets = []
    for (var i = 0; i < POPULATION_SIZE; i++) {
      // Picks random dna
      var parentA = random(this.matingPool).dna
      var parentB = random(this.matingPool).dna
      // Creates child by using crossover function
      var child = parentA.crossover(parentB)
      child.mutation()
      // Creates new rocket with child dna
      newRockets[i] = new Rocket(child)
    }
    // This instance of rockets are the new rockets
    this.rockets = newRockets
  }

  this.run = function() {
    for (var i = 0; i < POPULATION_SIZE; i++) {
      this.rockets[i].update()
      // Displays rockets to screen
      this.rockets[i].show()
    }
  }
}
