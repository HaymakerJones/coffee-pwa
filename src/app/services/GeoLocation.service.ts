import { Injectable } from '@angular/core';
import { PlaceLocation } from '../logic/placeLocation';

@Injectable()
export class GeoLocationService {

    constructor() { }

    requestLocation(callback) {
        //W3C Geoloaction api
        navigator.geolocation.getCurrentPosition(
            position => {
                callback(position.coords);
            },
            error => {
                console.log(error);
                callback(null);
            }
        );
    }

    getMapLink(location: PlaceLocation) {
        //Universal link
        let query = "";
        if (location.latitude) {
            query = location.latitude + "," + location.longitude;
        }
        else {
            query = `${location.latitude},${location.longitude}`;
        }

        //Is it Android or Apple?
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            return `https://maps.apple.com/?q=${query}`;
        }
        else {
            return `https://maps.google.com/?q=${query}`;
        }

    }

}