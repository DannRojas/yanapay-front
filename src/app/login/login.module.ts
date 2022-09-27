import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginRoutingModule } from './login-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
