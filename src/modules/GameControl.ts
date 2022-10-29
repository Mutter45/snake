import GameOver from "./GameOver";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
import LevelPanel from "./LevelPanel";
import Tools from "../tools/index";

class GameControl {
    gameOver: GameOver
    levelPanel: LevelPanel
    snake: Snake
    scorePanel: ScorePanel
    food: Food
    tools: Tools
    timer: any
    fn: any
    //切换面板控制
    levelPanelBoxElement: HTMLElement
    areaElement: HTMLElement
    panelElement: HTMLElement
    //蛇控制属性设置
    direction = ''
    isLive = true
    constructor() {
        this.gameOver = new GameOver();
        this.levelPanel = new LevelPanel()
        this.snake = new Snake()
        this.scorePanel = new ScorePanel(10)
        this.food = new Food()
        this.tools = new Tools()
        this.levelPanelBoxElement = document.querySelector('.levelPanelBox')!
        this.areaElement = document.querySelector('.area')!
        this.panelElement = document.querySelector('.panel')!
    }
    start() {
        this.fn = this.keydownHandler.bind(this) //确定绑定方法为同一个，方便移除方法
        this.isLive = true
        //
        this.scorePanel.startElement.style.display = 'none'
        this.scorePanel.setLevelElement.style.display = 'none'
        this.scorePanel.pauseElement.style.display = 'block'

        // 绑定this为当前类
        document.addEventListener('keydown', this.fn)
    }
    //暂停游戏
    pause() {
        this.scorePanel.startElement.innerText = '继续游戏'
        this.scorePanel.startElement.style.display = 'block'
        this.scorePanel.pauseElement.style.display = 'none'
        document.removeEventListener('keydown', this.fn)
        this.isLive = false
    }

    //移动方向控制
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key
        this.headMove()
    }
    //蛇头移动判定
    /**
     * ArrowUp 上
     * ArrowDown 下
     * ArrowLeft 左
     * ArrowRight 右
     */
    headMove(level: number = this.scorePanel.level) {
        //获取蛇头当前X， Y坐标
        let X = this.snake.X
        let Y = this.snake.Y
        //为了兼容低版本ie浏览器
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10
                break
            case 'ArrowDown':
            case 'Down':
                Y += 10
                break
            case 'ArrowLeft':
            case 'Left':
                X -= 10
                break
            case 'ArrowRight':
            case 'Right':
                X += 10
                break
        }
        this.checkEat(X, Y)
        //清除计时器，防止长按捕获到多次错误
        clearTimeout(this.timer)
        try {
            this.snake.X = X
            this.snake.Y = Y
            if (this.isLive) this.timer = setTimeout(this.headMove.bind(this), 300 / level)
        } catch (error) {
            this.isLive = false
            this.gameOver.masklElement.style.display = 'flex'
        }
    }
    //检查是否吃到食物
    checkEat(X: number, Y: number) {
        if (this.food.X === X && this.food.Y === Y) {
            this.snake.eatFood()
            this.food.change()
            this.scorePanel.addScore()
        }
    }
    // 确认难度
    confirm() {
        this.back()
        this.scorePanel.showLevel(this.levelPanel.level)
    }
    //返回游戏
    back() {
        this.levelPanelBoxElement.style.display = "none"
        this.areaElement.style.display = "block"
        this.panelElement.style.display = "flex"
        this.scorePanel.startElement.innerText = '开始游戏'
        this.init(this.scorePanel.level)
    }
    //设置游戏难度
    setLevel() {
        // console.log(this.levelPanel.chosenLevel(this.scorePanel.level))
        this.levelPanelBoxElement.style.display = "block"
        this.areaElement.style.display = "none"
        this.panelElement.style.display = "none"
    }
    //返回游戏
    backGame() {
        this.gameOver.masklElement.style.display = 'none'
        this.init(this.scorePanel.level) //更改游戏难度后重新开始
    }
    //更改游戏难度
    changeGame() {
        this.gameOver.masklElement.style.display = 'none'
        this.setLevel()
        // this.init(this.scorePanel.level) //更改游戏难度后重新开始
    }
    //初始化游戏
    init(level: number = 1) {
        document.removeEventListener('keydown', this.fn)
        this.scorePanel.startElement.innerText = '开始游戏'
        this.scorePanel.startElement.style.display = 'block'
        this.scorePanel.setLevelElement.style.display = 'block'
        this.scorePanel.pauseElement.style.display = 'none'
        this.snake.remove()
        this.food.change()
        this.scorePanel.level = level
        this.scorePanel.score = 0
    }
}
export default GameControl