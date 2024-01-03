'use strict'



function onHintClick(elBtn) {
    debugger
    
    if (gGame.hints > 0 && !elBtn.classList.contains('clicked')) {
    elBtn.classList.add('clicked')
    gIsHintClicked = true
    }
}

function removeHintClicked() {

    var elHintBtns = document.querySelectorAll('.hints button')
    var isBtnClicked = false;

    for (var k = 0; k < elHintBtns.length; k++) {
        elHintBtns[k].classList.remove('clicked')
    }
    
}





    function giveHint(pos) {

    var negs = gBoard[pos.i][pos.j].negs
    negs.push({ i: pos.i, j: pos.j })

    for (var i = 0; i < negs.length; i++) {
        var currCellPos = negs[i]

        var currCell = gBoard[currCellPos.i][currCellPos.j]
        var value = currCell.isMine ? MINE_IMG : currCell.minesAroundCount

        if (currCell.minesAroundCount === 0) currCell.innerText = EMPTY
        else renderCell(currCellPos, value)

        if (!currCell.isShown) {
        var elCell = document.querySelector('.' + getClassName(currCellPos));
        elCell.classList.add('hint');
        }
    }
    setTimeout(() => removeHint(pos), 1000)
}

function removeHint() {
    var hintCells = document.querySelectorAll('.hint');

    hintCells.forEach(function (cell) {
        cell.innerHTML = ''
        cell.classList.remove('hint')
    })
}
