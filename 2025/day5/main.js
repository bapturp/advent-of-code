import { readFile } from 'node:fs/promises'

async function loadData(fileName) {
  const url = new URL(fileName, import.meta.url)
  const contents = await readFile(url, 'utf-8')
  return contents
}

console.log(await loadData('./example.txt'))
