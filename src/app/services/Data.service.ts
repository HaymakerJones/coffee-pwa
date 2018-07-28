import { Injectable } from '@angular/core';
import { Coffee } from '../logic/coffee';
import { PlaceLocation } from '../logic/placeLocation';

import { QuestionBase } from '../logic/question-base.model';
import { TextboxQuestion } from '../logic/question-textbox.model';
import { DropdownQuestion } from '../logic/question-dropdown.model';

@Injectable()
export class DataService {

    constructor() { }

    getList(callback) {
        //TODO: Chang it with a real Web Service
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
                place: "Starcoffee",
                location: new PlaceLocation({
                    address: "Gran Via 34",
                    city: "Madrid"
                }),
            }),
        ];

        callback(list);
    }

    save(coffee, callback) {
        //TODO: Chang it with a real Web Service
        callback(true);
    }

    getCoffeeQuestions() {
        let questions: QuestionBase<any>[] = [
            new TextboxQuestion({
                key: 'name',
                label: 'Coffee Name',
                value: '',
                required: false,
                order: 1
            }),
            new TextboxQuestion({
                key: 'place',
                label: 'Coffee Place',
                value: '',
                required: false,
                order: 2
            }),
            new DropdownQuestion({
                key: 'type',
                label: 'Coffee Type',
                options: [
                    { key: 'espresso', value: 'Espresso' },
                    { key: 'americano', value: 'Americano' },
                    { key: 'cappucino', value: 'Cappucino' },
                ],
                order: 3,
            }),
            new TextboxQuestion({
                key: 'notes',
                label: 'Coffee Notes',
                value: '',
                required: false,
                order: 4
            }),
        ];

        return questions.sort((a, b) => a.order - b.order);
    }
}