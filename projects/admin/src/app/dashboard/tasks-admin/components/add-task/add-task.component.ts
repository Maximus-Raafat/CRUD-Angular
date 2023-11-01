import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      title:[this.data?.title || '',Validators.required],
      userId:[this.data?.userId._id || '',Validators.required],
      image:[this.data?.image || '',Validators.required],
      description:[this.data?.description || '',Validators.required],
      deadline:[this.data? new Date(this.data.deadline.split('-').reverse().join('-')).toISOString() : '',Validators.required],
    })

  }
  updateTask(){
    this.spinner.show();
    let model = this.prepereFormData();
    this.tasksService.updateTask(model,this.data._id).subscribe((res:any)=>{
      this.spinner.hide();
      console.log(res.massage);
      this.toastr.success(res.massage, 'Success Update');
      this.dialog.close(true);
    },error=>{
      this.toastr.error(error.error.massage,"Error");
      this.spinner.hide();
    })
  }
  createTask() {
    this.spinner.show();
    let model = this.prepereFormData();
    this.tasksService.creatTask(model).subscribe((res:any)=>{
      this.spinner.hide();
      console.log(res.massage);
      this.toastr.success(res.massage, 'Success');
      this.dialog.close(true);
    },error=>{
      this.toastr.error(error.error.massage,"Error");
      this.spinner.hide();
    })
  }
  prepereFormData(){
    let newDate = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY');
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key,value]:any)=>{
      if(key == 'deadline'){
        formData.append(key,newDate);
      }else {
        formData.append(key,value);
      }
    })
    return formData;
  }
}
