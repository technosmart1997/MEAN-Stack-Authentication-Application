import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

  constructor(private auth : AuthService) { }
  tasks: any[];
  response;
  ngOnInit() {
    this.getMyTasks();
  }

  displayAgain(){
    this.getMyTasks();
  }

  getMyTasks(){
    this.auth.getTasks().then((res) => {
      this.response = res;
      if(this.response){
        this.tasks = this.response.tasks;
      }  
    }).catch(err => {
      console.log(err);
    }) 
  }

 
}
