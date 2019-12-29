function Population(id) {
  this.id = id
  this.rockets = []
  this.matingPool = []
  ;(this.successCount = 0), (this.failed = true)

  for (let i = 0; i < general.popSize; i++) {
    this.rockets[i] = new Rocket()
  }

  this.evaluate = function() {
    for (let i = 0; i < this.rockets.length; i++) {
      this.rockets[i].calculateFitness()
    }
    const maxFitness = this.rockets.reduce(
      (total, curr) => total + curr.fitness,
      0,
    )
    this.rockets.map(rocket => ({
      ...rocket,
      fitness: rocket.fitness / maxFitness,
    }))

    this.matingPool = []
    console.log(this.rockets)
    for (let i = 0; i < this.rockets.length; i++) {
      const span = this.rockets[i].fitness * 100
      for (let i = 0; i < span; i++) this.matingPool.push(this.rockets[i])
    }
  }

  this.selection = function() {
    const newRockets = []
    for (let i = 0; i < this.rockets.length; i++) {
      let child
      if (general.crossover) {
        console.log(this.matingPool)
        const pA = random(this.matingPool)
        const pB = random(this.matingPool)
        if (pA.fitness >= pB.fitness) {
          child = pA.dna.crossover(pB.dna)
        } else {
          child = pA.dna.crossover(pB.dna)
        }
      } else {
        child = this.rockets[i]
      }

      if (general.mutation) {
        child.mutation()
      }

      newRockets[i] = new Rocket(child)
    }
    this.rockets = newRockets
  }

  this.failed = function() {
    for (let i = 0; i < this.rockets.length; i++) {
      if (!this.rockets[i].crashed) return false
      return true
    }
  }

  this.run = function() {
    if (this.id === game.id) {
      for (let i = 0; i < this.rockets.length; i++) {
        this.rockets[i].update()
        this.rockets[i].show()
      }
    }
  }
}
