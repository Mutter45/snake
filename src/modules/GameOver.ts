class GameOver {
    masklElement: HTMLElement
    backGameElement: HTMLElement
    changeElement: HTMLElement
    constructor() {
      this.masklElement = document.querySelector('.mask')!
      this.backGameElement = document.querySelector('#backGame')!
      this.changeElement = document.querySelector('#change')!
    }
}
export default GameOver