import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getAllTasks(){
    return this.http.get("https://curd-n6s0.onrender.com/tasks/all-tasks");
  }
  creatTask(model:any){
    return this.http.post("https://curd-n6s0.onrender.com/tasks/add-task",model)
  }
}
