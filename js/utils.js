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

function changeBackgroundColor(location, color) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    elCell.style.backgroundColor = color
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

function updateFlagsCount() {
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
    var value = EMPTY
    const currCell = gBoard[pos.i][pos.j]

    if (currCell.isMine) value = MINE_IMG
    else if (currCell.minesAroundCount === 0) value = EMPTY
    else value = currCell.minesAroundCount
    renderCell(pos, value)
}

function defineShownCellSets(pos) {
    const currCell = gBoard[pos.i][pos.j]

    currCell.isShown = true
    gGame.shownCount++

    const cellSelector = '.' + getClassName(pos)
    const elCell = document.querySelector(cellSelector)
    elCell.classList.add('clicked')
}




function negsLoop(pos) {
    var gNegs = []

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

function handleAction(actionFunc, argument, countProp) {

    if (gGame[countProp] > 0) {
        actionFunc(argument)
        return gGame[countProp]--
    }
}

function toggleClass(cellPos, className, action) {
    const cellSelector = '.' + getClassName(cellPos);
    const elCell = document.querySelector(cellSelector);

        elCell.classList[action](className)
    
}

function getRandomName() {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

