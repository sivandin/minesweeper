var gTable = []
var gPlayer = {
    name: 'Player', // Default player name
    score: 0,
}
var gStoredTable = localStorage.getItem('scoreTable')


function buildTable() {
    for (var i = 0; i < 10; i++) {
        gTable.push([i + 1, '', 0])
    }
    saveTable(); // Save the initial table to local storage
}

function saveTable() {
    localStorage.setItem('scoreTable', JSON.stringify(gTable));
}

function renderTable(table) {
    const elTable = document.querySelector('.tableScore')
    var strHTML = '<table>';
    for (var i = 0; i < table.length; i++) {
        strHTML += `<tr><td data-position="${table[i][0]}" data-name="${table[i][1]}"
         data-score="${table[i][2]}">${table[i][0]}</td>
         <td>${table[i][1]}</td><td>${table[i][2]}</td></tr>`
    }
    strHTML += '</table>';
    elTable.innerHTML = strHTML;
}


function CheckScore(secs) {
    
    gPlayer.score = secs

    for (var i = 0; i < gTable.length; i++) {
        var playerRow = [i + 1, gPlayer.name, gPlayer.score]
        if (secs <= gTable[i][2]) {
            gTable.splice(i, 0, playerRow)
            if (gTable.length > 10) gTable.pop()
            
            for (var j = i+1; j<gTable.length; j++) {
                gTable[j][0] = j+1
            }
           
            saveTable()
            renderTable(gTable)
            // Save the updated table to local storage
            return
        }
    }
}