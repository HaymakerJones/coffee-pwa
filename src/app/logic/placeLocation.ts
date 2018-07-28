export class PlaceLocation {
    address: string;
    city: string;
    latitude: number;
    longitude: number;

    constructor(options: {
        address?: string,
        city?: string,
        latitude?: number,
        longitude?: number,
    } = {}) {
        this.address = options.address || '';
        this.city = options.city || '';
        this.latitude = options.latitude || null;
        this.longitude = options.longitude || null;
    }
}