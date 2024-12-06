const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "inputs/5.txt"); // Get the absolute path
let rawInput = fs.readFileSync(filePath, "utf8");
let example = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
const [pairsPart, numbersPart] = rawInput.split("\n\n");
const pairsArray = pairsPart.split("\n").map((line) => line.split("|"));
const numbersArray = numbersPart.split("\n").map((line) => line.split(","));
// console.log(pairsArray);
// console.log(numbersArray);
let validNumbers = [];
let inValidNumbers = [];
for (let index = 0; index < numbersArray.length; index++) {
	// console.log(numbersArray[index]);
	let numbersValid = [];
	numbersArray[index].forEach((element, numberIndex) => {
		let numbersToCheck = numbersArray[index].slice(numberIndex + 1);
		// console.log(numbersToCheck);

		let found = pairsArray.filter((pair) => {
			return pair.includes(element);
		});

		const isValid = numbersToCheck.every((num) =>
			found.every(([first, second]) => num !== first || num === second)
		);
		if (isValid) {
			numbersValid.push(element);
		} else {
			// check if array isn't already in invalid numbers
			if (!inValidNumbers.includes(numbersArray[index])) {
				inValidNumbers.push(numbersArray[index]);
			}
		}
	});
	if (numbersValid.length === numbersArray[index].length) {
		validNumbers.push(numbersValid);
	}
}
// console.log(validNumbers);
// console.log("Invalid numbers : ");

let middleElements = validNumbers.map((subArray) => {
	let middleIndex = Math.floor(subArray.length / 2);
	return subArray[middleIndex];
});

console.log(
	"Part 1:",
	middleElements.reduce((acc, curr) => acc + parseInt(curr), 0)
);

function orderInvalidNumbersByRules(inValidNumbers) {
	// console.log(inValidNumbers);
	for (let i = 0; i < inValidNumbers.length; i++) {
		inValidNumbers[i].sort((a, b) => {
			// console.log(a, b);
			let match = pairsArray.find(
				(pair) => pair.includes(a) && pair.includes(b)
			);
			// console.log(match);

			if (match[0].includes(a)) {
				return -1;
			} else {
				return 1;
			}
		});
	}
}
orderInvalidNumbersByRules(inValidNumbers);
let middleElementsPart2 = inValidNumbers.map((subArray) => {
	let middleIndex = Math.floor(subArray.length / 2);
	return subArray[middleIndex];
});
console.log(
	"Part 2:",
	middleElementsPart2.reduce((acc, curr) => acc + parseInt(curr), 0)
);
