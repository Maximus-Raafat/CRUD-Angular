import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { creatAccount, loginAccount } from './constant/DOTs';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  createUser(model:creatAccount){
    return this.http.post(environment.baseApi.replace('/tasks','/auth') + "/createAccount" , model);
  }
  loginUser(modle:loginAccount){
    return this.http.post(environment.baseApi.replace('/tasks','/auth') + "/login", modle);
  }
}
