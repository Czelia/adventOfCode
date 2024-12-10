const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "inputs/9.txt"); // Get the absolute path
let rawInput = fs.readFileSync(filePath, "utf8");
let example = `2333133121414131402`;
let array = rawInput.split("");

function decodeInline(array) {
	let decoded = [];
	let idCount = 0;
	for (let i = 0; i < array.length; i++) {
		// if the number is odd
		if (i % 2 == 0) {
			decoded.push(new Array(parseInt(array[i])).fill(idCount));
			idCount++;
		} else {
			if (array[i] !== "0") {
				decoded.push(new Array(parseInt(array[i])).fill("."));
			} else {
				continue;
			}
		}
	}
	return decoded;
}

let decodedLine = decodeInline(array);

function part1() {
	let newOrder = [];
	let remainingNumbers = decodedLine.filter((el) => !el.includes(".")).flat();

	let initialSize = remainingNumbers.length;
	for (let index = 0; index < decodedLine.length; index++) {
		// console.log(decodedLine[index]);
		if (decodedLine[index].every((el) => el === ".")) {
			let space = decodedLine[index].length;
			// move block from end of array to here
			for (let j = 0; j < space; j++) {
				newOrder.push(remainingNumbers[remainingNumbers.length - 1]);
				remainingNumbers.pop();
			}
		} else {
			newOrder.push(decodedLine[index]);
		}
	}
	return newOrder.flat().splice(0, initialSize);
}

function part2() {
	let newOrder = new Array(decodedLine.length).fill(0);
	let decodedLinePos = decodedLine.map((el, i) => {
		return { pos: i, el: el };
	});
	let remainingNumbers = decodedLinePos
		.filter((el) => !el.el.includes("."))
		.reverse();

	let dots = decodedLinePos.filter((el) => el.el.includes("."));
	// console.log(dots);

	for (let i = 0; i < remainingNumbers.length; i++) {
		let number = remainingNumbers[i].el;
		let previousDots = dots.filter(
			(el) =>
				el.pos < remainingNumbers[i].pos &&
				el.el.filter((el) => el === ".").length >= number.length
		)[0];
		// console.log(previousDots);

		if (previousDots) {
			newOrder[previousDots.pos] = replaceDots(previousDots.el, number);

			dots[dots.indexOf(previousDots)].el = replaceDots(
				previousDots.el,
				number
			);

			newOrder[remainingNumbers[i].pos] = replaceWithDots(
				number,
				previousDots.el
			);
			// console.log(dots);
		} else {
			newOrder[remainingNumbers[i].pos] = number;
		}
	}
	newOrder = newOrder.map((el, i) => {
		if (el === 0) {
			return dots.find((dot) => dot.pos === i).el;
		} else {
			return el;
		}
	});
	return newOrder.flat().map((el) => (el === "." ? 0 : el));
}

function checkSum(array) {
	let sum = 0;
	for (let i = 0; i < array.length; i++) {
		sum = sum + parseInt(array[i]) * i;
	}
	return sum;
}

console.log(`Part 1 : ${checkSum(part1())}`);
console.log(`Part 2 : ${checkSum(part2())}`);

function replaceDots(array, replacements) {
	let replacementIndex = 0;

	return array.map((item) => {
		if (item === "." && replacementIndex < replacements.length) {
			return replacements[replacementIndex++];
		}
		return item; // Keep the original item if it's not a "."
	});
}

function replaceWithDots(array) {
	return new Array(array.length).fill(".");
}
