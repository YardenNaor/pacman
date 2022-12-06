'use strict'

const GHOST = '&#9781'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor(),
        // isSick: false
        isEaten: false
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')

}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver

    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        } else if (!ghost.isEaten) {
            ghost.isEaten = true
            removeGhost(ghost.location)

        }
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}" >${GHOST}</span>`
}

function changeGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        // gGhosts[i].isSick = true
        gGhosts[i].color = 'blue'
    }
}


function reChangeGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        // gGhosts[i].isSick = false
        gGhosts[i].color = getRandomColor()
        gGhosts[i].isEaten = false
    }
}


function removeGhost(location) {
    // deadGhosts=[]
    console.log('location:', location)
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        // console.log('alive:',gGhosts)
        if (ghost.location.i === location.i && ghost.location.j === location.j) {
            gGhosts.splice(i, 1)
            // console.log('alive:', gGhosts)
            gDeadGhosts.push(ghost)
            // console.log('dead:', gDeadGhosts)
        }
        // return deadGhosts
    }
}