import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/Data.service';
import { QuestionBase } from '../logic/question-base.model';


@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit, OnDestroy {

  routingSubscription: any;
  questions: QuestionBase<any>[] = [];


  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.questions = this.dataService.getCoffeeQuestions();

    this.routingSubscription = this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
    });
  }



  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }

}
