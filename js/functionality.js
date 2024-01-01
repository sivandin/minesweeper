'use strict'
var gStartTime
var gTimerInterval

const easyBtn = document.querySelector('.diff-level button[data-diff="easy"]')
var previuosSelectnBtn= easyBtn


function startTimer () {
    gStartTime=Date.now()
    gTimerInterval=setInterval(updateTime,1000)

}

function endTimer () {
    clearInterval(gTimerInterval)
    gTimerInterval=null

}

function updateTime() {
    //debugger
    var currTime= Date.now()
    var elapsedTime= currTime- gStartTime
    var seconds=Math.floor(elapsedTime/1000)

    const elTimer=document.querySelector('.timer')
    elTimer.innerHTML=seconds
}

function chooseDiffLevel(elBtn) {
    //debugger

    
    var diffLevel = elBtn.getAttribute('data-diff')

    if (previuosSelectnBtn) previuosSelectnBtn.classList.remove('clicked')


    switch (diffLevel) {
        case 'easy':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            gLevel.LIVES = 1;
            break;
        case 'medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 14;
            gLevel.LIVES = 3;
            break;
        case 'hard':
            gLevel.SIZE = 12;
            gLevel.MINES = 32;
            gLevel.LIVES = 3;
            break;
        default:
            // Handle other cases or provide a default value
            break;

    }

    elBtn.classList.add('clicked');
    previuosSelectnBtn=elBtn
    onInit()
    return 
 

}