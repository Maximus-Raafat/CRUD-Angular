import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from '../auth/components/login/login.component';

const routes: Routes = [ 

{
  path:"", component:LayoutComponent,
  children:[
    {path:'tasks',
    loadChildren: () => import(`./tasks/tasks.module`).then(m => m.TasksModule)
    },
    // {path:'users', 
    // loadChildren: () => import(`./`).then(m => m.ManageUsersModule)
    // }
  ],
  
},
{
  path:"login", component:LoginComponent,
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
