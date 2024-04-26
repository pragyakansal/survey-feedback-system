export class Survey{
    id!: number;
    surveyName!: string;
}

export class Question{
    id!:number;
    surveyId!: number;
    surveyName!: string;
    text!: string;
}