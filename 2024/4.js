const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "inputs/4.txt"); // Get the absolute path
let rawInput = fs.readFileSync(filePath, "utf8");

let example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;
let processedInput = rawInput.split(/\r?\n/).map((e) => e.split(""));
console.log("Part 1: " + partOne(processedInput));
console.log("Part 2: " + partTwo(processedInput));

function partOne(processedInput) {
	const width = processedInput[0].length;
	const height = processedInput.length;
	let count = 0;
	for (let rindex = 0; rindex < processedInput.length; rindex++) {
		for (let cindex = 0; cindex < processedInput[rindex].length; cindex++) {
			const letter = processedInput[rindex][cindex];
			if (letter !== "X") {
				continue;
			}
			//east
			if (cindex < width - 3) {
				if (
					processedInput[rindex][cindex + 1] === "M" &&
					processedInput[rindex][cindex + 2] === "A" &&
					processedInput[rindex][cindex + 3] === "S"
				) {
					count++;
				}
			}
			//south
			if (rindex < height - 3) {
				if (
					processedInput[rindex + 1][cindex] === "M" &&
					processedInput[rindex + 2][cindex] === "A" &&
					processedInput[rindex + 3][cindex] === "S"
				) {
					count++;
				}
			}
			//southeast
			if (rindex < height - 3 && cindex < width - 3) {
				if (
					processedInput[rindex + 1][cindex + 1] === "M" &&
					processedInput[rindex + 2][cindex + 2] === "A" &&
					processedInput[rindex + 3][cindex + 3] === "S"
				) {
					count++;
				}
			}
			//northeast
			if (rindex > 2 && cindex < width - 3) {
				if (
					processedInput[rindex - 1][cindex + 1] === "M" &&
					processedInput[rindex - 2][cindex + 2] === "A" &&
					processedInput[rindex - 3][cindex + 3] === "S"
				) {
					count++;
				}
			}
			//north
			if (rindex > 2) {
				if (
					processedInput[rindex - 1][cindex] === "M" &&
					processedInput[rindex - 2][cindex] === "A" &&
					processedInput[rindex - 3][cindex] === "S"
				) {
					count++;
				}
			}
			//west
			if (cindex > 2) {
				if (
					processedInput[rindex][cindex - 1] === "M" &&
					processedInput[rindex][cindex - 2] === "A" &&
					processedInput[rindex][cindex - 3] === "S"
				) {
					count++;
				}
			}
			//northwest
			if (rindex > 2 && cindex > 2) {
				if (
					processedInput[rindex - 1][cindex - 1] === "M" &&
					processedInput[rindex - 2][cindex - 2] === "A" &&
					processedInput[rindex - 3][cindex - 3] === "S"
				) {
					count++;
				}
			}
			//southwest
			if (rindex < height - 3 && cindex > 2) {
				if (
					processedInput[rindex + 1][cindex - 1] === "M" &&
					processedInput[rindex + 2][cindex - 2] === "A" &&
					processedInput[rindex + 3][cindex - 3] === "S"
				) {
					count++;
				}
			}
		}
	}
	return count;
}
function partTwo(processedInput) {
	const width = processedInput[0].length;
	const height = processedInput.length;
	let count = 0;
	for (let rindex = 0; rindex < processedInput.length; rindex++) {
		for (let cindex = 0; cindex < processedInput[rindex].length; cindex++) {
			const letter = processedInput[rindex][cindex];
			if (letter !== "A") {
				continue;
			}
			if (
				rindex === 0 ||
				rindex === height - 1 ||
				cindex === 0 ||
				cindex === width - 1
			) {
				continue;
			}
			const corners = [
				processedInput[rindex - 1][cindex - 1],
				processedInput[rindex - 1][cindex + 1],
				processedInput[rindex + 1][cindex + 1],
				processedInput[rindex + 1][cindex - 1],
			];
			if (corners.includes("X") || corners.includes("A")) {
				continue;
			}
			if (corners[0] === corners[2] || corners[1] === corners[3]) {
				continue;
			}
			count++;
		}
	}
	return count;
}
