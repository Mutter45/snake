import "./style/reset.scss"; //引入重置样式
import "./style/index.scss";
import GameControl from "./modules/GameControl";
const game = new GameControl()
game.food.change() // 随机生成一个食物位置
// 开始游戏
game.scorePanel.startElement.addEventListener('click',()=>{
    game.start()
})
//暂停游戏
game.scorePanel.pauseElement.addEventListener('click',()=>{
    game.pause()
})
//设置难度
game.scorePanel.setLevelElement.addEventListener('click',()=>{
    game.setLevel()
})
//难度设置页面功能处理
game.levelPanel.confirmElement.addEventListener('click', ()=> {
    game.confirm()
})
game.levelPanel.backElement.addEventListener('click', ()=> {
    game.back()
})
game.levelPanel.levelPanelElement.addEventListener('click', (e)=> {
    let value = (e.target as HTMLElement).innerHTML // 利用事件委托获取等级难度
    game.levelPanel.chosenLevel(+value)
})
//重新开始游戏
game.gameOver.backGameElement.addEventListener('click', (e)=> {
    game.backGame()
})
game.gameOver.changeElement.addEventListener('click', (e)=> {
    game.changeGame()
})