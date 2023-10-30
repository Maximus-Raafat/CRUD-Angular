import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getAllTasks(){
    return this.http.get(environment.baseApi + "tasks/all-tasks");
  }
  creatTask(model:any){
    return this.http.post(environment.baseApi + "tasks/add-task",model)
  }
}
