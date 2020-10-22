'use strict';
const numGame = {
    highScore: 0,
    currentScore: 20,
    getRandomNum: function(){
        const t = Math.floor(Math.random() * 20) + 1
        this.correctNumber = t
    },
    resetCurrentScore: function(){
        this.currentScore = 20
    },
    updateHighScore: function(){
        this.highScore = this.currentScore > this.highScore ? this.currentScore : this.highScore
    },
    startGame: function(){
        this.getRandomNum()
        this.resetCurrentScore()
    },
    compareNum: function(guess){
        //Value codes
        // 1 - Lower
        // 2 - Higher
        // 3 - Win
        if(guess > this.correctNumber){
            return 1
        } else if(guess < this.correctNumber){
            return 2
        } else {
            return 0
        }
    },
    loseScore: function(){
        this.currentScore = (this.currentScore == 0) ? 0 : this.currentScore - 1
    }
}

const domEditor = {
    scoreLabel: document.querySelector(".score"),
    msgLabel: document.querySelector(".message"),
    hScoreLabel: document.querySelector(".highscore"),
    againBtn: document.querySelector(".again"),
    checkBtn: document.querySelector(".check"),
    guessInput: document.querySelector(".guess"),
    numberLabel: document.querySelector(".number"),
    body: document.querySelector("body"),

    scoreUpdater: function(score){
        this.scoreLabel.textContent = score
    },
    msgUpdater: function(code){
        //Value codes
        // 1 - Lower
        // 2 - Higher
        // 3 - Win
        let msgText
        switch(code){
            case 1: 
                msgText = "📉 Go Lower!"
                break
            case 2:
                msgText = "📈 Go Higher!"
                break
            default:
                msgText = "🎉 Correct!"
                break
        }
        this.msgLabel.textContent = msgText
    },
    numUpdater: function(num){
        this.numberLabel.textContent = num
    },
    hScoreupdater: function(score){
        this.hScoreLabel.textContent = score
    },
    numInput: function(){
        let stringVal = this.guessInput.value
        let numVal = Number(stringVal)
        return numVal
    },
    resetMsg: function(){
        this.msgLabel.textContent = "Start guessing..."
    },
    resetNum: function(){
        this.numberLabel.textContent = "?"
    },
    setGreenBackground: function(){
        this.body.style.backgroundColor = "#60b347"
    },
    setNormalBackground: function(){
        this.body.style.backgroundColor = "#222"
    }

}

function setEventListener(){
    domEditor.againBtn.addEventListener("click", function(){
        numGame.startGame()
        domEditor.resetMsg()
        domEditor.resetNum()
        domEditor.checkBtn.disabled = false
        domEditor.scoreLabel.textContent = 0
        domEditor.setNormalBackground()
    })

    domEditor.checkBtn.addEventListener("click", function(){
        //Value codes
        // 1 - Lower
        // 2 - Higher
        // 3 - Win
        let guess = domEditor.numInput()
        let code = numGame.compareNum(guess)
        domEditor.msgUpdater(code)
        switch(code){
            case 0:
                numGame.updateHighScore()
                domEditor.hScoreupdater(numGame.highScore)
                domEditor.numUpdater(numGame.correctNumber)
                domEditor.checkBtn.disabled = true
                domEditor.guessInput.value = ""
                domEditor.setGreenBackground()
                break
            default:
                numGame.loseScore()
                domEditor.scoreUpdater(numGame.currentScore)
                break
        }
    })

}

setEventListener()
numGame.startGame()

