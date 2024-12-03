const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "inputs/2.txt"); // Get the absolute path
let input = fs.readFileSync(filePath, "utf8");

let example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

let lines = input.split("\n");
lines = lines.map((line) => line.split(" ").map(Number));
// console.log(lines);

// loop through the lines and sort numbers increasingly or decreasingly without changing original array
let finalArrayPart1 = [];
let finalArrayPart2 = [];

let sortedLines = lines.map((line) => {
	let increasing = [...line].sort((a, b) => a - b); // Sort in ascending order
	let decreasing = [...line].sort((a, b) => b - a); // Sort in descending order

	// Check the original line first
	if (checkAdjacentNumbers(line)) {
		if (
			line.join(" ") === increasing.join(" ") ||
			line.join(" ") === decreasing.join(" ")
		) {
			finalArrayPart1.push(line);
			finalArrayPart2.push(line);
		} else {
			if (checkRemovingNumbers(line)) {
				finalArrayPart2.push(line);
			}
			// console.log(checkRemovingNumbers(line));
		}
	} else {
		if (checkRemovingNumbers(line)) {
			finalArrayPart2.push(line);
		}

		// console.log(checkRemovingNumbers(line));
	}
});

// function to check if any two adjacent numbers differ by at least one and at most three
function checkAdjacentNumbers(array) {
	let result = true;
	for (let i = 1; i < array.length; i++) {
		let diff = Math.abs(array[i] - array[i - 1]); // Calculate absolute difference
		if (diff < 1 || diff > 3) {
			result = false;
			break;
		}
	}
	return result;
}

function checkRemovingNumbers(line) {
	for (let i = 0; i < line.length; i++) {
		let modifiedLine = [...line.slice(0, i), ...line.slice(i + 1)]; // Create a new array with one element removed
		// console.log(modifiedLine);

		let increasing = [...modifiedLine].sort((a, b) => a - b); // Sort in ascending order
		let decreasing = [...modifiedLine].sort((a, b) => b - a); // Sort in descending order
		if (checkAdjacentNumbers(modifiedLine)) {
			if (
				modifiedLine.join(" ") === increasing.join(" ") ||
				modifiedLine.join(" ") === decreasing.join(" ")
			) {
				return line;
			}
		}
	}
}

console.log(finalArrayPart1.length);
console.log(finalArrayPart2.length);
