export class TastingRating {
    aroma: number;
    body: number;
    flavour: number;
    intensity: number;
    sweetness: number;
    afterTaste: number;

    constructor(options: {
        aroma?: number,
        body?: number,
        flavour?: number,
        intensity?: number,
        sweetness?: number,
        afterTaste?: number,
    } = {}) {
        this.aroma = options.aroma || 0;
        this.body = options.body || 0;
        this.flavour = options.flavour || 0;
        this.intensity = options.intensity || 0;
        this.sweetness = options.sweetness || 0;
        this.afterTaste = options.afterTaste || 0;
    }
}