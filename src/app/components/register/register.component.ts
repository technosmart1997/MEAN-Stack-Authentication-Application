import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss", "../../custom.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

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

    this.authService.registerUser(user).then(res => {
      this.user = res;
      console.log(res);
      if (this.user.status) {
        this.message = this.user.message;
        this.router.navigate(["../", "login"]);
      } else {
        this.message = this.user.message;
      }
    });
  }
}
