import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeStamp } from 'console';
import { ConsoleReporter } from 'jasmine';
import { SurveyService } from 'src/app/services/survey.service';
import { Question, Survey } from 'src/app/survey';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
    surveyForm: FormGroup;
    questionForm: FormGroup;
    surveys!: Survey[];
    questions!: Question[];
    question!: Question;
    isEdit!: false;
    filteredQuestions!: Question[];
    constructor(private surveyService: SurveyService) {
        this.surveyForm = new FormGroup({
            surveyName: new FormControl('', Validators.required)
        });
        this.questionForm = new FormGroup({
            surveyId: new FormControl('', Validators.required),
            text: new FormControl('', Validators.required)
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
            this.surveyService.getQuestions().subscribe((data) => {
                this.questions = data;
                if (this.surveys.length > 0)
                    this.filteredQuestions = this.questions.filter(q => q.surveyId == this.surveys[0].id)
            })
        })
    }

    addSurvey() {
        this.surveyService.addSurvey(this.surveyForm.value).subscribe(response => {
            this.surveyForm.reset();
            this.getSurveys();
        })
    }
    reset() {
        this.questionForm.reset();
        this.isEdit = false;
    }
    
    onSubmit() {
        console.log(`${JSON.stringify(this.questionForm.value)}`);
        let question = this.questionForm.value;
        question.surveyName = this.surveys.filter(s => s.id == question.surveyId)[0].surveyName;
        if (this.isEdit) {
            question.id = this.question.id;
            this.surveyService.updateQuestion(question).subscribe(data => {
                this.reset();
                this.getSurveys();
            })
        } else {
            this.surveyService.addQuestion(question).subscribe(response => {
                this.questions.push(response);
                this.questionForm.reset();
            })
        }
    }

    onSurveyChange() {
        console.log(`${JSON.stringify(this.questionForm.value)}`);
        this.filteredQuestions = this.questions.filter(q => q.surveyId == this.questionForm.value.surveyId);
    }

    onEdit(id: number) {
        this.isEdit = true;
        this.question = this.questions.filter(q => q.id == id)[0];
        this.questionForm.patchValue(this.question);
    }
}