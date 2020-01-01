import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate() {
    if (!this.jwtHelper.isTokenExpired()) {
      const token = localStorage.getItem("token");
      const id = this.jwtHelper.decodeToken(token).id;
      this.router.navigate(["/dashboard/", id]);
    } else {
      return true;
    }
  }
}
