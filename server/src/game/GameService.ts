import { Socket } from "socket.io";
import { Directions, Player, PlayerStates } from "../player/entities/Player";
import { Room } from "../room/entities/Room";
import { RoomService } from "../room/RoomService";
import { Game, GameStates, Messages } from "./entities/Game";
import { BoardBuilder } from "./BoardBuilder";
import { ServerService } from "../server/ServerService"
export class GameService {
    private games: Game[];
    /**/private playerCount: number; 

    private static instance: GameService;
    private constructor() {
        this.games = [];
         /**/this.playerCount = 0;
    };

    static getInstance(): GameService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GameService();
        return this.instance;
    }

    public buildPlayer(socket: Socket): Player {
        return {
            id: socket,
            x: 0,
            y: 0,
            state: PlayerStates.Idle,
            direction: Directions.Up,
            visibility: true,
            connected: true,
            type: 0 /**/
        }
    }

    public addPlayer(player: Player): boolean {
        /**/this.playerCount++; 
       /**/ player.type = this.playerCount;

        const room: Room = RoomService.getInstance().addPlayer(player);
        if (room.players.includes(player)) {
            if (this.isRealPlayer(player)) {
                ServerService.getInstance().sendMessage(room.name, Messages.NEW_PLAYER, "new player");
            }
        }
        const genRanHex = (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        if (room.players.length == 1) {
            const game: Game = {
                id: "game" + genRanHex(128),
                state: GameStates.WAITING,
                room: room,
                board: new BoardBuilder().getBoard()
            }
            room.game = game;
            this.games.push(game);
        }
        
        
    
        if (room.occupied) {
            if (room.game) {
                room.game.state = GameStates.PLAYING;
                if (ServerService.getInstance().isActive()) {
                    ServerService.getInstance().sendMessage(room.name, Messages.BOARD, room.game.board);
                }
            }
            return true;
        }
    
        return false;
    }






    

    private isRealPlayer(player: Player): boolean {
        
        return player.id !== null && player.id !== undefined;
    }

   
}