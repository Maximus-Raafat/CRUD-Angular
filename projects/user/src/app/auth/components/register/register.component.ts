import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl ,ValidatorFn,ValidationErrors   } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { creatAccount } from '../../services/constant/DOTs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private serviceLogin:LoginService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.creatForm();
  }
  creatForm(){
    this.registerForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      username:['',Validators.required],
      confirmPassword:['',Validators.required]
    },{ validator: this.checkPassowrd })
  }
  checkPassowrd:ValidatorFn = (group:AbstractControl):ValidationErrors | null =>{
    let passwordControl = group.get('password')?.value;
    let confirmPasswordControl = group.get('confirmPassword')?.value;
    return passwordControl === confirmPasswordControl ? null : {notSame:true}
  }
  creatAnAccount(){
    const Model:creatAccount = {
      email:this.registerForm.value['email'],
      password:this.registerForm.value['password'],
      username:this.registerForm.value['username'],
      role:'user',
    }
    this.serviceLogin.createUser(Model).subscribe(res=>{
      this.router.navigate(['/auth', 'login']);
    },error=>{
      alert(error)
    });
}

}
