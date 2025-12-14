import { readFile } from 'node:fs/promises'

async function loadData(fileName) {
  const url = new URL(fileName, import.meta.url)
  const contents = await readFile(url, 'utf-8')
  return contents
    .split('\n\n')
    .map((e) => e.trim().split('\n'))
    .map((e) =>
      e.map((f) =>
        f.includes('-') ? f.split('-').map((g) => Number(g)) : Number(f)
      )
    )
}

class RangeManager {
  constructor() {
    this.ranges = []
  }

  addRange(min, max) {
    if (min > max) {
      return
    }

    this.ranges.push([min, max])
    this.ranges.sort((a, b) => a[0] - b[0])

    const newRanges = []
    let currentRange = this.ranges[0]
    for (let i = 1; i < this.ranges.length; i++) {
      const nextRange = this.ranges[i]
      if (currentRange[1] + 1 >= nextRange[0]) {
        currentRange[1] = Math.max(currentRange[1], nextRange[1])
      } else {
        newRanges.push(currentRange)
        currentRange = nextRange
      }
    }
    newRanges.push(currentRange)
    this.ranges = newRanges
  }

  sum() {
    return this.ranges.reduce((acc, val) => (acc += val[1] - val[0] + 1), 0)
  }

  isIngredientInRange(ingredient) {
    for (const range of this.ranges) {
      if (ingredient >= range[0] && ingredient <= range[1]) {
        return true
      }
    }
    return false
  }
}

function sumOfRanges(contents) {
  const [ranges, _] = contents
  const rangeManager = new RangeManager()

  for (const range of ranges) {
    rangeManager.addRange(range[0], range[1])
  }

  return rangeManager.sum()
}

function sumOfValidIngredients(contents) {
  const [ranges, ingredients] = contents
  const rangeManager = new RangeManager()

  for (const range of ranges) {
    rangeManager.addRange(range[0], range[1])
  }

  return ingredients.reduce(
    (acc, val) => (rangeManager.isIngredientInRange(val) ? ++acc : acc),
    0
  )
}

console.log(`Part1: ${sumOfValidIngredients(await loadData('./input.txt'))}`)

console.log(`Part2: ${sumOfRanges(await loadData('./input.txt'))}`)
