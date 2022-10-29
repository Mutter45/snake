class LevelPanel {
    levelPanelElement: HTMLElement
    backElement: HTMLElement
    confirmElement: HTMLElement
    activeLevel: HTMLCollection
    level = 1
    constructor() {
        this.levelPanelElement = document.querySelector('#levelPanel')!;
        this.backElement = document.querySelector('#back')!;
        this.confirmElement = document.querySelector('#confirm')!;
        this.activeLevel = this.levelPanelElement.getElementsByClassName('active');
    }
    //选择难度添加类名
    chosenLevel(value: number) {
        this.removeActiveLevel()
        for(let i = 0; i < this.levelPanelElement.children.length; i++) {
            this.levelPanelElement.children[i].innerHTML === value.toString() 
            && this.levelPanelElement.children[i].classList.add('active')
             this.level = value;
            
        }
    }
    //清除所有已选中的难度
    removeActiveLevel() {
        for(let i = 0; i < this.levelPanelElement.children.length; i++) {
            this.levelPanelElement.children[i].classList.remove('active')
        }
    }
}
export default LevelPanel