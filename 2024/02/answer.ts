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

function isSafeReport(report: number[]): boolean {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];

    // this checks for monotonicity
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }

    // trend breakers
    if (diff > 0) isDecreasing = false;
    if (diff < 0) isIncreasing = false;

    // if both flags are false, it means the trend switched somewhere
    if (!isIncreasing && !isDecreasing) {
      return false;
    }
  }

  return true; // If consistent trend is maintained
}

function main() {
  try {
    const input = readFileSync("input.txt");

    const reports = input
      .split(/\r\n|\n/) // Split by newline
      .filter((line) => line.trim() !== "") // Remove empty lines
      .map((el) => el.split(/\s+/).map(Number));

    let safeReportCount: number = 0;
    for (let report of reports) {
      if (isSafeReport(report)) safeReportCount++;
    }

    console.log("Reports: ", reports[0]);
    console.log("Safe reports count: ", safeReportCount);
  } catch (e) {
    console.error("Error: ", e);
  }
}

main();
