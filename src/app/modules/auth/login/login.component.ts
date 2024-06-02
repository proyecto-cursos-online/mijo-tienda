import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

declare function _clickDoc(): any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any = null;
  password: any = null;
  email_register: any = null;
  password_register: any = null;
  name: any = null;
  surname: any = null;
  password_repit: any = null;
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  ngOnInit(): void {
    setTimeout(() => { _clickDoc(); }, 50);
    if (this.authService.user) {
      this.router.navigateByUrl("/");
      return;
    }
  }
  login() {
    if (!this.email || !this.password) {
      alert("Los campos son requeridos");
      return;
    }
    this.authService.login(this.email, this.password).subscribe((resp: any) => {
      console.log(resp);
      if (resp) {
        window.location.reload();
      } else {
        alert("Credeciales Invalidas")
      }
    })
  }

  register() {
    if (!this.name || !this.surname || !this.email_register || !this.password_register || !this.password_repit) {
      alert("Campos Necesarios");
      return; 
    }if (this.password_register != this.password_repit) {
      alert("Contraseñas Diferentes")
      return;
    }
    let data = {
      email: this.email_register,
      name: this.name,
      surname: this.surname,
      password: this.password_register,
      role_id: "2",
      state:"1",
      type_user:"1"
    }
    this.authService.register(data).subscribe((resp: any) => {
      console.log(resp);
      alert("usuario creado")
    }, error =>{
      alert("Ocurrio un error");
      console.log(error)
    })
  }
}
