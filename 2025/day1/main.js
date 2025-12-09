function step(initPos, rotation, distance) {
  let counter = 0
  let newPos

  if (rotation === 'R') {
    // Count how many times we pass 0 going right.
    counter = Math.floor((initPos + distance) / 100)
    newPos = (initPos + distance) % 100
  } else {
    // rotation === 'L'
    // A left rotation is like moving backwards from the initial position.
    // We count how many times we cross 0.
    if (distance >= initPos && initPos !== 0) {
      // If we move past our starting position, we definitely cross 0 once.
      counter++
    }
    // Then, for the remaining distance, count how many full circles we make.
    const remainingDistance = distance - initPos
    if (remainingDistance > 0) {
      counter += Math.floor(remainingDistance / 100)
    }

    // Calculate the new position.
    newPos = (initPos - (distance % 100) + 100) % 100
  }

  return { newPos, counter }
}

function getPassword(directions) {
  let counter = 0
  let position = 50

  for (const direction of directions) {
    const rotation = direction[0] // either `L` or `R`
    const distance = Number(direction.slice(1)) // positive integer

    const result = step(position, rotation, distance)
    console.log(result)

    counter = counter + result.counter
    position = result.newPos
  }

  return counter
}

import { readFile } from 'node:fs/promises'

async function readAndParseFile(filePath) {
  const content = await readFile(filePath, 'utf-8')
  return content.trim().split('\n')
}

const data = await readAndParseFile('input.txt')

const result = getPassword(data)
console.log(result)
