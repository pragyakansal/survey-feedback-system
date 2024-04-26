import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginComponent } from "./pages/login/login.component";
//import { UserSurveyComponent } from "./pages/user-survey/user-survey.component";
//import { ServeyComponent } from "./pages/survey/survey.component";
//import { NavBarComponent } from "./pages/nav-bar/nav-bar.component";
//import { SurveyResultComponent } from "./pages/survey-result/survey-result.component";
//import { ThankYouComponent } from "./pages/thank-you/thank-you.component";

@NgModule({
  imports: [
      HttpClientModule,
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  exports: [
    LoginComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}