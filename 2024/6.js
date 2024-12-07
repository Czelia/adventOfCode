const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "inputs/6.txt"); // Get the absolute path
let rawInput = fs.readFileSync(filePath, "utf8");
let example = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
let array = rawInput.split("\n");

function part1() {
	return parkour(array);

	// return steps;
}

function part2() {
	let possibleLoops = [];
	for (let rindex = 0; rindex < array.length; rindex++) {
		const row = array[rindex].split("");

		for (let cindex = 0; cindex < row.length; cindex++) {
			// console.log(row[cindex]);
			if (row[cindex] === "#" || row[cindex] === "^") {
				continue;
			} else {
				let maze = array.map((row) => row.split(""));
				maze[rindex][cindex] = "#";
				maze = maze.map((row) => row.join(""));
				if (willItLoop(maze)) {
					possibleLoops.push([rindex, cindex]);
					console.log("Loop detected at " + rindex + " " + cindex);
				}
			}
		}
	}
	return possibleLoops;
}
console.log("Part 2: " + part2().length + " possible loops");
console.log("Part 1: guard made " + part1().length + " steps");

function willItLoop(array) {
	// console.log(array);

	let leaving = false;
	let loop = false;
	let steps = [];
	let currentDirection = "up";
	let currentRow = array.findIndex((row) => row.includes("^"));
	let currentCol = array[currentRow].indexOf("^");
	while (leaving === false || loop === false) {
		if (
			currentCol < 0 ||
			currentCol > array[0].length - 1 ||
			currentRow < 0 ||
			currentRow > array.length - 1
		) {
			leaving = true;
			break;
		}
		let currentSymbol = array[currentRow][currentCol];

		if (currentSymbol !== "#") {
			if (
				steps.findIndex(
					(step) =>
						step[0] === currentRow &&
						step[1] === currentCol &&
						currentDirection === step[2]
				) == -1
			) {
				steps.push([currentRow, currentCol, currentDirection]);
			} else {
				loop = true;
				break;
			}

			[currentRow, currentCol] = move(currentDirection, currentRow, currentCol);
		} else {
			[currentDirection, currentRow, currentCol] = turn(
				currentDirection,
				currentRow,
				currentCol
			);
		}
	}
	return loop;
}

function parkour(array) {
	let leaving = false;
	let steps = [];
	let currentDirection = "up";
	let currentRow = array.findIndex((row) => row.includes("^"));
	let currentCol = array[currentRow].indexOf("^");
	while (leaving === false) {
		if (
			currentCol < 0 ||
			currentCol > array[0].length - 1 ||
			currentRow < 0 ||
			currentRow > array.length - 1
		) {
			leaving = true;
			break;
		}
		let currentSymbol = array[currentRow][currentCol];

		if (currentSymbol !== "#") {
			if (
				steps.findIndex(
					(step) => step[0] === currentRow && step[1] === currentCol
				) == -1
			) {
				steps.push([currentRow, currentCol]);
			}

			[currentRow, currentCol] = move(currentDirection, currentRow, currentCol);
		} else {
			[currentDirection, currentRow, currentCol] = turn(
				currentDirection,
				currentRow,
				currentCol
			);
		}
	}
	return steps;
}

function move(currentDirection, currentRow, currentCol) {
	if (currentDirection === "up") {
		currentRow--;
	}
	if (currentDirection === "down") {
		currentRow++;
	}
	if (currentDirection === "left") {
		currentCol--;
	}
	if (currentDirection === "right") {
		currentCol++;
	}
	return [currentRow, currentCol];
}

function turn(currentDirection, currentRow, currentCol) {
	if (currentDirection === "up") {
		currentDirection = "right";
		currentRow++;
		currentCol++;
	} else if (currentDirection === "down") {
		currentDirection = "left";
		currentRow--;
		currentCol--;
	} else if (currentDirection === "left") {
		currentDirection = "up";
		currentCol++;
		currentRow--;
	} else if (currentDirection === "right") {
		currentDirection = "down";
		currentCol--;
		currentRow++;
	}
	return [currentDirection, currentRow, currentCol];
}
