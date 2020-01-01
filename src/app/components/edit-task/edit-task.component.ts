import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss','../../custom.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private auth : AuthService, private route : ActivatedRoute) { }
  response : any;
  task : any;
  title : String;
  description : String;
  imageUrl : String;

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.auth.getTask(id).then(res => {
      this.response = res;
      if(this.response.status){
        this.task = this.response.task;
      }
    }).catch(err => {
      console.log(err);
    }) 
  }

  editTask(id){
    var task = {
      title: this.title,
      description: this.description,
      imageUrl : this.imageUrl
    };
  
    let taskId = id;
    console.log(task);
    console.log(taskId);
    // this.auth.editTask(task,taskId).then(res => {
    //   console.log(res);
    // });
  }
 
}
