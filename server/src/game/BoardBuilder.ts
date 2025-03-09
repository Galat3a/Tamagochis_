import { Board, Element } from "./entities/Board";

export class BoardBuilder {
    private board: Board;
    
    constructor() {
        this.board = {
            size: 10,
            elements: []
        };

        const map: Element[][] = [];
        for (let i = 0; i < this.board.size; i++) {
            map[i] = [];
            for (let j = 0; j < this.board.size; j++) {
                map[i][j] = {
                    x: i,
                    y: j,
                    type: 0,
                    object: null,
                    top: null,
                    bottom: null,
                    right: null,
                    left: null
                };
            }
        }

        // //posicion vecinos
        // for (let i = 0; i < this.board.size; i++) {
        //     for (let j = 0; j < this.board.size; j++) {
        //         // Establecer referencias a elementos adyacentes
        //         if (i > 0) map[i][j].top = map[i - 1][j];
        //         if (i < this.board.size - 1) map[i][j].bottom = map[i + 1][j];
        //         if (j > 0) map[i][j].left = map[i][j - 1];
        //         if (j < this.board.size - 1) map[i][j].right = map[i][j + 1];
        //     }
        // }
        
        // Posicion de los jugadores en las esquinas
        const playerPositions = [
            { x: 0, y: 0, type: 1 }, 
            { x: 0, y: this.board.size - 1, type: 2 }, 
            { x: this.board.size - 1, y: 0, type: 3 },
            { x: this.board.size - 1, y: this.board.size - 1, type: 4 } 
        ];

        playerPositions.forEach(position => {
            map[position.x][position.y].type = position.type;
        });

        
       // Posicion de los arbustos
       let bushesCount = 0;
       const maxBushes = 6; 

       while (bushesCount < maxBushes) {
           const i = Math.floor(Math.random() * (this.board.size - 2)) + 1;
           const j = Math.floor(Math.random() * (this.board.size - 2)) + 1;

           // Verificar si la posición está vacía y no tiene elementos adyacentes
           if (map[i][j].type === 0 && 
               (!map[i][j].top || map[i][j].top.type === 0) && 
               (!map[i][j].bottom || map[i][j].bottom.type === 0) && 
               (!map[i][j].left || map[i][j].left.type === 0) && 
               (!map[i][j].right || map[i][j].right.type === 0)) {
               
               map[i][j].type = 5;
               bushesCount++;
           }
       }

        // Agregar elementos al board
        this.board.elements = [];  // Limpiar elementos existentes
        for (let i = 0; i < this.board.size; i++) {
            for (let j = 0; j < this.board.size; j++) {
                this.board.elements.push(map[i][j]);  // Agregar todos los elementos
            }
        }

        console.log("Board elements:", this.board.elements.length);
    }


    
    public getBoard(): Board {
        return this.board;
    }
}