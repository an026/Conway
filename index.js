
const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")

const game = new GameOfLife()
game.gameSetUp()
game.fillArr();

window.onload = () => {

    document.querySelector("#random").addEventListener("click", () => {
        game.randomButtonHandler();
        game.fillArr();
        window.setInterval(() => {
            game.runGame();
        }, 250)
    })

    document.querySelector("#clear").addEventListener("click", () => {
        window.location.reload();
    })

    document.querySelector("#gamefield").addEventListener("click", () => {
        var x = event.offsetX;
        var y = event.offsetY;
        game.onclickHandler(x, y);
        game.fillArr();
    })

    document.querySelector("#start").addEventListener("click", () => {
        window.setInterval(() => {
            game.runGame();
        }, 250)
    })

}
