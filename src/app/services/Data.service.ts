import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Coffee } from '../logic/coffee';
import { PlaceLocation } from '../logic/placeLocation';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    getList(callback) {
        // const list = [
        //     new Coffee({
        //         name: "Double Espresso",
        //         place: "Sunny Cafe",
        //         location: new PlaceLocation({
        //             address: "123 Market St",
        //             city: "San Fransisco"
        //         }),
        //     }),
        //     new Coffee({
        //         name: "Carmel Americano",
        //         place: "Star Cafe",
        //         location: new PlaceLocation({
        //             address: "Gran Via 34",
        //             city: "Madrid"
        //         }),
        //     }),
        // ];

        // return callback(list);
        this.http.get(`${environment.endpoint}/coffees`).subscribe(
            response => {
                console.log(response);
                callback(response);
            }
        );
    }

    get(coffeeId: string, callback) {
        this.http.get(`${environment.endpoint}/coffee/${coffeeId}`).subscribe(
            response => {
                callback(response);
            }
        );
    }

    save(coffee, callback) {
        if (coffee._id) {
            //Its an update
            this.http.put(`${environment.endpoint}/coffee/${coffee._id}`, coffee).subscribe(
                response => {
                    callback(true);
                }
            );
        }
        else {
            //Its an insert
            this.http.post(`${environment.endpoint}/coffee`, coffee).subscribe(
                response => {
                    callback(true);
                }
            );
        }
    }
}