import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task;
  @Output() delTask = new EventEmitter<any>();
  constructor(private auth : AuthService,private router: Router) { }

  ngOnInit() {
  }

  onEdit(task){
    // console.log(task);
    this.router.navigate(['../','edit-task']);
  }

  deleteTask(id){
    this.auth.deleteTask(id).then(res => {
      this.delTask.emit();
    }).catch(err => {
      console.log(err);
    })
    
  }
}
