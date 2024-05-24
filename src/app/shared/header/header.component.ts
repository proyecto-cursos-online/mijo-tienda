import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { CartService } from 'src/app/modules/tienda-guest/service/cart.service';
declare function cartSidenav():any;
declare function alertSuccess([]):any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  user:any=null;
  listCarts:any = [];
  totalSum:any = 0;
  constructor(
    public autService:AuthService,
    public cartService: CartService,
  ){
    
  }
  ngOnInit(): void {
    this.user=this.autService.user;
    this.cartService.currentData$.subscribe((resp:any) => {
      console.log(resp);
      this.listCarts = resp;
      this.totalSum = this.listCarts.reduce((sum:number, item:any) => sum + item.total,0);
    });
    if(this.user){
      this.cartService.listCart().subscribe((resp:any) => {
        console.log(resp);
        resp.carts.data.forEach((cart:any) => {
          this.cartService.addCart(cart);
        });
      })
    }
    setTimeout(() => {
      cartSidenav();
    }, 50);
  }
  removeItem(cart:any){
    this.cartService.deleteCart(cart.id).subscribe((resp:any) => {
      console.log(resp);
      alertSuccess("EL ITEM SE A ELIMINADO CORRECTAMENTE ");
      this.cartService.removeItemCart(cart);
    })
  }
  logout(){
    this.autService.logout();
  }
}
