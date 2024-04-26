import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '../../services/survey.service';
import { SurveyService } from '../../servies/survey.service';
import { Question } from '../../survey';

@Component({
    selector: 'app-user-survey',
    templateUrl: './user-survey.component.html',
    styleUrls: ['./user-survey.component.css']
})

export class UserSurveyComponent implements OnInit {
    surveyId!: number;
    surveyForm!: FormGroup;
    questions!: Question[];
    surveyName!: string;
    constructor(private route: ActivatedRoute, private surveyService: SurveyService, private router: Router) {
        let form: any = {};
        form['name'] = new FormControl('', Validators.required);
        form['email'] = new FormControl('', Validators.required);
        this.surveyForm = new FormGroup(form);
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['id']) {
                console.log(params['id']);
                this.surveyService.getSurveyQuestionsById(params['id']).subscribe(response => {
                    this.questions = response;
                    //console.log
                    this.surveyName = this.questions[0].surveyName;
                    this.surveyId = this.questions[0].surveyId;
                    let form: any = {};
                    form['name'] = new FormControl('', Validators.required);
                    form['email'] = new FormControl('', Validators.required);
                    this.questions.forEach(question => {
                        form['question' + question.id] = new FormControl('', Validators.required)
                    });
                    this.surveyForm = new FormGroup(form);
                })
            }
        })
    }

    onSubmit() {
        let result = this.surveyForm.value;
        let resultRecord: any = {};
        resultRecord.surveyId = this.surveyId;
        resultRecord.name = result.name;
        resultRecord.email = result.email;
        this.questions.forEach(question => {
            resultRecord[question.id] = result['question' + question.id];
        })
        console.log(`${JSON.stringify(resultRecord)}`);

        this.surveyService.addResult(resultRecord).subscribe(response => {
            console.log('Success');
            this.router.navigate(['thanks']);
        })
    }
}