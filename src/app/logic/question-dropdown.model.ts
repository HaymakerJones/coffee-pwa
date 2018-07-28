import { QuestionBase } from './question-base.model';

export class DropdownQuestion extends QuestionBase<string> {
    controlType = "dropdown";
    options: { key: string, value: string }[] = [];

    constructor(options: any = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}