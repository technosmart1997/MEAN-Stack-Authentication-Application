import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss','../../custom.scss']
})
export class CreateTaskComponent implements OnInit {

  constructor(private auth : AuthService) { }
  title : String;
  description : String;
  imageUrl : String;
  response : String;

  ngOnInit() {
  }

  createTask() {
    var task = {
      title: this.title,
      description: this.description,
      imageUrl : this.imageUrl
    };

    this.auth.createTask(task).then(res => {
      console.log(res);
      // this.user = res;
      // if (this.user.status) {
      //   this.LoginService.storeToken(this.user.token);
      //   this.message = this.user.message;
      //   let userId = this.user.user.id;
      //   this.router.navigate(["/dashboard", userId]);
      // } else {
      //   this.message = this.user.message;
      // }
    });
  }

}
