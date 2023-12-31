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

function getClassName(position) {
	const cellClass = `cell-${position.i}-${position.j}`
	return cellClass
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

