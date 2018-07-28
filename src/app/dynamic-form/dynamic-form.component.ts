import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../logic/question-base.model';
import { QuestionControlService } from '../services/question-control.service';
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coffee } from '../logic/coffee';
import { PlaceLocation } from '../logic/placeLocation';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private questionControlService: QuestionControlService) { }

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
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
