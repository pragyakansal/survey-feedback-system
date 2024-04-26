import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "../constants";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root',})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    // Make a POST request to your backend API for user authentication
    // Replace '/api/login' with the actual endpoint of your backend API for user authentication
    const url = `${API_URL}/login`; // Assuming '/login' is the authentication endpoint
    const body = { email, password }; // Request body containing email and password

    return this.httpClient.post(url, body);
  }
}
