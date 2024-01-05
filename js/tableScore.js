
var gPlayer = {
    name: 'Player', // Default player name
    score: 0,
}

var gStoredTable = localStorage.getItem('scoreTable')
var gTable = gStoredTable ? JSON.parse(gStoredTable) : []



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
    var strHTML = '<table><tr><th>Position</th><th>Name</th><th>Score</th></tr>';

    for (var i = 0; i < table.length; i++) {
        strHTML += `<tr><td data-position="${table[i][0]}" data-name="${table[i][1]}" data-score="${table[i][2]}">${table[i][0]}</td><td>${table[i][1]}</td><td>${table[i][2]}</td></tr>`;
    }

    strHTML += '</table>';
    elTable.innerHTML = strHTML;
}



    function CheckScore(secs) {
        debugger;
    
        gPlayer.score = secs
    
        // Add the player to the leaderboard
        gTable.push([0, gPlayer.name, gPlayer.score])
    
        // Sort the leaderboard in descending order based on the player's scores
        gTable.sort(function (a, b) {
            return a[2] - b[2];

        })
    
        // Keep only the top 10 rows
        gTable = gTable.slice(0, 10);
    
        // Update positions
        for (var j = 0; j < gTable.length; j++) {
            gTable[j][0] = j + 1;
        }
    
        saveTable();
        renderTable(gTable);
    }