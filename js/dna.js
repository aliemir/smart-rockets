function DNA(genes) {
  // Construct
  if (genes) {
    this.genes = genes
  } else {
    this.genes = []

    for (let i = 0; i < general.lifeSpan; i++) {
      this.genes[i] = p5.Vector.random2D()
      this.genes[i].setMag(general.maxForce)
    }
  }
  // Crossover
  this.crossover = function(partner) {
    if (!general.crossover) {
      return new DNA(this.genes)
    } else {
      let newGenes = []
      const dominancyVariable = floor(random(this.genes.length))
      for (let i = 0; i < this.genes.length; i++) {
        const sideDominancy = random(this.genes.length)
        if (sideDominancy > dominancyVariable) {
          newGenes[i] = this.genes[i]
        } else {
          newGenes[i] = partner.genes[i]
        }
      }
      return new DNA(newGenes)
    }
  }
  // Mutation
  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < fitness.mutation / 100) {
        totalMutation++
        this.genes[i] = p5.Vector.random2D()
        this.genes[i].setMag(general.maxForce)
      }
    }
  }
}
