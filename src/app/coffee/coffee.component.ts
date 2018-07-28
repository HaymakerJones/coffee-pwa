import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit, OnDestroy {

  routingSubscription: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routingSubscription = this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
    });
  }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }

}
