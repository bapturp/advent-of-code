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

function numberOfFreshIngredients(contents) {
  let fresh = []

  const [ranges, available] = contents

  for (const ingredient of available) {
    ranges.forEach((range) => {
      if (ingredient >= range[0] && ingredient <= range[1]) {
        console.log(`${ingredient} is fresh`)
        fresh.push(ingredient)
      }
    })
  }

  return Array.from(new Set(fresh)).length
}

console.log(numberOfFreshIngredients(await loadData('./input.txt')))
