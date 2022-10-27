import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
import Tools from "../tools/index";

class GameControl {
    snake: Snake
    scorePanel: ScorePanel
    food: Food
    tools: Tools
    timer: any
    fn:any
    direction = 'ArrowRight'
    isLive = true
    constructor() {
        this.snake = new Snake()
        this.scorePanel = new ScorePanel(10)
        this.food = new Food()
        this.tools = new Tools()
    }
    init() {
        this.fn = this.keydownHandler.bind(this)
        this.isLive = true
        // 绑定this为当前类
        document.addEventListener('keydown', this.fn)
    }
    //暂停游戏
    pause() {
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
    headMove() {
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
            if (this.isLive) this.timer = setTimeout(this.headMove.bind(this), 300)
        } catch (error) {
            this.isLive = false
            alert(error)
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
}
export default GameControl