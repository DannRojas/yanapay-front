import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;
  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.getAccessToken()) {
      this.router.navigate(['/tablero/']);
    }
  }

  onResetForms() {
    this.loginComponent.formLogin.reset();
    this.loginComponent.formDirective.resetForm();
    this.registerComponent.formRegister.reset();
    this.registerComponent.formDirective.resetForm();
  }
}
