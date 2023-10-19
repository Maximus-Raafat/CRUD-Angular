import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageUsersRoutingModule } from './mange-user-routing';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ManageUsersRoutingModule,
    HttpClientModule,
    CommonModule    
  ]
})
export class ManageUsersModule { }
