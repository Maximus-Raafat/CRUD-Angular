import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(modle:login){
    return this.http.post(environment.baseApi + "auth/login",modle);
  }

}
