import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.jwtHelper.isTokenExpired()) {
      this.router.navigate(["../", "/login"]);
    }
  }
  ngOnInit() {
    this.authService.getProfile().then(res => {
      this.user = res;
      if (this.user.status) {
        this.user = this.user.userData;
      }
    });
  }
}
