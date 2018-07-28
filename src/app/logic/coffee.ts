import { PlaceLocation } from './placeLocation';
import { TastingRating } from './tastingRating';

export class Coffee {
    name: string;
    place: string;
    type: string;
    location: PlaceLocation;
    rating: number;
    notes: string;
    tastingRating: TastingRating;

    constructor(options: {
        name?: string,
        place?: string,
        type?: string,
        location?: PlaceLocation,
        rating?: number,
        notes?: string,
        tastingRating?: TastingRating,
    } = {}) {
        this.name = options.name || '';
        this.place = options.place || '';
        this.type = options.type || '';
        this.location = options.location || new PlaceLocation();
        this.rating = options.rating || 0;
        this.notes = options.notes || '';
        this.tastingRating = options.tastingRating || new TastingRating();
    }
}