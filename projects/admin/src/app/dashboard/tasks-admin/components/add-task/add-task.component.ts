import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  newTaskForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private tasksService:TasksService,
    public dialog: MatDialogRef<AddTaskComponent> ,
    public matDialog:MatDialog,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService) { }

  users:any = [
    {name:"fady" , id:"653f3d329140ab11352b00db"},
    {name:"tia" , id:"653f3d919140ab11352b00de"},
    {name:"joe" , id:"653f3daa9140ab11352b00e1"},
  ]
  ngOnInit(): void {
    this.createForm();
  }
  slelectImage(event:any){
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }
  
  createForm(){
    this.newTaskForm = this.fb.group({
      title:['',Validators.required],
      userId:['',Validators.required],
      image:['',Validators.required],
      description:['',Validators.required],
      deadline:['',Validators.required],
    })
  }
  createTask() {
    this.spinner.show();
    let model = this.prepereFormData();
    this.tasksService.creatTask(model).subscribe((res:any)=>{
      this.spinner.hide();
      console.log(res.massage);
      this.toastr.success(res.massage, 'Success');
      this.dialog.close();
    },error=>{
      this.toastr.error(error.error.massage,"Error");
      this.spinner.hide();
    })
  }
  prepereFormData(){
    let newDate = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY');
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key,value]:any)=>{
      console.log(key,value);
      if(key == 'deadline'){
        formData.append(key,newDate);
      }else {
        formData.append(key,value);
      }
    })
    return formData;
  }
}
