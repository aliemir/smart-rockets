// Environment Constants
const FIELD_WIDTH = 800
const FIELD_HEIGHT = 600
const INITIAL_POSITION_X = FIELD_WIDTH / 2 // Rocket
const INITIAL_POSITION_Y = FIELD_HEIGHT - 25 // Rocket
const TARGET_X = FIELD_WIDTH / 2
const TARGET_Y = 100

// Generation Constants
const POPULATION_SIZE = 40
const LIFE_SPAN = 400
const FRAME_RATE = 40
const MAX_FORCE = 0.5
const MUTATION = true
const CROSSOVER = true

// Score Multipliers
const COMPLETION_MULTIPLIER = 10
const CRASH_MULTIPLIER = 0.1
const PROXIMITY_MULTIPLIER = 2

// DNA probabilities
const MUTATION_PROBABILITY = 0.001
const RACE_MUTATION_PROBABILITY = 8

const COLORS = [
  '#970e1f',
  '#c884a6',
  '#19eb50',
  '#45899d',
  '#d5842e',
  '#78e5b0',
  '#f5dd9d',
  '#3213ef',
  '#f8f849',
  '#ed8042',
]
