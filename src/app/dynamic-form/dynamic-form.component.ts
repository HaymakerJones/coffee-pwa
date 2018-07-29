import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../logic/question-base.model';
import { QuestionControlService } from '../services/question-control.service';
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coffee } from '../logic/coffee';
import { PlaceLocation } from '../logic/placeLocation';
import { GeoLocationService } from '../services/GeoLocation.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  location: PlaceLocation;
  payLoad = '';

  constructor(private questionControlService: QuestionControlService, private geolocation: GeoLocationService) { }

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
    this.geolocation.requestLocation(location => {
      if (location) {
        this.location = new PlaceLocation({
          latitude: location.latitude,
          longitude: location.longitude
        });
      }
    });
  }

  onSubmit() {
    //Used this hack to get the desired data structuce
    of(this.form.value).pipe(
      map((props: any) => {
        let coffee = new Coffee({
          name: props.name,
          place: props.place,
          type: props.type,
          location: new PlaceLocation({
            address: props.address,
            city: props.city,
            latitude: this.location.latitude,
            longitude: this.location.longitude
          }),
          notes: props.notes,
        });

        return coffee;
      })
    ).subscribe(value => {
      this.payLoad = JSON.stringify(value);
    });

  }

}
