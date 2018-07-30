import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coffee } from '../logic/coffee';
import { GeoLocationService } from '../services/GeoLocation.service';
import { DataService } from '../services/data.service';
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
  tastingEnabled: boolean = false;
  types = ["Espresso", "Americano", "Cappucino"];

  constructor(
    private activatedRoute: ActivatedRoute,
    private geolocation: GeoLocationService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.coffee = new Coffee();
    this.routingSubscription = this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      if (params['id']) {
        this.dataService.get(params['id'], response => {
          this.coffee = response;
          if (this.coffee.tastingRating) {
            this.tastingEnabled = true;
          }
        });
      }
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

  save() {
    this.dataService.save(this.coffee, result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }

}
