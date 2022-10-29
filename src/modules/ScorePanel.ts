class ScorePanel {
    //得分，难度记录
    score = 0
    level = 1
    //获取记录dom元素
    ScoreElement: HTMLElement
    LevelElement: HTMLElement
    setLevelElement:HTMLElement
    startElement:HTMLElement
    pauseElement:HTMLElement
    maxLevel: number // 设置最大难度
    constructor(maxLevel:number) {
        this.ScoreElement = document.querySelector('#score')!
        this.LevelElement = document.querySelector('#level')!
        this.startElement = document.querySelector('#start')!
        this.pauseElement = document.querySelector('#pause')!
        this.setLevelElement = document.querySelector('#setLevel')!
        this.maxLevel = maxLevel
    }
   
    //得分记录
    addScore() {
        this.score++
        this.ScoreElement.innerHTML = this.score.toString()
    }
    showLevel(value:number) {
        if(value <= this.maxLevel) {
            this.level = value
            this.LevelElement.innerHTML = this.level.toString()
        } else {
            alert('设置难度过高请重新设置')
        }
    }
}

export default ScorePanel