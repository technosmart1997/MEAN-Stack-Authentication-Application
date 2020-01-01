import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate() {
    if (!this.jwtHelper.isTokenExpired()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
