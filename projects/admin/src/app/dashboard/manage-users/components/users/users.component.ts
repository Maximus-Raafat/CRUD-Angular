import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource:any=[];
  page = 1;
  totlaItems:any;
  constructor(
    private serviceUser:UsersService,
    private toster:ToastrService
    ) { 
      this.getDataFromSubject();
    }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const Model = {
      page:this.page,
      limit:10,
      name:''
    }
    this.serviceUser.getAllUsersData(Model);
  }
  getDataFromSubject() {
    this.serviceUser.userData.subscribe((res:any)=>{
      this.dataSource = res.data;
      this.totlaItems = res.total;
    })
  }
  changePage(event:any){
    this.page = event;
    this.getUser();
  }
  deleteTask(id:any,index:number){
    if (this.dataSource[index].assignedTasks > 0) {
      this.toster.error("You can't delete this user untile his finsh tasks")
    } else {
      this.serviceUser.deleteUser(id).subscribe(res=>{
        this.toster.success("User Deleted Successfully")
        this.getUser();
      })
    }
  }
  changeUserStatus(status:string,id:string, index:number) {
    const Model = {
      id,
      status
    }
    if (this.dataSource[index].assignedTasks > 0) {
      this.toster.error("You can't change this user untile his finsh tasks")
    } else {
    this.serviceUser.ChangeStatus(Model).subscribe(res=>{
      this.toster.success("User status Updated Sccesfully");
      this.getUser();
    })
  }
 }
}
