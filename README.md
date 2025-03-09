# Juego de Batalla en Tablero NxN

## Descripción del Proyecto
Juego multijugador en tiempo real donde los jugadores compiten en un tablero NxN. Cada jugador comienza en una esquina del tablero y debe enfrentarse a los demás jugadores mediante un sistema de combate por turnos, utilizando mecánicas de movimiento, rotación y disparo.

## Características Implementadas
- Tablero dinámico con generación aleatoria de arbustos
- Sistema de salas de juego básico
- Comunicación WebSocket cliente-servidor
- Interfaz gráfica con animaciones
- Gestión de jugadores y sus posiciones

## Tecnologías Utilizadas
- WebSocket (Socket.IO)
- TypeScript (Servidor)
- JavaScript (Cliente)
- Express
- Anime.js para animaciones
- Patrones de diseño (Singleton, Observer)

## Estructura del Proyecto

### Cliente
```
/cliente
  /src
    /entities      # Clases para Board y Player
    /services      # ConnectionHandler y GameService
    /UI           # Componentes de interfaz
    GameController.js  # Controlador principal
```

### Servidor
```
/server
  /src
    /game         # Lógica del juego
    /player       # Gestión de jugadores
    /room         # Sistema de salas
    /server       # Servicios WebSocket
```

## Objetivos Conseguidos
- [x] Sistema base de WebSocket funcionando
- [x] Generación del tablero y visualización
- [x] Sistema de salas básico
- [x] Gestión de conexiones de jugadores
- [x] Interfaz visual con animaciones

## Objetivos Pendientes
- [ ] Sistema de movimiento de jugadores
- [ ] Mecánica de rotación
- [ ] Sistema de disparo
- [ ] Colisiones y combate
- [ ] Mecánicas de escondite completas
- [ ] Adaptación a Angular

## Instalación

### Cliente
```bash
cd cliente
npm install
# Abrir index.html en el navegador
```

### Servidor
```bash
cd server
npm install
npm run dev
```

## Estado Actual
El proyecto tiene implementada la estructura de cliente y servidor basica.

# Servidor:

-ServerService.ts:

Comenzamos con la clase ServerService.ts que maneja la lógica del servidor utilizando socket.io.

Cuando un cliente se conecta, se emite un mensaje de estado de conexión.
Se añade el jugador al juego.
```bash
this.io.on('connection', (socket) => {
    socket.emit("connectionStatus", { status: true });
    GameService.getInstance().addPlayer(GameService.getInstance().buildPlayer(socket));
    // ...existing code...
});
```
Se manejan los mensajes recibidos y se ejecutan las funciones correspondientes.
```bash
socket.on("message", (data) => {
    const doType = this.inputMessage.find(item => item.type == data.type);
    if (doType !== undefined) {
        doType.do(data);
    }
});
```
Se maneja la desconexión de los clientes.
```bash
socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado:', socket.id);
});

```
addPlayerToRoom, es un metodo que añade un jugador a una sala.

-RoomService.ts:

En RoomService.ts definimos una clase que maneja la logica de las salas, importamos las clases necesarias, las cuales analizaremos mas adelante

```bash
import { Player } from "../player/entities/Player";
import { ServerService } from "../server/ServerService";
import { Room, RoomConfig } from "./entities/Room";
```
Creamos varios metodos, como son, getInstance que asegura que solo haya una instancia de RoomService, el metodo getRoom, que busca una sala que no este ocupada, si no hay sala disponible la crea con un identificador unico y la añade a rooms
```bash
private getRoom() : Room {
        const room = this.rooms.find((item) => item.occupied == false);
        if (room == undefined) {
            const genRanHex = (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            const currentRoom: Room = {
                name: "room" + genRanHex(128),
                players: [],
                occupied: false,
                game: null
            }
            this.rooms.push(currentRoom);
            return currentRoom;
        }
        return room;
    }
```

y el metodo addPlayer que lo que hace es llamar a getRoom para obtener una sala disponible, añade el jugador a esa sala y utiliza la clase ServerService para añadir ese jugador a la sala en el servidor, en este mismo metodo especificamos el tamaño maximo que tendra la sala. 

En la clase Player.ts se definene las direcciones que tendra el jugador para moverse, se enumeran los diferentes estados del jugador y se define la estructura que tendra un jugador, incluyendo su ID. 

En Room.ts se define el numero maximo de jugadores, en mi caso esta en 1, el cual debe de cambiar a 4, y la interfaz que tendra la sala con un nombre, jugadores, si esta ocupada (completa) o no, y el juego asociado, el cual proviene de la clase Game.ts. 

En la clase Game.ts se define el estado del juego, esperando o jugando, y los tipos de mensajes que se pueden enciar en el juego que son tablero, y nuevo jugador, tambien se define la interfaz de esta clase, la cual tendra u id, un estado, una room asociada y un tablero.


-GameService.ts

En esta clase se importan la mayoria de las clases mencionadas anteriormente, se crean metodos que incrementan el contador de jugadores y asigna un type a cada uno de estos. Se crea un metodo para añadir jugadores a una sala especifica y si la sala esta ocupada cambia el estado del juego y envia el tablero a los jugadores.


En el index.ts se configura y se inicia el servidor web utilizando Express y HTTP, se inicializa a traves de ServerService.ts para manejar las conexiones con socket.io.



# Cliente 

En index.js inicializa GameController.js con la url del servidor y con la interfaz que del usuario que se define en UIv1.js

En GameCOntroller se inicializa la interfaz que va a tener el usuario, y maneja la conecion con el servidor cuando utiliza ConnectionHandler

En la clase Queue, se crea el manejo de la cola, verifica si la cola esta o no vacia.

En board.js se representa el tablero el cual sera un array y obtener dicho mapa una vez construido. 

En Player.js se definene las propiedades del jugador, como posicion, estado, direcciones, tal y como esta el programa actualmente, las direcciones no estan definidas, ya que tengo problemas con el manejo del jugador conectado.

En ConnectionHandler maneja la conexión con el servidor utilizando socket.io. Inicializa la conexión, maneja eventos de conexión y desconexión, y reenvía mensajes al GameController

En GameService se maneja la logica del juego en el cliente.

En Ui.js se define una interfaz basica, la cual usaremos. 

En UIv1 se implementa la interfaz de usuario definida en Ui.js. Se crean metodos para dibujar a los jugadores a los arbustos 


## Próximos Pasos

Los pasos que quedan por implementar en el juego son los siguientes:
1. Implementar sistema de movimiento
2. Añadir mecánicas de combate
3. Mejorar sistema de salas
4. Implementar lógica de escondite
5. Refactorizar para Angular

No he podido avanzar mas debido a que tengo porblemas con representar los jugadores en el tablero una vez se conectan, he intentdo hacerlo proporcionandole a este jugador conectado el tipo y la posicion que se indica en el servidor, en BoardBuild.ts pero no he podido hacerlo, me daban errores que no he sabido solucionar, tambien he tenido que quitar la parte de los "vecinos" para la creacion de los arbustos ya que me daba un error de un bucle infinito que no he podido solucionar, por lo que los arbustos puedne salir juntos uno al lado del otro. 

