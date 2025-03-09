import { UI_BUILDER } from "./Ui.js";
import { ELEMENTS } from "./entities/Board.js";
import { PLAYER } from "./entities/Player.js";

export const UIv1 = UI_BUILDER.init();

UIv1.initUI = () => {
    const base = document.getElementById(UIv1.uiElements.board);
    base.classList.add("board");
}

UIv1.drawBoard = (board) => {
    if (board !== undefined) {
        const base = document.getElementById(UIv1.uiElements.board);
        base.innerHTML = '';
        base.style.gridTemplateColumns = `repeat(${board.length}, 100px)`;
        base.style.gridTemplateRows = `repeat(${board.length}, 100px)`;
        board.forEach(row => row.forEach((element) => {
            const tile = document.createElement("div");
            console.log(`element.type: ${element.type}, ELEMENTS.bush: ${ELEMENTS.bush}`);
            
            // ARBUSTOS
            if (element.type === ELEMENTS.bush) {
                tile.style.backgroundColor = "green";
                tile.style.borderRadius = "40%";
            }
            
            //  // JUGADORES
            //  switch (element.type) {
            //     case PLAYER.player1:
            //         tile.style.backgroundColor = "red";
            //         break;
            //     case PLAYER.player2:
            //         tile.style.backgroundColor = "blue";
            //         break;
            //     case PLAYER.player3:
            //         tile.style.backgroundColor = "yellow";
            //         break;
            //     case PLAYER.player4:
            //   tile.style.backgroundColor = "green";
            //          break;
            //  }
            
            tile.classList.add("tile");
            base.appendChild(tile);
            
            anime({
                targets: tile,
                opacity: [0, 1],
                duration: (Math.random() * 8000) + 1000,
                easing: 'easeInOutQuad'
            });
        }));
    }
}

UIv1.drawPlayers = (players, boardLength) => {
    console.log('ESTAMOS PINTANDO LOS JUGADORES');
    const base = document.getElementById(UIv1.uiElements.board);
    if (!base) {//para que no ex
        console.error('No se encontró el elemento del tablero.');
        return;
    }
    players.forEach(player => {
        const a = player.x * boardLength + player.y;
        const tile = base.children[a];
        if (tile !== undefined) {
            console.log(`Pintando el jugador en la posición (${player.x}, ${player.y}) con tipo ${player.type}`);
            switch (player.type) {
                case PLAYER.player1:
                    tile.style.backgroundColor = "red";
                    break;
                case PLAYER.player2:
                    tile.style.backgroundColor = "blue";
                    break;
                case PLAYER.player3:
                    tile.style.backgroundColor = "yellow";
                    break;
                case PLAYER.player4:
                    tile.style.backgroundColor = "orange";
                    break;
                default:
                    tile.style.backgroundColor = "gray"; 
                    break;
            }
            tile.classList.add("player");
        } else {
            console.error(`No se encontró el tile en la posición (${player.x}, ${player.y})`);
        }
    });
};