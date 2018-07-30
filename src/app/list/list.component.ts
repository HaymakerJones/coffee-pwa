import { Component, OnInit } from '@angular/core';
import { Coffee } from '../logic/coffee';
import { DataService } from '../services/data.service';
import { GeoLocationService } from '../services/GeoLocation.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: Coffee[] = [];

  constructor(private data: DataService, private router: Router, private gls: GeoLocationService) { }

  ngOnInit() {
    this.data.getList(list => {
      this.list = list;
    });
  }

  goDetails(coffee) {
    this.router.navigate(['/coffee', coffee._id]);
  }

  goMap(coffee) {
    const mapURL = this.gls.getMapLink(coffee.location);
    location.href = mapURL;
  }

  share(coffee) {
    const shareText = `I had this coffee at ${coffee.place} and its a ${coffee.rating} star coffee`;
    if ('share' in navigator) {
      navigator["share"]({
        title: coffee.name,
        text: shareText,
        url: window.location.href
      }).then(() => {
        console.log("Shared");
      }).catch(() => {
        console.log("Error: Not shared");
      });
    }
    else {
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareURL;
    }
  }

}
