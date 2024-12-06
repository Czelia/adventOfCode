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

let directions = [
	{
		icon: "^",
		direction: "up",
	},
	{
		icon: "v",
		direction: "down",
	},
	{
		icon: ">",
		direction: "right",
	},
	{
		icon: "<",
		direction: "left",
	},
];
let currentRow = array.findIndex((row) => row.includes("^"));
let currentCol = array[currentRow].indexOf("^");
let currentDirection = directions.find(
	(direction) => direction.icon === "^"
).direction;

let steps = [];
let leaving = false;
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
	if (array[currentRow][currentCol] !== "#") {
		if (
			steps.findIndex(
				(step) => step[0] === currentRow && step[1] === currentCol
			) == -1
		) {
			steps.push([currentRow, currentCol]);
			// console.log(steps);
		}

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
	} else {
		if (currentDirection === "up") {
			currentDirection = "right";
			currentRow++;
			currentCol++;
			continue;
		}
		if (currentDirection === "down") {
			currentDirection = "left";
			currentRow--;
			currentCol--;
			continue;
		}
		if (currentDirection === "left") {
			currentDirection = "up";
			currentCol++;
			currentRow--;
			continue;
		}
		if (currentDirection === "right") {
			currentDirection = "down";
			currentCol--;
			currentRow++;
			continue;
		}
	}
}
console.log(steps.length);
