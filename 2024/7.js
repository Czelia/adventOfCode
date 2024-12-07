const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "inputs/7.txt"); // Get the absolute path
let rawInput = fs.readFileSync(filePath, "utf8");
let example = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
let array = rawInput.split("\n").map((row) => row.split(": "));
let operators = ["+", "*", "||"];
function part1() {
	let total = [];
	for (let i = 0; i < array.length; i++) {
		let result = parseInt(array[i][0]);
		let numbers = array[i][1].split(" ").map((num) => parseInt(num));
		if (testAllOperators(numbers, result, operators)) {
			total.push(result);
		}
	}
	return total.reduce((a, b) => a + b);
}

function testAllOperators(numbers, result, operators) {
	const slots = numbers.length - 1; // Number of operator slots
	const totalCombinations = Math.pow(operators.length, slots); // Total combinations

	// Generate all combinations of operators
	for (let i = 0; i < totalCombinations; i++) {
		let expression = numbers[0].toString(); // Start with the first number
		let combinationIndex = i;

		for (let j = 0; j < slots; j++) {
			const operatorIndex = combinationIndex % operators.length; // Pick an operator
			combinationIndex = Math.floor(combinationIndex / operators.length);

			expression += operators[operatorIndex] + numbers[j + 1];
		}

		// Evaluate the generated expression
		if (evaluateLeftToRight(expression) === result) {
			console.log(`Match found: ${expression} = ${result}`);
			return true;
		}
	}

	// console.log(`No match found for result ${result}`);
	return false;
}

function evaluateLeftToRight(expression) {
	const tokens = expression.match(/(\d+|\+|\*|\/|\-|\|\|)/g);
	if (!tokens) return null;

	let result = parseFloat(tokens[0]); // Start with the first number

	for (let i = 1; i < tokens.length; i += 2) {
		const operator = tokens[i];
		const nextNumber = parseFloat(tokens[i + 1]);

		// Apply the operator
		switch (operator) {
			case "+":
				result += nextNumber;
				break;
			case "-":
				result -= nextNumber;
				break;
			case "*":
				result *= nextNumber;
				break;
			case "||":
				// Concatenate numbers as strings, then convert back to a number
				result = parseFloat(result.toString() + nextNumber.toString());
				break;
			case "/":
				if (nextNumber === 0) return null; // Avoid division by zero
				result /= nextNumber;
				break;
			default:
				throw new Error(`Unsupported operator: ${operator}`);
		}
	}

	return result;
}

console.log("Total of combinations for part 1: " + part1());
