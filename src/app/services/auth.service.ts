import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  userData : any;
  loginUser(user) {
    return new Promise((resolve, reject) => {
      this.http.post("/routes/auth/login", user).subscribe(res => {
        resolve(res);
      });
    });
  }

  registerUser(user) {
    return new Promise((resolve, reject) => {
      this.http.post("/routes/auth/signup", user).subscribe(res => {
        resolve(res);
      });
    });
  }

  storeToken(token) {
    localStorage.setItem("token", token);
  }

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }


  createTask(task) {
    let id = this.getUserInfo('id');
    return new Promise((resolve, reject) => {
      this.http.post("/routes/user/create-task/" + id, task).subscribe(res => {
        resolve(res);
      });
    });
  }

  getTasks(){
    let id = this.getUserInfo('id');
    return new Promise((resolve, reject) => {
      this.http.get("/routes/user/get-tasks/" +id).subscribe(res => {
        resolve(res);
      });
    });  
  }

  getTask(id){
    return new Promise((resolve, reject) => {
      this.http.get("/routes/user/get-task/" +id).subscribe(res => {
        resolve(res);
      });
    });  
  }

  editTask(id,task){
    
  }

  deleteTask(id){
    return new Promise((resolve, reject) => {
      this.http.delete("/routes/user/delete-task/" + id).subscribe(res => {
        resolve(res);
      });
    });
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      this.http.get("/routes/user/profile").subscribe(res => {
        this.userData = res;
        this.userData = this.userData.userData;
        resolve(res);
      });
    });
  }

  getUserInfo(key){
    const token = localStorage.getItem("token");
    if(!this.jwtHelper.isTokenExpired(token)){
      const user = this.jwtHelper.decodeToken(token);
      return user[key];
    }
  }
}


