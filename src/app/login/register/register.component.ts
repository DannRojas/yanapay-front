import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formRegister!: FormGroup;
  public hide: boolean = true;
  public hide1: boolean = true;

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

  onRegister() {
    // console.log(this.formRegister.value);
    if (
      this.formRegister.get('password')?.value ===
      this.formRegister.get('confirmPassword')?.value
    ) {
      this.authService.registerUser(this.formRegister.value).subscribe({
        next: (resp) => {
          // console.log(resp);
          this.toastrService.success(
            'El usuario ha sido creado satisfactoriamente',
            'Usuario creado'
          );
          this.authService.setDataLogin(resp);
          this.router.navigate(['tablero/ingresos']);
        },
      });
    } else if (
      !this.formRegister.get('firstName')?.value &&
      !this.formRegister.get('lastName')?.value
    ) {
      this.toastrService.warning(
        'El usuario debe tener almenos uno de los apellidos',
        'Problema en el formulario'
      );
    } else {
      this.toastrService.warning(
        'La contraseña no coincide con la confirmación de la contraseña',
        'Problema en el formulario'
      );
    }
  }

  buildLoginForm() {
    this.formRegister = new FormGroup({
      names: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      business: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }
}
