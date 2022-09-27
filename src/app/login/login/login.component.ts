import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;
  public hide: boolean = true;

  @ViewChild('formDirective')
  formDirective!: NgForm;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.buildLoginForm();
  }

  ngOnInit(): void {}

  onLogin() {
    this.authService.loginUser(this.formLogin.value).subscribe({
      next: (resp) => {
        // console.log(resp);
        this.toastrService.success(
          'El usuario ha iniciado sesión satisfactoriamente',
          'Inicio exitoso'
        );
        this.authService.setDataLogin(resp);
        this.router.navigate(['tablero/ingresos']);
      },
    });
  }

  buildLoginForm() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
}
