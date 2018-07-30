import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coffee } from '../logic/coffee';
import { GeoLocationService } from '../services/GeoLocation.service';
import { PlaceLocation } from '../logic/placeLocation';
import { TastingRating } from '../logic/tastingRating';


@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit, OnDestroy {

  routingSubscription: any;
  coffee: Coffee;
  types = ["Espresso", "Americano", "Cappucino"];

  constructor(private activatedRoute: ActivatedRoute, private geolocation: GeoLocationService) { }

  ngOnInit() {
    this.coffee = new Coffee();
    this.routingSubscription = this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
    });

    this.geolocation.requestLocation(location => {
      if (location) {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      }
    });
  }

  tastingRatingChange(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    }
    else {
      this.coffee.tastingRating = null;
    }
  }

  save() { }

  cancel() { }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }

}
