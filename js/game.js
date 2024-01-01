'use strict'

const MINE = '*'
const EMPTY = ' '
const FLAG = '<|'

const FLAG_IMG = '<img src="../img/flag.png" class="img">'
const MINE_IMG = '<img src="../img/mine.png" class="img">'




var gBoard = []  //A Matrix containing cell objects:Each cell: 

var gLevel = {
    SIZE: 4,
    MINES: 2,
    LIVES: 1,
}


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: gLevel.MINES,
}

function onInit() {


    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = gLevel.MINES
    gGame.secsPassed = 0



    // Clear timer
    endTimer()

    // Clear board
    gBoard = []
    buildBoard()

    // Render the board
    renderBoard(gBoard, '.board-container')
    renderLives()

    // Update flags display
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = '0'

    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😊'

    onCellMarked()


}

function buildBoard() {


    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard.push([])

        for (var j = 0; j < gLevel.SIZE; j++) {

            gBoard[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }

        }

    }


}

function initMines() {

    for (var i = 0; i < gLevel.MINES; i++) {
        var minePlaced = false

        while (!minePlaced) {
            var rowIdx = getRandomInt(0, gLevel.SIZE)
            var colIdx = getRandomInt(0, gLevel.SIZE)

            if (!gBoard[rowIdx][colIdx].isMine && !gBoard[rowIdx][colIdx].isShown) {
                gBoard[rowIdx][colIdx].isMine = true
                minePlaced = true
            }
        }

    }

    // gBoard[2][2].isMine = true
    // gBoard[0][3].isMine = true


    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            setMinesNegsCount({ i, j })
        }
    }
}


function setMinesNegsCount(pos) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue

            if (i === pos.i && j === pos.j) continue

            if (gBoard[i][j].isMine) gBoard[pos.i][pos.j].minesAroundCount++

        }
    }

}





function onCellClick(event, i, j, elCell) {

    event.preventDefault() // Prevent the default behavior of the right click (context menu)

    if (gGame.isOn) {

        if (event.button === 0 & !gBoard[i][j].isMarked) {
            handleLeftClick(i, j, elCell)

        } else if (event.button === 2) {
            handleRightClick(i, j, elCell)

        }

    }
}


function handleLeftClick(i, j, elCell) {

    if (gBoard[i][j].isShown) return
    gBoard[i][j].isShown = true
    gGame.shownCount++
    if (gGame.shownCount === 1) {
        startTimer()
        initMines()
    }

    const isGameOver = checkGameOver({ i, j }, elCell)
    if (isGameOver || gBoard[i][j].isMine) return

    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😮'


    setTimeout(function () {
        elBtn.innerText = '😊'
    }, 300)

    if (gBoard[i][j].minesAroundCount === 0) {

        elCell.innerText = EMPTY
        revealNegs({ i, j })
    } else {
        elCell.innerText = gBoard[i][j].minesAroundCount
    }

    turnBackgroundColor(i, j)

}

function handleRightClick(i, j, elCell) {



    toggleRightClick(i, j)
    if (gBoard[i][j].isMarked) {
        gGame.markedCount--
        renderCell({ i, j }, FLAG_IMG)
    }
    else {
        gGame.markedCount++
        renderCell({ i, j }, EMPTY)
    }
    onCellMarked()

}



function toggleRightClick(i, j) {
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
}

function revealNegs(pos) {


    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue

            if (i === pos.i && j === pos.j) continue
            //if (gBoard[pos.i][pos.j]===MINE) return
            const currCell = gBoard[i][j]

            if (!currCell.isShown) {
                revealCell({ i, j })

                if (currCell.minesAroundCount === 0) {
                    revealNegs({ i, j })
                }
            }
        }
    }
}

function revealCell(pos) {

    const currCell = gBoard[pos.i][pos.j]
    currCell.isShown = true
    gGame.shownCount++
    turnBackgroundColor(pos.i, pos.j)
    if (currCell.minesAroundCount === 0) currCell.innerText = EMPTY
    else renderCell({ i: pos.i, j: pos.j }, currCell.minesAroundCount)
}

function checkGameOver(pos, elCell) {
    //debugger
    var elBtn = document.querySelector('.restart')

    if (gBoard[pos.i][pos.j].isMine) {
        if (gLevel.LIVES ===0) {
            elCell.style.backgroundColor = '#ce3f43'
            elBtn.innerText = '😭'
            return gameOver()
        } else {
            //debugger
            gLevel.LIVES--
            renderLives()
            elBtn.innerText = '😮'

        }
        elCell.innerHTML = MINE_IMG
        return
        
    }

    else if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES) {
        elBtn.innerText = '🤩'
        return gameOver()
    }



}

function gameOver() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) renderCell({ i, j }, MINE_IMG)
            else revealCell({ i, j })
        }
    }
    gGame.isOn = false
    endTimer()
    return true
}

function turnBackgroundColor(i, j) {
    if (gBoard[i][j].isShown) {
        const cellSelector = '.' + getClassName({ i, j })
        const elCell = document.querySelector(cellSelector)
        elCell.classList.add('clicked')
    }
}

function onCellMarked() {
    var elFlagsLeft = document.querySelector('.flags-left')
    elFlagsLeft.innerText = `${gGame.markedCount}`

}

function renderLives() {
 const elLives = document.querySelector('.lives')
 elLives.innerText= ''
if (gLevel.LIVES===0) gameOver() //the crying face is not showing
    for (var i=0; i<gLevel.LIVES; i++) {
        elLives.innerText+='❤️'
    }

}
