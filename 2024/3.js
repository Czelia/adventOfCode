const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "inputs/3.txt"); // Get the absolute path
let rawInput = fs.readFileSync(filePath, "utf8");

let example = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`;

let multiplesInstructions = example.match(/mul\((\d+),(\d+)\)/g);

let multiplesPart1 = multiplesInstructions.map((e) =>
	e
		.match(/mul\((\d+),(\d+)\)/)
		.slice(1)
		.map((e) => parseInt(e))
);

let total = 0;
multiplesPart1.forEach((e) => {
	total += e[0] * e[1];
});

// console.log(total);

// Part 2

let examplePart2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const regex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;

let multiplesDoDontInstructions = rawInput.match(regex);
let result = [];
let closestCommand = "do";
multiplesDoDontInstructions.forEach((item) => {
	if (item === "do()") {
		closestCommand = "do";
	} else if (item === "don't()") {
		closestCommand = "don't";
	} else if (item.startsWith("mul(")) {
		if (closestCommand === "do") {
			result.push(item); // Add to the array if the closest is `do()`
		}
	}
});

let multiplesPart2 = result.map((e) =>
	e
		.match(/mul\((\d+),(\d+)\)/)
		.slice(1)
		.map((e) => parseInt(e))
);
let totalPart2 = 0;
multiplesPart2.forEach((e) => {
	totalPart2 += e[0] * e[1];
});

console.log(totalPart2);
