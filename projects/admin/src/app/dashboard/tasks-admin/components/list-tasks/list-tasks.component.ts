import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
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
  tasksFilter!:FormGroup;
  timeOutId:any; 
  page:any = 1;
  total:any = 1;
  filtration:any = {
    page:this.page,
    limit:10
  };
  users:any = [
    {name:"fady" , id:"653f3d329140ab11352b00db"},
    {name:"tia" , id:"653f3d919140ab11352b00de"},
    {name:"joe" , id:"653f3daa9140ab11352b00e1"},
  ]

  status:any = [
    {name:"Complete"},
    {name:"In-Progress"},
  ]
  constructor(
    public dialog: MatDialog ,
    private fb:FormBuilder,
    private serviceTasks:TasksService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllTasks();
  }
  selectStatus(event:any){
    this.page = 1;
    this.filtration['page'] = 1;

    console.log( event.value.trim());
    this.filtration['status'] = event.value.trim();
    this.getAllTasks();
  }
  selectUser(event:any){
    this.page = 1;
    this.filtration['page'] = 1;

    this.filtration['userId'] = event.value;
    this.getAllTasks();
  }
  search(event:any){
    this.page = 1;
    this.filtration['page'] = 1;

    this.filtration["keyword"] = event.value;
     clearTimeout(this.timeOutId);
     this.timeOutId = setTimeout(() => {
      this.getAllTasks();
      }, 2000); 
  }
  selectData(event:any, type:any){
    this.page = 1;
    this.filtration['page'] = 1;

    this.filtration[type] = moment(event.value).format('DD-MM-YYYY');
    if (type == "toDate" && this.filtration['toDate'] !== "Invalid date") {
      this.getAllTasks();
    }
  }

  getAllTasks() {
    this.serviceTasks.getAllTasks(this.filtration).subscribe((res:any)=>{
      this.dataSource = this.mapingInTask(res.tasks);
      this.total = res.totalItems
    },error=>{
      console.log(error);
    })
  }
  deleteTask(id:number){
    this.serviceTasks.deleteTask(id).subscribe((res)=>{
    this.getAllTasks();
    this.toastr.success("Deleted this Task","Success")
    },error=>{
      this.toastr.error("Success",error)
    })
  }
  mapingInTask(data:any[]){
    let newData = data.map((item:any)=>{
      return {
        ...item,
        user:item.userId.username,
      }
    })
    return newData;
  }
  changePage(event:any){
    this.page = event;
    this.filtration['page'] = event;
    this.getAllTasks();

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
  updateTask(data:any){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAllTasks()
      }
    })
  }
}
