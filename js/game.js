'use strict'


// Developer started this work but left in the middle, we need
// help adding the following features:





// • BONUS: Make the pacman face the direction where it
// goes


const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD='🍭'
const CHERRY= '🍒'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gFoodCount
var gDeadGhosts=[]
var backToNormalSetTimeOutId

function onInit() {
    addHidden('.modal')
    console.log('hello')
    gBoard = buildBoard()
// console.log('food:',gFoodCount)
    createGhosts(gBoard)
    createPacman(gBoard)
  const cherryIntervalId= setInterval(createCherry,15000)
    gFoodCount= getFoodCount(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size =10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1]=SUPER_FOOD
    board[size-2][size-2]=SUPER_FOOD
    board[1][size-2]=SUPER_FOOD
    board[size-2][1]=SUPER_FOOD

    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    // console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    clearTimeout(backToNormalSetTimeOutId)
    gGame.isOn = false
    gGhosts=[]
    renderCell(gPacman.location, '🪦')
    makeModal('modal', 'GAME OVER', 'PLAY AGAIN', 'onInit')
    removeHidden('.modal')


}

function gameDone() {
    clearInterval(gIntervalGhosts)
    clearTimeout(backToNormalSetTimeOutId)
    gGame.isOn = false
    gGhosts=[]

 makeModal ('modal','VICTORY','PLAY AGAIN','onInit')
 removeHidden('.modal')
}

function makeModal(className, h1Text, buttonText, buttonFunc) {
    const elmodal = document.querySelector(`.${className} h1`)
    elmodal.innerText = `${h1Text}`
    const elmodalBtn = document.querySelector(`.${className}  .modal-btn`)
    // elmodalBtn.o = ``
    elmodalBtn.innerHTML =` <button onclick="${buttonFunc}()">${buttonText}</button>`
}

function getFoodCount(board) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j]=== FOOD) count++
        }
    }
    // console.log(':',count)
    return count
}

function updateFoodCount(foodEaten){
    gFoodCount-= foodEaten
}

function superFoodEra(){
    gPacman.isSuper=true
    changeGhosts()

}

function backToNormal(){
    gPacman.isSuper=false
   for (var i=0;i<gDeadGhosts.length;i++){
    gGhosts.push(gDeadGhosts[i])
   }
   gDeadGhosts=[]
    console.log('new ghosts:',gGhosts)
    reChangeGhosts()
}


function createCherry(){
   const emptyCells= findEmptyCells(gBoard)
//    console.log('empty:',emptyCells)
  const randomEmptyCellIdx= emptyCells[getRandomInt(0,emptyCells.length)]
  console.log('idx:',randomEmptyCellIdx)
  console.log('cherry:',CHERRY)
gBoard[randomEmptyCellIdx.i][randomEmptyCellIdx.j]= CHERRY
renderCell(randomEmptyCellIdx,CHERRY)
}