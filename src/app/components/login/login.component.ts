import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";

import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss", "../../custom.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private LoginService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    console.log(LoginService.isLoggedIn());
  }

  email: String;
  password: String;
  message: string;
  user_message: string;
  user: any;

  ngOnInit() {}

  loginUser() {
    var user = {
      email: this.email,
      password: this.password
    };

    this.LoginService.loginUser(user).then(res => {
      this.user = res;
      if (this.user.status) {
        this.LoginService.storeToken(this.user.token);
        this.message = this.user.message;
        let userId = this.user.user.id;
        this.router.navigate(["/dashboard", userId]);
      } else {
        this.message = this.user.message;
      }
    });
  }
}
