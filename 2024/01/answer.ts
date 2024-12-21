import fs from "fs";

function readFileSync(filePath: string) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
  } catch (e) {
    console.error("Error reading file: ", e);
    throw e;
  }
}

function halveArray(inputArray: number[]): [number[], number[]] {
  let leftArray: number[] = [],
    rightArray: number[] = [];

  for (let i = 0; i < inputArray.length; i++) {
    if (i % 2 === 0) {
      leftArray.push(inputArray[i]);
    } else {
      rightArray.push(inputArray[i]);
    }
  }

  return [leftArray, rightArray];
}

function main() {
  try {
    const input = readFileSync("input.txt");
    const filteredArray: number[] = input.trim().split(/\s+/).map(Number);
    const [leftArray, rightArray] = halveArray(filteredArray);
    leftArray.sort((a, b) => a - b);
    rightArray.sort((a, b) => a - b);

    const diffArray: number[] = [];
    let diffSum: number = 0;
    for (let i = 0; i < leftArray.length; i++) {
      const absDiff: number = Math.abs(leftArray[i] - rightArray[i]);
      diffArray.push(absDiff);
    }

    diffSum = diffArray.reduce((acc, curr) => acc + curr, 0);

    // ==============================

    let simScore: number = 0;
    for (const element of leftArray) {
      let count: number = 0;
      rightArray.map((el) => {
        if (el === element) count += 1;
      });

      simScore += count * element;
    }

    console.log("Total distance: ", diffSum, "\n");
    console.log("Similarity Score: ", simScore);
  } catch (e) {
    console.error("Error processing file:", e);
  }
}

main();
