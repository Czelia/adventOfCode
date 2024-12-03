// ------------------ Part 1 ------------------
const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "inputs/1.txt"); // Get the absolute path
let input = fs.readFileSync(filePath, "utf8");

let example = `3   4
4   3
2   5
1   3
3   9
3   3`;

let lines = input.split("\n");
// remove spaces between numbers and map it to nested arrays
lines = lines
	.map((line) => line.replace(/\s+/g, " ").trim())
	.map((line) => line.split(" "));

//Ordering left side of the array and order
let leftSide = lines.map((line) => parseInt(line[0])).sort();
let rightSide = lines.map((line) => parseInt(line[1])).sort();
// console.log("Left side:", leftSide);
// console.log("Right side:", rightSide);

let diff = [];
for (let i = 0; i < leftSide.length; i++) {
	diff.push(Math.abs(leftSide[i] - rightSide[i]));
}

let resultPart1 = diff.reduce((acc, curr) => acc + curr, 0);
console.log(resultPart1);

// ------------------ Part 2 ------------------

let leftSideUnordered = lines.map((line) => parseInt(line[0]));
let rightSideUnordered = lines.map((line) => parseInt(line[1]));

let multipleApparitions = [];
for (let i = 0; i < leftSideUnordered.length; i++) {
	let foundInRightSide = rightSideUnordered.filter(
		(item) => item == leftSideUnordered[i]
	).length;
	multipleApparitions.push(leftSideUnordered[i] * foundInRightSide);
}
let result = multipleApparitions.reduce((acc, curr) => acc + curr, 0);
console.log(result);
