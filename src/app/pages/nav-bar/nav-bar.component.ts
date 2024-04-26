import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    constructor(private route: Router){}
    logout() {
        this.route.navigate(['login']);
    }
}