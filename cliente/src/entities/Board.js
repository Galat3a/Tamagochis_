export const ELEMENTS = {
    bush: 5,
};

export class Board {
    #map = null;
    #states = {
        NO_BUILD: 0,
        BUILD: 1
    }
    #state = null;

    constructor() {
        this.#state = this.#states.NO_BUILD;
    }

   build(payload) {
    const { size, elements } = payload;
    // Crear el array usando una referencia nueva para cada celda
    this.#map = Array(size).fill(null).map(() => 
        Array(size).fill(null).map(() => ({ type: 0 }))
    );
    
    elements.forEach(element => {
        this.#map[element.x][element.y] = { type: element.type };
    });
    this.#state = this.#states.BUILD;
}

    get map() {
        if (this.#state === this.#states.BUILD) {
            return this.#map;
        }
        return undefined;
    }
}