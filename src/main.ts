import "./style/reset.scss"; //引入重置样式
import "./style/index.scss";
import GameControl from "./modules/GameControl";
// import ScorePanel from "./modules/ScorePanel";
// const scorePanel = new ScorePanel(10)
const game = new GameControl()
// 开始游戏
game.scorePanel.startElement.addEventListener('click',()=>{
    game.init()
})
//暂停游戏
game.scorePanel.pauseElement.addEventListener('click',()=>{
    game.pause()
})
//设置难度
game.scorePanel.setLevelElement.addEventListener('click',()=>{
    console.log(111)
})
