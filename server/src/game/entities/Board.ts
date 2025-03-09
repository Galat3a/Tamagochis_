import { Player } from "../../player/entities/Player";
import { Bush } from "../../Bush/Bush";
export interface Element {
    x : number;
    y : number; 
    type: number;
    object: Player | Bush | null;
    top: Element | null;
    bottom: Element | null;
    right: Element | null;
    left:Element | null;
}

export interface Board {
    size: number;
    elements: Array<Element>;
}