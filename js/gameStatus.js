'use strict'
var gStartTime
var gTimerInterval

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

 

function diffLevel(elBtn) {

    var previuosSelectnBtn
    var diffLevel = elBtn.getAttribute('data-diff')
    var diffBtnClicked=0

    if (previuosSelectnBtn) previuosSelectnBtn.classList.remove('clicked')


    switch (difficulty) {
        case 'easy':
            diff = 4;
            break;
        case 'medium':
            diff = 8;
            break;
        case 'hard':
            diff = 12;
            break;
        default:
            // Handle other cases or provide a default value
            break;

    }
    elBtn.classList.add('clicked');
    diffBtnClicked++
    previuosSelectnBtn=elBtn
    endTimer()
    gClickCount=0
    onInit()

}