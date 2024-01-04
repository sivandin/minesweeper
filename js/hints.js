'use strict'

function onHintClick(elBtn) {

    if (gGame.hints > 0 && !elBtn.classList.contains('clicked')) {
        toggleClass(elBtn, 'clicked', 'add')
        gIsHintClicked = true
    }
}

function toggleHintsClicked(action) {
    var elHintBtns = document.querySelectorAll('.hints button')

    for (var k = 0; k < elHintBtns.length; k++) {
        if (action === 'add') toggleClass(elHintBtns[k], 'clicked', 'add')
        else if (action === 'remove') toggleClass(elHintBtns[k], 'clicked', 'remove')
    }
}


function giveSingleHint(cellPos) {
    var cell = gBoard[cellPos.i][cellPos.j]

    // Ensure the cell is not already shown
    if (!cell.isShown) {
        revealCell(cellPos)

        var elCell = document.querySelector('.' + getClassName(cellPos))
        elCell.classList.add('hint')

        setTimeout(() => removeHint(cellPos), 1000)
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
    if (gGame.safeModeCount === 0) {
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



// function onMegaHintClick(elBtn) {
//     debugger
//     elBtn.classList.contains('clicked')
//     toggleClass(elBtn, 'clicked', 'add')
//     gIsMega = true
// }



// function calcArr (firstPos, secondPos) {
//     var firstRow = firstPos.i > secondPos.i ? firstPos.i : secondPos.i
//     var lastRow = firstPos.i > secondPos.i ? firstPos.i : secondPos.i
//     var firstCol = firstPos.j > secondPos.j ? firstPos.j : secondPos.j
//     var lastCol = firstPos.j > secondPos.j ? fistPos.j : secondPos.j

//     var rowCount = lastRow - firstRow
//     var colCount = lastCol - firstCol

//     for (var i = firstRow; i < rowCount; i++) {
//         for (var j = firstCol; j < colCount; j++) {
//             currCell = gBoard[i][j]
//             gMegaHint.cellsArr.push(currCell)
//         }

//     }
// }



