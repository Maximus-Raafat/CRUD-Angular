import { Component, OnInit } from '@angular/core';
import { Route, Router,ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskId: any;
  taksDetils:any;
  constructor(
    private route: ActivatedRoute,
    private tasksService:TasksService,
    private serviceTasks:TasksService,
    private router:Router,
    private toster:ToastrService
    ) {
    this.route.paramMap.subscribe((res:any)=>{
      this.taskId = res.params['id'];
    })
  }
  ngOnInit(): void {
    this.getTasksDetails()
  }

  getTasksDetails(){
    this.tasksService.getTasksDetails(this.taskId).subscribe((res:any)=>{
      this.taksDetils = res.tasks;
    })
  }
  complete(){
    let Modle = {
      id:this.taskId
    }
    this.serviceTasks.completeTask(Modle).subscribe((res:any)=>{
      this.router.navigate(['/tasks']);
      this.toster.success("Tasks complete successfully", "Sucess")
    })  
  }
}
