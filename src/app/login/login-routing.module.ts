import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // children: [
    //   {
    //     path: 'ingreso',
    //     component: LoginComponent,
    //   },
    //   {
    //     path: 'registro',
    //     component: RegisterComponent,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
