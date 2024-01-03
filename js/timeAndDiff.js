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
    //debugger
    var currTime = Date.now()
    var elapsedTime = currTime - gStartTime
    var seconds = Math.floor(elapsedTime / 1000)
    gGame.secsPassed = seconds

    const elTimer = document.querySelector('.timer')
    elTimer.innerHTML = seconds
}

function chooseDiffLevel(elBtn) {

    var diffLevel = elBtn.getAttribute('data-diff')

    if (elBtn !== document.querySelector('[data-diff="restart"]')) {
        if (previuosSelectnBtn) previuosSelectnBtn.classList.remove('clicked')

        previuosSelectnBtn = elBtn
    }


    switch (diffLevel) {
        case 'easy':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            gLevel.LIVES = 1;
            gLevel.DIFF = 'easy'
            break;
        case 'medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 14;
            gLevel.LIVES = 3;
            gLevel.DIFF = 'medium'

            break;
        case 'hard':
            gLevel.SIZE = 12;
            gLevel.MINES = 32;
            gLevel.LIVES = 3;
            gLevel.DIFF = 'hard'
            break;
        default:
            // Set gLevel to the previous level
            gLevel = gPreviousLevel;
            break;

    }

    elBtn.classList.add('clicked')
    gPreviousLevel = { ...gLevel }
    onInit()
    return


}