'use strict'

function handleContextMenu(event) {
    event.preventDefault()   
}

function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td onmousedown="onCellClick(event, ${i},${j}, this)" 
            oncontextmenu="handleContextMenu(event); return false;" 
            class="${className}"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    
   
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
	const cellSelector = '.' + getClassName(location)
	const elCell = document.querySelector(cellSelector)
	elCell.innerHTML = value
}

function addClass(className, value) {
	const elCell = document.querySelector(className)
	elCell.classList.add = className
}

function getClassName(position) {
	const cellClass = `cell-${position.i}-${position.j}`
	return cellClass
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
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
    elLives.innerText = ''

    for (var i = 0; i < gLevel.LIVES; i++) {
        elLives.innerText += '❤️'
    }

}


function toggleRightClick(i, j) {
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
}

function revealCell(pos) {

    const currCell = gBoard[pos.i][pos.j]
    currCell.isShown = true
    gGame.shownCount++
    turnBackgroundColor(pos.i, pos.j)
    if (currCell.minesAroundCount === 0) currCell.innerText = EMPTY
    else renderCell({ i: pos.i, j: pos.j }, currCell.minesAroundCount)
}


function updateBoardOnGameOver() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) renderCell({ i, j }, MINE_IMG)
            else revealCell({ i, j });

        }
    }

    gGame.isOn = false
    endTimer()
    gPreviousLevel.DIFF = gLevel.DIFF
}

function negsLoop(pos) {
    var gNegs = []
    //debugger
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue

            if (i === pos.i && j === pos.j) continue

            gNegs.push({ i, j })
        }
    }
    return gNegs;
}

