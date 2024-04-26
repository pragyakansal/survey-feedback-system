import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';
import { Question, Survey } from 'src/app/survey';

@Component({
    selector: 'app-survey-result',
    templateUrl: './survey-result.component.html',
    styleUrls: ['./survey-result.component.css']
})

export class SurveyResultComponent implements OnInit {
    results!: any[] = undefined;
    surveys!: Survey[];
    questions!: Question[];
    filteredQuestions!: Question[];
    surveyForm: FormGroup;
    currentQuestionIds!: number[];
    surveyLink = '';
    constructor(private surveyService: SurveyService) {
        this.surveyForm = new FormGroup({
            surveyId: new FormControl('')
        })
    }
    ngOnInit(): void {
        setTimeout(() => {
            this.getSurveys();
        })
    }

    getSurveys() {
        this.surveyService.getSurveys().subscribe(response => {
            this.surveys = response;
            this.surveyService.getQuestions().subscrube((data) => {
                this.questions = data;
                if (this.surveys.length > 0)
                    this.filteredQuestions = this.questions.filter(q => q.surveyId == this.surveys[0].id);
            })

        })    
    }

    onSurveyChange() {
        let values = this.surveyForm.value;
        const surveyId = values.surveyId;
        this.surveyLink = `http://localhost:4200/user-survey?id=${surveyId}`;
        this.filteredQuestions = this.questions.filter(q => q.surveyId == surveyId);
        this.surveyService.getResults(surveyId).subscribe(response => {
            this.results = response;
            this.currentQuestionIds = [];
            this.filteredQuestions.forEach(question => {
                this.currentQuestionIds.push(question.id);
            })

            console.log(`${JSON.stringify(response)}`)
        })
    }
}