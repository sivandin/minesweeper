'use strict'


var easyT = buildTable()
var mediumT = buildTable()
var hardT = buildTable()

var gTables = {
    easy: easyT,
    medium: mediumT,
    hard: hardT
}
var gTable = gTables.easy


function buildTable() {
    var table = []
    for (var i = 0; i < 10; i++) {

        table.push([i + 1, getRandomName(), i * 20]) //player (placeObBoard, name, randomScore)
    }
    return table
}


function renderTable(table) {
    const elTable = document.querySelector('.tableScore')
    var strHTML = '<table><tr><th>Position</th><th>Name</th><th>Score</th></tr>';

    for (var i = 0; i < table.length; i++) {
        strHTML += `<tr><td data-position="${table[i][0]}" data-name="${table[i][1]}" data-score="${table[i][2]}">${table[i][0]}</td><td>${table[i][1]}</td><td>${table[i][2]}</td></tr>`;
    }

    strHTML += '</table>';
    elTable.innerHTML = strHTML;
}


function updateTableScore(secs) {
    var currTable = gTables[gLevel.DIFF]

    gPlayer.score = secs

    for (var i = 0; i < currTable.length; i++) {
        if (secs <= currTable[i][2]) {

            currTable.splice(i, 0, [i + 1, gPlayer.name, gPlayer.score])
            currTable = currTable.slice(0, 10)

            // Update positions
            for (var j = 0; j < currTable.length; j++) {
                currTable[j][0] = j + 1
            }

            renderTable(currTable)
            return
        }
    }
}
