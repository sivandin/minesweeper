'use strict'

function onHintClick(elBtn) {

    if (gGame.hints > 0 && !elBtn.classList.contains('clicked')) {
        elBtn.classList.add('clicked')
        gIsHintClicked = true
    }
}

function toggleHintsClicked(action) {
    var elHintBtns = document.querySelectorAll('.hints button')

    for (var k = 0; k < elHintBtns.length; k++) {
        if (action === 'add') elHintBtns[k].classList.add('clicked') 
        else if (action === 'remove') elHintBtns[k].classList.remove('clicked') 
    }
}


function giveSingleHint(cellPos) {
    var cell = gBoard[cellPos.i][cellPos.j]

    if (!cell.isShown) {
        revealCell(cellPos)

        var elCell = document.querySelector('.' + getClassName(cellPos))
        elCell.classList.add('hint')

        if (gGame.megaHint === true) {
    
            setTimeout(() => removeHint(cellPos), 2000)
            return
        } else {
        } setTimeout(() => removeHint(cellPos), 1000)

    }
}

function giveHints(cells) {
    for (var i = 0; i < cells.length; i++) {
        var cellPos = cells[i]
        giveSingleHint(cellPos)
    }
}

function removeHint() {
    var hintCells = document.querySelectorAll('.hint')

    hintCells.forEach(function (cell) {
        cell.innerHTML = ''
        cell.classList.remove('hint')
    })
}



function onSafeMode(elBtn) {

    elBtn.classList.add('clicked')
    safeClickHint()
    gGame.safeModeCount--
    if (gGame.safeModeCount <= 0) {
        elBtn.classList.add('hide')
        return
    }

}

function safeClickHint() {

    var safeButton = document.querySelector('.safe-mode .btn')

    while (true) {
        var randomCellObj = isRandomMine()
        var randomCell = randomCellObj.cell

        if (!randomCell.isShown && !randomCell.isMine) {
            break
        }
    }


    var cellPos = { i: randomCellObj.rowIdx, j: randomCellObj.colIdx }
    const cellSelector = '.' + getClassName(cellPos)
    const elCell = document.querySelector(cellSelector)
    elCell.classList.add('safe')

    setTimeout(function () {
        elCell.classList.remove('safe')
    }, 2000)

    setTimeout(function () {
        safeButton.classList.remove('clicked')
    }, 2200);

}


function onMegaHintClick(elBtn) {

    if (!elBtn.classList.contains('clicked')) {
        elBtn.classList.add('clicked')
        gGame.megaHint = true

    }
}


function createCellsArr(firstPos, secondPos) {
    var firstRow = firstPos.i < secondPos.i ? firstPos.i : secondPos.i
    var lastRow = firstPos.i > secondPos.i ? firstPos.i : secondPos.i
    var firstCol = firstPos.j < secondPos.j ? firstPos.j : secondPos.j
    var lastCol = firstPos.j > secondPos.j ? firstPos.j : secondPos.j

    var cellsArr = []


    for (var i = firstRow; i <= lastRow; i++) {
        for (var j = firstCol; j <= lastCol; j++) {
            var currCellPos = { i, j }
            toggleClass({ i, j }, 'cellMega', 'add')
             removeTimeOutBackground({i,j})
            cellsArr.push(currCellPos)
        }

    }
    return cellsArr
}


function removeTimeOutBackground({i,j}) {
    setTimeout(function() {
        toggleClass({i,j}, 'cellMega', 'remove');
    }, 1000);
}
