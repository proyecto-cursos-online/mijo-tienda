import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { URL_FROTEND } from 'src/app/config/config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  name: any = null;
  surname: any = null;
  email: any = null;
  password: any = null;
  confirm_password: any = null;

  ngOnInit(): void {
    if (this.authService.user) {
      this.router.navigateByUrl("/");
      return;
    }
  }

  register() {
    if (!this.name || !this.surname || !this.email || !this.password || !this.confirm_password) {
      alert("Necesitas ingresar todos los campos");
      return;
    }

    if (this.password != this.confirm_password) {
      alert("Las contraseñas deben de ser iguales")
      return;
    }

    const data = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
    };
    this.authService.register(data).subscribe((res: any) => {
      if (!res) {
        alert("Credenciales incorrectas")
        return;
      }
      location.href = URL_FROTEND + "/auth/login";
    }, error => {
      alert("¡Las credenciales no son correctas o ya existen!");
      console.log(error);
    });
  }
}
