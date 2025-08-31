import fs from "node:fs";

function loadFileData(): string {
  try {
    const data = fs.readFileSync("./2024/02/input.txt", "utf8");
    return data;
  } catch (err) {
    console.error("Error loading the data from text file: ", err);
    throw err;
  }
}

function buildReport(rawFileData: string) {
  return rawFileData.split(/\r\n|\n/).map((r) => r.split(/\s+/).map(Number));
}

function isValidDifference(x: number, y: number): boolean {
  const difference: number = Math.abs(x - y);
  if (difference <= 3 && difference >= 1) return true;
  return false;
}

function checkSafety(report: number[]): boolean {
  let isDecreasing: boolean = false;
  let isIncreasing: boolean = false;

  for (let i = 0; i < report.length - 1; i++) {
    const curr: number = report[i],
      next: number = report[i + 1];

    if (!isValidDifference(curr, next)) return false;

    if (curr > next) {
      isDecreasing = true;
    } else if (report[i] < report[i + 1]) {
      isIncreasing = true;
    }
  }

  if ((isDecreasing && !isIncreasing) || (!isDecreasing && isIncreasing))
    return true;

  return false;
}

function checkSafetyWithDampener(report: number[]): boolean {
  if (checkSafety(report)) return true;

  for (let i = 0; i < report.length; i++) {
    const modified = [...report.slice(0, i), ...report.slice(i + 1)];
    if (checkSafety(modified)) return true;
  }
  return false;
}

function main() {
  try {
    const rawFileData: string = loadFileData();
    const reports: number[][] = buildReport(rawFileData);
    let safeReportCount: number = 0;

    reports.forEach((r) => {
      if (checkSafetyWithDampener(r)) safeReportCount += 1;
    });

    console.log("Safe reports count: ", safeReportCount);
    console.log("Total reports count: ", reports.length);
  } catch (e) {
    console.error(e);
  }
}

main();

// console.log(Array.from("lol"));
// console.log(
//   `row1col1 row1col2 row1col3
// row2col1 row2col2 row2col3
// row3col1 row3col2 row3col3`.split("\n"),
// );
