import { readFile } from 'node:fs/promises';

async function loadData(filePath) {
  const url = new URL(filePath, import.meta.url);
  const content = await readFile(url, { encoding: 'utf-8' });
  return content
    .trim()
    .split(',')
    .map((range) => range.split('-').map((e) => Number(e)));
}

function getSumOfInvalidIDs(ranges) {
  let sum = 0;
  for (const range of ranges) {
    for (let value = range[0]; value <= range[1]; value++) {
      if (isInvalidID(value)) {
        sum += value;
      }
    }
  }
  return sum;
}

function isInvalidID(n) {
  const s = String(n);
  const len = s.length;

  if (len < 2) {
    return false;
  }

  for (let i = 1; i <= len / 2; i++) {
    if (s.slice(0, i).repeat(len / i) === s) {
      return true;
    }
  }
  return false;
}

console.log(getSumOfInvalidIDs(await loadData('input.txt')));
