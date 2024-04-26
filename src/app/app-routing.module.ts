import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { SurveyResultComponent } from "./pages/survey-result/survey-result.component";
import { SurveyComponent } from "./pages/survey/survey.component";
//import { ThankYouComponent } from "./pages/thank-you/thank-you.component";
import { UserSurveyComponent } from "./pages/user-survey/user-survey.component";


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent},
   // { path: 'user-survey', component: UserSurveyComponent},
    //{ path: 'survey', component: SurveyComponent},
   // { path: 'survey-result', component: SurveyResultComponent},

   // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page by default
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export { routes };