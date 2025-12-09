import { readFile } from 'node:fs/promises';

async function loadData(filePath) {
  const url = new URL(filePath, import.meta.url);
  const contents = await readFile(url, 'utf-8');
  return contents.trim().split('\n');
}

function getSumOfJoltage(banks) {
  let sum = 0;
  for (const bank of banks) {
    sum += getLargestJoltage12(bank);
  }
  return sum;
}

function getLargestJoltage(bank) {
  let first = 0;

  for (let i = first; i < bank.length - 1; i++) {
    if (Number(bank[i]) > bank[first]) {
      first = i;
    }
  }

  let second = first + 1;

  for (let i = second; i < bank.length; i++) {
    if (Number(bank[i]) > bank[second]) {
      second = i;
    }
  }

  console.log(Number(bank[first] + bank[second]));
  return Number(bank[first] + bank[second]);
}

function getLargestJoltage12(bank) {
  const batteries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let minIndex = 0;
  let maxIndex = bank.length - 12;

  for (let i = 0; i < 12; i++) {
    for (let j = minIndex; j <= maxIndex; j++) {
      if (Number(bank[j]) > batteries[i]) {
        batteries[i] = Number(bank[j]);
        minIndex = j + 1;
      }
    }
    maxIndex++;
  }

  return Number(batteries.join(''));
}

console.log(getSumOfJoltage(await loadData('./input.txt')));
