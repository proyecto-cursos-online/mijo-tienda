import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { URL_FROTEND } from 'src/app/config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any = null;
  password: any = null;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.user) {
      this.router.navigateByUrl("/");
      return;
    }
  }

  login() {
    if (!this.email || !this.password) {
      alert("Necesitas ingresar todos los campos");
      return;
    }
    this.authService.login(this.email, this.password).subscribe((res: any) => {
      if (!res) {
        alert("Credenciales incorrectas")
        return;
      }
      location.href = URL_FROTEND;
    })
  }
}
