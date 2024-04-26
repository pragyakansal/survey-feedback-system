import { HttpClient } from "@angular/common/http";
import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { API_URL } from "../constants";
import { Question, Survey } from "../survey";

@Injectable({})
export class SurveyService {
  constructor(private httpClient: HttpClient) {}

  addSurvey(survey: Survey) {
    return this.httpClient.post<Survey>(`${API_URL}surveys`, survey);
  }

  getSurveys() {
    return this.httpClient.get<Array<Survey>>(`${API_URL}/surveys`);
  }

  getSurveyQuestionsById(id: number) {
    return this.httpClient.get<Array<Question>>(`${API_URL}questions/?surveyId=${id}`)
  }

  getQuestions() {
    return this.httpClient.get<Array<Question>>(`${API_URL}questions`);
  }

  addQuestion(question: Question) {
    return this.httpClient.post<Question>(`${API_URL}questions`, question);
  }

  updateQuestion(question: Question) {
    return this.httpClient.put<Question>(`${API_URL}questions/${question.id}`, question);
  }

  addResult(result: any) {
    return this.httpClient.post(`${API_URL}results`, result);
  }

  getResults(id: number) {
    return this.httpClient.get<any[]>(`${API_URL}results/?surveyId=${id}`)
  }
}