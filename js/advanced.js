const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let board, turn, winner, tie
const squares = document.querySelectorAll('.board div')
const msg = document.querySelector('#msg')
const reset = document.querySelector('#reset')
const handleMark = (id) => {
  board[id] = turn
  render()
}

const checkTie = () => tie = board.every((sq) => sq !== null) && true
const checkWin = () => winningCombos.forEach((combo) => winner = (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) && true)
const switchTurn = () => turn *= -1
const updateMsg = () => msg.innerText = tie ? msg.innerText = `Tie game` : winner ? msg.innerText = `${turn > 0 ? 'O' : 'X'} wins` : `It's ${turn > 0 ? 'X' : 'O'}'s turn`
const updateBoard = () => { for (let i = 0; i < board.length; i++) { !board[i] ? squares[i].innerText = '' : board[i] === 1 ? squares[i].innerText = 'X' : squares[i].innerText = 'O' } }
const render = () => {
  checkTie()
  checkWin()
  switchTurn()
  updateBoard()
  updateMsg()
}
const init = () => {
  turn = -1
  tie, winner = false
  board = [null, null, null, null, null, null, null, null, null]
  render()
}
reset.addEventListener('click', init)
squares.forEach((square) => square.addEventListener('click', (e) => !board[e.target.id.slice(2)] && !winner && handleMark(e.target.id.slice(2))))
init()