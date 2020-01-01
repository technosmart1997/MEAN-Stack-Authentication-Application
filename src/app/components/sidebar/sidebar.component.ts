import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private http : HttpClient , private router : Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.http.get("/routes/auth/logout").subscribe(res => {
      localStorage.clear();
      setTimeout(() => {
        this.router.navigate(["/"]);
      },2000)
    });
  }


}
