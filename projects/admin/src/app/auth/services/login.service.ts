import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(modle:login){
    return this.http.post("https://curd-n6s0.onrender.com/auth/login",modle);
  }

}
