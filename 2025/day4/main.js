import { readFile } from 'node:fs/promises'

async function loadFile(fileName) {
  const url = new URL(fileName, import.meta.url)
  const contents = await readFile(url, 'utf-8')
  return contents
    .trim()
    .split('\n')
    .map((line) => line.split(''))
}

function getSumOfAccessiblePaperRoll(grid) {
  let sum = 0

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '@' && isAccessiblePaperRoll(grid, y, x)) {
        sum++
      }
    }
  }
  return sum
}

function getSumOfAccessiblePaperRollTotal(grid) {
  let total = 0
  let sum = -1

  while (sum !== 0) {
    sum = 0

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '@' && isAccessiblePaperRoll(grid, y, x)) {
          sum++
          grid[y][x] = 'x'
        }
      }
    }

    total += sum

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 'x') {
          grid[y][x] = '.'
        }
      }
    }
  }

  return total
}

function isAccessiblePaperRoll(grid, y, x) {
  let adjacentPaperRoll = 0

  // y, x
  const adjacentCoordinates = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  for (const coordinate of adjacentCoordinates) {
    // out of bound
    if (coordinate[0] + y < 0 || coordinate[0] + y >= grid.length) {
      continue
    }
    // out of bound
    if (coordinate[1] + x < 0 || coordinate[1] + x >= grid[y].length) {
      continue
    }

    if (
      grid[coordinate[0] + y][coordinate[1] + x] === '@' ||
      grid[coordinate[0] + y][coordinate[1] + x] === 'x'
    ) {
      adjacentPaperRoll++
    }
  }

  return adjacentPaperRoll < 4
}

const totalPart1 = getSumOfAccessiblePaperRoll(await loadFile('./input.txt'))
console.log(`Part1 ${totalPart1}`)

const totalPart2 = getSumOfAccessiblePaperRollTotal(
  await loadFile('./input.txt')
)
console.log(`Part2 ${totalPart2}`)
