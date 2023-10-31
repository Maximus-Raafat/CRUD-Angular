import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource:any=[];
  tasksFilter!:FormGroup
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]
  eee:any=[];
  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(
    public dialog: MatDialog ,
    private fb:FormBuilder,
    private serviceTasks:TasksService
    
    ) { }

  ngOnInit(): void {
    this.getAllTasks();
   
  }
  getAllTasks() {
    this.serviceTasks.getAllTasks().subscribe((res:any)=>{
      this.dataSource = this.mapingInTask(res.tasks);
    },error=>{
      console.log(error);
    })
  }
  mapingInTask(data:any[]){
    let newData = data.map((item:any)=>{
      return {
        ...item,
        user:item.userId.username,
      }
    })
    console.log(newData);
    return newData;
  }
  addTask() {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '750px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.getAllTasks()
        }
      })
  }
}
