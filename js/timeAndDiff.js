'use strict'

var gStartTime
var gTimerInterval

const easyBtn = document.querySelector('.diff-level button[data-diff="easy"]')
var previuosSelectnBtn = easyBtn


function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(updateTime, 1000)

}

function endTimer() {
    clearInterval(gTimerInterval)
    gTimerInterval = null

}

function updateTime() {
    var currTime = Date.now()
    var elapsedTime = currTime - gStartTime
    var seconds = Math.floor(elapsedTime / 1000)
    gGame.secsPassed = seconds

    const elTimer = document.querySelector('.timer')
    elTimer.innerHTML = seconds
}

function chooseLevel(elBtn) {

    updateBoardOnGameOver()
    var level = elBtn.getAttribute('data-diff')

    if (elBtn !== document.querySelector('[data-diff="restart"]')) {
        if (previuosSelectnBtn) previuosSelectnBtn.classList.remove('clicked')

        previuosSelectnBtn = elBtn
    }


    switch (level) {
        case 'easy':
            gLevel.SIZE = 4
            gLevel.MINES = 2
            gLevel.LIVES = 1
            gLevel.DIFF = 'easy'
            gTable = gTables.easy
            break
        case 'medium':
            gLevel.SIZE = 8
            gLevel.MINES = 14
            gLevel.LIVES = 3
            gLevel.DIFF = 'medium'
            gTable = gTables.medium
            break
        case 'hard':
            gLevel.SIZE = 12
            gLevel.MINES = 32
            gLevel.LIVES = 3
            gLevel.DIFF = 'hard'
            gTable = gTables.hard
            break
        default:
            // Set gLevel to the previous level
            gLevel = gPreviousLevel
            break

    }

    elBtn.classList.add('clicked')
    gPreviousLevel = { ...gLevel }
    onInit()
    return


}