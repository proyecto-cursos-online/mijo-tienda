import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any = null;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  isOnRegisterRoute(): boolean {
    return this.router.isActive('/auth/register', false);
  }

  isOnLoginRoute(): boolean {
    return this.router.isActive('/auth/login', false);
  }

  logout() {
    this.authService.logout();
  }
}
