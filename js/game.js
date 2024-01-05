'use strict'

const EMPTY = ' '
const FLAG_IMG = '<img src="img/flag.png" class="img">'
const MINE_IMG = '<img src="img/mine.png" class="img">'

var gIsHintClicked = false
var gIsMega = false

var gMegaHint = {
    clicks: 0,
    firstCellPos: { i: -1, j: -1 },
    secondCellPos: { i: -1, j: -1 },
}

var gBoard = []  //A Matrix containing cell objects:Each cell: 

var gLevel = {
    SIZE: 4,
    MINES: 2,
    LIVES: 1,
    DIFF: 'easy',

}

var gPreviousLevel = {
    SIZE: 4,
    MINES: 2,
    LIVES: 1,
    DIFF: 'easy'
}

var gPlayer = {
    name: 'Player', // Default player name
    score: Infinity,
}


var gGame = {
    isOn: false,
    shownCount: 0,
    leftClickCount: 0,
    markedCount: gLevel.MINES,
    hints: 3,
    secsPassed: 0,
    safeModeCount: 3,
    megaHint: false
}



function onInit() {

    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = gLevel.MINES
    gGame.secsPassed = 0
    gGame.leftClickCount = 0
    gGame.hints = 3
    gGame.safeModeCount = 3
    gGame.megaHint = false
    gMegaHint.clicks = 0
    // Clear timer
    endTimer()

    // Clear board
    gBoard = []
    buildBoard()

    // Render the board
    renderBoard(gBoard, '.board-container')
    renderLives()


    if (!gTable.length) buildTable()
    renderTable(gTable)


    toggleHintsClicked('add')


    var elTimer = document.querySelector('.timer')
    elTimer.innerText = '0'

    var elBtn = document.querySelector('[data-diff="restart"]')
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
                isMarked: false,
                negs: [],
            }
        }
    }
}

function initMines() {

    for (var i = 0; i < gLevel.MINES; i++) {
        placeMine()
    }

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].negs = negsLoop({ i, j })
            setMinesNegsCount({ i, j })
        }
    }
}

function placeMine() {
    var minePlaced = false

    while (!minePlaced) {
        var randomCellObj = isRandomMine()
        var randomCell = randomCellObj.cell

        if (!randomCell.isMine && !randomCell.isShown) {
            randomCell.isMine = true
            minePlaced = true
        }
    }
}



function isRandomMine() {
    var rowIdx = getRandomInt(0, gLevel.SIZE)
    var colIdx = getRandomInt(0, gLevel.SIZE)
    var randomCell = gBoard[rowIdx][colIdx]

    return { rowIdx: rowIdx, colIdx: colIdx, cell: randomCell }
}

function setMinesNegsCount(pos) {
    var currCell = gBoard[pos.i][pos.j]

    for (var i = 0; i < currCell.negs.length; i++) {
        var negCellRow = currCell.negs[i].i
        var negCellCol = currCell.negs[i].j

        if (gBoard[negCellRow][negCellCol].isMine) currCell.minesAroundCount++
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

    gGame.leftClickCount++

    if (gGame.leftClickCount === 1) {
       
        startTimer()
        initMines()
        // while (gBoard[i][j].isMine)  { debugger
        //     gBoard=[]
        //     buildBoard()
        //     renderBoard(gBoard, '.board-container')
        //     initMines()
        // }
        
        toggleHintsClicked('remove')

        var elSafeBtn = document.querySelector('.safe-mode .btn')
        elSafeBtn.classList.remove('hide')
    }

    if (gIsHintClicked) {
        var cellNeighborhoodHint = gBoard[i][j].negs
        cellNeighborhoodHint.push({ i, j })

        handleAction(giveHints, cellNeighborhoodHint, 'hints')
        gIsHintClicked = false
        return
    }

    if (gGame.megaHint) {

        gMegaHint.clicks++;

        if (gMegaHint.clicks === 1) {
            gMegaHint.firstCellPos = { i, j }
            toggleClass({ i, j }, 'cellMega', 'add')
            return

        } else if (gMegaHint.clicks === 2) {
            gMegaHint.secondCellPos = { i, j }
            var cellsArr = createCellsArr(gMegaHint.firstCellPos, gMegaHint.secondCellPos);

            setTimeout(function () {
                giveHints(cellsArr);
                gGame.megaHint = false;
            }, 1050);

            return
        }
    }


    defineShownCellSets({ i, j })

    var isGameOver = checkGameOver({ i, j }, elCell)
    if (isGameOver) return

    var elBtn = document.querySelector('[data-diff="restart"]')
    elBtn.innerText = '😮'

    setTimeout(function () {
        elBtn.innerText = '😊'
    }, 300)

    elCell.classList.add('clicked')

    if (gBoard[i][j].isMine) return

    if (gBoard[i][j].minesAroundCount === 0) {

        elCell.innerText = EMPTY
        revealNegs({ i, j })
        checkGameOver({ i, j }, elCell)
    } else {
        elCell.innerText = gBoard[i][j].minesAroundCount
    }

}


function handleRightClick(i, j, elCell) {
    if (!gBoard[i][j].isShown) {
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


}


function revealNegs(pos) {

    var cell = gBoard[pos.i][pos.j]

    for (var i = 0; i < cell.negs.length; i++) {
        var currNegCell = gBoard[cell.negs[i].i][cell.negs[i].j]
        var negRowIdx = cell.negs[i].i
        var negColIdx = cell.negs[i].j

        if (!currNegCell.isShown) {
            revealCell({ i: negRowIdx, j: negColIdx })
            defineShownCellSets({ i: negRowIdx, j: negColIdx })

            if (currNegCell.minesAroundCount === 0) {
                revealNegs({ i: negRowIdx, j: negColIdx })
            }
        }
    }
}

function checkGameOver(pos, elCell) {


    var elBtn = document.querySelector('[data-diff="restart"]')

    if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES) {
        gPlayer.name = prompt('Enter you name')
        CheckScore(gGame.secsPassed)
        gameOver(pos, elCell)
        return true
    }

    if (gBoard[pos.i][pos.j].isMine) {
        gLevel.LIVES--
        renderLives()
        elBtn.innerText = '😮'
        elCell.innerHTML = MINE_IMG

        if (gLevel.LIVES === 0) {
            gameOver(pos, elCell)
            return true
        }
    }
    return false
}


function gameOver(pos, elCell) {

    var elBtn = document.querySelector('[data-diff="restart"]')

    if (gBoard[pos.i][pos.j].isMine) {
        elCell.style.backgroundColor = '#ce3f43'
        elBtn.innerText = '😭'
        elCell.innerHTML = MINE_IMG
    }


    else if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES) {
        elBtn.innerText = '🤩'
    }

    updateBoardOnGameOver()
}

function stroeTableScoreRes() {
    for (var diffLevel in gTables) {
        var storedTable = localStorage.getItem(diffLevel + 'Table')
        if (storedTable) {
            gTables[diffLevel] = JSON.parse(storedTable)
        } else {
            gTables[diffLevel] = buildTable()
        }
    }

}


