import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  user:any=null;
  constructor(
    public autService:AuthService,
  ){
    
  }
  ngOnInit(): void {
    this.user=this.autService.user;
  }
  logout(){
    this.autService.logout();
  }
}
