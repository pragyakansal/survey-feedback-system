import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Route, Router, RouterLink } from "@angular/router";
import { UserService } from "../../services/user.service";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [ReactiveFormsModule]
})

export class LoginComponent {
  loginForm: FormGroup;
  isError: boolean = false;
  errorMessage: any;
  constructor(private userService: UserService, private router: Router) {
      this.loginForm = new FormGroup({
          email: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required),
      })
  }
  onSubmit() {
      let values = this.loginForm.value;
      this.userService.login(values.email, values.password).subscribe(response => {
          console.log(`${JSON.stringify(response)}`);
          this.router.navigate(['survey']);
      }, error => {
          this.isError = true;
          this.errorMessage = error.message;
      })
  }


}