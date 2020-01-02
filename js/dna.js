class DNA {
  constructor(genes) {
    // construction
    if (genes) {
      this.genes = genes
    } else {
      this.genes = []
      for (let i = 0; i < LIFE_SPAN; i++) {
        this.genes[i] = p5.Vector.random2D()
        this.genes[i].setMag(MAX_FORCE)
      }
    }
    // crossover
    this.crossover = function(partner) {
      if (!CROSSOVER) {
        return new DNA(this.genes)
      } else {
        let new_genes = []
        const base_dominancy = floor(random(this.genes.length))
        for (let i = 0; i < this.genes.length; i++) {
          const active_dominancy = random(this.genes.length)
          if (active_dominancy > base_dominancy) {
            new_genes[i] = partner.genes[i]
          } else {
            new_genes[i] = this.genes[i]
          }
        }
        return new DNA(new_genes)
      }
    }
    // mutation
    this.mutation = function() {
      for (let i = 0; i < this.genes.length; i++) {
        if (random(1) < MUTATION_PROBABILITY) {
          this.genes[i] = p5.Vector.random2D()
          this.genes[i].setMag(MAX_FORCE)
        }
      }
    }
  }
}
