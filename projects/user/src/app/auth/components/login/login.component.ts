import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { loginAccount } from '../../services/constant/DOTs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private serviceLogin:LoginService,
    private router:Router,
    private toaster:ToastrService
    ) { }

  ngOnInit(): void {
    this.createLoginForm()
  }
  createLoginForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

 login(){
  const Modle:loginAccount = {
    email:this.loginForm.value['email'],
    password:this.loginForm.value['password'],
    role:"user",
  }
  this.serviceLogin.loginUser(Modle).subscribe((res:any)=>{
    localStorage.setItem("token",res.token);
    this.toaster.success("Success","Success Login");
    this.router.navigate(['/tasks'])
  },error=>{
    console.log(error);
  })
}

}
