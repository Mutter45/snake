class Food{
    element: HTMLElement;
    maxNum = 35; //食物随机取值最大范围，根据设置活动区域设置
    constructor() {
        this.element = document.querySelector('#food')!
    }
    //获取食物的X,Y坐标
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }
    //随机生成食物的坐标
    /**
     * X Y取值范围为0 - 340
     */
    change() {
        let x = Math.floor(Math.random() * this.maxNum) * 10
        let y = Math.floor(Math.random() * this.maxNum) * 10
        this.element.style.left = `${x}px`
        this.element.style.top = `${y}px`
    }
}
export default Food