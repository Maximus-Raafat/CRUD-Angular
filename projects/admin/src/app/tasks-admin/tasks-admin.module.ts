import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TasksAdminRoutingModule } from './tasks-admin-routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddTaskComponent,
    ListTasksComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TasksAdminRoutingModule
  ]
})
export class TasksAdminModule { }
