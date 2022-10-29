class Snake {
    //定义蛇本身
    snake: HTMLElement
    head: HTMLElement
    bodies: HTMLCollection
    maxPos = 340
    constructor() {
        this.snake = document.querySelector('#snake') as HTMLElement;
        this.head = document.getElementById('head') as HTMLElement;
        this.bodies = this.snake.getElementsByTagName('span');
    }
    //获取蛇头当前X，Y坐标

    get X(): number {
        return this.head.offsetLeft
    }
    get Y(): number {
        return this.head.offsetTop
    }
    set X(value: number) {
        if (this.X === value) return;
        //处理蛇回头问题
        if (this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetLeft) {
            //当·蛇头与身体第一节重合时说明回头
            if (this.X < value) {
                //向右回头,处理成继续向左
                value -= 20
            } else {
                value += 20
            }
        }
        if (value > this.maxPos || value < 0) {
            throw new Error("蛇碰壁了")
        }
        this.bodyMove()
        this.head.style.left = `${value}px`
        this.checkBodies()
    }
    set Y(value: number) {
        if (this.Y === value) return;
        //执行顺序不能切换
        //处理蛇回头问题
        if (this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetTop) {
            //当·蛇头与身体第一节重合时说明回头
            if (this.Y < value) {
                //向下回头,处理成继续向上
                value -= 20
            } else {
                value += 20
            }
        }
        if (value > this.maxPos || value < 0) {
            throw new Error("蛇碰壁了")
        }
        this.bodyMove()
        this.head.style.top = `${value}px`
        this.checkBodies()
    }
    //吃到食物处理
    eatFood() {
        let span: HTMLElement = document.createElement("span");
        this.snake.appendChild(span)
    }
    //身体移动判断
    bodyMove() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = `${X}px`;
            (this.bodies[i] as HTMLElement).style.top = `${Y}px`
        }
    }
    //检查是否撞到自身
    checkBodies() {
        for (let i = 1; i < this.bodies.length; i++) {
            let X = (this.bodies[i] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i] as HTMLElement).offsetTop;
            if (this.X === X && this.Y == Y) {
                throw new Error('你已撞到自身~~')
            }
        }
    }
    remove() {
        this.X = 0
        this.Y = 0
        // console.log(this.bodies)
        let oldLength = this.bodies.length
        for (let i = oldLength - 1; i > 0; i--) {
            this.bodies[i].remove();
        }
        console.log(this.bodies)
        
        // console.log(this.head)
        // let span: HTMLElement = document.createElement("span");
        // this.snake.appendChild(span)
    }
}
export default Snake;