import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(
    private fB:FormBuilder,
    private serviceLogin:LoginService,
    private toster:ToastrService,
    private router:Router,
    private spiner:NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm(){
    this.loginForm = this.fB.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.min(3),Validators.max(20)]],
      role:['admin']
    })
  }
  login(){
    this.spiner.show();
    this.serviceLogin.login(this.loginForm.value).subscribe((res:any)=>{
      localStorage.setItem("token",res.token);
      this.toster.success("Success","Success Login");
      this.router.navigate(['/tasks'])
      this.spiner.hide();
    },err=>{
      this.toster.error("Error");
      this.spiner.hide();
    })
  }
}
