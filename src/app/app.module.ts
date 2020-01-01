import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthService } from "./services/auth.service";

import { HomeGuard } from "./guards/home.guard";
import { AuthGuard } from "./guards/auth.guard";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { TaskComponent } from './components/my-tasks/task/task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';


const route: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [HomeGuard]
  },

  {
    path: "login",
    component: LoginComponent,
    canActivate: [HomeGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [HomeGuard]
  },
  {
    path: "dashboard/:id",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children :[
      { path : "" ,component : DashboardHomeComponent},
      { path : "my-task" ,component :MyTasksComponent},
      { path : "create-task" , component : CreateTaskComponent },
      {path : "edit-task/:id" , component : EditTaskComponent},
      { path : "my-profile", component: ProfileComponent },
    ]
  }
  // {
  //   path: "**",
  //   component: NotfoundComponent
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    ContentComponent,
    ProfileComponent,
    CreateTaskComponent,
    DashboardHomeComponent,
    MyTasksComponent,
    TaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
        whitelistedDomains: ["localhost:3000"],
        authScheme: "JWT ",
        skipWhenExpired: true
      }
    }),
    FormsModule,
    RouterModule.forRoot(route)
  ],
  providers: [AuthService, HomeGuard,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
