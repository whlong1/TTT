// const turnTable = { '1': 'X', '-1': 'O' }

/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, tie

/*------------------------ Cached Element References ------------------------*/

const squares = document.querySelectorAll('.board div')
const msg = document.querySelector('#msg')
const reset = document.querySelector('#reset')

/*----------------------------- Event Listeners -----------------------------*/

// addEventListener to each square within gameboard, listen for click
squares.forEach((square) => square.addEventListener('click', handleClick))
reset.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

// If the board square that was clicked is empty, and a winner has not been declared,
// update that position of the board array with a 1 or -1 and call upon render.
function handleClick(e) {
	if (!board[e.target.id.slice(2)] && !winner) {
		board[e.target.id.slice(2)] = turn
		render()
	}
}

// If every square has been filled, set tie to true
function checkTie() {
	if (board.every((sq) => sq !== null)) tie = true
}

// If any winning combination of elements in board add up to 3, set winner to true 
// the some method returns true or false!
function checkWin() {
	winner = winningCombos.some(combo => (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3))
}

function switchTurn() { turn *= -1 }

// Note, the logic in the ternary for declaring a winner has been flipped
// as switchTurn runs before renderMsg. 
function renderMsg() {
	msg.innerText = `It's ${turn > 0 ? 'X' : 'O'}'s turn`
	if (tie) msg.innerText = `Tie game`
	if (winner) msg.innerText = `${turn > 0 ? 'O' : 'X'} wins`
}

function renderBoard() {
	board.forEach((el, idx) => el
		? squares[idx].innerText = el === 1 ? 'X' : 0
		: squares[idx].innerText = '')
}

// This approach to render is a bit unconventional.
// It calls upon all of the remaining functions necessary to complete a turn, including 
// mini render functions that update the appearance of specific portions of the UI.
// The advantage we get is being able to see the sequence of a turn quite easily. 

function render() {
	checkTie()
	checkWin()
	switchTurn()
	renderBoard()
	renderMsg()
}

function init() {
	turn = -1
	tie = false
	winner = false
	board = [null, null, null, null, null, null, null, null, null]
	render()
}

init()