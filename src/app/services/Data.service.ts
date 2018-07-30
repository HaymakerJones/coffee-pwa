import { Injectable } from '@angular/core';
import { Coffee } from '../logic/coffee';
import { PlaceLocation } from '../logic/placeLocation';

@Injectable()
export class DataService {

    constructor() { }

    getList(callback) {
        const list = [
            new Coffee({
                name: "Double Espresso",
                place: "Sunny Cafe",
                location: new PlaceLocation({
                    address: "123 Market St",
                    city: "San Fransisco"
                }),
            }),
            new Coffee({
                name: "Carmel Americano",
                place: "Star Cafe",
                location: new PlaceLocation({
                    address: "Gran Via 34",
                    city: "Madrid"
                }),
            }),
        ];

        return callback(list);
    }

    save(coffee, callback) {
        callback(true);
    }
}