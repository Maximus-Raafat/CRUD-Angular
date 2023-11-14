import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource:any = [];
  userData:any;
  page:any = 1;
  totalItme:any = 1;
  selectedStatus = "In-Progress";
  tasksFilter!:FormGroup
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(
    public dialog: MatDialog,
    private fb:FormBuilder,
    private serviceTasks:TasksService
    ) { }

  ngOnInit(): void {
    this.createform();
    this.getUserData();
    this.getAllTasks()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }
  changePage(event:any){
    this.page = event;
    this.getAllTasks();
  }
  getUserData(){
    let token = JSON.stringify(localStorage.getItem('token'));
    this.userData = JSON.parse(window.atob(token.split('.')[1]));
    console.log(this.userData);
  }
  getAllTasks() {
    let params ={
      page:this.page,
      limte:10,
      status:this.selectedStatus
    }
    this.serviceTasks.getUserTasks(this.userData, params).subscribe((res:any)=>{
      this.dataSource = res.tasks;
      this.totalItme = res.totalItems
      console.log(this.dataSource);
    })
  }
  complete(ele:any){
    let Modle = {
      id:ele._id
    }
    this.serviceTasks.completeTask(Modle).subscribe((res:any)=>{
      this.getAllTasks()
    })
  }
}
